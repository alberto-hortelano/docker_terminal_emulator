import * as React from 'react';
import { paths } from '../../consts';
console.log("log: - paths", paths);

interface MyProps {
	wsPath: string
}
interface MyState {
	connection: WebSocket
}

// export const Projects = () => {

// }

export class Projects extends React.Component<MyProps, MyState> {
	projects: [];

	constructor(props: MyProps) {
		super(props);
		this.state = {
			connection: null,
		};
	}

	componentDidMount() {
		const connection = new WebSocket(`ws://${location.host + paths.ws}`);
		this.setState({ connection });
		connection.onopen = event => {
			console.log("log: Projects -> onopen -> e", event);
			// this.state.connection.send('cd .. && ls');
		}
		connection.onmessage = event => {
			console.log("log: Projects -> onmessage -> e", event);
		}
	}

	render() {
		return (
			<div className="projects">
			</div>
		);
	}
}