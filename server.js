import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './app/auth/auth.routes.js'
import userRoutes from './app/user/user.routes.js'
import exerciseRoutes from './app/exercise/exercise.routes.js'
import workoutRoutes from './app/workout/workout.routes.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import { prisma } from './app/prisma.js'
import colors from 'colors'
const app = express()

dotenv.config()

async function main() {
	const PORT = process.env.PORT || 3000

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}

	//middleware for res.json()
	app.use(express.json())

	// routes
	app.use('/api/auth', authRoutes)
	app.use('/api/user', userRoutes)
	app.use('/api/exercises',exerciseRoutes)
	app.use('/api/workout',workoutRoutes)

	// middleware for error handling
	app.use(notFound)
	app.use(errorHandler)

	app.listen(PORT, () => {
		console.log(
			`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
				.bold,
		)
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
