import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { TfiClose } from 'react-icons/tfi';
import { useNavigation, useSubmit } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi2';

export default function Note({ id, content, isCompleted }) {
  const submit = useSubmit();
  const navigation = useNavigation();

  let isSubmitting = navigation.state === 'submitting';

  function updateNote(newValue) {
    submit(newValue, { method: 'PATCH' });
  }

  function handleCompleted() {
    updateNote({ note: content, ['is-completed']: !isCompleted, id });
  }

  function handleDelete() {
    updateNote({ note: content, ['is-deleted']: true, id });
  }

  return (
    <div className="flex items-center p-[10px] min-h-[64px] bg-white border-b-1 border-[#E3E4F1]">
      <button
        disabled={isSubmitting}
        onClick={handleCompleted}
        className="cursor-pointer mx-[15px]"
      >
        {isCompleted ? (
          <HiCheckCircle size={24} color="#d375b9" />
        ) : (
          <RiCheckboxBlankCircleLine size={24} color="#d375b9" />
        )}
      </button>
      <p
        className={`text-wrap break-words max-w-full overflow-hidden ${
          isCompleted ? 'line-through text-[#E3E4F1]' : 'text-[#494C6B]'
        }`}
      >
        {content}
      </p>
      <button
        disabled={isSubmitting}
        onClick={handleDelete}
        className="cursor-pointer  ml-auto mx-[15px]"
      >
        <TfiClose size={24} color="#494C6B" />
      </button>
    </div>
  );
}
