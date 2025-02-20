import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
export default function Home() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
