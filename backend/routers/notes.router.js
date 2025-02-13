import { Router } from 'express';
import * as notesController from '../controllers/notes.controller.js';
import validationSchema from '../middlewares/validationSchema.js';
const router = Router();

router
  .route('/')
  .get(notesController.getAllNotes)
  .post(validationSchema(), notesController.addNote);

router
  .route('/:id')
  .get(notesController.getNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

export default router;
