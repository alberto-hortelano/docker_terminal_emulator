import * as React from 'react';

export const NewProject = () => {

	return <div className='projects'>
		<b>New Project Creator:</b>
		<label>Name
			<input type="text" />
		</label>
		<label>Path
			<input type="text" />
		</label>
		<label>Description
			<textarea cols={30} rows={3}></textarea>
		</label>
	</div>
}

