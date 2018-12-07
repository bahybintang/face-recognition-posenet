let capture;
let nose = {x: 0, y: 0};
let leftEar = {x: 0, y: 0};
let rightEar = {x: 0, y: 0};
let leftEye = {x: 0, y: 0};
let rightEye = {x: 0, y: 0};
let windowX = 640;
let windowY = 480;


function setup() {
  createCanvas(windowX, windowY);
  capture = createCapture(VIDEO);
  capture.size(windowX, windowY);
  capture.hide();
  poseNet = ml5.poseNet(capture, modelReady);
  poseNet.on('pose', drawFace);
}

function drawFace(poses){
  if(poses.length > 0){
    nose.x = poses[0].pose.keypoints[0].position.x;
    nose.y = poses[0].pose.keypoints[0].position.y;
    leftEar.x = poses[0].pose.keypoints[3].position.x;
    leftEar.y = poses[0].pose.keypoints[3].position.y;
    rightEar.x = poses[0].pose.keypoints[4].position.x;
    rightEar.y = poses[0].pose.keypoints[4].position.y;
    leftEye.x = poses[0].pose.keypoints[1].position.x;
    leftEye.y = poses[0].pose.keypoints[1].position.y;
    rightEye.x = poses[0].pose.keypoints[2].position.x;
    rightEye.y = poses[0].pose.keypoints[2].position.y;
    distance();
  }
}

function modelReady(){
 	 select("#status").html("WebCam Loaded");
}

function distance(){
  let camDistance = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
  let dis = map(camDistance, 0, windowX, 100, 0);
	select("#distance").html(dis);
}

function draw() {
  background(220);
  image(capture, 0, 0, windowX, windowY);
  stroke(255, 255, 255);
  noFill();
  rect(rightEar.x, rightEar.y - 0.6*(leftEar.x - rightEar.x), leftEar.x - rightEar.x, 1.2*(leftEar.x - rightEar.x));
}