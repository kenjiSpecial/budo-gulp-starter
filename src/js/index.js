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

require('domready')(() => {
    init();
    loop();
});

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1, 10000)
    camera.position.z = 0
    scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(6, 6, 6, 10, 10, 10),
        new THREE.MeshBasicMaterial({color: 0x202020, wireframe: true})
    ))


    // scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 1.0))
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(10, 10, 10).normalize()
    scene.add(light)


    var renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setClearColor(0x101010)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    controls = new THREE.VRControls(camera)
    controls.standing = true

    var controller = new ViveController(0, controls)
    scene.add(controller)

    var controller2 = new ViveController(1, controls)
    scene.add(controller2)

    

    effect = new THREE.VREffect( renderer );

    if ( WEBVR.isAvailable() === true ) {

        document.body.appendChild( WEBVR.getButton( effect ) );

    }

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
    controls.update();

    effect.render(scene, camera);
}


