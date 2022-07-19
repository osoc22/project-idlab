import getErrorMessage from '$lib/utils/getErrorMessage';
import { writable } from 'svelte/store';

import {
	getDefaultSession,
	handleIncomingRedirect,
	login,
	type ISessionInfo
} from '@inrupt/solid-client-authn-browser';

interface UserStore {
	loading: boolean;
	userSession: ISessionInfo;
}

function createUserStore() {
	const { subscribe, set } = writable<UserStore>({
		loading: true,
		userSession: getDefaultSession().info
	});

	return {
		subscribe,
		set,
		init: async () => {
			await handleIncomingRedirect({
				restorePreviousSession: true
			});

			set({
				loading: false,
				userSession: getDefaultSession().info
			});
		},
		signIn: async (podUrl: string, webId: string, interfaceUrl: string) => {
			if (!podUrl) throw new Error('Please enter a pod URL');
			if (!webId) throw new Error('Please enter a web ID');

			if (podUrl.indexOf('//') < 0) {
				podUrl = 'http://' + podUrl;
			}

			// Set podUrl and webId for next sessions
			localStorage.setItem('podUrl', podUrl);
			localStorage.setItem('webID', webId);

			// If something goes wrong, the error message will be displayed in the UI
			try {
				// If user is not yet logged in -> log in
				if (!getDefaultSession().info.isLoggedIn) {
					await login({
						oidcIssuer: podUrl,
						clientName: 'Project-IDLab',
						redirectUrl: interfaceUrl
					});
				}

				set({
					loading: false,
					userSession: getDefaultSession().info
				});
			} catch (e) {
				throw new Error(getErrorMessage(e).message);
			}
		}
	};
}

export default createUserStore();
