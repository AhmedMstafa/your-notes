import noteModel from '../models/note.model.js';
import appError from '../utils/appError.js';
import * as httpStatusText from '../utils/httpStatusText.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { validationResult } from 'express-validator';

const getAllNotes = asyncWrapper(async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const notes = await noteModel
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip);

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

  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return res.send(error);
  }
  const newNote = new noteModel(req.body);

  await newNote.save();

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { note: newNote } });
});

const updateNote = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const updatedNote = await noteModel.updateOne(
    { _id: id },
    {
      $set: { ...newData },
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

export { getAllNotes, getNote, addNote, updateNote, deleteNote };
