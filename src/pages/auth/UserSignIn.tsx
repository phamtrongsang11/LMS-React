import { SignIn } from '@clerk/clerk-react';

const UserSignIn = () => {
	return <SignIn signUpUrl="/auth/signup" />;
};

export default UserSignIn;
