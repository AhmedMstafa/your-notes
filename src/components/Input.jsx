import { useState } from 'react';
import { RiEyeOffLine } from 'react-icons/ri';
import { RiEyeLine } from 'react-icons/ri';

export default function Input({
  label,
  type,
  name,
  placeholder = '',
  register,
  error,
  errorMessage,
}) {
  const [isVisible, setViability] = useState(false);

  function toggleShowPassword(event) {
    event.preventDefault();
    setViability((prev) => !prev);
  }

  return (
    <div className="relative flex flex-col text-[#697386] gap-1">
      {error && (
        <p className="absolute right-0 top-0 text-red-400 text-[12px]">
          {errorMessage}
        </p>
      )}
      <label className="pl-[7.56px]" htmlFor={label}>
        {label}
      </label>
      <div className="relative">
        <input
          className={`w-full outline-0 border ${
            type === 'password' ? 'pr-[50px]' : ''
          } border-[#3C42571F] rounded-md shadow-sm h-[47px] px-[12px] py-[9px] ${
            error ? 'border border-red-500' : ''
          }`}
          id={label}
          type={isVisible ? 'text' : type}
          name={name}
          autoComplete="off"
          maxLength={50}
          required
          placeholder={placeholder}
          {...register}
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
