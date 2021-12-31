import {useCatch, useLoaderData} from "remix";
import idForm from "~/modules/idForm";

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
        fetchUser: true
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

export let meta = (loader) => {
    let data = loader.data
    return {
        title: (data.status != undefined ? "Karen Bot profile" : `${data.username}'s profile`),
        description: (data.status != undefined ? "Karen Bot profile viewer\n" : `${data.profile.description}`),
        "theme-color": "#EFF5FB"
    };
};


export default function ParamDemo() {
    let data = useLoaderData();

    let rankView
    let webEmailTwitterView

    if (data.profile.rank !== '') rankView = <h3>🌸 Flowered</h3>
    if (data.id == "391878815263096833") rankView = <h3>🖥️ Karen Bot developer</h3>

    if (data.profile.website !== '' || data.profile.email !== '' || data.profile.twitter !== '') {
        webEmailTwitterView = <><br /><div className={"section"}>
            {data.profile.website !== '' ? <h3>Website - <a href={data.profile.website}>{data.profile.website.replace(/(^\w+:|^)\/\//, '')}</a></h3> : ''}
            {data.profile.email !== '' ? <h3>Email - <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a></h3> : ''}
            {data.profile.twitter !== '' ? <h3>Twitter - <a href={`https://twitter.com/${data.profile.twitter}`}>@{data.profile.twitter}</a></h3> : ''}
        </div></>
    }

    return (
        <div className="remix__page">
            <main id={"profile"}>
                <div className={"section"}>
                    <h1>
                        <span className={"accent"}>{data.username}#{data.discriminator}</span>
                    </h1>
                    {rankView}
                </div>
                {webEmailTwitterView}
                <br/>
                <div className={"section"}>
                    <h3>Description - {data.profile.description}</h3>

                    <h3>Gender - {data.profile.gender}</h3>

                    <h3>Pronouns - {data.profile.pronouns}</h3>

                    <h3>Birthday - {data.profile.birthday}</h3>

                    <h3>Country - {data.profile.country}</h3>

                    <h3>Languages - {data.profile.languages.replace(/\n/g, ", ").substr(2)}</h3>
                </div>

            </main>
            {idForm("Want to try your luck again?")}
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
                <div className={"section"}>
                    <h1>
                        Profile could not be found
                    </h1>
                </div>
                <br />
                <div className={"section"}>
                    <h2>Possible causes</h2>
                    <h3>User has not created a profile</h3>
                    <p>If the user has not created a profile thru Karen Bot (or had it auto created when joining a guild with the bot in it), then it is not in our system. Tell them to create one.</p>
                    <h3>API has problems</h3>
                    <p>It is also possible that the API that has the profiles is either down or has a bug that prevents it from sending the profile. Rest assured, if this happens then the appropriate people have already been notified and are working on a fix.</p>
                </div>

            </main>
            {idForm("Want to try your luck again?")}
        </div>
    );
}