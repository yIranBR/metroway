const video = document.getElementById('myVideo');
const playPauseButton = document.getElementById('playPause');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');
const backVideoButton = document.getElementById('backVideo');
const nextVideoButton = document.getElementById('nextVideo');

function togglePlayPause() {
    if (video.paused || video.ended) {
        video.play();
        playPauseButton.querySelector('img').src = './storage/content/icons/video-controler/pause-btn-icon.svg'; // Ícone de pausa
    } else {
        video.pause();
        playPauseButton.querySelector('img').src = './storage/content/icons/video-controler/play-btn-icon.svg'; // Ícone de play
    }
}

function updateProgress() {
    const progressPercent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

//Click set progress video
function setProgress(e) {
    const newTime = (e.offsetX / progressContainer.offsetWidth) * video.duration;
    video.currentTime = newTime;
}

//Next 10s
function skipForward() {
    if (video.currentTime + 10 <= video.duration) {
        video.currentTime += 10;
    } else {
        video.currentTime = video.duration;
    }
}

// Back 10s
function skipBackward() {
    if (video.currentTime - 10 >= 0) {
        video.currentTime -= 10;
    } else {
        video.currentTime = 0; 
    }
}

playPauseButton.addEventListener('click', togglePlayPause);
video.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
nextVideoButton.addEventListener('click', skipForward);
backVideoButton.addEventListener('click', skipBackward);