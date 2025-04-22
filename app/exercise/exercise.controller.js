import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @descr Get Exercise
// @route Get/api/exercise
// @access Private
export const getAllExercises=asyncHandler(async(req,res)=>{
		const exercises=await prisma.exercise.findMany({})
		res.json(exercises)
})


// @descr Create Exercise
// @route Post/api/exercise
// @access Private
export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	const exercise = await prisma.exercise.create({
		data: { name, times, iconPath },
	})
	res.json({exercise})
})

// @descr Update Exercise
// @route Put/api/exercise/:id
// @access Private

export const updateExercise= asyncHandler(async(req,res)=>{
		const {name,times,iconPath}=req.body

		const exercise= await prisma.exercise.update({
			where:{
				id: +req.params.id
			},
			data:{
				name,times,iconPath
			}
		})
		res.json(exercise)
})


// @descr Delete Exercise
// @route Del/api/exercise/:id
// @access Private
export const deleteExercise= asyncHandler(async(req,res)=>{
	
	const exercise= await prisma.exercise.delete({
		where:{
			id: +req.params.id  // Получаем ID из URL 
		}
	})
	res.json(exercise)
})

