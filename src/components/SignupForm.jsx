import Input from './Input';
import {
  useSubmit,
  Link,
  redirect,
  useNavigation,
  useActionData,
} from 'react-router-dom';

import { LuArrowRight } from 'react-icons/lu';
import { LuArrowLeft } from 'react-icons/lu';
import { useForm } from 'react-hook-form';
import { getAuthToken } from '../util/auth';
import { emailRegex } from '../util/regex';
import { useSelector } from 'react-redux';
import { languages } from '../store/theme-slice';

export default function SignupForm() {
  const currentLanguage = useSelector((state) => state.theme.language);
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  const submit = useSubmit();

  let isEnglish = currentLanguage === languages.ENGLISH;
  let emailLabel = isEnglish ? 'Email' : 'الحساب';
  let passwordLabel = isEnglish ? 'Password' : 'الرقم السري';
  let confirmPasswordLabel = isEnglish ? 'Password' : 'تاكيد الرقم السري';
  let signup = isEnglish ? 'Signup' : 'إنشاء حساب';
  let completeSignup = isEnglish ? 'Complete signup' : 'إكمال إنشاء الحساب';
  let haveAccount = isEnglish ? 'Don’t have an account!' : 'لا تمتلك حساب ';
  let login = isEnglish ? 'Login' : 'تسجيل الدخول';
  let loading = isEnglish ? 'Login...' : 'تسجيل الدخول ...';

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
        {signup}
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
        <Input
          label={confirmPasswordLabel}
          type="password"
          name="confirm-password"
          register={register('confirm-password', {
            required: 'this field is required',
            minLength: {
              value: 6,
              message: 'min 6 character',
            },
            validate: (value) => value === password || 'passwords do not match',
          })}
          error={Boolean(errors['confirm-password'])}
          errorMessage={errors['confirm-password']?.message || ''}
        />
        <button
          style={{ direction: isEnglish ? 'ltr' : 'rtl' }}
          disabled={isSubmitting}
          className={`element-center ${
            !isEnglish ? 'flex-row-reverse' : ''
          } gap-1 w-full bg-main-color text-center py-[5px] text-white text-[24px] cursor-pointer`}
          onClick={submitHandler}
        >
          {isSubmitting ? loading : completeSignup}
          {isEnglish ? <LuArrowRight /> : <LuArrowLeft />}
        </button>
      </form>
      <div
        className={`element-center flex-col ${
          isEnglish ? 'sm:flex-row' : 'sm:flex-row-reverse '
        } gap-3 mt-3 text-center dark:text-white`}
      >
        <p>{haveAccount}</p>
        <Link to="/auth/login" className="text-main-color ">
          {login}
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

  let url = 'https://your-notes.vercel.app/api/users';

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

  if (responseData.code === 401) {
    throw new Response(
      JSON.stringify({ message: 'Your authentication token has expired' }),
      {
        status: 401,
      }
    );
  }

  if (responseData.code === 400 || responseData.code === 422) {
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
    localStorage.setItem('token', responseData.data.user.token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());
    return redirect('/auth/complete-signup');
  }

  return redirect('/');
}
