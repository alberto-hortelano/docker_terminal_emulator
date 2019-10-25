import * as React from 'react';
import { render } from 'react-dom';
import { Term } from './components/Term';
import { Projects } from './components/Projects';
import { paths } from '../consts';

const wsPath = `ws://${location.host + paths.ws}`;

class App extends React.Component {
	render() {
		console.log("log: App e -> render -> wsPath", wsPath);
		return (
			<div>
				<Projects wsPath={wsPath}></Projects>
				<Term name="t1"></Term>
				<Term name="t2"></Term>
				<Term name="t3"></Term>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
