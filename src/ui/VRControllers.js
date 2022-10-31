"use strict";

import * as THREE from "../../libs/three.module.js";
import { XRControllerModelFactory } from '../../libs/webxr/XRControllerModelFactory.js';

export default class VRControllers{

    constructor(scene, renderer) {
        this.controller1 = renderer.xr.getController( 0 );
        this.controller1.addEventListener( 'selectstart', onSelectStart );
        this.controller1.addEventListener( 'selectend', onSelectEnd );
        this.controller1.addEventListener( 'connected', function ( event ) {

            this.add( buildController( event.data ) );

        } );
        this.controller1.addEventListener( 'disconnected', function () {

            this.remove( this.children[ 0 ] );

        } );
        scene.add( this.controller1 );

        this.controller2 = renderer.xr.getController( 1 );
        this.controller2.addEventListener( 'selectstart', onSelectStart );
        this.controller2.addEventListener( 'selectend', onSelectEnd );
        this.controller2.addEventListener( 'connected', function ( event ) {

            this.add( buildController( event.data ) );

        } );
        this.controller2.addEventListener( 'disconnected', function () {

            this.remove( this.children[ 0 ] );

        } );
        scene.add( this.controller2 );

        // The XRControllerModelFactory will automatically fetch controller models
        // that match what the user is holding as closely as possible. The models
        // should be attached to the object returned from getControllerGrip in
        // order to match the orientation of the held device.

        const controllerModelFactory = new XRControllerModelFactory();

        this.controllerGrip1 = renderer.xr.getControllerGrip( 0 );
        this.controllerGrip1.add( controllerModelFactory.createControllerModel( this.controllerGrip1 ) );
        scene.add( this.controllerGrip1 );

        this.controllerGrip2 = renderer.xr.getControllerGrip( 1 );
        this.controllerGrip2.add( controllerModelFactory.createControllerModel( this.controllerGrip2 ) );
        scene.add( this.controllerGrip2 );

    }

    update() {
        handleController( this.controller1 );
        handleController( this.controller2 );

    }
}

function buildController( data ) {

    let geometry, material;

    switch ( data.targetRayMode ) {

        case 'tracked-pointer':

            geometry = new THREE.BufferGeometry();
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 1 ], 3 ) );
            geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) );

            material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending } );

            return new THREE.Line( geometry, material );

        case 'gaze':

            geometry = new THREE.RingGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
            material = new THREE.MeshBasicMaterial( { opacity: 0.5, transparent: true } );
            return new THREE.Mesh( geometry, material );

    }

}

function handleController( controller ) {

    if ( controller.userData.isSelecting ) {

    }

}

function onSelectStart() {

    this.userData.isSelecting = true;

}

function onSelectEnd() {

    this.userData.isSelecting = false;

}