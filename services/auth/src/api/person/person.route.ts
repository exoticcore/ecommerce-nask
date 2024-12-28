import express from 'express';
import PersonController from './person.controller';
const router = express.Router();

const personController = new PersonController();

export default router;
