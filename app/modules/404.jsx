import idForm from "~/modules/idForm";

export default function pageDoesntExist() {
	return (
		<div className={"remix__page"}>
			<main>
				<div className={"section"}>
					<h1 className={"accent"}>
						404 - Not found
					</h1>
				</div>
				<br />
				<div className={"section"}>
					<h2>Possible causes</h2>
					<h3>Bugs in code</h3>
					<p>It is possible that there are some bugs in this websites code. If so, <a href={"https://exerra.xyz"}>contact the owner</a> and she will take care of it.</p>
					<h3>You have bugs</h3>
					<p>It is more likely, though, that <b>you</b> have some bugs in your mind. In that case, do not bother e-mailing anyone.</p>
				</div>
			</main>
			{idForm("Want to visit an existing page?")}
		</div>
	)
}