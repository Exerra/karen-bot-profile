export default function lottieEmpty() {
	return (
		<div key={"lottie"}>
			<h3>Once upon a time, there was nothing...</h3>
			<br />
			<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
			<lottie-player src="https://assets3.lottiefiles.com/packages/lf20_ydo1amjm.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
		</div>
	)
}