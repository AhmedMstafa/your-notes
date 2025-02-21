import { useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { getAuthToken } from '../util/auth';
import { useForm } from 'react-hook-form';
import Note from './Note';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [currentNotes, setCurrentNotes] = useState('ALL');
  const navigation = useNavigation();
  const submit = useSubmit();
  const data = useLoaderData();
  let notesCount = 0;

  let isSubmitting = navigation.state === 'submitting';
  const btnClasses = 'cursor-pointer font-semibold text-[14px]';

  useEffect(() => {
    if (data) {
      setNotes(data.notes);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function getAllNotes() {
    setCurrentNotes('ALL');
    setNotes(data.notes);
  }
  function getActiveNotes() {
    const activeNotes = data.notes.filter((note) => note.isCompleted === false);
    setCurrentNotes('ACTIVE');
    setNotes(activeNotes);
  }
  function getCompletedNotes() {
    const activeNotes = data.notes.filter((note) => note.isCompleted === true);
    setCurrentNotes('COMPLETED');
    setNotes(activeNotes);
  }
  function clearAllCompletedNotes() {
    submit(null, { method: 'PATCH' });
  }

  function submitHandler(formData) {
    if (formData.note) {
      submit(formData, { method: 'POST' });
      reset();
    }
  }

  return (
    <div className="max-w-[540px] flex flex-col gap-[20px] mx-auto mb-[50px]">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="relative flex w-full h-[64px] bg-white rounded-md p-[10px] shadow-md"
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
          placeholder="Create new todo..."
          required
          className="outline-0 text-secondary-color text-[18px] w-full"
          {...register('note', { required: true })}
        />
        {Boolean(errors.note) && (
          <p className="absolute right-1 bottom-0 text-red-400 text-[12px]">
            this field is required
          </p>
        )}
      </form>
      <div className="flex flex-col w-full rounded-md shadow-md overflow-hidden">
        {notes.map((note, index) => {
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
        <div className="flex items-center justify-around  min-h-[64px] bg-white">
          <p className="text-secondary-color text-[14px]">
            {notesCount ? `${notesCount} items left` : 'no items yet'}
          </p>
          <div className="flex gap-3 ">
            <button
              onClick={getAllNotes}
              className={`${btnClasses} ${
                currentNotes === 'ALL'
                  ? ' text-main-color'
                  : 'text-secondary-color'
              }`}
            >
              All
            </button>
            <button
              onClick={getActiveNotes}
              className={`${btnClasses} ${
                currentNotes === 'ACTIVE'
                  ? ' text-main-color'
                  : 'text-secondary-color'
              }`}
            >
              Active
            </button>
            <button
              onClick={getCompletedNotes}
              className={`${btnClasses} ${
                currentNotes === 'COMPLETED'
                  ? ' text-main-color'
                  : 'text-secondary-color'
              }`}
            >
              Completed
            </button>
          </div>
          <button
            disabled={isSubmitting}
            onClick={clearAllCompletedNotes}
            className="cursor-pointer text-secondary-color hover-color text-[14px]"
          >
            {isSubmitting ? 'Loading...' : 'Clear Completed'}
          </button>
        </div>
      </div>
    </div>
  );
}

const token = getAuthToken();
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const response = await fetch('http://localhost:3000/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const method = request.method;
  const data = await request.formData();
  const noteData = {
    content: data.get('note'),
    isDeleted: data.get('is-deleted') || false,
    isCompleted: data.get('is-completed') || false,
  };

  let url = 'http://localhost:3000/api/notes/';

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
