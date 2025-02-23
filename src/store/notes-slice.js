import { createSlice } from '@reduxjs/toolkit';

const selectedNotes = { ALL: 'ALL', ACTIVE: 'ACTIVE', COMPLETED: 'COMPLETED' };

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    selected: selectedNotes.ALL,
  },
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        content: action.payload.note,
        isDeleted: false,
        isCompleted: false,
      };
      state.notes.push(newNote);
    },
    replaceNotes: (state, action) => {
      state.notes = action.payload.notes;
    },
    completeNote: (state, action) => {
      const noteIndex = state.notes.findIndex(
        (note) => note._id === action.payload.id
      );
      state.notes[noteIndex].isCompleted = action.payload.isCompleted;
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(
        (note) => note._id !== action.payload.id
      );
    },
    clearAllCompleted: (state) => {
      state.notes = state.notes.filter((note) => note.isCompleted !== true);
    },
    getAllNotes: (state, action) => {
      state.notes = action.payload.notes;
      state.selected = selectedNotes.ALL;
    },
    getActiveNotes: (state, action) => {
      state.notes = action.payload.notes.filter(
        (note) => note.isCompleted === false
      );
      state.selected = selectedNotes.ACTIVE;
    },
    getCompletedNotes: (state, action) => {
      state.notes = action.payload.notes.filter(
        (note) => note.isCompleted === true
      );
      state.selected = selectedNotes.COMPLETED;
    },
  },
});

export const {
  addNote,
  replaceNotes,
  completeNote,
  deleteNote,
  clearAllCompleted,
  getAllNotes,
  getCompletedNotes,
  getActiveNotes,
} = notesSlice.actions;

export default notesSlice;
