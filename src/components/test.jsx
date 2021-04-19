import React, { Component, useRef, useEffect } from "react";
import { OBJModel } from "react-3d-viewer";
import * as tf from "@tensorflow/tfjs";
import * as THREE from "three";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import { ObjectLoader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import objj from "./common/BaggyT.obj";
import mtll from "./common/BaggyT.mtl";
/* var objj = require("./common/BaggyT.obj");
var mtll = require("./common/BaggyT.mtl"); */
const Test = () => {
  var camera;
  var renderer;
  var scene;
  const cubeRef = useRef(null);

  useEffect(() => {
    console.log("myContainer..", cubeRef.current);
    if (cubeRef.current) {
      console.log("appending");
      cubeRef.current.appendChild(renderer.domElement);
    }
  }, []);

  var width = 1000;
  var height = 700;
  camera = new THREE.PerspectiveCamera(60, width / height, 1, 2100);
  camera.position.z = 115;

  scene = new THREE.Scene();
  //scene.background = new THREE.Color("white");

  var light = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(light);

  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;

  // loading a shirt
  var bol = false;
  var group;
  const manager = new THREE.LoadingManager();
  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };
  manager.onLoad = function () {
    console.log("Loading complete!");
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    renderer.render(scene, camera);
  };
  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };
  manager.onError = function (url) {
    console.log("There was an error loading " + url);
  };
  var mtlLoader = new MTLLoader(manager);
  mtlLoader.load(
    "https://raw.githubusercontent.com/AlouiOmar/movie/master/static/assets/BaggyT.mtl",
    (materials) => {
      materials.preload();

      var objLoader = new OBJLoader(manager);
      objLoader.setMaterials(materials);
      objLoader.load(
        "https://raw.githubusercontent.com/AlouiOmar/movie/master/static/assets/BaggyT.obj",
        (object) => {
          group = object.clone();
          var box = new THREE.Box3().setFromObject(group);
          var center = new THREE.Vector3();
          box.getCenter(center);
          group.position.sub(center); // center the model
          group.rotation.y = Math.PI; // rotate the model
          scene.add(group);
          //this.setUpLines();
          animate();
        }
      );
    }
  );

  //end loading shirt
  var controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.campingFactor = 0.25;
  controls.enableZoom = true;
  var animate = function () {
    requestAnimationFrame(animate);

    renderer.setSize(width, height);
    renderer.clear();
    renderer.render(scene, camera);
    renderer.clearDepth();
  };
  animate();
  return <div ref={cubeRef} />;
};

export default Test;
