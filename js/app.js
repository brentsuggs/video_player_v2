$(window).load( function() {
    
//**** BIND EVENT HANDLERS ****
    
    //DISPLAY DURATION (once value is available) 
    video.addEventListener("canplay", function() {
        duration.html(timeOutput(video.duration));
    });
    
    //PLAY-PAUSE 
    playPauseBtn.click(togglePlayPause);
    video.click(togglePlayPause);
    
    //VOLUME - CAPTIONS
    volumeBtn.click(toggleVolume);
    volumeSlider.click(setVolume).mousedown(setVolume).mouseup(setVolume);
    
    cc.click(toggleCC); 
    
    //FULLSCREEN 
    fullscrnBtn.click(toggleFullscreen);
    
    
    //BUFFER
    video.addEventListener("progress", updateBuffer);
    
    //CURRENT TIME(CT)
    video.addEventListener("timeupdate", function() {
        //DISPLAY CT
        updateCurrentTime();
        //DISPLAY CT ON TIMELINE
        updateTimeline(); 
        //HIGHLIGHT CAPTION ON CUE 
        updateHighlightedCaption();
    });
     
    
    //EVENT HANDLERS FOR DRAGGABLE PROGRESS BAR NAV AND CAPTIONS NAV
    progress.addEventListener("mousedown", dragDown);
    progress.addEventListener("mouseup", dragUp);
    progress.addEventListener('mousemove', dragOver);
    progress.addEventListener("click", clickNav);
    
    //EVENT FOR EACH CAPTION FOR NAVIGATION 
    for (i = 0; i < captions.length; i++) {
        captions[i].addEventListener("click", captionNav); 
    }
    
    //RESET VIDEO @ END 
     video.addEventListener("ended", videoReset ); 
});
