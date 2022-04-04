import { Link } from "remix";

export default function warnItem(warn) {
	console.log(warn)
	return (
		<div className={"section"} key={warn.id}>
			<h3 className={"accent"}>{warn.id}</h3>
			<p><b>Reason</b> - {warn.reason}</p>
			<p><b>Moderator</b> - <Link to={`/profile/${warn.moderator}`}>{warn.moderatorProfile.username}#{warn.moderatorProfile.discriminator}</Link></p>
			<p><b>Guild</b> - {warn.guild}</p>
			<p><b>Date</b> - {new Date(warn.date).toISOString().substring(0, 10)}</p>
		</div>
	)
}