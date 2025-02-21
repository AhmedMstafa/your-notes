import { useNavigate, useSubmit, NavLink } from 'react-router-dom';
import { MdOutlineNightlightRound } from 'react-icons/md';
import { useState } from 'react';
import Modal from './Modal';
// import { MdLightMode } from 'react-icons/md';
import { MdOutlineAddTask } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

export default function Header() {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const submit = useSubmit();

  function changeLangHandler() {
    //
  }

  function changeModeHandler() {
    //
  }

  function modifyInfoHandler() {
    setModalVisible((prev) => !prev);
  }

  function navigateTo(path) {
    setModalVisible((prev) => !prev);
    navigate(path);
  }

  function logoutHandler() {
    submit(null, { action: '/logout', method: 'post' });
  }

  return (
    <header className="h-[62px] shadow-md relative z-[1000]">
      <nav className="h-full container ">
        <ul className="h-full flex items-center gap-3 md:gap-5 text-main-color">
          <li className="mr-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-1 text-pink-500'
                  : 'flex items-center gap-1 hover-color'
              }
            >
              <MdOutlineAddTask size={27} />
              <p className="text-[24px] ">Your Notes</p>
            </NavLink>
          </li>
          <li>
            <button
              onClick={changeLangHandler}
              className="text-[32px] cursor-pointer hover-color"
            >
              Ar
            </button>
          </li>
          <li>
            <button
              onClick={changeModeHandler}
              className="rotate-[-24deg] cursor-pointer hover-color"
            >
              <MdOutlineNightlightRound size={26} />
            </button>
          </li>
          <li>
            <button
              onClick={modifyInfoHandler}
              className="cursor-pointer hover-color"
            >
              <FaUser size={26} />
            </button>
          </li>
        </ul>
      </nav>
      {isModalVisible && <Modal {...{ navigateTo, logoutHandler }} />}
    </header>
  );
}
