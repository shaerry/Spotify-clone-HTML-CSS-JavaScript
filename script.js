console.log("welcome to spotify");
//initialize the variable
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let mastersongname = document.getElementById("mastersongname");
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs = [
  { songname: "salame-e-ishq", filepath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songname: "huqa huqa", filepath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songname: "it's all about you", filepath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songname: "bebe bebe", filepath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songname: "ashiq banaya", filepath: "songs/4.mp3", coverPath: "covers/5.jpg" },
];
 songitem.forEach((element, i)=> {
 console.log(element, 1);
 element.getElementsByTagName("img")[0].src = songs[i].coverPath;
 element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})
audioElement.play(); 

//handle play pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-solid", "fa-play");
    masterPlay.classList.add("fa-solid", "fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-solid", "fa-pause");
    masterPlay.classList.add("fa-solid", "fa-play");
    gif.style.opacity = 0;
  }
});
//listen to events
audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");

  //seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-solid' , 'fa-pause');
        element.classList.add('fa-solid' , 'fa-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-solid' , 'fa-play');
        e.target.classList.add('fa-solid' , 'fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        mastersongname.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-solid', 'fa-play');
        masterPlay.classList.add('fa-solid', 'fa-pause');
        gif.style.opacity = 1;

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid', 'fa-play');
    masterPlay.classList.add('fa-solid', 'fa-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid', 'fa-play');
    masterPlay.classList.add('fa-solid', 'fa-pause');
})