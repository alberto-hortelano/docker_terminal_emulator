const activeByDefault = false;
let lastCallerFile: string;

function _getCallerFile() {
	const originalPrepareStackTrace = Error.prepareStackTrace;
	let callerfile: string;

	try {
		const err = new Error();
		let currentfile: string;

		Error.prepareStackTrace = (err, stack) => stack;

		currentfile = (err.stack as unknown as NodeJS.CallSite[]).shift().getFileName();

		while (err.stack.length) {
			callerfile = (err.stack as unknown as NodeJS.CallSite[]).shift().getFileName();

			if (currentfile !== callerfile) break;
		}
	} catch (e) {
		console.error('ERROR at getCallerFile', e);
	}

	Error.prepareStackTrace = originalPrepareStackTrace;

	return callerfile;
}

export function Logger(
	file = _getCallerFile(),
	active = activeByDefault
) {
	Object.assign(this, console);
	this.active = active;
	this.file = file;
	this.activate = () => {
		this.active = true;
	}

	this.deactivate = () => {
		this.active = false;
	}

	this.log = (...args: any[]) => {
		if (!this.active) {
			return;
		}
		if (lastCallerFile !== this.file) {
			console.groupEnd();
			lastCallerFile = this.file;
			console.group('---', this.file);
		}
		console.log('**', ...args);
	}
}
