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
	webID: string;
	podUrl: string;
}

/***
 * User store will hold info about the user session, and if the user data is loaded
 */
function createUserStore() {
	const { subscribe, set } = writable<UserStore>({
		loading: true,
		userSession: getDefaultSession().info,
		webID: '',
		podUrl: ''
	});

	return {
		subscribe,
		set,
		init: async (webID?: string, podUrl?: string) => {
			// Check if there is a session in the browser
			await handleIncomingRedirect({
				restorePreviousSession: true
			});

			webID = webID || localStorage.getItem('webID') || 'localhost:3000';
			podUrl = podUrl || localStorage.getItem('podUrl') || 'johndoe';

			set({
				loading: false,
				userSession: getDefaultSession().info,
				webID,
				podUrl
			});
		},
		signIn: async (podUrl: string, webID: string, interfaceUrl: string) => {
			if (!podUrl) throw new Error('Please enter a pod URL');
			if (!webID) throw new Error('Please enter a web ID');

			if (podUrl.indexOf('//') < 0) {
				podUrl = 'http://' + podUrl;
			}

			// Set podUrl and webId for next sessions
			localStorage.setItem('podUrl', podUrl);
			localStorage.setItem('webID', webID);

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
					userSession: getDefaultSession().info,
					webID,
					podUrl
				});
			} catch (e) {
				throw new Error(getErrorMessage(e).message);
			}
		},
		signOut: () => {
			// TODO: Make sure a user can log out
		}
	};
}

export default createUserStore();
