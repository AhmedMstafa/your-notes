import { useState } from 'react';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { TfiClose } from 'react-icons/tfi';
import { useSubmit } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi2';

export default function Note({ id, content, isCompleted }) {
  const [completed, markIsCompleted] = useState(isCompleted);
  const [deleted, markIsDeleted] = useState(false);

  const submit = useSubmit();
  function updateNote(newValue) {
    submit(newValue, { method: 'PATCH' });
  }

  function handleCompleted() {
    markIsCompleted((prev) => !prev);
    updateNote({ note: content, ['is-completed']: completed, id });
  }

  function handleDelete() {
    markIsDeleted((prev) => !prev);
    updateNote({ note: content, ['is-active']: deleted, id });
  }

  return (
    <div className="flex items-center p-[10px] min-h-[64px] bg-white border-b-1 border-[#E3E4F1]">
      <button onClick={handleCompleted} className="cursor-pointer mx-[15px]">
        {completed ? (
          <HiCheckCircle size={24} color="#d375b9" />
        ) : (
          <RiCheckboxBlankCircleLine size={24} color="#d375b9" />
        )}
      </button>
      <p
        className={`text-wrap break-words max-w-full overflow-hidden ${
          completed ? 'line-through text-[#E3E4F1]' : 'text-[#494C6B]'
        }`}
      >
        {content || 'Node Course'}
      </p>
      <button
        onClick={handleDelete}
        className="cursor-pointer  ml-auto mx-[15px]"
      >
        <TfiClose size={24} color="#494C6B" />
      </button>
    </div>
  );
}
