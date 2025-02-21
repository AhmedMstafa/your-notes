import noteModel from '../models/note.model.js';
import appError from '../utils/appError.js';
import * as httpStatusText from '../utils/httpStatusText.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { validationResult } from 'express-validator';

const getAllNotes = asyncWrapper(async (req, res) => {
  const currentUser = req.currentUser;
  const notes = await noteModel.find(
    { userId: currentUser.id, isDeleted: false },
    { __v: false }
  );

  res.json({ status: httpStatusText.SUCCESS, data: { notes } });
});

const getNote = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  try {
    const currentNote = await noteModel.findById(id);
    if (!currentNote) {
      const error = appError.create('note not found', 404, httpStatusText.FAIL);
      return next(error);
    }
    res.status(200).send(currentNote);
  } catch {
    return res.status(404).json({ msg: 'invalid id' });
  }
});

const addNote = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  const currentUser = req.currentUser;
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return res.send(error);
  }
  const newNote = new noteModel({ ...req.body, userId: currentUser.id });

  await newNote.save();

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { note: newNote } });
});

const updateNote = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const currentUser = req.currentUser;
  const newData = req.body;
  const updatedNote = await noteModel.updateOne(
    { _id: id },
    {
      $set: { ...newData, userId: currentUser.id },
    }
  );

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { course: updatedNote },
  });
});

const deleteNote = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  await noteModel.deleteOne({ _id: id });

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

const deleteAllCompleted = asyncWrapper(async (req, res) => {
  const userId = req.currentUser.id;
  try {
    const result = await noteModel.updateMany(
      { isCompleted: true, userId },
      { isDeleted: true }
    );
    res.status(200).json(result);
  } catch {
    return res.status(404).json({ msg: 'invalid id' });
  }
});

export {
  getAllNotes,
  getNote,
  addNote,
  deleteNote,
  updateNote,
  deleteAllCompleted,
};
