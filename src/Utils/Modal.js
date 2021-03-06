import React from 'react';
import Button from '../UI/Button';
import '../styles/Modal.css';


export default function Modal({ children, btnClick }) {

	return (
		<div className="modal" tabIndex="-1" role="dialog" id="dialog" style={{ display: "block" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Error</h5>
					</div>
					<div className="modal-body">
						{children}
					</div>
					<div className="modal-footer">
						<Button primary onClick={btnClick}>Close</Button>
					</div>
				</div>
			</div>
		</div>
	);

}