import * as THREE from "three";


// ============================================================
// MATERIALS
// ============================================================

const materials = {

    white:
        new THREE.MeshStandardMaterial({
            color: 0xe9eef2,
            roughness: 0.32,
            metalness: 0.08
        }),

    whiteDark:
        new THREE.MeshStandardMaterial({
            color: 0xb8c3cc,
            roughness: 0.38,
            metalness: 0.08
        }),

    black:
        new THREE.MeshStandardMaterial({
            color: 0x10151b,
            roughness: 0.28,
            metalness: 0.55
        }),

    dark:
        new THREE.MeshStandardMaterial({
            color: 0x202a33,
            roughness: 0.3,
            metalness: 0.45
        }),

    glass:
        new THREE.MeshPhysicalMaterial({
            color: 0x07131c,
            roughness: 0.12,
            metalness: 0.15,
            transmission: 0.12,
            transparent: true,
            opacity: 0.95
        }),

    blue:
        new THREE.MeshStandardMaterial({
            color: 0x4bb8d9,
            roughness: 0.25,
            metalness: 0.15
        }),

    cyan:
        new THREE.MeshStandardMaterial({
            color: 0x72e7ff,
            emissive: 0x164c5d,
            emissiveIntensity: 1.4
        }),

    green:
        new THREE.MeshStandardMaterial({
            color: 0x5cff9b,
            emissive: 0x1b6b3c,
            emissiveIntensity: 1.8
        }),

    yellow:
        new THREE.MeshStandardMaterial({
            color: 0xffd45c,
            emissive: 0x765000,
            emissiveIntensity: 1.7
        }),

    red:
        new THREE.MeshStandardMaterial({
            color: 0xff5d68,
            emissive: 0x7d1119,
            emissiveIntensity: 1.8
        })

};


// ============================================================
// ROUNDED BOX
// ============================================================

function roundedBox(
    width,
    height,
    depth,
    radius = 0.12,
    material = materials.white
) {

    const shape =
        new THREE.Shape();

    const x =
        -width / 2;

    const y =
        -height / 2;


    shape.moveTo(
        x + radius,
        y
    );

    shape.lineTo(
        x + width - radius,
        y
    );

    shape.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + radius
    );

    shape.lineTo(
        x + width,
        y + height - radius
    );

    shape.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
    );

    shape.lineTo(
        x + radius,
        y + height
    );

    shape.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - radius
    );

    shape.lineTo(
        x,
        y + radius
    );

    shape.quadraticCurveTo(
        x,
        y,
        x + radius,
        y
    );


    const geometry =
        new THREE.ExtrudeGeometry(
            shape,
            {
                depth,
                bevelEnabled: true,
                bevelSegments: 3,
                bevelSize: 0.04,
                bevelThickness: 0.04
            }
        );


    geometry.center();


    return new THREE.Mesh(
        geometry,
        material
    );

}


// ============================================================
// CREATE ROBOT
// ============================================================

export function createRobot() {

    const robot =
        new THREE.Group();

    robot.name =
        "HealthcareRobot";


    // ========================================================
    // MAIN BODY
    // ========================================================

    const body =
        roundedBox(
            1.48,
            2.45,
            1.15,
            0.30,
            materials.white
        );

    body.position.y =
        1.55;

    body.castShadow = true;
    body.receiveShadow = true;

    robot.add(body);


    // ========================================================
    // LOWER FRONT PANEL
    // ========================================================

    const lowerPanel =
        roundedBox(
            1.12,
            0.62,
            0.035,
            0.10,
            materials.dark
        );

    lowerPanel.position.set(
        0,
        0.93,
        -0.595
    );

    robot.add(lowerPanel);


    // ========================================================
    // FRONT DISPLAY
    // ========================================================

    const display =
        roundedBox(
            1.04,
            0.70,
            0.045,
            0.10,
            materials.glass
        );

    display.position.set(
        0,
        1.72,
        -0.61
    );

    robot.add(display);


    // ========================================================
    // DISPLAY DOTS
    // ========================================================

    const displayDots =
        new THREE.Group();


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const dot =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.055,
                    16,
                    16
                ),
                materials.cyan
            );

        dot.position.set(
            -0.22 + i * 0.22,
            1.72,
            -0.65
        );

        displayDots.add(dot);

    }


    robot.add(displayDots);


    // ========================================================
    // HEAD
    // ========================================================

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.64,
                40,
                32
            ),
            materials.white
        );

    head.scale.set(
        1.0,
        0.86,
        0.88
    );

    head.position.y =
        3.10;

    head.castShadow = true;

    robot.add(head);


    // ========================================================
    // FACE PANEL
    // ========================================================

    const facePanel =
        roundedBox(
            0.88,
            0.58,
            0.06,
            0.16,
            materials.glass
        );

    facePanel.position.set(
        0,
        3.08,
        -0.54
    );

    robot.add(facePanel);


    // ========================================================
    // CAMERA
    // ========================================================

    const cameraHousing =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.15,
                0.15,
                0.12,
                24
            ),
            materials.black
        );

    cameraHousing.rotation.x =
        Math.PI / 2;

    cameraHousing.position.set(
        0,
        3.12,
        -0.61
    );

    robot.add(cameraHousing);


    const cameraSensor =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.075,
                20,
                20
            ),
            materials.cyan
        );

    cameraSensor.position.set(
        0,
        3.12,
        -0.69
    );

    robot.add(cameraSensor);


    // ========================================================
    // MICROPHONES
    // ========================================================

    const microphoneLeft =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.045,
                16,
                16
            ),
            materials.black
        );

    microphoneLeft.position.set(
        -0.35,
        3.16,
        -0.56
    );

    robot.add(microphoneLeft);


    const microphoneRight =
        microphoneLeft.clone();

    microphoneRight.position.x =
        0.35;

    robot.add(microphoneRight);


    // ========================================================
    // SPEAKER
    // ========================================================

    const speaker =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.18,
                0.18,
                0.035,
                32
            ),
            materials.black
        );

    speaker.rotation.x =
        Math.PI / 2;

    speaker.position.set(
        0,
        2.48,
        -0.62
    );

    robot.add(speaker);


    // ========================================================
    // ARMS
    // ========================================================

    const armGeometry =
        new THREE.CapsuleGeometry(
            0.16,
            0.72,
            8,
            16
        );


    const leftArm =
        new THREE.Mesh(
            armGeometry,
            materials.whiteDark
        );

    leftArm.position.set(
        -0.91,
        1.58,
        0
    );

    leftArm.rotation.z =
        Math.PI / 2;

    leftArm.castShadow = true;

    robot.add(leftArm);


    const rightArm =
        leftArm.clone();

    rightArm.position.x =
        0.91;

    robot.add(rightArm);


    // ========================================================
    // SIDE SENSOR PANELS
    // ========================================================

    const leftSensor =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.07,
                0.48,
                0.34
            ),
            materials.dark
        );

    leftSensor.position.set(
        -0.76,
        1.95,
        -0.02
    );

    robot.add(leftSensor);


    const rightSensor =
        leftSensor.clone();

    rightSensor.position.x =
        0.76;

    robot.add(rightSensor);


    // ========================================================
    // ANTENNA
    // ========================================================

    const antenna =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.025,
                0.025,
                0.35,
                12
            ),
            materials.black
        );

    antenna.position.set(
        0,
        3.78,
        0
    );

    robot.add(antenna);


    const antennaLight =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.07,
                20,
                20
            ),
            materials.blue
        );

    antennaLight.position.set(
        0,
        3.98,
        0
    );

    robot.add(antennaLight);


    // ========================================================
    // WHEELS
    // ========================================================

    const wheels = [];


    /*
        The wheels are mounted on the left and right
        sides of the robot.

        Their axle points along X.

        Therefore:

        wheel.rotation.z = 90 degrees

        and the actual rolling animation happens
        around the X axis.
    */


    const wheelPositions = [

        {
            x: -0.76,
            y: 0.34,
            z: -0.40
        },

        {
            x: -0.76,
            y: 0.34,
            z: 0.40
        },

        {
            x: 0.76,
            y: 0.34,
            z: -0.40
        },

        {
            x: 0.76,
            y: 0.34,
            z: 0.40
        }

    ];


    for (
        let i = 0;
        i < wheelPositions.length;
        i++
    ) {

        const wheel =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.27,
                    0.27,
                    0.16,
                    32
                ),
                materials.black
            );


        wheel.rotation.z =
            Math.PI / 2;


        wheel.position.set(
            wheelPositions[i].x,
            wheelPositions[i].y,
            wheelPositions[i].z
        );


        wheel.castShadow = true;


        // ----------------------------------------------------
        // HUB
        // ----------------------------------------------------

        const hub =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.095,
                    0.095,
                    0.18,
                    20
                ),
                materials.dark
            );

        hub.rotation.z =
            Math.PI / 2;

        wheel.add(hub);


        // ----------------------------------------------------
        // HUB LIGHT
        // ----------------------------------------------------

        const hubLight =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.042,
                    0.042,
                    0.19,
                    16
                ),
                materials.cyan
            );

        hubLight.rotation.z =
            Math.PI / 2;

        wheel.add(hubLight);


        robot.add(wheel);

        wheels.push(wheel);

    }


    // ========================================================
    // STATUS LIGHT
    // ========================================================

    const statusLight =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.075,
                20,
                20
            ),
            materials.green
        );

    statusLight.position.set(
        0,
        2.72,
        -0.63
    );

    robot.add(statusLight);


    // ========================================================
    // USER DATA
    // ========================================================

    robot.userData.wheels =
        wheels;

    robot.userData.statusLight =
        statusLight;

    robot.userData.cameraSensor =
        cameraSensor;

    robot.userData.display =
        display;

    robot.userData.displayDots =
        displayDots;

    robot.userData.antennaLight =
        antennaLight;


    // ========================================================
    // INITIAL POSITION
    // ========================================================

    robot.position.set(
        -5,
        0,
        4
    );


    /*
        The robot's front is the -Z direction.
    */

    robot.rotation.set(
        0,
        0,
        0
    );


    return robot;

}


// ============================================================
// ROBOT INDICATOR
// ============================================================

export function setRobotIndicator(
    robot,
    state
) {

    const light =
        robot.userData.statusLight;

    if (!light) {
        return;
    }


    if (state === "normal") {

        light.material =
            materials.green;

    }

    else if (state === "warning") {

        light.material =
            materials.yellow;

    }

    else if (state === "alert") {

        light.material =
            materials.red;

    }

}


// ============================================================
// WHEEL ROTATION
// ============================================================

export function rotateRobotWheels(
    robot,
    speed
) {

    const wheels =
        robot.userData.wheels;

    if (!wheels) {
        return;
    }


    /*
        Correct wheel rolling axis.

        The wheel axle is X,
        therefore the wheel rotates around X.
    */

    for (
        const wheel of wheels
    ) {

        wheel.rotation.x +=
            speed;

    }

}


// ============================================================
// ROBOT IDLE ANIMATION
// ============================================================

export function updateRobot(
    robot,
    elapsedTime
) {

    if (!robot) {
        return;
    }


    /*
        Very subtle sensor animation.
        No large body bouncing.
    */


    const antennaLight =
        robot.userData.antennaLight;


    if (antennaLight) {

        const scale =
            1 +
            Math.sin(
                elapsedTime * 3
            ) * 0.08;

        antennaLight.scale.set(
            scale,
            scale,
            scale
        );

    }


    const cameraSensor =
        robot.userData.cameraSensor;


    if (cameraSensor) {

        const scale =
            1 +
            Math.sin(
                elapsedTime * 2.5
            ) * 0.05;

        cameraSensor.scale.set(
            scale,
            scale,
            scale
        );

    }

}


// ============================================================
// ROBOT DISPLAY
// ============================================================

export function setRobotDisplay(
    robot,
    state
) {

    const dots =
        robot.userData.displayDots;

    if (!dots) {
        return;
    }


    let material;


    if (state === "STANDBY") {

        material =
            materials.green;

    }

    else if (state === "ASSESSING") {

        material =
            materials.yellow;

    }

    else if (state === "ALERT") {

        material =
            materials.red;

    }

    else {

        material =
            materials.cyan;

    }


    dots.children.forEach(
        dot => {

            dot.material =
                material;

        }
    );

}