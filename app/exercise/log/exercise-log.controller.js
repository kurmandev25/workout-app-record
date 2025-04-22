import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @descr Create new exerciseLog
// @route Post/api/exercise/log/:exerciseId
// @access Private
export const createNewExerciseLog = asyncHandler(async (req, res) => {
	const exerciseId = +req.params.id

	const exercise = await prisma.exercise.findUnique({
		where: {
			id: exerciseId,
		},
	})
	if (!exercise) {
		res.status(404)
		throw new Error('Exercise not found')
	}

	let timesDefault = []

	for (let i = 0; i < exercise.times; i++) {
		timesDefault.push({
			repeat: 0,
			weight: 0,
		})
	}
	const exerciseLog = await prisma.exerciseLog.create({
		data: {
			User: {
				connect: {
					id: req.user.id,
				},
			},
			Exercise: {
				connect: {
					id: exerciseId,
				},
			},
			times: {
				createMany: {
					data: timesDefault,
				},
			},
		},
		include: {
			times: true,
		},
	})
	res.json(exerciseLog)
})
