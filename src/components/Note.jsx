import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { TfiClose } from 'react-icons/tfi';
import { useNavigation, useSubmit } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { completeNote, deleteNote } from '../store/notes-slice';
import { useSelector } from 'react-redux';
import { languages } from '../store/theme-slice';

export default function Note({ id, content, isCompleted }) {
  const currentLanguage = useSelector((state) => state.theme.language);
  const dispatch = useDispatch();
  const submit = useSubmit();
  const navigation = useNavigation();

  let isSubmitting = navigation.state === 'submitting';
  let isEnglish = currentLanguage === languages.ENGLISH;

  function updateNote(newValue) {
    submit(newValue, { method: 'PATCH' });
  }

  function handleCompleted() {
    dispatch(completeNote({ id: id, isCompleted: !isCompleted }));
    updateNote({ note: content, ['is-completed']: !isCompleted, id });
  }

  function handleDelete() {
    dispatch(deleteNote({ id }));
    updateNote({ note: content, ['is-deleted']: true, id });
  }

  return (
    <div className="flex items-center p-[10px] min-h-[64px] bg-white dark:bg-dark-secondary-color border-b-1 border-[#E3E4F1] dark:border-[#393A4B]">
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
          isCompleted
            ? 'line-through text-[#E3E4F1] dark:text-[#4D5067]'
            : 'text-[#494C6B] dark:text-[#C8CBE7]'
        }`}
      >
        {content}
      </p>
      <button
        disabled={isSubmitting}
        onClick={handleDelete}
        className={`${
          isEnglish ? 'ml-auto' : 'mr-auto'
        } cursor-pointer mx-[15px]`}
      >
        <TfiClose size={24} color="#494C6B" />
      </button>
    </div>
  );
}
