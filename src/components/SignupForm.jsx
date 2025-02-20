import Input from './Input';
import {
  useSubmit,
  Link,
  redirect,
  useNavigation,
  useActionData,
} from 'react-router-dom';

import { LuArrowRight } from 'react-icons/lu';
import { useForm } from 'react-hook-form';
import { addToken, getAuthToken } from '../util/auth';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignupForm() {
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password');
  function submitHandler(formData) {
    if (formData.email && formData.password && formData['confirm-password'])
      submit(formData, { method: 'POST' });
  }
  return (
    <div>
      <h3 className="text-main-color text-[30px] sm:text-[40px] mt-2 text-center ">
        Signup
      </h3>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative w-[400px] max-w-full mx-auto px-2 flex flex-col gap-3"
      >
        {data && (
          <p className="text-red-400 text-[12px] absolute right-2 top-3">
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
          errorMessage={'must be at least 6 characters'}
        />
        <Input
          label="Confirm password"
          type="password"
          name="confirm-password"
          register={register('confirm-password', {
            required: true,
            minLength: 6,
            validate: (value) => value === password || 'passwords do not match',
          })}
          error={Boolean(errors['confirm-password'])}
          errorMessage={
            errors['confirm-password']?.message ||
            'must be at least 6 characters'
          }
        />
        <button
          disabled={isSubmitting}
          className="element-center gap-1 w-full bg-main-color text-center py-[5px] text-white text-[24px] cursor-pointer"
          onClick={submitHandler}
        >
          {isSubmitting ? 'Loading...' : 'Complete signup'}
          <LuArrowRight />
        </button>
      </form>
      <div className="element-center flex-col gap-0.5 mt-2 text-center">
        <p>Already have an account!</p>
        <Link to="/auth/login" className="text-main-color">
          Login
        </Link>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const method = request.method;

  const token = getAuthToken();
  const data = await request.formData();
  let eventData =
    method === 'POST'
      ? {
          userName: 'user',
          password: data.get('password') || '',
          email: data.get('email') || '',
          phone: '0',
          birthdayYear: 0,
        }
      : {
          userName: data.get('user-name') || 'user',
          phone: data.get('phone') || '0',
          birthdayYear: data.get('birth-day-year').split('-')[0] || 0,
        };

  let url = 'http://localhost:3000/api/users';

  if (method === 'POST') url += '/register';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
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

  if (method === 'POST') {
    addToken(responseData.data.user.token);
    return redirect('/auth/complete-signup');
  }

  return redirect('/');
}
