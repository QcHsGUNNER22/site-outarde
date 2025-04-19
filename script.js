const referenceSounds = {
    dindon: "sounds/dindon.mp3",
    bernache: "sounds/bernache.mp3",
    oie: "sounds/oie.mp3"
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
  