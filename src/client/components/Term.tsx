import * as React from 'react';
import { Terminal, ITerminalOptions } from 'xterm';
import { FitAddon } from "xterm-addon-fit";
import { paths } from '../../consts';

interface MyProps {
	name: string
}

interface MyState {
	value: string,
	output: string,
	connection: WebSocket,
	xterm: Terminal,
	fitAddon: FitAddon,
	xtermRoot: React.RefObject<HTMLDivElement>
}

const xtermOptions: ITerminalOptions = {
	rendererType: 'dom',
	convertEol: true,
	disableStdin: true,
	rightClickSelectsWord: true,
	theme: {
		foreground: 'green'
	}
}

// export const Terminal: React.FC<BoardProps> = () => {
export class Term extends React.Component<MyProps, MyState> {
	name: string;

	constructor(props: MyProps) {
		super(props);
		this.name = props.name;
		this.state = {
			value: '',
			output: '',
			connection: null,
			xterm: new Terminal(xtermOptions),
			fitAddon: new FitAddon(),
			xtermRoot: React.createRef()
		};
		this.state.xterm.loadAddon(this.state.fitAddon);
		this.handleChange = this.handleChange.bind(this);
	}

	handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = async event => {
		if (event.key === 'Enter') {
			console.log("log: Terminal -> send", this.state.value);
			this.state.connection.send(this.name + ' ' + this.state.value);
			this.setState({ value: '' });
		}
	}

	handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		this.setState({ value: event.target.value });
	}

	componentDidMount() {
		const connection = new WebSocket(`ws://${location.host + paths.ws}`);
		this.setState({ connection });
		connection.onmessage = event => {
			console.log("log: Terminal -> componentDidMount -> e", event);
			this.setState({ output: event.data });
			this.state.xterm.write(event.data);
		}
		this.state.xterm.open(this.state.xtermRoot.current);
		this.state.fitAddon.fit();
		console.log("log: Term -> constructor -> this.state.xtermRoot.current", this.state.xtermRoot);
	}

	render() {
		return (
			<div className="term">
				<b>{this.name}</b>
				<div ref={this.state.xtermRoot}></div>
				<input type="text" value={this.state.value} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
				<div><button>clear</button></div>
			</div>
		);
	}
}
