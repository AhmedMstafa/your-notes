import { createSlice } from '@reduxjs/toolkit';

const selectedNotes = { ALL: 'ALL', ACTIVE: 'ACTIVE', COMPLETED: 'COMPLETED' };

function filterSelectedNotes(selected, notes) {
  if (selected === selectedNotes.COMPLETED) {
    return notes.filter((note) => note.isCompleted === true);
  }
  if (selected === selectedNotes.ACTIVE) {
    return notes.filter((note) => note.isCompleted === false);
  }

  return notes;
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    selected: selectedNotes.ALL,
    selectedNotes: [],
  },
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        content: action.payload.note,
        isDeleted: false,
        isCompleted: false,
      };
      state.notes.push(newNote);
      state.selectedNotes = filterSelectedNotes(state.selected, state.notes);
    },
    replaceNotes: (state, action) => {
      state.notes = action.payload.notes;
      state.selectedNotes = filterSelectedNotes(
        state.selected,
        action.payload.notes
      );
    },
    completeNote: (state, action) => {
      const noteIndex = state.notes.findIndex(
        (note) => note._id === action.payload.id
      );
      state.notes[noteIndex].isCompleted = action.payload.isCompleted;
      state.selectedNotes = filterSelectedNotes(state.selected, state.notes);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(
        (note) => note._id !== action.payload.id
      );
      state.selectedNotes = filterSelectedNotes(state.selected, state.notes);
    },
    clearAllCompleted: (state) => {
      state.notes = state.notes.filter((note) => note.isCompleted !== true);
      state.selectedNotes = filterSelectedNotes(state.selected, state.notes);
    },
    getAllNotes: (state) => {
      state.selectedNotes = state.notes;
      state.selected = selectedNotes.ALL;
    },
    getActiveNotes: (state) => {
      state.selectedNotes = state.selectedNotes = filterSelectedNotes(
        selectedNotes.ACTIVE,
        state.notes
      );
      state.selected = selectedNotes.ACTIVE;
    },
    getCompletedNotes: (state) => {
      state.selectedNotes = state.selectedNotes = filterSelectedNotes(
        selectedNotes.COMPLETED,
        state.notes
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
