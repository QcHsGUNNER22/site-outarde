const referenceSounds = {
    dindon: "sounds/dindon.wav",
 
    Assembly_Call: "sounds/Assembly_Call.mp3",
    Cluck: "sounds/Cluck.mp3",
    Cutting_Hen: "sounds/Cutting_Hen.mp3",
    Fly_Down_Cackle: "sounds/Fly_Down_Cackle.mp3",
    Gobbling: "sounds/Gobbling.mp3",
    Kee_Kee_Run: "sounds/Kee_Kee_Run.mp3",
    Purr: "sounds/Purr.mp3",
    Putt: "sounds/Putt.mp3",
    Tree_Call: "sounds/Tree_Call.mp3",
    Yelp_Hen: "sounds/Yelp_Hen.mp3",
    Cluck_Purr: "sounds/Cluck_Purr.mp3",
  };
  
  const animalSelect = document.getElementById("animal");
  const playRefButton = document.getElementById("play-reference");
  const startButton = document.getElementById("start-record");
  const stopButton = document.getElementById("stop-record");
  const userAudio = document.getElementById("user-audio");
  
  let mediaRecorder;
  let audioChunks = [];
  
  playRefButton.addEventListener("click", () => {
    const animal = animalSelect.value;
    const audio = new Audio(referenceSounds[animal]);
    audio.play();
  });
  
  startButton.addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
  
    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };
  
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      userAudio.src = audioUrl;
    };
  
    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  });
  
  stopButton.addEventListener("click", () => {
    mediaRecorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
  });
  