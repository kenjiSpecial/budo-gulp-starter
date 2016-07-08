const glslify = require('glslify');
const raf = require('raf');
window.THREE = require('three');

const WEBVR = require('./vendors/three/WebVR');
require('./vendors/three/effects/VREffect');
require('./vendors/three/controls/VRControls');
// require('./vendors/three/ViveController');

var ViveController = require('three-vive-controller')(THREE, './')

var camera, scene, renderer;
var geometry, shaderMaterial, mesh;
var room, controls, controller1, controller2;
var effect;
var light;

var testScene, testCamera;
var vivePath = './assets/vr_controller_vive_1_5.obj';
var loader = new THREE.OBJLoader()
var renderer;

require('domready')(() => {
    init();
    loop();
});

function init() {

    scene = new THREE.Scene();

    testCamera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1, 10000)
    testCamera.position.y = 1;
    testCamera.lookAt(new THREE.Vector3(0, 0, 0));

    testScene = new THREE.Scene();

    loader.load(vivePath, function (object) {
        var loader = new THREE.TextureLoader()
        var model = object.children[0]
        model.material.color = new THREE.Color(1, 1, 1);
        model.material.map = loader.load('./assets/onepointfive_texture.png')
        model.material.specularMap = loader.load('./assets/onepointfive_spec.png')

        testScene.add(object);
    });

    testScene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 1.0))
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(10, 10, 10).normalize()
    scene.add(light)



    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x101010)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    window.addEventListener( 'resize', onWindowResize, false );

}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize( window.innerWidth, window.innerHeight );

}

function loop() {
    raf(loop);

    render();
}

function render(){

    renderer.render(testScene, testCamera);
}


