import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @descr Update exercise Log time
// @route Put /api/exercise/log/time/:id
// @access Private

export const updateExerciseLogTime = asyncHandler(async (req, res) => {
	const { weight, repeat, isCompleted } = req.body

	try {
		const logTime = await prisma.exerciseTime.update({
			where: {
				id: +req.params.id,
			},
			data: {
				weight,
				repeat,
				isCompleted,
			},
		})
		res.json(logTime)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise Log time not found')
	}
})

// @descr Update status of complete exercise log
// @route Patch /api/exercise/log/complete/:id
// @access Private

export const completeExerciseLog = asyncHandler(async (req, res) => {
	const { isCompleted } = req.body

	try {
		const exerciseLog = await prisma.exerciseLog.update({
			where: {
				id: +req.params.id,
			},
			data: {
				isCompleted,
			},
			include: { Exercise: true },
		})
		console.log(isCompleted)
		res.json(exerciseLog)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise Log not found')
	}
})
