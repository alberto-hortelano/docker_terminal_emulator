// // MOCKS
// import * as xtermaddonfit from "xterm-addon-fit";
// import * as xterm from 'xterm';

// const fakeXterm = {
// 	loadAddon: jest.fn(),
// 	open: jest.fn(),
// 	onKey: jest.fn(),
// 	textarea: {
// 		addEventListener: jest.fn()
// 	}
// };
// const mockFit = jest.fn();
// const fakeFitAddon = {
// 	fit: mockFit
// };
// jest.spyOn<any, 'Terminal'>(xterm, 'Terminal').mockImplementation(() => fakeXterm)
// jest.spyOn<any, 'FitAddon'>(xtermaddonfit, 'FitAddon').mockImplementation(() => fakeFitAddon)
// // END MOCKS

// import * as React from 'react';
// import { unmountComponentAtNode, render } from "react-dom";
// import { create as createSnapshot } from 'react-test-renderer';
// import { act } from 'react-dom/test-utils';
// import { Xterm } from "./Xterm";

// describe('Xterm', () => {

// 	let container: HTMLDivElement = null;
// 	const fakeConnection = {
// 		send: jest.fn(),
// 		addDataListener: jest.fn(),
// 		close: jest.fn()
// 	};

// 	beforeEach(() => {
// 		container = document.createElement("div");
// 		document.body.appendChild(container);
// 	});

// 	afterEach(() => {
// 		unmountComponentAtNode(container);
// 		container.remove();
// 		container = null;
// 	});
// 	test('renders correctly', () => {
// 		const tree = createSnapshot(<Xterm />).toJSON();
// 		expect(tree).toMatchSnapshot();
// 	});
// 	test('initializes xterm.js', () => {
// 		const send = jest.fn();
// 		const addDataListener = jest.fn();
// 		const close = jest.fn();
// 		act(() => {
// 			render(<Xterm />, container);
// 		});
// 		expect(fakeXterm.loadAddon).toHaveBeenCalledWith(fakeFitAddon);
// 		expect(mockFit).toHaveBeenCalled();
// 	});

// });