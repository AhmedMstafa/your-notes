import { useNavigate, useSubmit, NavLink } from 'react-router-dom';
import { MdOutlineNightlightRound } from 'react-icons/md';
import { useState } from 'react';
import Modal from './Modal';
// import { MdLightMode } from 'react-icons/md';
import { MdOutlineAddTask } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { toggleLanguage } from '../store/theme-slice';
import { languages } from '../store/theme-slice';
import { useSelector, useDispatch } from 'react-redux';
export default function Header() {
  const currentLanguage = useSelector((state) => state.theme.language);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const submit = useSubmit();
  let isEnglish = currentLanguage === languages.ENGLISH;

  function onClickHandler() {
    setModalVisible(false);
  }

  function changeLangHandler() {
    dispatch(toggleLanguage());
  }

  function changeModeHandler() {
    //
  }

  function modifyInfoHandler() {
    setModalVisible((prev) => !prev);
  }

  function navigateTo(path) {
    onClickHandler();
    navigate(path);
  }

  function logoutHandler() {
    submit(null, { action: '/logout', method: 'post' });
  }

  return (
    <header className="h-[62px] shadow-md relative z-[1000]">
      <nav className="h-full container ">
        <ul
          className={`${
            isEnglish ? '' : 'flex-row-reverse'
          } h-full flex items-center gap-3 md:gap-5 text-main-color`}
        >
          <li className={`${isEnglish ? 'mr-auto' : 'ml-auto'}`}>
            <NavLink
              to="/"
              onClick={onClickHandler}
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
              {currentLanguage === languages.ARABIC ? 'En' : 'Ar'}
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
