import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @descr Update status of complete workout log
// @route Patch /api/workout/log/complete/:id
// @access Private

export const completeWorkoutLog = asyncHandler(async (req, res) => {
	const logId= +req.params.id

	try {
		const workoutLog = await prisma.workoutLog.update({
			where: {
				id: logId,
			},
			data: {
				isCompleted:true,
			}
		})
		res.json(workoutLog)
	} catch (error) {
		res.status(404)
		throw new Error('Workout Log not found')
	}
})
