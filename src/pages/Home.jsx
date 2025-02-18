import Login from './Login';
import { Outlet } from 'react-router-dom';
export default function Home() {
  return (
    <Login>
      <h1 className="text-3xl font-bold underline">Home Page</h1>;
      <Outlet />
    </Login>
  );
}
