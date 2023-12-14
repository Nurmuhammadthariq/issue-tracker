import React from 'react'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import IssueActions from './IssueActions'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
	searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
	const statuses = Object.values(Status)
	const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
	const where = { status }
	
	const pageSize = 10

	const issues = await prisma.issue.findMany({
		where,
		take: pageSize
	})

	return (
		<Flex direction="column" gap="3">
			<IssueActions />
			<IssueTable issues={issues} />
		</Flex>
	)
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Issue Tracker - Issue List',
	description: 'View all project issues'
}

export default IssuesPage
