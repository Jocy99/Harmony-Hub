const unitedStates = '1313621735';
const japan = '1362508955'
const unitedKingdom = '1111142221'
const world = '3155776842'
const mexico = '1111142361'
const france = '1109890291'
const top10Container = document.getElementById('Top10Container')

let playlist = ""

//Add event listener to pass in the locale
let fetchSongs = async function (genreSearch){
const url = `/api/music/${france}`;

try {
	const response = await fetch(url);
	const songInfo = await response.json();
	console.log(songInfo);
let songList = [];
	songInfo.forEach((song, idx) => {
		// render your song stuff in here...
		const songDetailRow = `
		<div>
			<table>
				<tbody>
					<tr>
						<td>${song.title}</td>
						<td>${song.artist.name}</td>
						<td>${song.album.title}</td>
					</tr>
				</tbody>
			</table>
		<div>
		`
		console.log(top10Container)
		songList.push(songDetailRow)

	});
	top10Container.innerHTML= songList;
} catch (error) {
	console.error(error);
}
};

fetchSongs();
