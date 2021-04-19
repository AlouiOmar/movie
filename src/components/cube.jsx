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
    width: 1350,
    height: 1350,
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
  //scene.add(cube);
  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = 1350;
    sizes.height = 1350;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
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
  var mtlLoader = new MTLLoader();
  mtlLoader.load(
    "https://raw.githubusercontent.com/AlouiOmar/movie/master/static/assets/BaggyT.mtl",
    (materials) => {
      materials.preload();
      console.log("mtl");
      console.log(materials);
      var objLoader = new OBJLoader(manager);
      //objLoader.setMaterials(materials);
      objLoader.load(
        "https://raw.githubusercontent.com/AlouiOmar/movie/master/static/assets/BaggyT.obj",
        (object) => {
          console.log("obj");
          console.log(object);
          object.traverse(function (child) {
            //This allow us to check if the children is an instance of the Mesh constructor
            if (child instanceof THREE.Mesh) {
              console.log("child");
              child.material.color = new THREE.Color(0xf25922);

              //Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
              child.geometry.computeVertexNormals();
            }
          });

          object.name = "Baggy T";
          console.log("material");
          console.log(object.materials);
          group = object.clone();
          group.name = "Baggy T";
          var box = new THREE.Box3().setFromObject(group);
          var center = new THREE.Vector3();
          box.getCenter(center);
          group.position.sub(center); // center the model
          group.rotation.y = Math.PI; // rotate the model
          scene.add(group);
          bol = true;
          const el = scene.getObjectByName("Baggy T");
          //el.position.set(0, -150, 0);
          //el.material.color.set(0x50c878);
          console.log("e1");
          console.log(el);
          /*   var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          var el1 = new THREE.Mesh(el, material);
          scene.add(el1); */
          //setUpLines();
          //animate();
        }
      );
    }
  );

  /*  var lights;
  var point1;
  var line;
  var lines = [];

  var raycaster = new THREE.Raycaster();
  var setUpLines = function () {
    lights.forEach((light, index) => {
      line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(),
          new THREE.Vector3(),
        ]),
        new THREE.LineBasicMaterial({ color: "black" })
      );
      scene.add(line);
      var pos = new THREE.Vector2();
      pos.set(-0.7 + (7 / 15) * index, 0.7);

      lines.push({ line: line, position: pos });
      var mesh = getObject(light.id);
      mesh.geometry.computeBoundingBox();
      var center = new THREE.Vector3();
      mesh.geometry.boundingBox.getCenter(center);
      mesh.geometry.center();
      mesh.position.copy(center);
      var point2 = new THREE.Vector3();
      point2 = mesh.position;
      line.geometry.attributes.position.setXYZ(1, point2.x, point2.y, point2.z);
    });
  };
  var getObject = function (name) {
    for (let child of group.children) {
      if (child.name === name) {
        return child;
      }
    }
    return null;
  };
  var animate = function () {
    requestAnimationFrame(animate);
    point1 = new THREE.Vector3();

    lines.forEach((line) => {
      raycaster.setFromCamera(line.position, camera);
      raycaster.ray.at(4, point1);
      line.line.geometry.attributes.position.setXYZ(
        0,
        point1.x,
        point1.y,
        point1.z
      );
      line.line.geometry.attributes.position.needsUpdate = true;
    });
    renderer.clear();
    renderer.render(scene, camera);
    renderer.clearDepth();
  }; */

  //end loading shirt

  camera.position.z = 5;
  var animate = function () {
    requestAnimationFrame(animate);
    /* var ambientLight = new THREE.AmbientLight(0xbbbbbb);
    scene.add(ambientLight); */
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.setSize(sizes.width, sizes.height);
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
