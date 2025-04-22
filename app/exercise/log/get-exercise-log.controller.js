import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValues } from './add-prev-values.utils.js'


export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLogId = +req.params.exerciseLogId;

	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: { id: +req.params.id },
		include: { Exercise: true, times: true},
	})

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Exercise log not found!')
	}
	const prevExerciseLog= await prisma.exerciseLog.findFirst({

		where:{
			exerciseId: exerciseLog.exerciseId,
			userId: req.user.id,
			isCompleted: true			
		},
		orderBy: {
			createdAt: 'desc'
		},include:{
			times: true
		}
	})

	res.json({...exerciseLog,times: addPrevValues(exerciseLog,prevExerciseLog)})

})
