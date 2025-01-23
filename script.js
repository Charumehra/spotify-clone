console.log("lets write some javascript");

let currentSongIndex = 0;
let audioPlayer = new Audio();
let isPlaying = false;
let songsList = [
    'Aaj Ki Raat - Stree 2 320 Kbps.mp3',
    'Aayi Nai - Stree 2 320 Kbps.mp3',
    'audio1.mp3',
    'Bhool Bhulaiyaa 3 - Title Track (Feat. Pitbull) - Bhool Bhulaiyaa 3 320 Kbps.mp3',
    'Phir Se Ud Chala - Rockstar 320 Kbps.mp3',
    'Hauli Hauli - Khel Khel Mein 320 Kbps.mp3',
    'In Love - Guru Randhawa 320 Kbps.mp3',
    'Ittar - Jasmine Sandlas 320 Kbps.mp3',
    'Kissik - Pushpa 2 The Rule 320 Kbps.mp3',
    'Mera Na - Sidhu Moose Wala 320 Kbps.mp3',
    'Saanware - Akhil Sachdeva 320 Kbps.mp3'
];

// Function to play the selected song
function playSong(songUrl) {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        document.getElementById('play').src = "img/play.svg";  // Change to play icon
    }

    // Set the audio source and start playing the song
    audioPlayer.src = songUrl;
    audioPlayer.play();
    isPlaying = true;
    document.getElementById('play').src = "img/pause.svg";  // Change to pause icon

    // Update the song information display (you can modify this for your needs)
    let songTitle = songUrl.split('/').pop().split('.')[0];
    let songInfo = document.querySelector('.songinfo');
    if (songInfo) {
        songInfo.innerText = songTitle;  // Ensure this element exists
    }
}

// Function to play the next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songsList.length) {
        currentSongIndex = 0; // Loop back to the first song
    }
    playSong(songsList[currentSongIndex]);
}

// Function to play the previous song
function previousSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songsList.length - 1; // Loop back to the last song
    }
    playSong(songsList[currentSongIndex]);
}

// Attach event listeners for play, previous, and next buttons
const playButton = document.getElementById('play');
if (playButton) {
    playButton.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
            playButton.src = "img/play.svg";  // Change to play icon
        } else {
            audioPlayer.play();
            isPlaying = true;
            playButton.src = "img/pause.svg";  // Change to pause icon
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
    volumeRange.addEventListener('input', function() {
        audioPlayer.volume = this.value / 100;
    });
}
