'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'

import { Container, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const Navbar = () => {
	const currentPath = usePathname()
	console.log(currentPath)

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' }
	]

	return (
		<nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
			<Container>
				<Flex justify="between">
					<Flex align="center" gap="3">
						<Link href="/">
							<AiFillBug />
						</Link>
						<ul className='flex space-x-6'>
							{links.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className={classNames({
											'text-zinc-900 font-semibold': link.href === currentPath,
											'text-zinc-500': link.href !== currentPath,
											'hover:text-zinc-800 transition-colors': true
										})}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
				</Flex>
			</Container>
		</nav>
	)
}

export default Navbar
