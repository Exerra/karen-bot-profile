/*
    Created by Exerra on 02/05/2022
*/

const hexToRGB = (hex) => {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

const changePageColours = ({ banner }) => {
	if (banner?.color == null) return

	let rgb = hexToRGB(banner?.color)

	let seed = banner?.color.charCodeAt(0) ^ banner?.color.charCodeAt(1);
	let rand_1 = Math.abs((Math.sin(seed++) * 10000)) % 256;
	let rand_2 = Math.abs((Math.sin(seed++) * 10000)) % 256;
	let rand_3 = Math.abs((Math.sin(seed++) * 10000)) % 256;

	let red = Math.round((rand_1 + rgb.r) / 2);
	let green = Math.round((rand_2 + rgb.g) / 2);
	let blue = Math.round((rand_3 + rgb.b) / 2);

	let style = document.querySelector(":root").style

	style.setProperty("--color-background", `rgba(${red}, ${green}, ${blue}, 0.1)`)
	style.setProperty("--color-accent", `rgb(${red}, ${green}, ${blue}`)
	style.setProperty("--color-links", `rgb(${red}, ${green}, ${blue}`)
}

exports.hexToRGB = hexToRGB
exports.changePageColours = changePageColours