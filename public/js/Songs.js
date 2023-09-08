const unitedStates = '1313621735';
const japan = '1362508955'
const unitedKingdom = '1111142221'
const world = '3155776842'
const mexico = '1111142361'
const france = '1109890291'

let playlist = ""


let fetchSongs = async function (genreSearch){
const url = 'https://deezerdevs-deezer.p.rapidapi.com/playlist/' + unitedKingdom;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e7c2031dffmsha123315849343c2p1ba5fdjsn2ad30982319f',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
try {
	const response = await fetch(url, options);
	const songInfo = await response.json();
	const top10Songs = songInfo.tracks.data.slice(0, 10);
	console.log(top10Songs);
} catch (error) {
	console.error(error);
}
};

fetchSongs();
