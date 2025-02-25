import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import {
  useSubmit,
  useActionData,
  redirect,
  useNavigation,
} from 'react-router-dom';
import { emailRegex, phoneNumberRegex, yearRegex } from '../util/regex';
import { getAuthToken } from '../util/auth';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../store/user-slice';
import { languages } from '../store/theme-slice';

export default function ModifyInfo() {
  const currentLanguage = useSelector((state) => state.theme.language);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submit = useSubmit();
  const data = useActionData();
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  let isSubmitting = navigation.state === 'submitting';

  let isEnglish = currentLanguage === languages.ENGLISH;
  let modifyUserInfo = isEnglish
    ? 'Modify User Information'
    : 'تعديل بيانات الحساب';
  let saveChanges = isEnglish ? 'Save Changes' : 'حفظ التعديلات';
  let emailLabel = isEnglish ? 'Email' : 'الحساب';
  let passwordLabel = isEnglish ? 'Password' : 'الرقم السري';
  let userNameLabel = isEnglish ? 'Username' : 'اسم المستخدم';
  let phoneLabel = isEnglish ? 'Phone' : 'رقم الهاتف';
  let birthDayYearLabel = isEnglish ? 'Birthday Year' : 'سنة الميلاد';
  let loading = isEnglish ? 'Save Changes...' : 'حفظ التعديلات ...';

  function submitHandler(formData) {
    if (
      formData['user-name'] &&
      formData.phone &&
      formData['birth-day-year'] &&
      formData.email &&
      formData.password
    ) {
      dispatch(
        updateUserInfo({
          userInfo: {
            userName: formData['user-name'],
            phone: formData.phone,
            birthdayYear: formData['birth-day-year'],
            email: formData.email,
          },
        })
      );

      submit(formData, { method: 'PATCH' });
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-[540px] flex flex-col gap-[20px] mx-auto mb-[50px]"
    >
      <div className="flex flex-col w-full rounded-md shadow-md ">
        <div className="flex items-center justify-center min-h-[64px] dark:bg-dark-secondary-color bg-white rounded-md">
          <h3 className="text-[20px] text-main-color font-bold">
            {modifyUserInfo}
          </h3>
        </div>
      </div>
      <div className="relative flex  w-full bg-white dark:bg-dark-secondary-color rounded-md p-[10px] shadow-md">
        <div className="w-[400px] max-w-full flex flex-col gap-4 mx-auto py-[20px]">
          {data && (
            <p className="text-red-400 text-[12px]  absolute right-2 top-3">
              {data.message}
            </p>
          )}
          <Input
            label={emailLabel}
            type="email"
            name="email"
            placeholder={userInfo.email}
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
            label={userNameLabel}
            type="text"
            name="user-name"
            placeholder={userInfo.userName}
            register={register('user-name', {
              required: 'this field is required',
            })}
            error={Boolean(errors['user-name'])}
            errorMessage={errors['user-name']?.message || ''}
          />
          <Input
            label={phoneLabel}
            type="text"
            name="phone"
            placeholder={userInfo.phone}
            register={register('phone', {
              required: 'this field is required',
              pattern: {
                value: phoneNumberRegex,
                message: 'enter a valid phone number',
              },
            })}
            error={Boolean(errors.phone)}
            errorMessage={errors.phone?.message || ''}
          />
          <Input
            label={birthDayYearLabel}
            type="text"
            name="birth-day-year"
            placeholder={userInfo.birthdayYear}
            register={register('birth-day-year', {
              required: 'this field is required',
              pattern: {
                value: yearRegex,
                message: 'enter a valid year',
              },
            })}
            error={Boolean(errors['birth-day-year'])}
            errorMessage={errors['birth-day-year']?.message || ''}
          />
        </div>
      </div>
      <button
        disabled={isSubmitting}
        className="flex flex-col w-full rounded-md shadow-md cursor-pointer"
      >
        <div className="flex items-center justify-center min-h-[64px] bg-main-color rounded-md">
          <h3
            style={{ direction: isEnglish ? 'ltr' : 'rtl' }}
            className="text-[20px] text-white font-semibold"
          >
            {isSubmitting ? loading : saveChanges}
          </h3>
        </div>
      </button>
    </form>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const method = request.method;

  const token = getAuthToken();
  const data = await request.formData();

  let eventData = {
    userName: data.get('user-name') || 'user',
    email: data.get('email') || '',
    password: data.get('password') || '',
    phone: data.get('phone') || '0',
    birthdayYear: data.get('birth-day-year').split('-')[0] || 0,
  };

  let url = 'https://your-notes.vercel.app/api/users';

  const response = await fetch(url, {
    method,
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

  return redirect('/');
}
