import { useCatch, Link, json, useLoaderData } from "remix";
import axios from "axios";

import stylesUrl from "~/styles/profile/$id.css";

export let links = () => {
    return null //[{ rel: "stylesheet", href: stylesUrl }];
};

let paramsObj = {}

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
        includeWarns: true,
        guildCaller: params.guildID
    })).then(res => {
        data = res
    }).catch(err => {
        throw new Response("Not Found", { status: 404 });
    })

    if (error) {
        throw new Response("Not Found", { status: 404 });
    }

    return data

}

export default function ParamDemo() {
    let data = useLoaderData();

    let warnView = []


    data.warns = data.warns.filter(item => item.guild == data.profile.file.caller);
    data.warns.sort((a, b) => new Date(b.date) - new Date(a.date))

    for (let i in data.warns) {
        let warn = data.warns[i]
        warnView.push(
            <div key={warn.id}>
                <h3 style={{ color: "#AD91FF" }}>{warn.id}</h3>
                <p>Reason - {warn.reason}</p>
                <p>Moderator - <Link to={`../../profile/${warn.moderator}`}>{warn.moderator}</Link></p>
                <p>Guild - {warn.guild}</p>
                <p>Date - {new Date(warn.date).toISOString().substring(0, 10)}</p>
                <hr/>
            </div>
        )
    }

    return (
        <div className="remix__page">
            <h1>
                Guild warns for <span style={{ color: "#AD91FF" }}>{data.username}#{data.discriminator}</span> {data.profile.rank !== '' ? `- ${data.profile.rank}` : ''}
            </h1>

            <hr/>

            {warnView}
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
            </main>
        </div>
    );
}

export let meta = () => {
    return {
        title: "Karen Bot Profile",
        description: "Karen Bot profile viewer"
    };
};
/*
let rankView
if (data.profile.rank !== '') {
    rankView = <h3>Rank = {data.profile.rank}</h3>
}
<main>
    <h1>
        Profile for <i style={{ color: "#AD91FF" }}>{data.id}</i> {data.profile.rank !== '' ? `- ${data.profile.rank}` : ''}
    </h1>
    {data.profile.website !== '' ? <h3>Website - <a href={data.profile.website}>{data.profile.website.replace(/(^\w+:|^)\/\//, '')}</a></h3> : ''}
    {data.profile.email !== '' ? <h3>Email - <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a></h3> : ''}
    {data.profile.twitter !== '' ? <h3>Twitter - <a href={`https://twitter.com/${data.profile.twitter}`}>@{data.profile.twitter}</a></h3> : ''}


    <h3>Description - {data.profile.description}</h3>

    <h3>Gender - {data.profile.gender}</h3>

    <h3>Birthday - {data.profile.birthday}</h3>

    <h3>Country - {data.profile.country}</h3>

    <h3>Languages - {data.profile.languages.replace(/\n/g, ", ").substr(2)}</h3>
</main>*/