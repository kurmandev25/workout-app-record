import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getWorkoutLog } from './log/get-workout-log.controller.js'
import { createWorkoutLog } from './log/workout-log.controller.js'
import {
	createNewWorkout,
	deleteWorkout,
	getAllWorkouts,
	getWorkout,
	updateWorkout,
} from './workout.controller.js'
import { completeWorkoutLog } from './log/update-workout-log.controller.js'

const router = express.Router()

router.route('/').post(protect, createNewWorkout).get(protect, getAllWorkouts)

router
	.route('/:id')
	.get(protect, getWorkout)
	.delete(protect, deleteWorkout)
	.put(protect, updateWorkout)

router
	.route('/log/:id')
	.post(protect, createWorkoutLog)
	.get(protect, getWorkoutLog)

router.route('/log/complete/:id').patch(protect,completeWorkoutLog)
export default router
