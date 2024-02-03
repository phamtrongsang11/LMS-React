import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<div className="h-[100vh] flex items-center justify-center">
			<Outlet />
		</div>
	);
};

export default AuthLayout;
