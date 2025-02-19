import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ModifyInfo from './components/ModifyInfo';
import Notes from './components/Notes';
import LoginForm, { action as loginAction } from './components/LoginForm';
import SignupForm, {
  action as signupFormAction,
} from './components/SignupForm';
import CompleteSignupForm from './components/CompleteSignup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'modify-info', element: <ModifyInfo /> },
      { path: 'notes', element: <Notes /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    children: [
      { index: true, element: <LoginForm />, action: loginAction },
      { path: 'signup', element: <SignupForm />, action: signupFormAction },
      {
        path: 'complete-signup',
        element: <CompleteSignupForm />,
        action: signupFormAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
