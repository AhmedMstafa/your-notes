import { useEffect } from 'react';
import {
  useNavigation,
  useSubmit,
  useLoaderData,
  useLocation,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuthToken } from '../util/auth';
import Note from './Note';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNote,
  replaceNotes,
  clearAllCompleted,
  getAllNotes,
  getCompletedNotes,
  getActiveNotes,
} from '../store/notes-slice';
import { languages } from '../store/theme-slice';

export default function Notes() {
  const currentLanguage = useSelector((state) => state.theme.language);
  const storedNotes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const submit = useSubmit();
  let notesCount = 0;
  let isEnglish = currentLanguage === languages.ENGLISH;
  const data = useLoaderData();
  const location = useLocation();

  let isSubmitting = navigation.state === 'submitting';
  const btnClasses = 'cursor-pointer font-semibold text-[14px]';
  useEffect(() => {
    dispatch(replaceNotes({ notes: data }));
  }, [dispatch, data, location]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function getAllNotesHandler() {
    dispatch(getAllNotes());
  }
  function getActiveNotesHandler() {
    dispatch(getActiveNotes());
  }
  function getCompletedNotesHandler() {
    dispatch(getCompletedNotes());
  }
  function clearAllCompletedNotes() {
    dispatch(clearAllCompleted());
    submit(null, { method: 'PATCH' });
  }

  function submitHandler(formData) {
    if (formData.note) {
      dispatch(addNote({ note: formData.note }));
      submit(formData, { method: 'POST' });
      reset();
    }
  }

  return (
    <div
      style={{ direction: isEnglish ? 'ltr' : 'rtl' }}
      className="max-w-[540px] flex flex-col gap-[20px] mx-auto mb-[50px]"
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative flex w-full h-[64px] bg-white dark:bg-dark-secondary-color rounded-md p-[10px] shadow-md"
      >
        <button disabled={isSubmitting} className="cursor-pointer mx-[15px]">
          {isSubmitting ? (
            <RiCheckboxBlankCircleFill size={24} color="#d375b9" />
          ) : (
            <RiCheckboxBlankCircleLine size={24} color="#d375b9" />
          )}
        </button>
        <input
          type="text"
          name="note"
          placeholder={
            isEnglish ? 'Create new todo...' : 'إنشاء ملاحظة جديدة....'
          }
          required
          className="outline-0 text-secondary-color dark:text-white text-[18px] w-full"
          {...register('note', { required: true })}
        />
        {Boolean(errors.note) && (
          <p className="absolute right-1 bottom-0 text-red-400 text-[12px]">
            this field is required
          </p>
        )}
      </form>
      <div className="flex flex-col w-full rounded-md shadow-md overflow-hidden">
        {storedNotes.selectedNotes.map((note, index) => {
          notesCount++;
          return (
            <Note
              key={index}
              id={note._id}
              content={note.content}
              isCompleted={note.isCompleted}
            />
          );
        })}
        <div className="flex items-center justify-around  min-h-[64px] bg-white dark:bg-dark-secondary-color">
          <p className="text-secondary-color text-[14px]">
            {isEnglish
              ? `${notesCount} items left`
              : `${notesCount} ملاحظات متبقيه`}
          </p>
          <div className="flex gap-3 ">
            <button
              onClick={getAllNotesHandler}
              className={`${btnClasses} ${
                storedNotes.selected === 'ALL'
                  ? ' text-main-color'
                  : 'text-secondary-color'
              }`}
            >
              {isEnglish ? 'All' : 'الكل'}
            </button>
            <button
              onClick={getActiveNotesHandler}
              className={`${btnClasses} ${
                storedNotes.selected === 'ACTIVE'
                  ? ' text-main-color'
                  : 'text-secondary-color'
              }`}
            >
              {isEnglish ? 'Active' : 'متبقي'}
            </button>
            <button
              onClick={getCompletedNotesHandler}
              className={`${btnClasses} ${
                storedNotes.selected === 'COMPLETED'
                  ? ' text-main-color'
                  : 'text-secondary-color'
              }`}
            >
              {isEnglish ? 'Completed' : 'منتهي'}
            </button>
          </div>
          <button
            disabled={isSubmitting}
            onClick={clearAllCompletedNotes}
            className="cursor-pointer text-secondary-color hover-color text-[14px]"
          >
            {isEnglish ? 'Clear Completed' : 'مسح ما تم إنهاؤه'}
          </button>
        </div>
      </div>
    </div>
  );
}

const token = getAuthToken();

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const notesResponse = await fetch('https://your-notes.vercel.app/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    },
  });

  const notesData = await notesResponse.json();

  return notesData.data.notes;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();
  const noteData = {
    content: data.get('note'),
    isDeleted: data.get('is-deleted') || false,
    isCompleted: data.get('is-completed') || false,
  };

  let url = 'https://your-notes.vercel.app/api/notes/';

  if (method === 'PATCH') {
    url += data.get('id') || '';
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(noteData),
  });

  const responseData = await response.json();

  if (
    responseData.code === 401 ||
    responseData.code === 400 ||
    responseData.code === 422
  ) {
    return responseData;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could not authenticate user.' }),
      {
        status: 500,
      }
    );
  }

  return responseData.data;
}
