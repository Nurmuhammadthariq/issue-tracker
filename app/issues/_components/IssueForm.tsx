'use client'

import React from 'react'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { Controller, useForm } from 'react-hook-form'
import { issueSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Callout, TextField, Button } from '@radix-ui/themes'
import axios from 'axios'
import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = () => {
	const router = useRouter()
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema)
	})
	console.log(errors)
	const [error, setError] = useState("")
	const [isSubmitting, setSubmitting] = useState(false)

	const onSubmit = handleSubmit(async (data) => {
		try {
			setSubmitting(true)
			axios.post('/api/issues', data)
			router.push('/issues');
			router.refresh()
		} catch (error) {
			setSubmitting(false)
			setError('An unexpected error occured')
		}
	})

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className='space-y-3' onSubmit={onSubmit}>
				<TextField.Root>
					<TextField.Input
						placeholder='Title'
						{...register('title')}
					/>
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMde placeholder='Description' {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					Submit New Issue
					{isSubmitting && <Spinner />}
				</Button>

			</form>
		</div>
	)
}

export default IssueForm
