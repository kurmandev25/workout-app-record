import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @descr Get Workout
// @route Get/api/workouts/
// @access Private
export const getAllWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({})
	res.json(workouts)
})
// @descr Get Workout
// @route Get/api/workouts/:id
// @access Private
export const getWorkout = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: { id: +req.params.id },
		include: {
			exercises: true,
		},
	})
	const minutes = Math.ceil(workout.exercises.length * 3.7)
	res.json({ ...workout, minutes })
})

// @descr Create Workout
// @route Post/api/workout
// @access Private
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id=>({id:+id})),
			},
		},
	})
	res.json({ workout })
})

// @descr Update Workout
// @route Put/api/workout/:id
// @access Private

export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await prisma.workout.update({
		where: {
			id: +req.params.id,
		},
		data: {
			name,
			exercises: {
				set: exerciseIds,
			},
		},
	})
	res.json(workout)
})

// @descr Delete Workout
// @route Del/api/workout/:id
// @access Private
export const deleteWorkout = asyncHandler(async (req, res) => {
	const workout = await prisma.workout.delete({
		where: {
			id: +req.params.id, // Получаем ID из URL
		},
	})
	res.json({ message: 'Successfully deleted' })
})
