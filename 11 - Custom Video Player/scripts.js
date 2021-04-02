// get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');



//build functions

function togglePlay(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    // console.log(this);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

//visually on bar
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubtime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubtime;
}

//hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
    button.addEventListener('click', skip)
})

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate)
})

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', scrub)

