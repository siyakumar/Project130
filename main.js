song="";
leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
scoreLeftWrist=0
scoreRightWrist=0
song2="";
status1="";
status2="";
function setup()
{
  canvas=createCanvas(600, 500);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  poseNet=ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);  
    fill("#FF0000");
    stroke("#FF0000");
    status1=song.isPlaying();
    status2=song2.isPlaying();
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (status1 == false) {
            song.play();
            document.getElementById("speed").innerHTML="Harry Potter Theme Song";
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song.stop();
        if (status2 == false) {
            song2.play();
            document.getElementById("volume").innerHTML="Peter Pan Song";
        }
    }
}

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function modelLoaded()
{
    console.log("poseNet is initialized");
    
}

function gotPoses(results)
{
    if (results.length>0) {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftWristX= "+leftWristX+"rightWristX= "+rightWristX);
        console.log("leftWristY= "+leftWristY+"rightWristY= "+rightWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist= "+scoreLeftWrist);
        console.log("scoreRightWrist= "+scoreRightWrist);
    }
}