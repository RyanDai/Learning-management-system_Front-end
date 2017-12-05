import React from 'react';
import classnames from 'classnames';


export default function Button({ children, primary, danger, className, type = 'button', ...rest }) {
	// calculate the css class name
	let buttonStyle = 'btn-default';
	if (primary) {
		buttonStyle = 'btn-primary';
	}
	if (danger) {
		buttonStyle = 'btn-danger';
	}
	return (
		<button type={type}
			className={classnames('btn', buttonStyle, className, 'shadow-sm')}
			{...rest}
		>
			{children}
		</button>
	)
}