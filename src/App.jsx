import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ModifyInfo from './components/ModifyInfo';
import Notes from './components/Notes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'modify-info', element: <ModifyInfo /> },
      { path: 'notes', element: <Notes /> },
    ],
  },
  { path: '/login', element: <Login /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
