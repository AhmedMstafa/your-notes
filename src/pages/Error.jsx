import { useRouteError, useSubmit } from 'react-router-dom';

export default function ErrorPage() {
  const submit = useSubmit();
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 401) {
    message = JSON.parse(error.data).message;
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }
  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page';
  }

  function loginHandler() {
    submit(null, { action: '/logout', method: 'post' });
  }

  return (
    <div className="text-center h-screen flex flex-col items-center justify-center gap-7">
      <div>
        <h1>{title}</h1>
        {message}
      </div>
      {error.status === 401 && (
        <button
          onClick={loginHandler}
          className="w-full bg-main-color text-center py-[10px] text-white text-[24px] cursor-pointer"
        >
          Login
        </button>
      )}
    </div>
  );
}
