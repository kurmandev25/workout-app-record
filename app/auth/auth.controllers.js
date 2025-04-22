import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'
import { generateToken } from './generate-token.js'

// @route Post/api/users/register
// @descr Register user
// @access Public
export const RegisterUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const existUser = await prisma.user.findUnique({
		where: {
			email,
		},
	})
	if (existUser) {
		res.status(400)
		throw new Error('User already exist')
	}
	const hashedPassword = await hash(password)
	const user = await prisma.user.create({
		data: {
			name: faker.person.fullName(),
			email,
			password: hashedPassword,
		},
		select: UserFields,
	})

	const token = generateToken(user.id)
	res.json({ user, token })
})

// @descr Auth user
// @route Post/api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})
	if (!user) {
		res.status(404)
		throw new Error('User not found!')
	}
	const isValid = await verify(user.password, password)

	if (!isValid) {
		res.status(400)
		throw new Error('Password is not correct')
	}
	const token = generateToken(user.id)

	res.json({ user, token })
})
