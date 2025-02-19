import { Outlet } from 'react-router-dom';
import Auth from '../components/Auth';
export default function Home() {
  return (
    <Auth>
      <h1 className="text-3xl font-bold underline">Home Page</h1>;
      <Outlet />
    </Auth>
  );
}
