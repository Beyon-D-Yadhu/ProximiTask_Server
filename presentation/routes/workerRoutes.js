import { Router } from 'express';
import multer from 'multer'

import { signup, getAllWorkers, accessControll, deleteWorker, login, changeStatus, getWorker, createBooking, getBookingsByUser, getListOfBooking } from '../../interface/controllers/Workers/workerControll.js';
import authMiddleware from '../../middlewares/accessToken.js';

const router = Router();
const storage = multer.memoryStorage()
const upload = multer({storage})

router.post('/signup',upload.fields([{name:'originalImg'},{name:'croppedImg'}]),signup)

router.route('/')
.get(getAllWorkers)
.patch(authMiddleware('admin'), accessControll)
router.route('/:id')
.delete(authMiddleware('admin'), deleteWorker)
.patch(changeStatus)
router.route('/signin')
      .post(login)
router.route('/worker/:id')
      .get(getWorker)
router.route('/booking')
      .post(createBooking)
router.route('/booking/:id')
      .get(getBookingsByUser)
router.route('/booking/list/:id')
      .get(getListOfBooking)
// router.route('/workerDetailsfromBooking/id')
//       .get()
export default router;