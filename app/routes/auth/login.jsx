/*
    Created by Exerra on 28/01/2022
*/
import {useLoaderData, json, Link, Form, redirect} from "remix";
import { config } from "~/util/info.server"
import {destroySession, getSession} from "~/util/sessions";
import {deleteDocument, getUserFromDB} from "~/util/db.server";

export let loader = async ({ request, env }) => {
	console.log(env)
	const session = await getSession(
		request.headers.get("Cookie")
	);

	if (session.has("userID")) {
		let cookie = session.get("userID")
		let user = await getUserFromDB(cookie)
		let userTokenDate = new Date(user.fields.expiresIn.timestampValue)

		if (userTokenDate > new Date()) return redirect(`/dashboard`)
	}

	let url = new URL(request.url)
	return redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${encodeURIComponent(`${url.protocol}//${url.host}/success`)}&response_type=code&scope=identify%20email%20guilds%20guilds.join`)
}

export default function login() {
	let data = useLoaderData()
	return (
		<div>
			<h1>login</h1>
		</div>
	)
}