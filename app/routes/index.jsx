import { useLoaderData, json, Link, Form, redirect } from "remix";
import idForm from "~/modules/idForm";

// https://remix.run/api/conventions#meta
export let meta = () => {
  return {
    title: "Karen Bot Profile",
    description: "Karen Bot profile viewer",
  	"theme-color": "#EFF5FB"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {

  return (
    <div className="remix__page">
      <main>
	  	<div className={"section"}>
			<h1 className={"accent"}>Profile viewer</h1>
			<p>You can use this website to check Karen Bot profiles</p>
		</div>
        <br />
		<div className={"section"}>
			<h2>FAQ</h2>
			<h3>Q: Are all profiles public?</h3>
			<p>A: Well, yes. The rationale is that all profiles were already public thru Karen Bot, so why not create a nice and simple dashboard?</p>
			<h3>Q: What happened to Spotify data collection</h3>
			<p>Got postponed until v3 of the profile system, which will completely redesign profiles to be more of an identity system (along the lines of Sign in with Google) to allow developers to use a privacy oriented identity system.</p>
		</div>
      </main>

		{idForm("Specify the ID")}
    </div>
  );
}

export async function action({ request }) {
  console.log("yes")
  return redirect(`/profile/391878815263096833`)
  //return redirect(`/profile/${body.id}`);
}
