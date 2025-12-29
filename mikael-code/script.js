// Add glitter elements dynamically
document.addEventListener('DOMContentLoaded', function() {
    const bgEffects = document.querySelector('.bg-effects');
    
    // Create glitter elements
    for (let i = 0; i < 12; i++) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        
        // Random position
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 4;
        const size = 2 + Math.random() * 4;
        
        glitter.style.top = `${top}%`;
        glitter.style.left = `${left}%`;
        glitter.style.animationDelay = `${delay}s`;
        glitter.style.width = `${size}px`;
        glitter.style.height = `${size}px`;
        
        bgEffects.appendChild(glitter);
    }
    
    // Optional: Add a subtle fade-in effect to the container
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        container.style.opacity = '1';
    }, 300);

    // Simple Music Player with Debugging
document.addEventListener('DOMContentLoaded', function() {
    console.log("Music player script loaded");
    
    // Get elements
    const audio = document.getElementById('background-music');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const volumeSlider = document.getElementById('volume');
    const volumePercent = document.getElementById('volume-percent');
    const musicStatus = document.getElementById('music-status');
    const debugInfo = document.getElementById('debug-info');
    
    // Debug function
    function logDebug(message) {
        console.log("Music Debug:", message);
        debugInfo.textContent = message;
    }
    
    // Check if audio element exists
    if (!audio) {
        logDebug("ERROR: Audio element not found!");
        return;
    }
    
    // Set initial volume
    audio.volume = volumeSlider.value / 100;
    logDebug("Audio element found. Volume: " + volumeSlider.value + "%");
    
    // Audio event listeners for debugging
    audio.addEventListener('loadstart', () => {
        logDebug("Loading audio...");
        musicStatus.textContent = "Loading";
    });
    
    audio.addEventListener('canplay', () => {
        logDebug("Audio can be played. Duration: " + Math.round(audio.duration) + "s");
        musicStatus.textContent = "Ready";
    });
    
    audio.addEventListener('playing', () => {
        logDebug("Now playing");
        musicStatus.textContent = "Playing";
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
    });
    
    audio.addEventListener('pause', () => {
        logDebug("Paused");
        musicStatus.textContent = "Paused";
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    });
    
    audio.addEventListener('ended', () => {
        logDebug("Playback ended");
        musicStatus.textContent = "Ended";
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    });
    
    audio.addEventListener('error', (e) => {
        logDebug("ERROR: " + getAudioError(audio.error));
        musicStatus.textContent = "Error";
        musicStatus.style.background = "rgba(255, 100, 100, 0.3)";
    });
    
    // Function to get readable error message
    function getAudioError(error) {
        if (!error) return "Unknown error";
        switch(error.code) {
            case 1: return "MEDIA_ERR_ABORTED - Playback canceled";
            case 2: return "MEDIA_ERR_NETWORK - Network error";
            case 3: return "MEDIA_ERR_DECODE - File corrupt/unsupported";
            case 4: return "MEDIA_ERR_SRC_NOT_SUPPORTED - Format not supported";
            default: return "Code: " + error.code;
        }
    }
    
    // Play button click
    playBtn.addEventListener('click', function() {
        logDebug("Play button clicked");
        playAudio();
    });
    
    // Pause button click
    pauseBtn.addEventListener('click', function() {
        logDebug("Pause button clicked");
        audio.pause();
    });
    
    // Stop button click
    stopBtn.addEventListener('click', function() {
        logDebug("Stop button clicked");
        audio.pause();
        audio.currentTime = 0;
        musicStatus.textContent = "Stopped";
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    });
    
    // Volume slider
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        audio.volume = volume;
        volumePercent.textContent = this.value + "%";
        logDebug("Volume: " + this.value + "%");
    });
    
    // Function to play audio with error handling
    function playAudio() {
        if (audio.paused) {
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    logDebug("Playback started successfully");
                }).catch(error => {
                    logDebug("Playback failed: " + error.name);
                    
                    if (error.name === 'NotAllowedError') {
                        logDebug("Browser blocked auto-play. Click the play button again.");
                        musicStatus.textContent = "Click again to play";
                        musicStatus.style.background = "rgba(255, 200, 100, 0.3)";
                        
                        // Remove previous listeners and add a simple one
                        playBtn.onclick = function() {
                            audio.play().catch(e => {
                                logDebug("Still blocked: " + e.name);
                            });
                        };
                    }
                });
            }
        }
    }
    
    // Try to preload and check the audio file
    function checkAudioFile() {
        logDebug("Checking audio file...");
        
        // Set a timeout to check if audio loads
        setTimeout(() => {
            if (audio.readyState === 0) {
                logDebug("Audio not loading. Check if file exists.");
                musicStatus.textContent = "File not found";
                musicStatus.style.background = "rgba(255, 100, 100, 0.3)";
            } else if (audio.readyState >= 2) {
                logDebug("Audio loaded successfully");
                musicStatus.textContent = "Ready to play";
            }
        }, 2000);
    }
    
    // Start checking the audio file
    checkAudioFile();
    
    // Force load the audio
    audio.load();
    
    // Try to play automatically after 3 seconds (optional)
    setTimeout(() => {
        if (audio.readyState >= 2) {
            playAudio();
        }
    }, 3000);
});
});