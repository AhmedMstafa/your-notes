import Input from './Input';
import { Form, Link, useNavigation, useActionData } from 'react-router-dom';
export default function LoginForm() {
  const navigate = useNavigation();
  const data = useActionData();
  const isSubmitting = navigate.state === 'submitting';
  function submitHandler() {
    //
  }
  return (
    <div>
      <h3 className="text-main-color text-[48px] text-center my-3 mb-[10px]">
        Login
      </h3>
      <Form
        method="post"
        className="w-[400px] max-w-full mx-auto px-2 flex flex-col gap-3.5"
      >
        {data && <p className="text-red-400">{data.message}</p>}
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <button
          // disabled={isSubmitting}
          className="w-full bg-main-color text-center py-[10px] text-white text-[24px] cursor-pointer"
          onClick={submitHandler}
        >
          {isSubmitting ? 'Loading...' : 'Login'}
        </button>
      </Form>
      <div className="element-center flex-col sm:flex-row gap-3 mt-3 text-center">
        <p>Don’t have an account!</p>
        <Link to="/login/signup" className="text-main-color">
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
  console.log(eventData);

  // if (!response.ok) {
  //   throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
  //     status: 500,
  //   });
  // }

  const responseData = await response.json();
  console.log(responseData);
  if (responseData.code === 400) {
    return responseData;
  }
}
