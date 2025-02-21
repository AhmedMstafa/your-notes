import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ModifyInfo from './components/ModifyInfo';
import Notes from './components/Notes';
import LoginForm, { action as loginAction } from './components/LoginForm';
import { action as logoutAction } from './pages/Logout';
import SignupForm, {
  action as signupFormAction,
} from './components/SignupForm';
import CompleteSignupForm from './components/CompleteSignup';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import { checkAuthLoader, tokenLoader } from './util/auth';
import { action as modifyInfoAction } from './components/ModifyInfo';
import {
  loader as notesLoader,
  action as addNoteAction,
} from './components/Notes';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <Notes />,
            loader: notesLoader,
            action: addNoteAction,
          },
          {
            path: 'modify-info',
            element: <ModifyInfo />,
            loader: checkAuthLoader,
            action: modifyInfoAction,
          },
        ],
      },
      {
        path: 'auth',
        element: <Login />,
        children: [
          { path: 'login', element: <LoginForm />, action: loginAction },
          { path: 'signup', element: <SignupForm />, action: signupFormAction },
          {
            path: 'complete-signup',
            element: <CompleteSignupForm />,
            action: signupFormAction,
          },
        ],
      },
      { path: '/logout', action: logoutAction },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
