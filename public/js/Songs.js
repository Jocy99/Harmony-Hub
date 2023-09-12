const unitedStates = '1313621735';
const japan = '1362508955';
const unitedKingdom = '1111142221';
const world = '3155776842';
const mexico = '1111142361';
const france = '1109890291';
const top10Container = document.getElementById('Top10Container');
const top10songs = document.getElementById('topten');
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
   /*   const songDetailRow = `
		<div>
			<table>
				<tbody>
					<tr>
						<td data-title=${song.title}>${song.title}</td>
						<td data-artist=${song.artist.name}>${song.artist.name}</td>
						<td data-album=${song.album.title}>${song.album.title}</td>
						<td><button class="savebtn">SAVE</button></td>
					</tr>
				</tbody>
			</table>
		<div>
		`; */
      const songDetailRow = `
<tr>
  <td data-title=${song.title}>${song.title}</td>
  <td data-artist=${song.artist.name}>${song.artist.name}</td>
  <td data-album=${song.album.title}>${song.album.title}</td>
  <td><button class="savebtn">SAVE</button></td>
</tr>
`;
     // console.log(top10songs);
      songList.push(songDetailRow);
    });

    console.log("All Songs: ", songList);
   // top10Container.innerHTML = songList;
    top10songs.innerHTML = songList;

    const saveButtons = document.querySelectorAll('.savebtn');
    saveButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        console.log("Target: ", event.target);
   
        console.log("Target: ", event.target.parentElement);
    
        console.log("Target: ", event.target.parentElement.previousElementSibling);
        console.log("Target: ", event.target.parentElement.previousElementSibling.value);

       // console.log("Target: ", event.target.parentElement).siblings('data-title');
       // const title = event.target.getAttribute('data-title');
        const title = event.target.parentElement.previousElementSibling.value
        const artistName = event.target.getAttribute('data-artist');
        const albumTitle = event.target.getAttribute('data-album');
        console.log("Data: ", title, artistName, albumTitle);
        // save the selected song to the Current Users Playlist
        // What should be our ENDPOIHT and HTTP METHOD (Data if needed) 
        fetch('/api/users/addSong', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ title, artistName, albumTitle })
        })
        // saveSong(title, artistName, albumTitle);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

genreDropdown.addEventListener('change', fetchSongs);

fetchSongs();
