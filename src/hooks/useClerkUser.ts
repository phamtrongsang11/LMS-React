import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useClerkUser = () => {
	const navigate = useNavigate();
	const { user, isLoaded } = useUser();

	useEffect(() => {
		if (isLoaded && user == null) {
			navigate('/auth/login');
		}
	}, [isLoaded]);

	return { isLoaded, user };
};

export default useClerkUser;
