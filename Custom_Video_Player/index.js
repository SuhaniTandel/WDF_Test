document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.video-container');
    const video = document.querySelector('.video-player');
    const playPauseBtn = document.querySelector('.play-pause');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.querySelector('.progress-bar');
    const volumeBtn = document.querySelector('.volume-btn');
    const volumeSlider = document.querySelector('.volume-slider');
    const speedSelect = document.querySelector('.speed-select');
    const fullscreenBtn = document.querySelector('.fullscreen');

    function togglePlay() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶';
        }
    }

    playPauseBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.addEventListener('timeupdate', () => {
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percentage}%`;
    });

    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        video.currentTime = percentage * video.duration;
    });

    let previousVolume = 1;
    
    volumeSlider.addEventListener('input', (e) => {
        video.volume = e.target.value;
        volumeBtn.textContent = e.target.value > 0 ? '🔊' : '🔇';
        previousVolume = e.target.value > 0 ? e.target.value : previousVolume;
    });

    volumeBtn.addEventListener('click', () => {
        if (video.volume > 0) {
            previousVolume = video.volume;
            video.volume = 0;
            volumeSlider.value = 0;
            volumeBtn.textContent = '🔇';
        } else {
            video.volume = previousVolume;
            volumeSlider.value = previousVolume;
            volumeBtn.textContent = '🔊';
        }
    });

    speedSelect.addEventListener('change', (e) => {
        video.playbackRate = parseFloat(e.target.value);
    });

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.target === video || e.target === container) {
            switch(e.key.toLowerCase()) {
                case ' ':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'f':
                    fullscreenBtn.click();
                    break;
                case 'm':
                    volumeBtn.click();
                    break;
                case 'arrowleft':
                    video.currentTime = Math.max(video.currentTime - 5, 0);
                    break;
                case 'arrowright':
                    video.currentTime = Math.min(video.currentTime + 5, video.duration);
                    break;
            }
        }
    });
});