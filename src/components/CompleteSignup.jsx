import Input from './Input';
import {
  useSubmit,
  Link,
  useNavigate,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import { LuArrowLeft } from 'react-icons/lu';
import { useForm } from 'react-hook-form';
import { phoneNumberRegex, yearRegex } from '../util/regex';
import { useSelector } from 'react-redux';
import { languages } from '../store/theme-slice';

export default function CompleteSignupForm() {
  const currentLanguage = useSelector((state) => state.theme.language);
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  function submitHandler(formData) {
    if (formData['user-name'] && formData.phone && formData['birth-day-year']) {
      submit(formData, { method: 'PATCH' });
    }
  }

  function Back() {
    navigate('/auth/signup');
    //
  }

  let isEnglish = currentLanguage === languages.ENGLISH;
  let userNameLabel = isEnglish ? 'Username' : 'اسم المستخدم';
  let phoneLabel = isEnglish ? 'Phone' : 'رقم الهاتف';
  let birthDayYearLabel = isEnglish ? 'Birthday Year' : 'سنة الميلاد';
  let completeSignup = isEnglish ? 'Complete signup' : 'إكمال إنشاء الحساب';
  let goBack = isEnglish ? 'Back' : 'للخلف';
  let haveAccount = isEnglish ? 'Don’t have an account!' : 'لا تمتلك حساب ';
  let login = isEnglish ? 'Login' : 'تسجيل الدخول';
  let loading = isEnglish ? 'Login...' : 'تسجيل الدخول ...';

  return (
    <div>
      <h3 className="text-main-color text-[30px] sm:text-[40px] mt-2 text-center ">
        {completeSignup}
      </h3>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative w-[400px] max-w-full mx-auto px-2 flex flex-col gap-2"
      >
        {data && (
          <p className="text-red-400 text-[12px] absolute right-2 top-3">
            {data.message}
          </p>
        )}
        <Input
          label={userNameLabel}
          type="text"
          name="user-name"
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
        <button
          style={{ direction: isEnglish ? 'ltr' : 'rtl' }}
          disabled={isSubmitting}
          className="element-center gap-1 w-full bg-main-color text-center py-[5px] text-white text-[24px] cursor-pointer"
          onClick={submitHandler}
        >
          {isSubmitting ? loading : completeSignup}
          <LuArrowRight />
        </button>
        <button
          className="element-center gap-1 w-full bg-[#7C8495] flex-row-reverse text-center py-[5px] text-white text-[24px] cursor-pointer"
          onClick={Back}
        >
          {goBack}
          {!isEnglish ? <LuArrowRight /> : <LuArrowLeft />}
        </button>
      </form>
      <div className="element-center  md:flex-row gap-3.5 mt-2 text-center dark:text-white">
        <p>{haveAccount}</p>
        <Link to="/auth/login" className="text-main-color">
          {login}
        </Link>
      </div>
    </div>
  );
}
