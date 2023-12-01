'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Message = {
	text: string;
	sender: string;
};

const Chat = () => {
	const initialMessages: Message[] = [
		{ text: 'Hello!', sender: 'user' },
		{ text: 'Hi there!', sender: 'other' },
		{ text: 'How are you?', sender: 'user' },
		{ text: 'I am good. Thanks!', sender: 'other' },
		{ text: 'Nice to hear!', sender: 'user' },
		{ text: 'What have you been up to?', sender: 'user' },
		{ text: 'Not much, just working on some projects.', sender: 'other' },
		{ text: 'That sounds interesting!', sender: 'user' },
		{ text: "Yeah, it's been keeping me busy.", sender: 'other' },
	];

	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [newMessage, setNewMessage] = useState<string>('');

	const sendMessage = () => {
		if (newMessage.trim() !== '') {
			const newMessageObj: Message = { text: newMessage, sender: 'user' };
			setMessages((prevMessages) => [...prevMessages, newMessageObj]);
			setNewMessage('');
			// Simulate backend: You might send the message to the server here.
			// For now, we'll just add it to the local state.
		}
	};

	return (
		<div className='chat-container flex h-full w-full flex-col overflow-hidden'>
			<div className='user-info flex items-center p-2'>
				<Avatar>
					<AvatarImage src='' alt='Avatar' />
					<AvatarFallback>OU</AvatarFallback>
				</Avatar>
				<div className='ml-2'>
					<div className='text-lg font-semibold'>Other User</div>
					<div className='text-sm text-green-500'>Online</div>
				</div>
			</div>
			<hr className='my-4 border-t border-gray-500' />
			<div className='chat-window flex-1 overflow-y-auto'>
				{messages.map((message, index) => (
					<div
						key={index}
						className={`message-box ${
							message.sender === 'user'
								? 'flex justify-end'
								: 'flex justify-start'
						} my-2`}>
						<div
							className={`max-w-xs p-4 ${
								message.sender === 'user'
									? 'border border-gray-500 bg-transparent text-gray-300'
									: 'bg-orange-500 text-white'
							} rounded-lg`}>
							{message.text}
						</div>
					</div>
				))}
			</div>
			<hr className='my-4 border-t border-gray-500' />
			<div className='message-input flex '>
				<input
					type='text'
					placeholder='Type your message...'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='w-full max-w-screen-lg rounded-md p-2 text-black'
				/>
				<button
					onClick={sendMessage}
					className='ml-2 w-40 rounded-md bg-orange-500 p-2 text-white'>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
