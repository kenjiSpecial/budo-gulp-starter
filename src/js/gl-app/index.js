"use strict";

var THREE = require('three');
require('../vendors/OrbitControls')(THREE);
var _ = require('underscore');

import App from "../lib/app";

var size = require('size');
var sniffer = require('sniffer')
var Stats = require('stats.js');

var TweenMax = require('gsap');

import oui from "ouioui"
let gui;

import Loader from "./scenes/loader";
import Main from "./scenes/main";


export default class GLApp {
    constructor() {
        _.bindAll(this, 'onWindowResize', 'loop', 'onLoaded');
        var params = {
            hideButton: false, // Default: false.
            isUndistorted: false // Default: false.
        };

        this.camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 10000);
        this.camera.position.set(0, 10, 10);
        this.camera.lookAt(new THREE.Vector3())

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor(0x000);



        var devicePixelRatio = 1;
        if (sniffer.isDesktop) devicePixelRatio = window.devicePixelRatio;
        this.renderer.setPixelRatio(devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setSize(size.width, size.height);


        this.clock = new THREE.Clock();

        if (App.isDebug) {
            this.stats = new Stats();
            document.body.appendChild(this.stats.dom);

            // oui({test: 100})
            gui = oui.datoui(null, _=> console.log(_))
            let b = {test: 10}
            var f1 = gui.addFolder({label: 'folder1', open: true})
            f1.add(b, 'test')

        }

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

        this.scenes = {
            "loader": new Loader(this.camera),
        }

        App.page = "loader";


        size.addListener(this.onWindowResize);
        this.onWindowResize();
        window.addEventListener('vrdisplaypresentchange', this.onWindowResize, true);

        window.camera = this.camera;
    }

    start() {
        if (App.page == "loader") this.startLoadAssets();



        this.clock.start();

        TweenLite.ticker.addEventListener("tick", this.loop, this);

    }

    startLoadAssets() {
        this.scenes[App.page].animateIn();
        this.scenes[App.page].startLoad();
        this.scenes[App.page].addEventListener('loaded', this.onLoaded)
    }

    onLoaded() {
        // create all scenes after having loaded assets
        _.extend(this.scenes, {
            "main": new Main(this.camera)
        });

        App.page = "main";
        this.scenes[App.page].animateIn();
    }

    loop() {
        var curScene = this.scenes[App.page];

        if (this.stats) this.stats.update();

        var delta = this.clock.getDelta();

        this.renderer.render(curScene, this.camera);

    }

    onWindowResize() {

        this.renderer.setSize(size.width, size.height);

        this.camera.aspect = size.width / size.height;
        this.camera.updateProjectionMatrix();

    }

}