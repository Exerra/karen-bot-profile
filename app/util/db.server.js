import { firebase as fbconf } from "~/util/info.server"
import { getAccessToken } from "~/util/jwt.server";

// added this before I realized firebase can auto gen ids
// also um not needed anymore
const uuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

let collection = `https://firestore.googleapis.com/v1/projects/${fbconf.projectId}/databases/(default)`

const getCollection = async () => {
	const accessToken = await getAccessToken()

	const response = await (
		await fetch(
			`${collection}/documents/user`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + accessToken.access_token,
				},
			}
		)
	).json()

	return response
}

const getUserFromDB = async (id) => {
	const accessToken = await getAccessToken()

	const response = await (
		await fetch(
			`${collection}/documents/user/${id}`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + accessToken.access_token,
				},
			}
		)
	).json()

	return response
}

const writeToken = async (data) => {
	let id = uuid()
	const accessToken = await getAccessToken()
	let expiresIn = new Date()


	expiresIn = new Date(expiresIn.getTime() + data.token.expires_in * 10)

	const newUser = {
		fields: {
			id: { stringValue: data.user.id },
			email: { stringValue: data.user.email },
			token: { stringValue: data.token.access_token },
			refreshToken: { stringValue: data.token.refresh_token },
			expiresIn: { timestampValue: expiresIn }
		}
	}

	const response = await (
		await fetch(
			`${collection}/documents/user?documentId=${id}`,
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + accessToken.access_token,
					"Content-Type": 'application/json'
				},
				body: JSON.stringify(newUser)
			}
		)
	)

	let body = await response.json()
	body.name = body.name.substr(64)
	return body
}

const deleteDocument = async (id) => {
	const accessToken = await getAccessToken()

	const response = await (
		await fetch(
			`${collection}/databases/(default)/documents/user/${docID}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + accessToken.access_token,
				},
			}
		)
	).json()

	return response
}


export {writeToken, getCollection, getUserFromDB, deleteDocument}
