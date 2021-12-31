export default function idForm(title) {
	return (
		<form method="post" className={"remix__form"} onSubmit={e => {e.preventDefault()}}>
			<h2>{title}</h2>
			<p>
				<i>Discord ID's look like this <span className={"accent"}>391878815263096833</span></i>
			</p>
			<input name="id" type="text" />
			<button className={"idButton"} type="submit" onClick={() => {
				console.log(document.getElementsByTagName("input")[0].value)
				window.location.href = `/profile/${document.getElementsByTagName("input")[0].value}`
			}} >
				Submit
			</button>
		</form>
	)
}