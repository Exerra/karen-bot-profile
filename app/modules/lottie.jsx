export default function lottieEmpty() {
	return (
		<div key={"lottie"}>
			<h3>Once upon a time, there was nothing...</h3>
			<br />
			<script src="/lottie/lottie-player.js"></script>
			<lottie-player src="/lottie/empty.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
		</div>
	)
}