import { Router } from 'express';
import * as notesController from '../controllers/notes.controller.js';
import validationSchema from '../middlewares/validationSchema.js';
import verfiyToken from '../utils/verfiyToken.js';
const router = Router();

router
  .route('/')
  .get(verfiyToken, notesController.getAllNotes)
  .post(verfiyToken, validationSchema(), notesController.addNote);

router
  .route('/:id')
  .get(verfiyToken, notesController.getNote)
  .patch(verfiyToken, notesController.updateNote)
  .delete(verfiyToken, notesController.deleteNote);

export default router;
