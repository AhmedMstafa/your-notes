import { useSelector } from 'react-redux';

export default function Modal({ logoutHandler, navigateTo }) {
  const userName = useSelector((state) => state.user.userInfo.userName);

  return (
    <div className="absolute top-[62px] w-screen h-content-hight element-center bg-black/80 backdrop-invert backdrop-opacity-10 md:bg-transparent md:backdrop-blur-none md:backdrop-opacity-0">
      <div className="container relative h-full w-full element-center ">
        <div className=" text-center w-full flex flex-col gap-3 justify-center px-[20px] absolute md:px-[10px]  md:w-[263px] md:h-[231px] md:top-[17px] md:right-[10px] md:rounded-md md:bg-white md:shadow-md">
          <p className="text-main-color text-[30px] mb-[10px]">hi {userName}</p>
          <button
            onClick={() => navigateTo('/modify-info')}
            className="text-white block cursor-pointer text-[20px] bg-[#7C8495] rounded-md w-full py-[10px]"
          >
            Modify User info
          </button>
          <button
            onClick={logoutHandler}
            className="text-white block cursor-pointer text-[20px] bg-main-color rounded-md w-full py-[10px]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
