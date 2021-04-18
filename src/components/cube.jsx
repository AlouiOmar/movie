import React, { Component, useRef, useEffect } from "react";
import { OBJModel } from "react-3d-viewer";
import * as tf from "@tensorflow/tfjs";
import * as THREE from "three";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import { ObjectLoader } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import objj from "./common/BaggyT.obj";
import mtll from "./common/BaggyT.mtl";
/* var objj = require("./common/BaggyT.obj");
var mtll = require("./common/BaggyT.mtl"); */
const Cube = () => {
  const cubeRef = useRef(null);

  useEffect(() => {
    console.log("myContainer..", cubeRef.current);
    if (cubeRef.current) {
      console.log("appending");
      cubeRef.current.appendChild(renderer.domElement);
    }
  }, []);

  const sizes = {
    width: 350,
    height: 350,
  };

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //document.body.appendChild(renderer.domElement);
  //cubeRef.current.appendChild(renderer.domElement);
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = 350;
    sizes.height = 350;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  // loading a shirt
  var group;
  var mtlLoader = new MTLLoader();
  mtlLoader.load(
    "https://raw.githubusercontent.com/ndzyborska/three-vue/master/vue-three/front/static/assets/basic.mtl",
    (materials) => {
      materials.preload();

      var objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        "https://raw.githubusercontent.com/ndzyborska/three-vue/master/vue-three/front/static/assets/basic.obj",
        (object) => {
          group = object.clone();
          scene.add(group);
        }
      );
    }
  );

  //end loading shirt
  camera.position.z = 5;
  var animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  };
  animate();
  return <div ref={cubeRef} />;
};

export default Cube;
/* const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();
  mtlLoader.load(
    "https://raw.githubusercontent.com/ndzyborska/three-vue/master/vue-three/front/static/assets/basic.mtl",
    (mtl) => {
      console.log("loading");
      console.log(mtll);
      console.log(mtl);
      mtl.preload();
      objLoader.setMaterials(mtl);
      // load a resource
      objLoader.load(
        // resource URL relative to the /public/index.html of the app
        "https://raw.githubusercontent.com/ndzyborska/three-vue/master/vue-three/front/static/assets/basic.obj",
        // called when resource is loaded
        (object) => {
          console.log("obj");
          console.log(object);
          scene.add(object);

          // get the newly added object by name specified in the OBJ model (that is Elephant_4 in my case)
          // you can always set console.log(scene) and check its children to know the name of a model
           const el = scene.getObjectByName("Baggy T"); 

          // change some custom props of the element: placement, color, rotation, anything that should be
          // done once the model was loaded and ready for display
            el.position.set(0, -150, 0);
          el.material.color.set(0x50c878);
          el.rotation.x = 23.5; 

          // make this element available inside of the whole component to do any animation later
             this.model = el; 
        }
        // called when loading is in progresses
        /*  (xhr) => {
        const loadingPercentage = Math.ceil((xhr.loaded / xhr.total) * 100);
        console.log(loadingPercentage + "% loaded");

        // update parent react component to display loading percentage
        this.props.onProgress(loadingPercentage);
      },
      // called when loading has errors
      (error) => {
        console.log("An error happened:" + error);
      } 
      );
    }
  ); */
