import React from 'react';
import s from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	name: string;
	class_name?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, type, disabled, name, class_name }) => {
	return (
		<button
			type={type}
			className={clsx(s.button, class_name && s[class_name])}
			onClick={onClick}
			disabled={disabled}
		>
			{name}
		</button>
	);
};

export default Button;
