import * as React from 'react';
import { InputEvent } from '../../lib/UseInputChange';
import { dockerActions, Command } from '../../../common/entities/Command';
import { SerializableProject } from '../../../common/entities/Project';

interface CommandProps {
	index?: number;
	commands?: SerializableProject['commands'];
	handleInputChange: (event: InputEvent) => void;
	setProject?: React.Dispatch<React.SetStateAction<SerializableProject>>;
}

const calcDepsSelectSize = (commands: SerializableProject['commands']) => {
	if (commands) {
		return commands.length > 4 ? 5 : commands.length + 1;
	} else {
		return 1;
	}
}

const calcDepsOverflowStyle = (commands: SerializableProject['commands']) => {
	if (commands && commands.length < 5) {
		return { overflow: 'visible' };
	} else {
		return {};
	}
}

export const CommandForm: React.FunctionComponent<CommandProps> = ({ commands, handleInputChange, setProject, index = 0 }) => {
	const command = commands ? new Command(commands[index]) : null;
	console.log("log: command?.active", command?.active);

	return <div className="command-form">
		<label className="active">Active
			<input
				checked={command?.active}
				name={`commands.${index}.active`}
				onChange={handleInputChange}
				type="checkbox"
			/>
		</label>
		<label className="name">Name
			<input
				value={command?.name}
				name={`commands.${index}.name`}
				onChange={handleInputChange}
				type="text"
			/>
		</label>
		<label className="service">Docker service
			<input
				value={command?.dockerEvent?.service}
				name={`commands.${index}.dockerEvent.service`}
				onChange={handleInputChange}
				type="text"
			/>
		</label>
		<label className="action">Docker action
			<select
				name={`commands.${index}.dockerEvent.action`}
				value={command?.dockerEvent?.action}
				onChange={handleInputChange}
			>
				<option value="">none</option>
				{
					dockerActions.map((action, k) => <option key={k} value={action}>{action}</option>)
				}
			</select>
		</label>
		<label className="dependencies">Dependencies
			<select
				multiple
				value={command?.dependencies}
				onChange={({ currentTarget }) => {
					const options = [...currentTarget.getElementsByTagName('option')];
					const selected = options.filter(option => option.selected).map(option => option.value)
					console.log("log: selected", selected);
					handleInputChange({
						currentTarget: {
							name: `commands.${index}.dependencies`,
							value: selected
						}
					});
				}}
				size={calcDepsSelectSize(commands)}
				style={calcDepsOverflowStyle(commands)}
			>
				<option value="">none</option>
				{
					commands?.filter(({ name }) => name !== command?.name).map(({ name }, k) => <option
						key={k}
						value={name}
					>{name}</option>)
				}
			</select>
		</label>
		<label className="text">Text
			<textarea
				value={command?.text}
				name={`commands.${index}.text`}
				onChange={handleInputChange}
				cols={30}
				rows={3}
			/>
		</label>
		<p className="buttons">
			<button className="delete-command" onClick={() => {
				console.log("log: commands", commands, commands[index]);
				setProject(project => ({
					...project,
					commands: [
						...commands.filter((command, i) => i !== index)
					]
				}));
				console.log("log: commands deleted", commands);
			}}>Delete</button>
		</p>
	</div>
}

CommandForm.displayName = 'Command-Form';