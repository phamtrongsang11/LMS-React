import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { FileIcon, X } from 'lucide-react';

type ImageFile = File | null;
type ImagePrview = string | undefined;

interface FileUploadProps {
	type: 'image' | 'file';
	onChange: (url: string) => void;
}

const FileUpload = ({ type, onChange }: FileUploadProps) => {
	const [image, setImage] = useState<ImageFile>(null);
	const [preview, setPreview] = useState<ImagePrview>(undefined);

	useEffect(() => {
		if (!image) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(image);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [image]);

	const uploadImage = () => {
		const data = new FormData();
		data.append('file', image!);
		data.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
		data.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);

		fetch('https://api.cloudinary.com/v1_1/dvacpxowr/auto/upload', {
			method: 'post',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				onChange(data.url);
				setPreview(undefined);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) {
			setImage(null);
			return;
		}
		setImage(e.target.files[0]);
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center w-full">
				{!preview && (
					<label htmlFor="dropzone-file" className="w-full">
						<div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<img src="/imageIcon.svg" alt="upload" className="w-10 h-10" />
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold ">Click to upload</span> or
									drag and drop file here
								</p>
							</div>
						</div>
						<input
							id="dropzone-file"
							type="file"
							className="hidden"
							onChange={onSelectFile}
						/>
					</label>
				)}

				{preview && type == 'image' && (
					<label className="flex flex-col items-center justify-center cursor-pointer">
						<div className="relative h-30 w-30">
							<img
								src={preview}
								alt="Image"
								className=" object-fill w-100 h-100"
							/>
						</div>
						<input
							id="dropzone-file"
							type="file"
							className="hidden"
							onChange={onSelectFile}
						/>
					</label>
				)}

				<div className="flex items-center justify-center">
					<Button
						variant="primary"
						type="button"
						onClick={uploadImage}
						className="mt-5"
					>
						Upload File
					</Button>
				</div>
			</div>
		</>
	);
};

export default FileUpload;
