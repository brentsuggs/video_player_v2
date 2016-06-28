//Video Player Controls 
//Author: Brent Suggs
////////////////////////

//variables

var video = $('.video-container video')[0]; 
var player = $('#player');
var timelineBar = $('#timeline-bar');
var timeline = $('#timeline'); 
var progress = document.getElementById('progress');
var buffer = document.getElementById('buffer'); 
var controls = $('#control-bar'); 
var playPauseBtn = $('#play-pause');
var volumeBtn = $('#volume');
var volumeSlider = $('#vol-slider');
var fullscrnBtn = $('#fullscreen');
var cc = $('#cc'); 
var currentTime = $('#current');
var duration = $('#duration');
var captions = $('.captions span'); 
var timeDrag = false; 

/////////////////////////
////    UTILITIES   /////
/////////////////////////

//convert seconds to time format for display
function timeOutput(seconds) {
    var date = new Date(null); 
    var time; 
    
    date.setSeconds(seconds); 
    time = date.toISOString().substr(14,5); 
    return time
}

function progress(current, duration) {
    var p = (current / duration) * 100;
    p = p.toFixed(2); 
    return p; 
}

function restart () {
    video.currentTime = 0.0; 
    playPauseBtn.children('img').attr('src', 'icons/play-icon.png');
}

//toggle the play and pause function of the 
//video element and update button image
function togglePlayPause () {
    if (video.paused) {
        video.play(); 
        playPauseBtn.children('img').attr('src', 'icons/pause-icon.png'); 
    } else {
        video.pause();
        playPauseBtn.children('img').attr('src', 'icons/play-icon.png'); 
    }  
}

//toggle the muted property of the video
//element and update the button image
function toggleVolume () {
    if (video.muted) {
        video.muted = false; 
        volumeBtn.children('img').attr('src', 'icons/volume-on-icon.png');
    } else {
        video.muted = true; 
        volumeBtn.children('img').attr('src', 'icons/volume-off-icon.png');
    }
}

function setVolume () {
    var value = volumeSlider.val() / 100; 
    video.volume = value;
}

//toggle fullscreen mode
function toggleFullscreen () {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
}

//toggle video closed captions
 function toggleCC () {
     if (video.textTracks[0].mode === "hidden") {
         video.textTracks[0].mode = "showing"; 
         cc.addClass("showing");
     } else {
         video.textTracks[0].mode = "hidden"
         css.removeClass("showing");
     }
 }

//Update buffer value 
function updateBuffer () {
        if (video.buffered.length == 1) {
            var percentage = ( video.buffered.end(0) / video.duration ) * 100;
            buffer.value = percentage; 
        }

}


//update the current time display and the 
//timeline with the currentTime property 
//of the video element
function updateCurrentTime () {
    var time = timeOutput(video.currentTime); 
    currentTime.html(time);
}

function updateTimeline () { 
    var percentage = ( video.currentTime / video.duration ) * 100; 
    progress.value = percentage; 
}

function highlight(num) {
    $('.highlight').removeClass("highlight");
    if (num != null) {
        $(num).addClass("highlight");
    }     
}

function updateHighlightedCaption () {
    var time = video.currentTime.toFixed(2); 
    
    if (time >= 0.18 && time < 4.13) {
            highlight('#1'); 
    } else if (time >= 4.13 && time < 7.54) {
            highlight('#2');
    } else if (time >= 7.54 && time < 11.27) {
            highlight('#3');    
    } else if (time >= 11.27 && time < 13.96) {
            highlight('#4');    
    }  else if (time >= 13.96 && time < 17.94) {
            highlight('#5');    
    } else if (time >= 17.94 && time < 22.37) {
            highlight('#6');    
    } else if (time >= 22.37 && time < 26.88) {
            highlight('#7');    
    } else if (time >= 26.88 && time < 30.92) {
            highlight('#8');    
    } else if (time >= 32.10 && time < 34.73) {
            highlight('#9');    
    } else if (time >= 34.73 && time < 39.43) {
            highlight('#10');    
    } else if (time >= 39.43 && time < 41.19) {
            highlight('#11');    
    } else if (time >= 42.35 && time < 46.30) {
            highlight('#12');    
    } else if (time >= 46.30 && time < 49.27) {
            highlight('#13');   
    } else if (time >= 49.27 && time < 53.76) {
            highlight('#14');    
    } else if (time >= 53.76 && time < 57.78) {
            highlight('#15');    
    } else if (time >= 57.78 && time < 61) {
            highlight('#6');    
    } else {
            highlight(null); 
    }
}

// *** PROGRESS BAR DRAG AND CLICK NAVIGATION ***

function dragDown(e) {
	timeDrag = true;
	updateBar(e.offsetX);
}

function dragUp(e) {
	if(timeDrag) {
		timeDrag = false;
		updateBar(e.offsetX);
	}
}

function dragOver(e) {
	if(timeDrag) {
		updateBar(e.offsetX);
	}
}

function clickNav(e) {
	updateBar(e.offsetX);
}

function updateBar(x) {
	//variable for where user put mouse
	var position = x;
	//convert to percentage 
	var percentage = 100 * position / progress.offsetWidth;

	//don't allow navigation beyond the end or before the start of video
	if(percentage > 100) {
		percentage = 100;
	}
	if(percentage < 0) {
		percentage = 0;
	}
	progress.value = percentage;
	video.currentTime = video.duration * percentage / 100;
}


// *** CAPTIONS CLICK NAVIGATION ***

function captionNav() {
    adjustedTime = this.dataset.starttime
    video.currentTime = adjustedTime; 
}