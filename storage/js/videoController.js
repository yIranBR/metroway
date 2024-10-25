const video = document.getElementById('myVideo');
const playPauseButton = document.getElementById('playPause');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');
const backVideoButton = document.getElementById('backVideo');
const nextVideoButton = document.getElementById('nextVideo');
const videoPopup = document.getElementById('myVideoPopup');

function togglePlayPause() {
    if (video.paused || video.ended) {
        video.play();
        videoPopup.play();
        playPauseButton.querySelector('img').src = './storage/content/icons/video-controler/pause-btn-icon.svg'; // Ícone de pausa
    } else {
        video.pause();
        videoPopup.pause();
        playPauseButton.querySelector('img').src = './storage/content/icons/video-controler/play-btn-icon.svg'; // Ícone de play
    }
}

function updateProgress() {
    const progressPercent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const newTime = (e.offsetX / progressContainer.offsetWidth) * video.duration;
    video.currentTime = newTime;
    videoPopup.currentTime = newTime;
}

// Next 10s
function skipForward() {
    if (video.currentTime + 10 <= video.duration) {
        video.currentTime += 10;
        videoPopup.currentTime += 10;
    } else {
        video.currentTime = video.duration;
        videoPopup.currentTime = video.duration;
    }
}

// Back 10s
function skipBackward() {
    if (video.currentTime - 10 >= 0) {
        video.currentTime -= 10;
        videoPopup.currentTime -= 10;
    } else {
        video.currentTime = 0; 
        videoPopup.currentTime = 0;
    }
}

// Sincroniza o vídeo popup com o vídeo principal
function syncVideos() {
    videoPopup.currentTime = video.currentTime;
    if (video.paused || video.ended) {
        videoPopup.pause(); // Pausa o vídeo popup se o principal estiver pausado ou terminado
    } else {
        videoPopup.play(); // Reproduz o vídeo popup se o principal estiver tocando
    }
}

playPauseButton.addEventListener('click', togglePlayPause);

video.addEventListener('timeupdate', () => {
    updateProgress();
    syncVideos();
});

progressContainer.addEventListener('click', setProgress);
nextVideoButton.addEventListener('click', skipForward);
backVideoButton.addEventListener('click', skipBackward);
