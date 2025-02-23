import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { getTokenDuration } from '../util/auth';
import { useSelector } from 'react-redux';
import { modes } from '../store/theme-slice';
export default function RootLayout() {
  const currentMode = useSelector((state) => state.theme.mode);
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <main
      className={`${
        currentMode === modes.DARK ? 'dark ' : ''
      } dark:bg-dark-main-color h-screen`}
    >
      <Outlet />
    </main>
  );
}
