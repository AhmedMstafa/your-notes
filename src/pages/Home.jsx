import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
export default function Home() {
  return (
    <>
      <Header />
      <main className="relative ">
        <div className="relative w-full h-[250px] left-0 top-0 bg-[url(/background-img.png)] bg-no-repeat shadow-lg">
          <div className="absolute w-full h-full z-0 bg-white/50 backdrop-invert-0"></div>
        </div>
        <section className="absolute  top-[50px] md:top-[80px] w-full">
          <div className="container">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
}
