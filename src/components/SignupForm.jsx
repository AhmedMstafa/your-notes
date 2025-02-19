import Input from './Input';
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useActionData,
} from 'react-router-dom';

export default function SignupForm() {
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === 'submitting';

  function submitHandler() {
    //
  }
  return (
    <div>
      <h3 className="text-main-color text-[30px] sm:text-[40px] mt-2 text-center ">
        Signup
      </h3>
      <Form
        method="post"
        className=" w-[400px] max-w-full mx-auto px-2 flex flex-col gap-3"
      >
        {data && (
          <p className="text-red-400  text-[12px] right-0">{data.message}</p>
        )}
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <Input
          label="Confirm password"
          type="password"
          name="confirm-password"
        />
        <button
          disabled={isSubmitting}
          className="w-full bg-main-color text-center py-[5px] text-white text-[24px] cursor-pointer"
          onClick={submitHandler}
        >
          {isSubmitting ? 'Loading...' : 'isSubmitting'}
        </button>
      </Form>
      <div className="element-center flex-col gap-0.5 mt-2 text-center">
        <p>Already have an account!</p>
        <Link to="/login" className="text-main-color">
          Login
        </Link>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    userName: data.get('userName') || 'user',
    password: data.get('password') || '', // will be handle
    email: data.get('email') || '', // will be handle
    phone: data.get('phone') || '0',
    birthdayYear: +data.get('birthdayYear') || 0,
  };

  let url = 'http://localhost:3000/api/users';

  if (method === 'POST') url += '/register';

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  // if (!response.ok) {
  //   throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
  //     status: 500,
  //   });
  // }

  const responseData = await response.json();

  if (
    responseData.code === 400 ||
    responseData.code === 500 ||
    responseData.code === 401
  ) {
    return responseData;
  }

  if (method === 'POST') {
    return redirect('/login/complete-signup');
  }

  return redirect('/');
}
