import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @descr Get workoutLog
// @route Get/api/workout/log/:workoutLogId
// @access Private

export const getWorkoutLog = asyncHandler(async (req, res) => {
	const workoutLog = await prisma.workoutLog.findUnique({
		where: { id: +req.params.id },
		include: {
			Workout: true,
			exerciseLog: {
				orderBy: {
					id: 'asc'
				},
				include: {
					Exercise: true 
				}
			} 
		},
	})

	if (!workoutLog) {
		res.status(404)
		throw new Error('Workout Log not found')
	}
	res.json(workoutLog)
})
