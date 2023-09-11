const unitedStates = '1313621735';
const japan = '1362508955'
const unitedKingdom = '1111142221'
const world = '3155776842'
const mexico = '1111142361'
const france = '1109890291'

let playlist = ""


let fetchSongs = async function (genreSearch){
const url = `/api/music/${france}`;

try {
	const response = await fetch(url);
	const songInfo = await response.json();
	console.log(songInfo);

	songInfo.forEach((song, idx) => {
		// render your song stuff in here...
		
	});
} catch (error) {
	console.error(error);
}
};

fetchSongs();
