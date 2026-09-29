import * as THREE from "three";


// ============================================================
// PATIENT POSITION SETTINGS
// ============================================================

const PATIENT_X = 1.35;
const PATIENT_Y = 1.05;
const PATIENT_Z = -2.0;

const PATIENT_SCALE = 0.68;


// ============================================================
// MATERIALS
// ============================================================

const materials = {

    skin:
        new THREE.MeshStandardMaterial({
            color: 0xc98f68,
            roughness: 0.72
        }),

    skinLight:
        new THREE.MeshStandardMaterial({
            color: 0xe1ad88,
            roughness: 0.68
        }),

    hair:
        new THREE.MeshStandardMaterial({
            color: 0x241912,
            roughness: 0.88
        }),

    gown:
        new THREE.MeshStandardMaterial({
            color: 0x72b8d5,
            roughness: 0.78
        }),

    gownLight:
        new THREE.MeshStandardMaterial({
            color: 0x9fd3e5,
            roughness: 0.72
        }),

    blanket:
        new THREE.MeshStandardMaterial({
            color: 0xf1f4f5,
            roughness: 0.86
        }),

    blanketFold:
        new THREE.MeshStandardMaterial({
            color: 0xd6e2e7,
            roughness: 0.82
        }),

    eye:
        new THREE.MeshStandardMaterial({
            color: 0x101417,
            roughness: 0.45
        }),

    mouth:
        new THREE.MeshStandardMaterial({
            color: 0x6b3030,
            roughness: 0.60
        }),

    green:
        new THREE.MeshStandardMaterial({
            color: 0x58f09a,
            emissive: 0x164d31,
            emissiveIntensity: 1.6
        }),

    yellow:
        new THREE.MeshStandardMaterial({
            color: 0xffd15c,
            emissive: 0x725000,
            emissiveIntensity: 1.5
        }),

    red:
        new THREE.MeshStandardMaterial({
            color: 0xff5c68,
            emissive: 0x70151c,
            emissiveIntensity: 1.6
        })

};


// ============================================================
// CAPSULE HELPER
// ============================================================

function capsule(
    radius,
    length,
    material
) {

    return new THREE.Mesh(
        new THREE.CapsuleGeometry(
            radius,
            length,
            8,
            20
        ),
        material
    );

}


// ============================================================
// CREATE PATIENT
// ============================================================

export function createPatient() {

    const patient =
        new THREE.Group();

    patient.name =
        "HospitalPatient";


    // ========================================================
    // TORSO
    // ========================================================

    const torso =
        new THREE.Mesh(
            new THREE.CapsuleGeometry(
                0.46,
                0.95,
                8,
                24
            ),
            materials.gown
        );

    torso.rotation.z =
        Math.PI / 2;

    torso.scale.set(
        1.0,
        1.0,
        0.82
    );

    torso.position.set(
        0,
        0.64,
        0
    );

    torso.castShadow = true;

    patient.add(torso);


    // ========================================================
    // CHEST
    // ========================================================

    const chest =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.50,
                32,
                24
            ),
            materials.gownLight
        );

    chest.scale.set(
        1.0,
        0.48,
        0.98
    );

    chest.position.set(
        -0.60,
        0.70,
        0
    );

    chest.castShadow = true;

    patient.add(chest);


    // ========================================================
    // ABDOMEN
    // ========================================================

    const abdomen =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.47,
                28,
                20
            ),
            materials.gown
        );

    abdomen.scale.set(
        1.25,
        0.38,
        0.88
    );

    abdomen.position.set(
        0.30,
        0.66,
        0
    );

    abdomen.castShadow = true;

    patient.add(abdomen);


    // ========================================================
    // NECK
    // ========================================================

    const neck =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.17,
                0.20,
                0.27,
                24
            ),
            materials.skinLight
        );

    neck.rotation.z =
        Math.PI / 2;

    neck.position.set(
        -1.02,
        0.69,
        0
    );

    patient.add(neck);


    // ========================================================
    // HEAD
    // ========================================================

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.48,
                40,
                32
            ),
            materials.skinLight
        );

    head.scale.set(
        1.02,
        0.92,
        0.98
    );

    head.position.set(
        -1.40,
        0.76,
        0
    );

    head.castShadow = true;

    patient.add(head);


    // ========================================================
    // HAIR
    // ========================================================

    // const hairBack =
    //     new THREE.Mesh(
    //         new THREE.SphereGeometry(
    //             0.49,
    //             32,
    //             24
    //         ),
    //         materials.hair
    //     );

    // hairBack.scale.set(
    //     1.03,
    //     0.55,
    //     0.99
    // );

    // /*
    //     Hair stays behind the head.
    //     It does NOT cover the face.
    // */

    // hairBack.position.set(
    //     -1.40,
    //     0.50,
    //     0
    // );

    // hairBack.castShadow = true;

    // patient.add(hairBack);


    // ========================================================
    // EARS
    // ========================================================

    const leftEar =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.075,
                18,
                18
            ),
            materials.skinLight
        );

    leftEar.position.set(
        -1.40,
        0.76,
        -0.47
    );

    patient.add(leftEar);


    const rightEar =
        leftEar.clone();

    rightEar.position.z =
        0.47;

    patient.add(rightEar);


    // ========================================================
    // EYES
    // ========================================================

    const eyeGeometry =
        new THREE.SphereGeometry(
            0.035,
            18,
            18
        );


    const leftEye =
        new THREE.Mesh(
            eyeGeometry,
            materials.eye
        );

    leftEye.position.set(
        -1.53,
        1.155,
        -0.18
    );

    patient.add(leftEye);


    const rightEye =
        new THREE.Mesh(
            eyeGeometry,
            materials.eye
        );

    rightEye.position.set(
        -1.53,
        1.155,
        0.18
    );

    patient.add(rightEye);


    // ========================================================
    // NOSE
    // ========================================================

    const nose =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.06,
                18,
                18
            ),
            materials.skinLight
        );

    nose.scale.set(
        1.15,
        1.15,
        0.95
    );

    nose.position.set(
        -1.68,
        1.16,
        0
    );

    patient.add(nose);


    // ========================================================
    // MOUTH
    // ========================================================

    const mouth =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.052,
                0.012,
                8,
                20
            ),
            materials.mouth
        );

    mouth.rotation.x =
        Math.PI / 2;

    mouth.position.set(
        -1.78,
        1.145,
        0
    );

    patient.add(mouth);


    // ========================================================
    // LEFT ARM
    // ========================================================

    const leftArm =
        capsule(
            0.125,
            0.72,
            materials.gown
        );

    leftArm.rotation.z =
        Math.PI / 2;

    leftArm.position.set(
        -0.08,
        0.54,
        -0.58
    );

    leftArm.castShadow = true;

    patient.add(leftArm);


    // ========================================================
    // LEFT HAND
    // ========================================================

    const leftHand =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.14,
                20,
                16
            ),
            materials.skinLight
        );

    leftHand.scale.set(
        0.90,
        0.65,
        0.85
    );

    leftHand.position.set(
        0.70,
        0.53,
        -0.58
    );

    patient.add(leftHand);


    // ========================================================
    // RIGHT ARM
    // ========================================================

    const rightArm =
        leftArm.clone();

    rightArm.position.z =
        0.58;

    patient.add(rightArm);


    // ========================================================
    // RIGHT HAND
    // ========================================================

    const rightHand =
        leftHand.clone();

    rightHand.position.z =
        0.58;

    patient.add(rightHand);


    // ========================================================
    // LEFT THIGH
    // ========================================================

    const leftThigh =
        capsule(
            0.18,
            0.80,
            materials.gown
        );

    leftThigh.rotation.z =
        Math.PI / 2;

    leftThigh.position.set(
        1.02,
        0.53,
        -0.24
    );

    patient.add(leftThigh);


    // ========================================================
    // RIGHT THIGH
    // ========================================================

    const rightThigh =
        leftThigh.clone();

    rightThigh.position.z =
        0.24;

    patient.add(rightThigh);


    // ========================================================
    // LEFT LOWER LEG
    // ========================================================

    const leftLowerLeg =
        capsule(
            0.135,
            0.72,
            materials.gownLight
        );

    leftLowerLeg.rotation.z =
        Math.PI / 2;

    leftLowerLeg.position.set(
        1.80,
        0.50,
        -0.24
    );

    patient.add(leftLowerLeg);


    // ========================================================
    // RIGHT LOWER LEG
    // ========================================================

    const rightLowerLeg =
        leftLowerLeg.clone();

    rightLowerLeg.position.z =
        0.24;

    patient.add(rightLowerLeg);


    // ========================================================
    // LEFT FOOT
    // ========================================================

    const leftFoot =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.16,
                20,
                16
            ),
            materials.skinLight
        );

    leftFoot.scale.set(
        1.25,
        0.58,
        0.75
    );

    leftFoot.position.set(
        2.43,
        0.46,
        -0.24
    );

    patient.add(leftFoot);


    // ========================================================
    // RIGHT FOOT
    // ========================================================

    const rightFoot =
        leftFoot.clone();

    rightFoot.position.z =
        0.24;

    patient.add(rightFoot);


    // // ========================================================
    // // BLANKET
    // // ========================================================

    // const blanket =
    //     new THREE.Mesh(
    //         new THREE.BoxGeometry(
    //             2.30,
    //             0.12,
    //             1.48
    //         ),
    //         materials.blanket
    //     );

    // blanket.position.set(
    //     0.90,
    //     0.72,
    //     0
    // );

    // blanket.castShadow = true;
    // blanket.receiveShadow = true;

    // patient.add(blanket);


    // // ========================================================
    // // BLANKET FOLD
    // // ========================================================

    // const blanketFold =
    //     new THREE.Mesh(
    //         new THREE.BoxGeometry(
    //             0.25,
    //             0.08,
    //             1.51
    //         ),
    //         materials.blanketFold
    //     );

    // blanketFold.position.set(
    //     -0.20,
    //     0.80,
    //     0
    // );

    // patient.add(blanketFold);


    // ========================================================
    // CHEST SENSOR
    // ========================================================

    const chestSensor =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.065,
                18,
                18
            ),
            materials.green
        );

    chestSensor.position.set(
        -0.48,
        1.02,
        -0.50
    );

    patient.add(chestSensor);


    // ========================================================
    // FINGER SENSOR
    // ========================================================

    const fingerSensor =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.10,
                0.07,
                0.12
            ),
            materials.green
        );

    fingerSensor.position.set(
        0.70,
        0.60,
        -0.58
    );

    patient.add(fingerSensor);


    // ========================================================
    // STATUS LIGHT
    // ========================================================

    const statusLight =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.055,
                16,
                16
            ),
            materials.green
        );

    statusLight.position.set(
        -0.25,
        1.07,
        0
    );

    patient.add(statusLight);


    // ========================================================
    // SAVE REFERENCES
    // ========================================================

    patient.userData.fingerSensor =
        fingerSensor;

    patient.userData.chestSensor =
        chestSensor;

    patient.userData.statusLight =
        statusLight;

    patient.userData.head =
        head;

    patient.userData.chest =
        chest;

    patient.userData.torso =
        torso;

    patient.userData.leftArm =
        leftArm;

    patient.userData.rightArm =
        rightArm;

    patient.userData.leftHand =
        leftHand;

    patient.userData.rightHand =
        rightHand;


    // ========================================================
    // ORIGINAL ANIMATION VALUES
    // ========================================================

    patient.userData.baseHeadY =
        head.position.y;

    patient.userData.baseChestY =
        chest.position.y;

    patient.userData.baseTorsoY =
        torso.position.y;

    patient.userData.baseLeftArmZ =
        leftArm.position.z;

    patient.userData.baseRightArmZ =
        rightArm.position.z;


    // ========================================================
    // PATIENT STATE
    // ========================================================

    patient.userData.distress =
        false;


    // ========================================================
    // SCALE
    // ========================================================

    patient.scale.set(
        PATIENT_SCALE,
        PATIENT_SCALE,
        PATIENT_SCALE
    );


    // ========================================================
    // FINAL POSITION
    // ========================================================

    patient.position.set(
        PATIENT_X,
        PATIENT_Y,
        PATIENT_Z
    );


    // ========================================================
    // NO ROTATION
    // ========================================================

    patient.rotation.set(
        0,
        0,
        0
    );


    return patient;

}


// ============================================================
// SET PATIENT STATUS
// ============================================================

export function setPatientStatus(
    patient,
    state
) {

    const statusLight =
        patient.userData.statusLight;

    const chestSensor =
        patient.userData.chestSensor;

    const fingerSensor =
        patient.userData.fingerSensor;


    if (
        !statusLight ||
        !chestSensor ||
        !fingerSensor
    ) {

        return;

    }


    let material =
        materials.green;


    if (
        state === "warning"
    ) {

        material =
            materials.yellow;

    }


    if (
        state === "alert"
    ) {

        material =
            materials.red;

    }


    statusLight.material =
        material;

    chestSensor.material =
        material;

    fingerSensor.material =
        material;

}


// ============================================================
// DISTRESS CONTROL
// ============================================================

export function animatePatientDistress(
    patient,
    active
) {

    if (!patient) {
        return;
    }


    patient.userData.distress =
        active;

}


// ============================================================
// PATIENT ANIMATION
// ============================================================

export function updatePatient(
    patient,
    elapsedTime
) {

    if (!patient) {
        return;
    }


    const distress =
        patient.userData.distress;


    const chest =
        patient.userData.chest;

    const torso =
        patient.userData.torso;

    const head =
        patient.userData.head;

    const leftArm =
        patient.userData.leftArm;

    const rightArm =
        patient.userData.rightArm;

    const leftHand =
        patient.userData.leftHand;

    const rightHand =
        patient.userData.rightHand;

    const chestSensor =
        patient.userData.chestSensor;

    const statusLight =
        patient.userData.statusLight;


    // ========================================================
    // NORMAL BREATHING
    // ========================================================

    const normalBreathing =
        Math.sin(
            elapsedTime * 2.0
        ) * 0.018;


    // ========================================================
    // DISTRESS
    // ========================================================

    if (distress) {

        const fastBreathing =
            Math.sin(
                elapsedTime * 5.5
            ) * 0.055;


        // ----------------------------------------------------
        // CHEST
        // ----------------------------------------------------

        if (chest) {

            chest.position.y =
                patient.userData.baseChestY +
                fastBreathing;

        }


        // ----------------------------------------------------
        // TORSO
        // ----------------------------------------------------

        if (torso) {

            torso.position.y =
                patient.userData.baseTorsoY +
                fastBreathing * 0.40;

        }


        // ----------------------------------------------------
        // HEAD MOVEMENT
        // ----------------------------------------------------

        if (head) {

            head.rotation.z =
                Math.sin(
                    elapsedTime * 6
                ) * 0.035;

            head.position.y =
                patient.userData.baseHeadY +
                Math.sin(
                    elapsedTime * 5
                ) * 0.018;

        }


        // ----------------------------------------------------
        // LEFT ARM
        // ----------------------------------------------------

        if (leftArm) {

            leftArm.rotation.x =
                Math.sin(
                    elapsedTime * 7
                ) * 0.08;

            leftArm.position.z =
                patient.userData.baseLeftArmZ +
                Math.sin(
                    elapsedTime * 6
                ) * 0.035;

        }


        // ----------------------------------------------------
        // RIGHT ARM
        // ----------------------------------------------------

        if (rightArm) {

            rightArm.rotation.x =
                Math.sin(
                    elapsedTime * 7 +
                    1.5
                ) * 0.08;

            rightArm.position.z =
                patient.userData.baseRightArmZ +
                Math.sin(
                    elapsedTime * 6 +
                    1
                ) * 0.035;

        }


        // ----------------------------------------------------
        // HANDS
        // ----------------------------------------------------

        if (leftHand) {

            leftHand.position.y =
                0.53 +
                Math.sin(
                    elapsedTime * 7
                ) * 0.025;

        }


        if (rightHand) {

            rightHand.position.y =
                0.53 +
                Math.sin(
                    elapsedTime * 7 +
                    1
                ) * 0.025;

        }


        // ----------------------------------------------------
        // CHEST SENSOR
        // ----------------------------------------------------

        if (chestSensor) {

            chestSensor.position.y =
                1.02 +
                fastBreathing;

        }


        // ----------------------------------------------------
        // IMPORTANT:
        // KEEP THE PATIENT ABOVE THE BED
        // ----------------------------------------------------

        patient.position.y =
            PATIENT_Y +
            Math.sin(
                elapsedTime * 5
            ) * 0.008;

    }

    else {

        // ====================================================
        // NORMAL CHEST
        // ====================================================

        if (chest) {

            chest.position.y =
                patient.userData.baseChestY +
                normalBreathing;

        }


        // ====================================================
        // NORMAL TORSO
        // ====================================================

        if (torso) {

            torso.position.y =
                patient.userData.baseTorsoY +
                normalBreathing * 0.35;

        }


        // ====================================================
        // HEAD RETURN
        // ====================================================

        if (head) {

            head.rotation.z =
                THREE.MathUtils.lerp(
                    head.rotation.z,
                    0,
                    0.08
                );

            head.position.y =
                THREE.MathUtils.lerp(
                    head.position.y,
                    patient.userData.baseHeadY,
                    0.08
                );

        }


        // ====================================================
        // LEFT ARM RETURN
        // ====================================================

        if (leftArm) {

            leftArm.rotation.x =
                THREE.MathUtils.lerp(
                    leftArm.rotation.x,
                    0,
                    0.08
                );

            leftArm.position.z =
                THREE.MathUtils.lerp(
                    leftArm.position.z,
                    patient.userData.baseLeftArmZ,
                    0.08
                );

        }


        // ====================================================
        // RIGHT ARM RETURN
        // ====================================================

        if (rightArm) {

            rightArm.rotation.x =
                THREE.MathUtils.lerp(
                    rightArm.rotation.x,
                    0,
                    0.08
                );

            rightArm.position.z =
                THREE.MathUtils.lerp(
                    rightArm.position.z,
                    patient.userData.baseRightArmZ,
                    0.08
                );

        }


        // ====================================================
        // HANDS RETURN
        // ====================================================

        if (leftHand) {

            leftHand.position.y =
                THREE.MathUtils.lerp(
                    leftHand.position.y,
                    0.53,
                    0.08
                );

        }


        if (rightHand) {

            rightHand.position.y =
                THREE.MathUtils.lerp(
                    rightHand.position.y,
                    0.53,
                    0.08
                );

        }


        // ====================================================
        // SENSOR
        // ====================================================

        if (chestSensor) {

            chestSensor.position.y =
                1.02 +
                normalBreathing;

        }


        // ====================================================
        // KEEP PATIENT ABOVE BED
        // ====================================================

        patient.position.y =
            THREE.MathUtils.lerp(
                patient.position.y,
                PATIENT_Y,
                0.08
            );

    }


    // ========================================================
    // STATUS LIGHT
    // ========================================================

    if (statusLight) {

        const pulse =
            1 +
            Math.sin(
                elapsedTime *
                (
                    distress
                        ? 7
                        : 3
                )
            ) *
            (
                distress
                    ? 0.18
                    : 0.08
            );


        statusLight.scale.set(
            pulse,
            pulse,
            pulse
        );

    }

}