Beli="";
music="";

rightWrist_x = 0;
rightWrist_y = 0;

leftWrist_x = 0;
leftWrist_y = 0;

scoreleftWrist = 0;
scorerightWrist = 0;
function setup() 
{
	canvas =  createCanvas(580, 450);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}
function modelLoaded()
{
    console.log(
		"%cMADE BY - SWASTIK SIBAM NAYAK",
		"color: white; background:linear-gradient(#E66465, #9198E5); padding: 1.2em; border-radius: 6px;"
	);
}
function gotposes(results)
{
    if(results.length > 0)
	{
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}
function preload(){
    Beli = loadSound("Beli.mp3");
    music = loadSound("music.mp3");
}
function draw() 
{
	image(video, 0, 0, 600, 500);
    fill(000000);
    stroke(000000);

    b = Beli.isPlaying();
    console.log(b);

    m = music.isPlaying();
    console.log(m);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        music.stop();
        if(b == false)
        {
            Beli.play();
            console.log("Song Name: BELIEVER SONG");
            document.getElementById("song_name").innerHTML = "Song Name: Believer song";
        } 
    }
    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Beli.stop();
        if(m == false)
        {
            music.play();
            console.log("Song Name: simple_tune_song");
            document.getElementById("song_name").innerHTML = "Song Name: simple tune song"; 
    }
}
}