// @descr Get user profile
// @route GET /api/users/profile
// @access Private

import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		select: UserFields,
	})

	const countExerciseTimesCompleted = await prisma.exerciseLog.count({
		where: {
			userId: req.user.id,
			isCompleted: true,
		},
	})

	const weightAggregate = await prisma.exerciseTime.aggregate({
		where: {
			ExerciseLog: {
				userId: req.user.id,
			},
			isCompleted: true,
		},
		_sum: {
			weight: true,
		},
	})

	const workouts = await prisma.workoutLog.count({
		where: {
			userId: req.user.id,
			isCompleted: true,
		},
	})

	res.json([
		{
			label: 'Minutes',
			value: Math.ceil(countExerciseTimesCompleted * 2.3) || 0,
		},
		{
			label: 'Workouts',
			value: workouts || 0,
		},
		{
			label: 'Kgs',
			value: weightAggregate._sum.weight || 0,
		},
	])
})