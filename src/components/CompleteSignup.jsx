import Input from './Input';
import {
  useSubmit,
  Link,
  useNavigate,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import { useForm } from 'react-hook-form';
import { phoneNumberRegex } from '../util/regex';

export default function CompleteSignupForm() {
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
  return (
    <div>
      <h3 className="text-main-color text-[30px] sm:text-[40px] mt-2 text-center ">
        Complete Signup
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
          label="Username"
          type="text"
          name="user-name"
          register={register('user-name', { required: true, min: 3 })}
          error={Boolean(errors['user-name'])}
          errorMessage={'must be at least 3 characters'}
        />
        <Input
          label="Phone"
          type="text"
          name="phone"
          register={register('phone', {
            required: true,
            pattern: phoneNumberRegex,
          })}
          error={Boolean(errors.phone)}
          errorMessage={'enter valid phone number'}
        />
        <Input
          label="Birthday Year"
          type="month"
          name="birth-day-year"
          register={register('birth-day-year', {
            required: true,
          })}
          error={Boolean(errors['birth-day-year'])}
          errorMessage={'day year is required'}
        />
        <button
          disabled={isSubmitting}
          className="element-center gap-1 w-full bg-main-color text-center py-[5px] text-white text-[24px] cursor-pointer"
          onClick={submitHandler}
        >
          {isSubmitting ? 'Loading...' : 'Complete signup'}
          <LuArrowRight />
        </button>
        <button
          className="w-full bg-[#7C8495] text-center py-[5px] text-white text-[24px] cursor-pointer"
          onClick={Back}
        >
          Back
        </button>
      </form>
      <div className="element-center  md:flex-row gap-3.5 mt-2 text-center">
        <p>Already have an account!</p>
        <Link to="/auth/login" className="text-main-color">
          Login
        </Link>
      </div>
    </div>
  );
}
