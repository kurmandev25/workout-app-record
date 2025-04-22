import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @descr Create new workoutLog
// @route Post/api/workout/log/:workoutId
// @access Private

export const createWorkoutLog = asyncHandler(async (req, res) => {
	const workoutId = +req.params.id
	const workout = await prisma.workout.findUnique({
		where: {
			id: workoutId,
		},
		include: {
			exercises: true,
		},
	})

	if (!workout) {
		res.status(404)
		throw new Error('Workout not Found!')
	}

	const workoutLog = await prisma.workoutLog.create({
		data: {
			User: {
				connect: {
					id: req.user.id,
				},
			},
			Workout: {
				connect: {
					id: workoutId,
				},
			},
			exerciseLog: {
				create: workout.exercises.map(exercise => ({
					User: {
						connect: {
							id: req.user.id,
						},
					},
					Exercise: {
						connect: {
							id: exercise.id,
						},
					},
					times: {
						create: Array.from({ length: exercise.times }, () => ({
							weight: 0,
							repeat: 0,
						})),
					},
					
				})),
			},
		},
		include:{
			exerciseLog:{
				include:{
					times: true
				}
			}
		}
	})
	res.json(workoutLog)
})
