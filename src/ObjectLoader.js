"use strict"

import * as THREE from "../libs/three.module.js";
import {OBJLoader} from "../libs/OBJLoader.js";

export default class ObjectLoader {

    init(scene) {
        // // instantiate a loader
        // const loader2 = new THREE.TextureLoader();
        //
        // // load a resource
        // loader2.load(
        //     // resource URL
        //     '../assets/images/rock.png',
        //
        //     // onLoad callback
        //     function (texture) {
        //         // in this example we create the material when the texture is loaded
        //         loader2.material = new THREE.MeshBasicMaterial({
        //             map: texture
        //         });
        //     },
        //
        //     // onProgress callback currently not supported
        //     undefined,
        //
        //     // onError callback
        //     function (err) {
        //         console.error('An error happened.');
        //     }
        // );

        const loader = new OBJLoader();

        // load a resource
        loader.load(
            // resource URL
            '../assets/models/Lowpoly_tree_sample.obj',
            // called when resource is loaded
            function (object) {

                object.mesh.material =  new THREE.MeshStandardMaterial( { color: THREE.Color.NAMES.green } );
                object.position.set(0.5, 3.5, 0);
                object.mesh.castShadow = true;
                object.mesh.receiveShadow = false;
                object.scale.set(0.05, 0.05, 0.05);
                scene.add(object);

            },
            // called when loading is in progresses
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {

                console.log('An error happened' + error);

            }
        );
    }
}