import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<Link to="/">
			<img className="w-130 h-130" alt="logo" src="/LMS.png" />
		</Link>
	);
};

export default Logo;
