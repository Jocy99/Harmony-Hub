const unitedStates = '1313621735';
const japan = '1362508955';
const unitedKingdom = '1111142221';
const world = '3155776842';
const mexico = '1111142361';
const france = '1109890291';
const top10Container = document.getElementById('Top10Container');
const genreDropdown = document.getElementById('genreDropdown');
//Add event listener to picklist
//figure out how to put actual id not the string when selecting location

let playlist = '';

//Populate Table
let fetchSongs = async function (genreSearch) {
  const selectedGenre = genreDropdown.value;
  const url = `/api/music/${selectedGenre}`;

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
						<td><button class="savebtn">SAVE</button></td>
					</tr>
				</tbody>
			</table>
		<div>
		`;
      console.log(top10Container);
      songList.push(songDetailRow);
    });
    top10Container.innerHTML = songList;

    const saveButtons = document.querySelectorAll('.savebtn');
    saveButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const title = event.target.getAttribute('data-title');
        const artistName = event.target.getAttribute('data-artist');
        const albumTitle = event.target.getAttribute('data-album');
        saveSong(title, artistName, albumTitle);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

genreDropdown.addEventListener('change', fetchSongs);

fetchSongs();
