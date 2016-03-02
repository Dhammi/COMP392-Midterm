/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Vector3 = THREE.Vector3;
var CScreen = config.Screen;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    var axes;
    var plane;
    var cube0;
    var cube1;
    var cube2;
    var cube3;
    var cube4;
    var cube5;
    var planeGeometry;
    var cube0CubeGeometry;
    var cube1CubeGeometry;
    var cube2CubeGeometry;
    var cube3CubeGeometry;
    var cube4CubeGeometry;
    var cube5CubeGeometry;
    var planeMaterial;
    var cube0CubeMaterial;
    var cube1CubeMaterial;
    var cube2CubeMaterial;
    var cube3CubeMaterial;
    var cube4CubeMaterial;
    var cube5CubeMaterial;
    var ambientLight;
    var spotLight;
    var tower;
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        /* ENTER CODE HERE */
        // Add an axis helper to the scene
        axes = new AxisHelper(15);
        axes.position.x = 0;
        axes.position.y = 0;
        axes.position.z = 0;
        scene.add(axes);
        console.log("Axis Helper added to the scene");
        // Add a Plane to the Scene
        planeGeometry = new PlaneGeometry(30, 30);
        planeMaterial = new LambertMaterial({ color: 0xFFFFFF });
        plane = new Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.rotation.z = -0.789;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;
        scene.add(plane);
        console.log("Plane added to the scene");
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0x090909);
        scene.add(ambientLight);
        console.log("Ambient Light add to the Scene");
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);
        console.log("SpotLight Light added to the Scene");
        // Create a Cube 0
        cube0CubeGeometry = new CubeGeometry(7, 4, 7);
        cube0CubeMaterial = new LambertMaterial({ color: 0x669966 });
        cube0 = new Mesh(cube0CubeGeometry, cube0CubeMaterial);
        cube0.castShadow = true;
        cube0.receiveShadow = true;
        cube0.position.x = 0;
        cube0.position.y = 0;
        cube0.position.z = 0;
        console.log("Cube 0 created");
        // Create a Cube 1
        cube1CubeGeometry = new CubeGeometry(6, 2, 6);
        cube1CubeMaterial = new LambertMaterial({ color: 0x336699 });
        cube1 = new Mesh(cube1CubeGeometry, cube1CubeMaterial);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        cube1.position.x = 0;
        cube1.position.y = 3;
        cube1.position.z = 0;
        console.log("Cube 1 created");
        // Create a Cube 2
        cube2CubeGeometry = new CubeGeometry(5, 2, 5);
        cube2CubeMaterial = new LambertMaterial({ color: 0xFFFF00 });
        cube2 = new Mesh(cube2CubeGeometry, cube2CubeMaterial);
        cube2.castShadow = true;
        cube2.receiveShadow = true;
        cube2.position.x = 0;
        cube2.position.y = 5;
        cube2.position.z = 0;
        console.log("Cube 2 created");
        // Create a Cube 3
        cube3CubeGeometry = new CubeGeometry(4, 2, 4);
        cube3CubeMaterial = new LambertMaterial({ color: 0x990033 });
        cube3 = new Mesh(cube3CubeGeometry, cube3CubeMaterial);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        cube3.position.x = 0;
        cube3.position.y = 7;
        cube3.position.z = 0;
        console.log("Cube 3 created");
        // Add all the parts to the tower object
        tower = new THREE.Object3D();
        tower.add(cube0);
        tower.add(cube1);
        tower.add(cube2);
        tower.add(cube3);
        // Add humanoid to the Scene
        scene.add(tower);
        console.log("Tower added to the scene");
        // add controls
        gui = new GUI();
        control = new Control(0.02);
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        cube0.rotation.y += control.y_rotationSpeed;
        cube1.rotation.y -= control.y_rotationSpeed;
        cube2.rotation.y += control.y_rotationSpeed;
        cube3.rotation.y -= control.y_rotationSpeed;
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
