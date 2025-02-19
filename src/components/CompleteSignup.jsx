import Input from './Input';
import {
  Form,
  Link,
  useNavigate,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';

export default function CompleteSignupForm() {
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';

  const navigate = useNavigate();
  function submitHandler() {
    //
  }

  function Back() {
    navigate('/login/signup');
    //
  }
  return (
    <div>
      <h3 className="text-main-color text-[30px] sm:text-[40px] mt-2 text-center ">
        Complete Signup
      </h3>
      <Form
        method="patch"
        className="w-[400px] max-w-full mx-auto px-2 flex flex-col gap-2"
      >
        {data && <p className="text-red-400">{data.message}</p>}
        <Input label="Username" type="text" name="userName" />
        <Input label="Phone" type="text" name="phone" />
        <Input label="Birthday Year" type="text" name="birthdayYear" />
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
      </Form>
      <div className="element-center  md:flex-row gap-3.5 mt-2 text-center">
        <p>Already have an account!</p>
        <Link to="/login" className="text-main-color">
          Login
        </Link>
      </div>
    </div>
  );
}
