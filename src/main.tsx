import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfettiProvider } from './components/providers/ConfettiProvider';
import ToastProvider from './components/providers/ToastProvider';
import './index.css';
import routes from './routes';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<ConfettiProvider />
			<ToastProvider />
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={routes} />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ClerkProvider>
	</React.StrictMode>
);
