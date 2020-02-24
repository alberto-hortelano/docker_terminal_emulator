import * as React from 'react';
import { render } from 'react-dom';
import { Projects } from './components/Projects/Projects';
import { Logger } from '../common/Logger';
import { Connection } from './components/Connection/Connection';

const console = new Logger(__filename);

const App = () => <div>
	<Projects />
	<Connection />
</div>
const componentPath = new URLSearchParams(window.location.search).get('component');
console.log("log: componentName", componentPath, __dirname);

if (componentPath) {
	try {
		const Comp = require(`./${componentPath}`)[componentPath.split('/').pop()];
		const rawProps = new URLSearchParams(window.location.search).get('props');
		const renderOnload = new URLSearchParams(window.location.search).get('render');
		if (rawProps) {
			const JSONProps = `{"${rawProps.replace(/(:)|(,)/g, '"$1$2"')}"}`;
			render(<p>Debug mode</p>, document.getElementById('app'));
			if (JSONProps) {
				const parsedProps = JSON.parse(JSONProps);
				console.log("log: parsedProps", parsedProps);
				render(<Comp {...parsedProps} />, document.getElementById('app'));
			}
		} else if (renderOnload) {
			render(<Comp />, document.getElementById('app'));
		}
		window['render'] = (props) => {
			console.log("log: render props", props);
			render(<Comp {...props} />, document.getElementById('app'));
		}
	} catch (error) {
		console.error("log: component error", error);

	}
} else {
	render(<App />, document.getElementById('app'));
}
