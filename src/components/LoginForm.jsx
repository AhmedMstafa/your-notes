import Input from './Input';
import {
  useSubmit,
  Link,
  useNavigation,
  useActionData,
  redirect,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addToken } from '../util/auth';
import { emailRegex } from '../util/regex';

export default function LoginForm() {
  const navigate = useNavigation();
  const data = useActionData();
  const submit = useSubmit();
  const isSubmitting = navigate.state === 'submitting';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function submitHandler(formData) {
    if (formData.email && formData.password) {
      submit(formData, { method: 'POST' });
    }
  }
  return (
    <div>
      <h3 className="text-main-color text-[48px] text-center my-3 mb-[10px]">
        Login
      </h3>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative w-[400px] max-w-full mx-auto px-2 flex flex-col gap-3.5"
      >
        {data && (
          <p className="text-red-400 text-[12px]  absolute right-2 top-3">
            {data.message}
          </p>
        )}
        <Input
          label="Email"
          type="email"
          name="email"
          register={register('email', { required: true, pattern: emailRegex })}
          error={Boolean(errors.email)}
          errorMessage={'enter valid email address'}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          register={register('password', { required: true, minLength: 6 })}
          error={Boolean(errors.password)}
          errorMessage={'min 6 character'}
        />
        <button
          // disabled={isSubmitting}
          className="w-full bg-main-color text-center py-[10px] text-white text-[24px] cursor-pointer"
          onClick={submitHandler}
        >
          {isSubmitting ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className="element-center flex-col sm:flex-row gap-3 mt-3 text-center">
        <p>Don’t have an account!</p>
        <Link to="/auth/signup" className="text-main-color">
          Signup
        </Link>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const data = await request.formData();

  const eventData = {
    email: data.get('email'),
    password: data.get('password'),
  };
  const response = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  const responseData = await response.json();
  if (
    responseData.code === 401 ||
    responseData.code === 400 ||
    responseData.code === 422
  ) {
    return responseData;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could not authenticate user.' }),
      {
        status: 500,
      }
    );
  }

  addToken(responseData.data.token);

  return redirect('/');
}
