import { SignUp } from '@clerk/clerk-react';

const UserSignUp = () => {
	return <SignUp signInUrl="/auth/signin" />;
};

export default UserSignUp;
