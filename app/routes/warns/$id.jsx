import { useCatch, Link, json, useLoaderData } from "remix";
import lottieEmpty from "~/modules/lottie";
import warnItem from "~/modules/warn";
import {changePageColours} from "~/modules/colours";
import {useEffect} from "react";

export let loader = async ({ params }) => {
    if (params.id.match(/[0-9]{18}/) == false) {
        throw new Response("Invalid regex", { status: 400 })
        return
    }

    let data
    let data2
    let error

    await fetch('https://api.exerra.xyz/karen/profile?' + new URLSearchParams({
        id: params.id,
        fetchUser: true,
        includeWarns: true
    })).then(async res => {
        data = await res.json()
    }).catch(err => {
        throw new Response("Not Found", { status: 404 });
    })

    if (error) {
        throw new Response("Not Found", { status: 404 });
    }

    let warners = new Map()

    for (let warn of data.warns) {
        if (warners.has(warn.moderator)) continue

        let moderator = await (await fetch(`https://api.exerra.xyz/karen/profile?id=${warn.moderator}&fetchUser=true`)).json()

        warners.set(warn.moderator, moderator)
    }

    for (let i in data.warns) {
        data.warns[i].moderatorProfile = warners.get(data.warns[i].moderator)
    }

    return data

}

export default function WarnView() {
    let data = useLoaderData();

    let warnView = []

    data.warns.sort((a, b) => new Date(b.date) - new Date(a.date))

    for (let i in data.warns) {
        let warn = data.warns[i]
        warnView.push(warnItem(warn))
    }

	if (data.warns.length == 0) {
		warnView.push(lottieEmpty())
	}

    useEffect(() => changePageColours(data))

    return (
        <div>
            <br />
            <h1>
                All warns for <span className={"accent"}>{data.username}#{data.discriminator}</span> {data.profile.rank !== '' ? `- ${data.profile.rank}` : ''}
            </h1>
            <div className={`${data.warns.length == 0 ? "section" : "remix__page"}`}>
                {warnView}
            </div>
            <br />
        </div>
    );
}

export function CatchBoundary({ error }) {
    let caught = useCatch()

    console.log(caught)

    let message
    if (caught.status == 404) {
        message = (
            <h1>
                Profile for <i style={{color: "#AD91FF"}}>yes</i> could not be found
            </h1>
        )
    }

    return ({message})
}

export function ErrorBoundary({ error }) {
    console.error(error);
    return (
        <div className="remix__page">
            <main>
                <h1>
                    Warns could not be found
                </h1>
                <hr></hr>
                <h2>Possible causes</h2>
                <h3>User has not created a profile</h3>
                <p>If the user has not created a profile thru Karen Bot (or had it auto created when joining a guild with the bot in it), then it is not in our system. Tell them to create one.</p>
                <h3>API has problems</h3>
                <p>It is also possible that the API that has the profiles is either down or has a bug that prevents it from sending the profile. Rest assured, if this happens then the appropriate people have already been notified and are working on a fix.</p>
            </main>
            <form method="post" className={"remix__form"} onSubmit={e => {e.preventDefault()}}>
                <h2>Want to try your luck again?</h2>
                <p>
                    <i>Discord ID's look like this <span style={{ color: "#AD91FF" }}>391878815263096833</span></i>
                </p>
                <input name="id" type="text" />
                <button type="submit" onClick={() => {
                    console.log(document.getElementsByTagName("input")[0].value)
                    window.location.href = `/profile/${document.getElementsByTagName("input")[0].value}`
                }} >
                    Submit
                </button>
            </form>
        </div>
    );
}

export let meta = () => {
    return {
        title: "Karen Bot Profile",
        description: "Karen Bot profile viewer"
    };
};