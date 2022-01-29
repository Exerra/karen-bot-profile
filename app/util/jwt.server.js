import { getTokenFromGCPServiceAccount } from '@sagi.io/workers-jwt'
import { privateKey } from "~/util/info.server"

/**
 * Getting the access token to use in the header.
 */

// For example's sake, the file contents (modified) from the private key has been
// listed below, but the recommended way would be to use environment variables.
const getAccessToken = async () => {
	const jwtToken = await getTokenFromGCPServiceAccount({
		serviceAccountJSON: privateKey,
		aud: 'https://oauth2.googleapis.com/token',
		payloadAdditions: {
			scope: [
				// scope required for firestore
				'https://www.googleapis.com/auth/datastore',
				// The following scopes are required only for realtime database
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/firebase.database',
			].join(' '),
		},
	})

	const accessToken = await (
		await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
				assertion: jwtToken, // the JWT token generated in the previous step
			}),
		})
	).json()

	return accessToken
}

export { getAccessToken }