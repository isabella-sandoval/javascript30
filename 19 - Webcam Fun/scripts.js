const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            // video.src = window.URL.createObjectURL(localMediaStream)
            video.srcObject = localMediaStream;
            // video.src = window.URL.createObjectURL(localMediaStream)

            video.play();
        })
        .catch(error => {
            console.error('Oops', error)
        })
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);

        pixels = redEffect(pixels);
        // pixels = rbgSplit(pixels);

        //ghosting effect
        // ctx.globalAlpha = 0.09;

        ctx.putImageData(pixels, 0, 0);

    }, 16);
};

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.textContent = 'Download Image';
    link.innerHTML = `<img src = "${data}" alt="handsome" />`;
    strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels){
    for(let i = 0; i < pixels.data.length; i+= 4){
        pixels.data[i +0] += 80 //red
        pixels.data[i+1] -= 10 //green
        pixels.data[i+2] -= 40 //blue
    }
    return pixels;
}

function rbgSplit(pixels){
    for(let i = 0; i < pixels.data.length; i+= 4){
        pixels.data[i - 150] += pixels.data[i +0]
        pixels.data[i + 100] = pixels.data[i+1]
        pixels.data[i - 150] = pixels.data[i+2]
    }
    return pixels;
}

function greenScreen(pixels){
    // for(let i = 0; i < pixels.data.length; i+= 4)
}

getVideo();

video.addEventListener('canplay', paintToCanvas)