import { Router } from 'express';
import SurveysController from './controllers/SurveysController';
import UsersController from './controllers/UsersController';
import SendMailController from './controllers/SendMailController';

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

router.get('/users', usersController.show);
router.post('/users', usersController.create);

router.get('/surveys', surveysController.show);
router.post('/surveys', surveysController.create);

router.post('/sendMail', sendMailController.execute);


export default router;