import React, { useRef } from "react";
import { OBJModel } from "react-3d-viewer";
import * as tf from "@tensorflow/tfjs";
import * as THREE from "three";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import Cube from "./cube";
import Test from "./test";

const Model = () => {
  // === THREE.JS CODE START ===
  /*  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  var animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate(); */
  // === THREE.JS EXAMPLE CODE END ===
  console.log("Using TensorFlow backend: ", tf.getBackend());
  //loadAndPredict();
  //test

  //fin test
  // const canvas = document.querySelector("canvas");
  const webcamRef = useRef(null);

  const imageRef = useRef(null);

  // const ctx = canvas?.getContext("2d");

  const runBodysegment = async () => {
    const net = await bodyPix.load({
      architecture: "ResNet50",
      outputStride: 32,
      quantBytes: 2,
    });
    console.log("BodyPix model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const detect = async (net) => {
    // Check data is available
    //  console.log(webcamRef);
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      // Make Detections
      // * One of (see documentation below):
      // *   - net.segmentPerson
      // *   - net.segmentPersonParts
      // *   - net.segmentMultiPerson
      // *   - net.segmentMultiPersonParts
      // const person = await net.segmentPerson(video);
      const person = await net.segmentPersonParts(video);
      //    console.log(person);

      //  console.log(canvasRef);

      //image.addEventListener('load', function() {
      // Now that the image has loaded make copy it to the texture.
      // const coloredPartImage = bodyPix.toMask(person);
      if (person) {
        const x = person?.allPoses[0]?.keypoints[5]["position"]["x"];
        const y = person?.allPoses[0]?.keypoints[5]["position"]["y"];

        const widthx = Math.abs(
          person?.allPoses[0]?.keypoints[6]["position"]["x"] - x
        );
        /* console.log("heeeey1");
        console.log(document.getElementById("cu")); */

        const image = imageRef.current;
        image.style.top = y + "px";
        image.style.left = x + "px";
        image.style.width = widthx + "px";

        // console.log(image.style.top);
      }
    }
  };

  runBodysegment();

  const canvasRef = useRef(null);
  function drawImge() {
    const video = webcamRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      // Store the 2D context
      const ctx = canvas.getContext("2d");

      if (window.devicePixelRatio > 1) {
        canvas.width = canvas.clientWidth * 2;
        canvas.height = canvas.clientHeight * 2;
        ctx.scale(2, 2);
      }

      /* ====================== */
      /* ====== VARIABLES ===== */
      /* ====================== */
      let width = canvas.offsetWidth; // Width of the canvas
      let height = canvas.offsetHeight; // Height of the canvas
      const dots = []; // Every dots in an array

      canvas.width = video.video.videoWidth;
      canvas.height = video.video.videoHeight;

      // We want also the canvas to display de image mirrored
      /*  ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      var faceArea = 300;
      var pX = canvas.width / 2 - faceArea / 2;
      var pY = canvas.height / 2 - faceArea / 2;

      ctx.rect(pX, pY, faceArea, faceArea);
      ctx.lineWidth = "6";
      ctx.strokeStyle = "red";
      ctx.stroke(); */
      const DOTS_AMOUNT = 1000; // Amount of dots on the screen
      const DOT_RADIUS = 10; // Radius of the dots
      let PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML
      let PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML
      let PERSPECTIVE = width * 0.8;
      class Dot {
        constructor() {
          this.x = (Math.random() - 0.5) * width; // Give a random x position
          this.y = (Math.random() - 0.5) * height; // Give a random y position
          this.z = Math.random() * width; // Give a random z position
          this.radius = 10; // Size of our element in the 3D world

          this.xProjected = 0;
          this.yProjected = 0;
          this.scaleProjected = 0;

          /*   TweenMax.to(this, Math.random() * 10 + 15, {
            z: width,
            repeat: -1,
            yoyo: true,
            ease: Power2.easeOut,
            yoyoEase: true,
            delay: Math.random() * -25,
          }); */
        }
        // Do some math to project the 3D position into the 2D canvas
        project() {
          this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z);
          this.xProjected = this.x * this.scaleProjected + PROJECTION_CENTER_X;
          this.yProjected = this.y * this.scaleProjected + PROJECTION_CENTER_Y;
        }
        // Draw the dot on the canvas
        draw() {
          this.project();
          ctx.globalAlpha = Math.abs(1 - this.z / width);
          ctx.fillRect(
            this.xProjected - this.radius,
            this.yProjected - this.radius,
            this.radius * 2 * this.scaleProjected,
            this.radius * 2 * this.scaleProjected
          );
        }
      }

      function createDots() {
        // Empty the array of dots
        dots.length = 0;

        // Create a new dot based on the amount needed
        for (let i = 0; i < DOTS_AMOUNT; i++) {
          // Create a new dot and push it into the array
          dots.push(new Dot());
        }
      }

      /* ====================== */
      /* ======== RENDER ====== */
      /* ====================== */
      function render() {
        // Clear the scene
        ctx.clearRect(0, 0, width, height);

        // Loop through the dots array and draw every dot
        for (var i = 0; i < dots.length; i++) {
          dots[i].draw();
        }

        window.requestAnimationFrame(render);
      }

      // Function called after the user resized its screen
      function afterResize() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        if (window.devicePixelRatio > 1) {
          canvas.width = canvas.clientWidth * 2;
          canvas.height = canvas.clientHeight * 2;
          ctx.scale(2, 2);
        } else {
          canvas.width = width;
          canvas.height = height;
        }
        PROJECTION_CENTER_X = width / 2;
        PROJECTION_CENTER_Y = height / 2;
        PERSPECTIVE = width * 0.8;

        createDots(); // Reset all dots
      }

      // Variable used to store a timeout when user resized its screen
      let resizeTimeout;
      // Function called right after user resized its screen
      function onResize() {
        // Clear the timeout variable
        resizeTimeout = window.clearTimeout(resizeTimeout);
        // Store a new timeout to avoid calling afterResize for every resize event
        resizeTimeout = window.setTimeout(afterResize, 500);
      }
      window.addEventListener("resize", onResize);

      // Populate the dots array with random dots
      createDots();
      setTimeout(drawImge, 33);
    }
  }
  setTimeout(drawImge, 33);
  return (
    <div>
      <div
        id="cu"
        ref={imageRef}
        style={{
          position: "absolute",

          width: 50,
          height: 40,
        }}
      >
        aa
        <Test />
      </div>
      hi
      <Webcam
        ref={webcamRef}
        style={{
          marginLeft: "0",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
      {/* <canvas ref={canvasRef} style={{ width: "90%", height: "90%" }} /> */}
      {/* <img
        ref={imageRef}
        src="https://webglfundamentals.org/webgl/resources/keyboard.jpg"
        style={{
          position: "absolute",

          width: 50,
          height: 40,
        }}
      /> */}
    </div>
  );
};

export default Model;
