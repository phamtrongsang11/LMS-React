import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

interface EditorProps {
	onChange: (value: string) => void;
	value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
	return (
		<div className="bg-white">
			<ReactQuill theme="snow" value={value} onChange={onChange} />
		</div>
	);
};
