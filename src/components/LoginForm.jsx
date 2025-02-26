import Input from './Input';
import {
  useSubmit,
  Link,
  useNavigation,
  useActionData,
  redirect,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { emailRegex } from '../util/regex';
import { useSelector } from 'react-redux';
import { languages } from '../store/theme-slice';

export default function LoginForm() {
  const currentLanguage = useSelector((state) => state.theme.language);
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

  let isEnglish = currentLanguage === languages.ENGLISH;

  let login = isEnglish ? 'Login' : 'تسجيل الدخول';
  let emailLabel = isEnglish ? 'Email' : 'الحساب';
  let passwordLabel = isEnglish ? 'Password' : 'الرقم السري';
  let haveAccount = isEnglish ? 'Don’t have an account!' : 'لا تمتلك حساب ';
  let signup = isEnglish ? 'Signup' : 'تسجيل الدخول';
  let loading = isEnglish ? 'Login...' : 'تسجيل الدخول ...';

  return (
    <div>
      <h3 className="text-main-color text-[48px] text-center my-3 mb-[10px]">
        {login}
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
          label={emailLabel}
          type="email"
          name="email"
          register={register('email', {
            required: 'this field is required',
            pattern: {
              value: emailRegex,
              message: 'enter a valid email',
            },
          })}
          error={Boolean(errors.email)}
          errorMessage={errors.email?.message || ''}
        />
        <Input
          label={passwordLabel}
          type="password"
          name="password"
          register={register('password', {
            required: 'this field is required',
            minLength: {
              value: 6,
              message: 'min 6 character',
            },
          })}
          error={Boolean(errors.password)}
          errorMessage={errors.password?.message || ''}
        />
        <button
          disabled={isSubmitting}
          style={{ direction: isEnglish ? 'ltr' : 'rtl' }}
          className="w-full bg-main-color text-center py-[10px] text-white text-[24px] cursor-pointer"
          onClick={submitHandler}
        >
          {isSubmitting ? loading : login}
        </button>
      </form>
      <div
        className={`element-center flex-col ${
          isEnglish ? 'sm:flex-row' : 'sm:flex-row-reverse '
        } gap-3 mt-3 text-center`}
      >
        <p className="rtl dark:text-white">{haveAccount}</p>
        <Link to="/auth/signup" className="text-main-color">
          {signup}
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
  const response = await fetch(
    'https://your-notes.vercel.app/api/users/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    }
  );

  const responseData = await response.json();

  if (responseData.code === 401) {
    throw new Response(
      JSON.stringify({ message: 'Your authentication token has expired' }),
      {
        status: 401,
      }
    );
  }

  if (
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

  localStorage.setItem('token', responseData.data.token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}
