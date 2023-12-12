'use client'
import React from 'react'
import { Controller } from 'react-hook-form'

import { TextField, TextArea, Button } from '@radix-ui/themes'
import SimpleMde from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css';

const IssueForm = () => {
	return (
		<div className='max-w-xl'>
			<form className='space-y-3'>
				<TextField.Root>
					<TextField.Input placeholder='Title' />
				</TextField.Root>
				<SimpleMde placeholder='Description' />
				<Button>
					Submit New Issue
				</Button>
				
			</form>
		</div>
	)
}

export default IssueForm
