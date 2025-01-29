// Global Variables
let audioPlayer = new Audio();
let isPlaying = false;
let currentSongIndex = 0;

// Updated Songs List
const songsList = [
    'songsplaylist/Aaj Ki Raat - Stree 2 320 Kbps.mp3',
    'songsplaylist/Aayi Nai - Stree 2 320 Kbps.mp3',
    'songsplaylist/audio1.mp3',
    'songsplaylist/Bhool Bhulaiyaa 3 - Title Track (Feat. Pitbull) - Bhool Bhulaiyaa 3 320 Kbps.mp3',
    'songsplaylist/Phir Se Ud Chala - Rockstar 320 Kbps.mp3',
    'songsplaylist/Hauli Hauli - Khel Khel Mein 320 Kbps.mp3',
    'songsplaylist/In Love - Guru Randhawa 320 Kbps.mp3',
    'songsplaylist/Ittar - Jasmine Sandlas 320 Kbps.mp3',
    'songsplaylist/Kissik - Pushpa 2 The Rule 320 Kbps.mp3',
    'songsplaylist/Mera Na - Sidhu Moose Wala 320 Kbps.mp3',
    'songsplaylist/Saanware - Akhil Sachdeva 320 Kbps.mp3',
    'songsplaylist/Aaj Ki Raat - Stree 2 320 Kbps.mp3',
    'songsplaylist/Aayi Nai - Stree 2 320 Kbps.mp3',
    'songsplaylist/audio1.mp3',
    'songsplaylist/Bhool Bhulaiyaa 3 - Title Track (Feat. Pitbull) - Bhool Bhulaiyaa 3 320 Kbps.mp3',
    'songsplaylist/Phir Se Ud Chala - Rockstar 320 Kbps.mp3',
    'songsplaylist/Hauli Hauli - Khel Khel Mein 320 Kbps.mp3',
    'songsplaylist/In Love - Guru Randhawa 320 Kbps.mp3',
    'songsplaylist/Ittar - Jasmine Sandlas 320 Kbps.mp3',
    'songsplaylist/Kissik - Pushpa 2 The Rule 320 Kbps.mp3',
    'songsplaylist/Mera Na - Sidhu Moose Wala 320 Kbps.mp3',
    'songsplaylist/Saanware - Akhil Sachdeva 320 Kbps.mp3'
];

function playSong(songUrl) {
    // If the selected song is not the current one
    if (audioPlayer.src !== songUrl) {
        if (!audioPlayer.paused) {
            audioPlayer.pause(); // Pause the current song
        }

        // Update the audio source to the new song
        audioPlayer.src = songUrl;
        audioPlayer.load(); // Load the new audio file
        isPlaying = false;
    }

    // Toggle play/pause functionality
    if (audioPlayer.paused) {
        // Attempt to play the audio
        audioPlayer
            .play()
            .then(() => {
                isPlaying = true;
                document.getElementById('play').src = "img/pause.svg"; // Change to pause icon
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    console.error("Error playing the audio:", error);
                }
            });
    } else {
        // Pause the audio if it's playing
        audioPlayer.pause();
        isPlaying = false;
        document.getElementById('play').src = "img/play.svg"; // Change to play icon
    }

    // Update song information display
    const songTitle = songUrl.split('/').pop().split('.')[0];
    const songInfo = document.querySelector('.songinfo');
    if (songInfo) {
        songInfo.innerText = songTitle;
    }
}



// Function to play the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songsList.length; // Loop to the first song if at the end
    playSong(songsList[currentSongIndex]);
}

// Function to play the previous song
function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songsList.length) % songsList.length; // Loop to the last song if at the start
    playSong(songsList[currentSongIndex]);
}

// Attach event listener for play button
const playButton = document.getElementById('play');

if (playButton) {
    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            // Attempt to play the audio
            audioPlayer
                .play()
                .then(() => {
                    isPlaying = true;
                    playButton.src = "img/pause.svg"; // Update icon to pause
                })
                .catch((error) => {
                    if (error.name !== "AbortError") {
                        console.error("Error playing the audio:", error);
                    }
                });
        } else {
            // Pause the audio
            audioPlayer.pause();
            isPlaying = false;
            playButton.src = "img/play.svg"; // Update icon to play
        }
    });
}


const nextButton = document.getElementById('next');
if (nextButton) {
    nextButton.addEventListener('click', nextSong);
}

const previousButton = document.getElementById('previous');
if (previousButton) {
    previousButton.addEventListener('click', previousSong);
}

// Function to update the volume based on the input range
const volumeRange = document.querySelector('.range input');
if (volumeRange) {
    volumeRange.addEventListener('input', function () {
        audioPlayer.volume = this.value / 100;
    });
}

// Dynamically create the song list
const songUL = document.querySelector('.songList ul');
if (songUL) {
    songsList.forEach((song, index) => {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img class="invert" src="img/music.svg" alt="music icon">
            <div class="info">
                <div>${song.split('/').pop().split('.')[0]}</div>
                <div>charu</div> <!-- Replace with actual artist names -->
            </div>
            <div class="Playnow">
                <span>Play Now</span>
                <img class="invert playNowBtn" src="img/play.svg" alt="play">
            </div>
        `;
        listItem.querySelector('.Playnow').addEventListener('click', () => {
            currentSongIndex = index;
            playSong(song);
        });
        songUL.appendChild(listItem);
    });
}

// Handle errors globally for audio
audioPlayer.addEventListener('error', (e) => {
    console.error("Audio error occurred:", e);
});
