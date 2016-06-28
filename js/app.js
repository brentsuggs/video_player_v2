$(window).load( function() {
    
    //Bind event handlers to control buttons 
    playPauseBtn.click(togglePlayPause);
    video.click(togglePlayPause);
    volumeBtn.click(toggleVolume);
    volumeSlider.click(setVolume);
    fullscrnBtn.click(toggleFullscreen);
    cc.click(toggleCC); 
    
    video.addEventListener("progress", updateBuffer);
    
    video.addEventListener("canplay", function() {
        duration.html(timeOutput(video.duration));
    });
    
    video.addEventListener("timeupdate", function() {
        updateCurrentTime();
        updateTimeline(); 
        updateHighlightedCaption();
//        console.log(video.currentTime.toFixed(2))
    });
    
    video.addEventListener("ended", function() {
        restart();  
    });
    
    progress.addEventListener("mousedown", dragDown);
    progress.addEventListener("mouseup", dragUp);
    progress.addEventListener('mousemove', dragOver);

    progress.addEventListener("click", clickNav);
    
    for (i=0; i < captions.length; i++) {
        captions[i].addEventListener("click", captionNav); 
    }
});
