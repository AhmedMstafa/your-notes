import { Outlet } from 'react-router-dom';
import { MdOutlineAddTask } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '../store/theme-slice';
import { languages } from '../store/theme-slice';
export default function Login() {
  const currentLanguage = useSelector((state) => state.theme.language);
  const dispatch = useDispatch();

  function changeLanguageHandler() {
    dispatch(toggleLanguage());
  }

  return (
    <main className="h-screen relative">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full bg-[url(/background-img.png)] bg-cover opacity-[0.5]"></div>
      <section className=" h-full w-full sm:absolute sm:top-[45%] sm:left-[50%] sm:translate-[-50%] sm:h-5/6 flex flex-col px-6 md:flex-row md:h-[480px] md:w-full md:max-w-[900px]">
        <div className="relative element-center bg-[url(/background-img.png)] bg-center h-2/6 md:h-full md:w-1/2">
          <div className="w-5/6 h-4/6 mb-3 backdrop-blur-xs backdrop-brightness-110 flex flex-col items-center justify-center ">
            <MdOutlineAddTask color="white" fontSize={64} />
            <p className="text-white text-[32px] md:text-[48px]">Your Notes</p>
          </div>
          <button
            onClick={changeLanguageHandler}
            className="absolute bottom-0 left-2 text-white text-[32px] cursor-pointer"
          >
            {currentLanguage === languages.ARABIC ? 'En' : 'Ar'}
          </button>
        </div>
        <div className="bg-white h-4/6 md:h-full md:w-1/2">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
