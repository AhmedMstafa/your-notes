import { useState } from 'react';
import { RiEyeOffLine } from 'react-icons/ri';
import { RiEyeLine } from 'react-icons/ri';

export default function Input({ label, type, name }) {
  const [isVisible, setViability] = useState(false);

  function toggleShowPassword(event) {
    event.preventDefault();
    setViability((prev) => !prev);
  }

  return (
    <div className=" flex flex-col text-[#697386] gap-1">
      <label className="pl-[7.56px]" htmlFor={label}>
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full outline-0 border pr-[50px] border-[#3C42571F] rounded-md shadow-sm h-[47px] px-[12px] py-[9px]"
          id={label}
          type={isVisible ? 'text' : type}
          name={name}
          autoComplete="off"
          maxLength={50}
          required
        />
        {type === 'password' && (
          <button
            className="absolute right-[20px] top-[40%] cursor-pointer"
            onClick={toggleShowPassword}
          >
            {isVisible ? <RiEyeLine /> : <RiEyeOffLine />}
          </button>
        )}
      </div>
    </div>
  );
}
