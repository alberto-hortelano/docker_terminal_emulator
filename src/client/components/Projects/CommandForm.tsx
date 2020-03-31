import * as React from 'react';
import { InputEvent } from '../../lib/UseInputChange';
import { dockerActions, Command } from '../../../common/entities/Command';
import { SerializableProject } from '../../../common/entities/Project';

interface CommandProps {
	command?: Command;
	commands?: SerializableProject['commands'];
	handleInputChange: (event: InputEvent) => void;
	index?: number;
}

const calcDepsSelectSize = (commands: Command[]) => {
	if (commands) {
		return commands.length > 4 ? 5 : commands.length + 1;
	} else {
		return 1;
	}
}

const calcDepsOverflowStyle = (commands: Command[]) => {
	if (commands && commands.length < 5) {
		return { overflow: 'visible' };
	} else {
		return {};
	}
}

export const CommandForm: React.FunctionComponent<CommandProps> = ({ command, commands, handleInputChange, index = 0 }) => {

	return <div className="command-form">
		<label>Name
		<input
				value={command?.name}
				name={`commands.${index}.name`}
				onChange={handleInputChange}
				type="text"
			/>
		</label>
		<label>Docker service
			<input
				value={command?.dockerEvent.service}
				name={`commands.${index}.dockerEvent.service`}
				onChange={handleInputChange}
				type="text"
			/>
		</label>
		<label>Docker action
			<select
				name={`commands.${index}.dockerEvent.action`}
				value={command?.dockerEvent.action}
				onChange={handleInputChange}
			>
				<option value="">none</option>
				{
					dockerActions.map((action, k) => <option key={k} value={action}>{action}</option>)
				}
			</select>
		</label>
		<label>Dependencies
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
					commands?.filter(({ name }) => name !== command.name).map(({ name }, k) => <option
						key={k}
						value={name}
					>{name}</option>)
				}
			</select>
		</label>
		<label>Text
			<textarea
				value={command?.text}
				name={`commands.${index}.text`}
				onChange={handleInputChange}
				cols={30}
				rows={3}
			/>
		</label>
	</div>
}

CommandForm.displayName = 'Command-Form';