import * as React from 'react';

export const Projects = () => {

	return <div className='projects'>
	</div>
}

// export class Projects2 extends React.Component<MyProps, MyState> {
// 	projects: [];

// 	constructor(props: MyProps) {
// 		super(props);
// 		this.state = {
// 			connection: null,
// 		};
// 	}

// 	componentDidMount() {
// 		// const connection = new WebSocket(`ws://${location.host + paths.ws}`);
// 		// this.setState({ connection });
// 		// connection.onopen = event => {
// 		// 	console.log("log: Projects -> onopen -> e", event);
// 		// 	// this.state.connection.send('cd .. && ls');
// 		// }
// 		// connection.onmessage = event => {
// 		// 	console.log("log: Projects -> onmessage -> e", event);
// 		// }
// 	}

// 	render() {
// 		return (
// 			<div className="projects">
// 			</div>
// 		);
// 	}
// }