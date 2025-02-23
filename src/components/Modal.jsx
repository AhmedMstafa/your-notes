import { useSelector } from 'react-redux';
import { languages } from '../store/theme-slice';

export default function Modal({ logoutHandler, navigateTo }) {
  const currentLanguage = useSelector((state) => state.theme.language);
  const userName = useSelector((state) => state.user.userInfo.userName);
  let isEnglish = currentLanguage === languages.ENGLISH;

  return (
    <div
      style={{ direction: isEnglish ? 'ltr' : 'rtl' }}
      className="absolute top-[62px] w-screen h-content-hight element-center bg-black/80 backdrop-invert backdrop-opacity-10 md:bg-transparent md:backdrop-blur-none md:backdrop-opacity-0"
    >
      <div className="container relative h-full w-full element-center ">
        <div
          className={` text-center w-full flex flex-col gap-3 justify-center px-[20px] absolute md:px-[10px]  md:w-[263px] md:h-[231px] md:top-[17px] ${
            isEnglish ? 'md:right-[10px]' : 'md:left-[10px]'
          } md:rounded-md md:bg-white md:shadow-md`}
        >
          <p className="text-main-color text-[25px] mb-[10px]">
            {isEnglish ? 'hi' : 'مرحباً'} {userName}
          </p>
          <button
            onClick={() => navigateTo('/modify-info')}
            className="text-white block cursor-pointer text-[20px] bg-[#7C8495] rounded-md w-full py-[10px]"
          >
            {isEnglish ? 'Modify User info' : 'تعديل بيانات الحساب '}
          </button>
          <button
            onClick={logoutHandler}
            className="text-white block cursor-pointer text-[20px] bg-main-color rounded-md w-full py-[10px]"
          >
            {isEnglish ? 'Logout' : 'تسجيل الخروج'}
          </button>
        </div>
      </div>
    </div>
  );
}
