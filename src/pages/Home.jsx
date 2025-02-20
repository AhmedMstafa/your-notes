import { Outlet } from 'react-router-dom';
export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Home Page</h1>;
      <Outlet />
    </>
  );
}
