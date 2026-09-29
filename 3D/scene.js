import * as THREE from "three";

import {
    createRobot,
    setRobotIndicator,
    rotateRobotWheels,
    updateRobot,
    setRobotDisplay
} from "./robot.js";

import {
    createPatient,
    setPatientStatus,
    animatePatientDistress,
    updatePatient
} from "./patient.js";

import {
    createRoom,
    createRoomLighting
} from "./room.js";

import {
    ConversationManager
} from "./conversation.js";


// ============================================================
// SCENE
// ============================================================

const sceneContainer =
    document.getElementById("scene");

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x071019);


// ============================================================
// CAMERA
// ============================================================

const camera =
    new THREE.PerspectiveCamera(
        48,
        window.innerWidth /
        window.innerHeight,
        0.1,
        100
    );

camera.position.set(
    7,
    6,
    5
);


// ============================================================
// RENDERER
// ============================================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled =
    true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.15;

sceneContainer.appendChild(
    renderer.domElement
);


// ============================================================
// ROOM
// ============================================================

createRoom(scene);

createRoomLighting(scene);


// ============================================================
// ROBOT
// ============================================================

const robot =
    createRobot();

scene.add(robot);


// ============================================================
// PATIENT
// ============================================================

const patient =
    createPatient();

scene.add(patient);


// ============================================================
// CONVERSATION
// ============================================================

const conversation =
    new ConversationManager(
        camera,
        robot,
        patient
    );


// ============================================================
// DOCTOR MODEL
// ============================================================

function createDoctor() {

    const doctor =
        new THREE.Group();

    doctor.name =
        "Doctor";

    const skinMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xc98f72,
            roughness: 0.65
        });

    const hairMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x2a211d,
            roughness: 0.8
        });

    const coatMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xf2f4f5,
            roughness: 0.42
        });

    const shirtMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x9fd8e6,
            roughness: 0.5
        });

    const trouserMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x263746,
            roughness: 0.58
        });

    const shoeMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111820,
            roughness: 0.3,
            metalness: 0.15
        });


    // ========================================================
    // HEAD
    // ========================================================

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.28,
                24,
                20
            ),
            skinMaterial
        );

    head.scale.set(
        0.92,
        1.08,
        0.92
    );

    head.position.y =
        2.12;

    head.castShadow = true;

    doctor.add(head);


    // ========================================================
    // HAIR
    // ========================================================

    const hair =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.285,
                24,
                16,
                0,
                Math.PI * 2,
                0,
                Math.PI * 0.48
            ),
            hairMaterial
        );

    hair.scale.set(
        1.0,
        0.72,
        1.0
    );

    hair.position.set(
        0,
        2.27,
        0
    );

    hair.castShadow = true;

    doctor.add(hair);


    // ========================================================
    // NECK
    // ========================================================

    const neck =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.105,
                0.105,
                0.16,
                16
            ),
            skinMaterial
        );

    neck.position.y =
        1.82;

    neck.castShadow = true;

    doctor.add(neck);


    // ========================================================
    // TORSO / COAT
    // ========================================================

    const torso =
        new THREE.Mesh(
            new THREE.CapsuleGeometry(
                0.43,
                0.62,
                8,
                16
            ),
            coatMaterial
        );

    torso.scale.set(
        0.86,
        1.0,
        0.58
    );

    torso.position.y =
        1.43;

    torso.castShadow = true;

    doctor.add(torso);


    // ========================================================
    // SHIRT PANEL
    // ========================================================

    const shirt =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.22,
                0.52,
                0.035
            ),
            shirtMaterial
        );

    shirt.position.set(
        0,
        1.50,
        -0.27
    );

    shirt.castShadow = true;

    doctor.add(shirt);


    // ========================================================
    // ID BADGE
    // ========================================================

    const badge =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.16,
                0.12,
                0.025
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.35
            })
        );

    badge.position.set(
        0.23,
        1.57,
        -0.28
    );

    doctor.add(badge);


    // ========================================================
    // ARMS
    // ========================================================

    const armGeometry =
        new THREE.CapsuleGeometry(
            0.105,
            0.62,
            8,
            12
        );

    const leftArm =
        new THREE.Mesh(
            armGeometry,
            coatMaterial
        );

    leftArm.position.set(
        -0.42,
        1.43,
        0
    );

    leftArm.rotation.z =
        -0.10;

    leftArm.castShadow = true;

    doctor.add(leftArm);


    const rightArm =
        leftArm.clone();

    rightArm.position.x =
        0.42;

    rightArm.rotation.z =
        0.10;

    doctor.add(rightArm);


    // ========================================================
    // HANDS
    // ========================================================

    const leftHand =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.11,
                16,
                12
            ),
            skinMaterial
        );

    leftHand.position.set(
        -0.45,
        1.05,
        0
    );

    leftHand.castShadow = true;

    doctor.add(leftHand);


    const rightHand =
        leftHand.clone();

    rightHand.position.x =
        0.45;

    doctor.add(rightHand);


    // ========================================================
    // LEGS
    // ========================================================

    const legGeometry =
        new THREE.CapsuleGeometry(
            0.14,
            0.66,
            8,
            12
        );

    const leftLeg =
        new THREE.Mesh(
            legGeometry,
            trouserMaterial
        );

    leftLeg.position.set(
        -0.17,
        0.68,
        0
    );

    leftLeg.castShadow = true;

    doctor.add(leftLeg);


    const rightLeg =
        leftLeg.clone();

    rightLeg.position.x =
        0.17;

    doctor.add(rightLeg);


    // ========================================================
    // SHOES
    // ========================================================

    const shoeGeometry =
        new THREE.SphereGeometry(
            0.16,
            18,
            12
        );

    const leftShoe =
        new THREE.Mesh(
            shoeGeometry,
            shoeMaterial
        );

    leftShoe.scale.set(
        1.0,
        0.55,
        1.45
    );

    leftShoe.position.set(
        -0.17,
        0.15,
        -0.08
    );

    leftShoe.castShadow = true;

    doctor.add(leftShoe);


    const rightShoe =
        leftShoe.clone();

    rightShoe.position.x =
        0.17;

    doctor.add(rightShoe);


    // ========================================================
    // DOCTOR INDICATOR
    // ========================================================

    const indicator =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.045,
                12,
                12
            ),
            new THREE.MeshStandardMaterial({
                color: 0x72e7ff,
                emissive: 0x164c5d,
                emissiveIntensity: 1.5
            })
        );

    indicator.position.set(
        0.24,
        1.70,
        -0.30
    );

    doctor.add(indicator);

    doctor.userData.indicator =
        indicator;

    doctor.visible =
        false;

    return doctor;

}


const doctor =
    createDoctor();

scene.add(doctor);


// ============================================================
// CAMERA TARGET
// ============================================================

const cameraTarget =
    new THREE.Vector3(
        0,
        1.1,
        -1
    );


// ============================================================
// SIMULATION STATE
// ============================================================

const state = {

    scenario:
        "normal",

    active:
        false,

    robotMoving:
        false,

    alertShown:
        false,

    conversationRunning:
        false,

    movementProgress:
        0,

    returningHome:
        false,

    returnProgress:
        0,

    doctorMoving:
        false,

    doctorProgress:
        0,

    doctor:
        null,

    assessmentToken:
        0,

    robotStart:
        new THREE.Vector3(
            -5,
            0,
            4
        ),

    robotTarget:
        new THREE.Vector3(
            -1.0,
            0,
            -0.8
        ),

    values: {

        heartRate:
            74,

        spo2:
            98,

        temperature:
            36.7

    }

};


state.doctor =
    doctor;


// ============================================================
// DOM ELEMENTS
// ============================================================

const robotStatus =
    document.getElementById(
        "robotStatus"
    );

const heartRate =
    document.getElementById(
        "heartRate"
    );

const spo2 =
    document.getElementById(
        "spo2"
    );

const temperature =
    document.getElementById(
        "temperature"
    );

const monitorIndicator =
    document.getElementById(
        "monitorIndicator"
    );

const logContainer =
    document.getElementById(
        "log"
    );

const alertOverlay =
    document.getElementById(
        "alertOverlay"
    );

const closeAlert =
    document.getElementById(
        "closeAlert"
    );


// ============================================================
// EVENT LOG
// ============================================================

function addLog(
    message,
    type = "system"
) {

    const entry =
        document.createElement(
            "p"
        );

    entry.className =
        `system-event ${type}`;

    entry.textContent =
        message;

    logContainer.appendChild(
        entry
    );

    logContainer.scrollTop =
        logContainer.scrollHeight;

}


// ============================================================
// ROBOT STATUS
// ============================================================

function updateRobotStatus(
    text,
    className
) {

    robotStatus.textContent =
        text;

    robotStatus.className =
        className;

}


// ============================================================
// MONITORING DISPLAY
// ============================================================

function updateMonitoringDisplay() {

    heartRate.textContent =
        `${state.values.heartRate} BPM`;

    spo2.textContent =
        `${state.values.spo2} %`;

    temperature.textContent =
        `${state.values.temperature.toFixed(1)} °C`;

}


// ============================================================
// MONITOR INDICATOR
// ============================================================

function setMonitorIndicator(
    status
) {

    monitorIndicator.classList.remove(
        "normal",
        "warning",
        "alert"
    );

    monitorIndicator.classList.add(
        status
    );

}


// ============================================================
// NORMAL SCENARIO
// ============================================================

function activateNormalScenario() {

    resetSimulation(false);

}


// ============================================================
// HEART RATE SCENARIO
// ============================================================

function activateHeartRateScenario() {

    if (state.active) {
        return;
    }

    state.scenario =
        "heart";

    state.values.heartRate =
        142;

    state.values.spo2 =
        97;

    state.values.temperature =
        36.8;

    updateMonitoringDisplay();

    setMonitorIndicator(
        "alert"
    );

    addLog(
        "Abnormal heart rate detected: 142 BPM."
    );

    triggerPatientCondition(
        "abnormal heart rate"
    );

}


// ============================================================
// LOW SPO2 SCENARIO
// ============================================================

function activateSpO2Scenario() {

    if (state.active) {
        return;
    }

    state.scenario =
        "spo2";

    state.values.heartRate =
        88;

    state.values.spo2 =
        86;

    state.values.temperature =
        36.9;

    updateMonitoringDisplay();

    setMonitorIndicator(
        "alert"
    );

    addLog(
        "Low SpO₂ detected: 86%."
    );

    triggerPatientCondition(
        "low oxygen saturation"
    );

}


// ============================================================
// TEMPERATURE SCENARIO
// ============================================================

function activateTemperatureScenario() {

    if (state.active) {
        return;
    }

    state.scenario =
        "temperature";

    state.values.heartRate =
        92;

    state.values.spo2 =
        96;

    state.values.temperature =
        39.2;

    updateMonitoringDisplay();

    setMonitorIndicator(
        "warning"
    );

    addLog(
        "Elevated temperature detected: 39.2 °C."
    );

    triggerPatientCondition(
        "elevated temperature"
    );

}


// ============================================================
// PATIENT DISTRESS
// ============================================================

function activateDistressScenario() {

    if (state.active) {
        return;
    }

    state.scenario =
        "distress";

    state.values.heartRate =
        108;

    state.values.spo2 =
        94;

    state.values.temperature =
        37.1;

    updateMonitoringDisplay();

    setMonitorIndicator(
        "warning"
    );

    addLog(
        "Patient distress detected."
    );

    triggerPatientCondition(
        "patient distress"
    );

}


// ============================================================
// CONDITION TRIGGER
// ============================================================

function triggerPatientCondition(
    condition
) {

    if (state.active) {
        return;
    }

    state.active =
        true;

    state.robotMoving =
        true;

    state.returningHome =
        false;

    state.conversationRunning =
        false;

    state.movementProgress =
        0;

    state.returnProgress =
        0;

    state.doctorMoving =
        false;

    state.assessmentToken++;

    const currentToken =
        state.assessmentToken;

    setRobotIndicator(
        robot,
        "alert"
    );

    setRobotDisplay(
        robot,
        "ASSESSING"
    );

    setPatientStatus(
        patient,
        "alert"
    );

    animatePatientDistress(
        patient,
        true
    );

    updateRobotStatus(
        "RESPONDING",
        "status-alert"
    );

    addLog(
        `AI assessment triggered by ${condition}.`
    );

    addLog(
        "Robot activation sequence started."
    );

    addLog(
        "Robot navigating toward patient."
    );

    robot.position.copy(
        state.robotStart
    );

    robot.rotation.set(
        0,
        0,
        0
    );

    state.currentAssessmentToken =
        currentToken;

}


// ============================================================
// ROBOT MOVEMENT
// ============================================================

function updateRobotMovement() {

    if (!state.robotMoving) {
        return;
    }

    const start =
        state.robotStart;

    const target =
        state.robotTarget;

    state.movementProgress +=
        0.006;

    const progress =
        Math.min(
            state.movementProgress,
            1
        );


    // --------------------------------------------------------
    // SMOOTH MOVEMENT
    // --------------------------------------------------------

    const eased =
        progress *
        progress *
        (3 - 2 * progress);


    robot.position.lerpVectors(
        start,
        target,
        eased
    );


    // --------------------------------------------------------
    // FACE PATIENT
    // --------------------------------------------------------

    const direction =
        new THREE.Vector3()
            .subVectors(
                target,
                robot.position
            );


    if (
        direction.length() > 0.01
    ) {

        /*
            The robot's front is -Z.

            Therefore the front camera/display
            is turned toward the patient.
        */

        const angle =
            Math.atan2(
                -direction.x,
                -direction.z
            );

        robot.rotation.y =
            angle;

    }


    // --------------------------------------------------------
    // WHEEL MOVEMENT
    // --------------------------------------------------------

    rotateRobotWheels(
        robot,
        0.055
    );


    // --------------------------------------------------------
    // ARRIVED
    // --------------------------------------------------------

    if (
        progress >= 1
    ) {

        state.robotMoving =
            false;

        robot.position.copy(
            target
        );

        beginPatientAssessment();

    }

}


// ============================================================
// PATIENT ASSESSMENT
// ============================================================

function beginPatientAssessment() {

    if (!state.active) {
        return;
    }

    state.conversationRunning =
        true;

    const assessmentToken =
        state.assessmentToken;

    setRobotDisplay(
        robot,
        "ASSESSING"
    );

    setRobotIndicator(
        robot,
        "warning"
    );

    updateRobotStatus(
        "ASSESSING",
        "status-warning"
    );

    addLog(
        "Robot reached the patient's bedside."
    );

    addLog(
        "Contactless patient assessment initiated."
    );


    setTimeout(() => {

        if (
            assessmentToken !==
            state.assessmentToken
        ) {
            return;
        }

        conversation.robotSpeak(
            "Hello. I detected a change in your condition."
        );

    }, 500);


    setTimeout(() => {

        if (
            assessmentToken !==
            state.assessmentToken
        ) {
            return;
        }

        conversation.patientSpeak(
            getPatientResponse()
        );

    }, 2700);


    setTimeout(() => {

        if (
            assessmentToken !==
            state.assessmentToken
        ) {
            return;
        }

        conversation.robotSpeak(
            "Please remain calm. I am assessing your condition."
        );

    }, 5000);


    setTimeout(() => {

        if (
            assessmentToken !==
            state.assessmentToken
        ) {
            return;
        }

        completeAssessment();

    }, 7600);

}


// ============================================================
// PATIENT RESPONSE
// ============================================================

function getPatientResponse() {

    switch (
        state.scenario
    ) {

        case "heart":

            return (
                "I am feeling my heart beating very fast."
            );


        case "spo2":

            return (
                "I am having difficulty breathing."
            );


        case "temperature":

            return (
                "I feel very hot and weak."
            );


        case "distress":

            return (
                "Please help me."
            );


        default:

            return (
                "I do not feel well."
            );

    }

}


// ============================================================
// ROBOT RETURN HOME
// ============================================================

function beginRobotReturnHome() {

    if (!state.active) {
        return;
    }

    state.robotMoving =
        false;

    state.returningHome =
        true;

    state.returnProgress =
        0;

    setRobotDisplay(
        robot,
        "ALERT"
    );

    setRobotIndicator(
        robot,
        "alert"
    );

    updateRobotStatus(
        "RETURNING",
        "status-alert"
    );

    addLog(
        "Notification sent to nearby healthcare personnel."
    );

    addLog(
        "Robot returning to its home position."
    );

}


// ============================================================
// ROBOT RETURN MOVEMENT
// ============================================================

function updateRobotReturn() {

    if (!state.returningHome) {
        return;
    }

    const start =
        state.robotTarget;

    const target =
        state.robotStart;

    state.returnProgress +=
        0.006;

    const progress =
        Math.min(
            state.returnProgress,
            1
        );


    // --------------------------------------------------------
    // SMOOTH RETURN
    // --------------------------------------------------------

    const eased =
        progress *
        progress *
        (3 - 2 * progress);


    robot.position.lerpVectors(
        start,
        target,
        eased
    );


    // --------------------------------------------------------
    // FACE HOME DIRECTION
    // --------------------------------------------------------

    const direction =
        new THREE.Vector3()
            .subVectors(
                target,
                robot.position
            );


    if (
        direction.length() > 0.01
    ) {

        const angle =
            Math.atan2(
                -direction.x,
                -direction.z
            );

        robot.rotation.y =
            angle;

    }


    // --------------------------------------------------------
    // WHEEL MOVEMENT
    // --------------------------------------------------------

    rotateRobotWheels(
        robot,
        0.055
    );


    // --------------------------------------------------------
    // ARRIVED HOME
    // --------------------------------------------------------

    if (
        progress >= 1
    ) {

        state.returningHome =
            false;

        robot.position.copy(
            target
        );

        robot.rotation.set(
            0,
            0,
            0
        );

        setRobotDisplay(
            robot,
            "STANDBY"
        );

        setRobotIndicator(
            robot,
            "normal"
        );

        updateRobotStatus(
            "STANDBY",
            "status-standby"
        );

        addLog(
            "Robot returned to its home position."
        );

        beginDoctorArrival();

    }

}


// ============================================================
// DOCTOR ARRIVAL
// ============================================================

function beginDoctorArrival() {

    if (!state.active || !state.doctor) {
        return;
    }

    state.doctorMoving =
        true;

    state.doctorProgress =
        0;

    doctor.visible =
        true;

    // Doctor begins outside the room.
    doctor.position.set(
        5.2,
        0,
        3.7
    );

    doctor.rotation.y =
        Math.PI;

    addLog(
        "Nearby doctor entering the room."
    );

}


// ============================================================
// DOCTOR MOVEMENT
// ============================================================

function updateDoctorMovement() {

    if (
        !state.doctorMoving ||
        !doctor.visible
    ) {
        return;
    }

    state.doctorProgress +=
        0.0045;

    const progress =
        Math.min(
            state.doctorProgress,
            1
        );


    // --------------------------------------------------------
    // SMOOTH WALK
    // --------------------------------------------------------

    const eased =
        progress *
        progress *
        (3 - 2 * progress);


    const start =
        new THREE.Vector3(
            5.2,
            0,
            3.7
        );


    // Stand beside the bed, not on the bed.
    const target =
        new THREE.Vector3(
            3.0,
            2,
            0.25
        );


    doctor.position.lerpVectors(
        start,
        target,
        eased
    );


    // --------------------------------------------------------
    // FACE TOWARD THE PATIENT
    // --------------------------------------------------------

    const patientPosition =
        new THREE.Vector3(
            1.35,
            1.2,
            -2.0
        );

    const direction =
        new THREE.Vector3()
            .subVectors(
                patientPosition,
                doctor.position
            );


    if (
        direction.length() > 0.01
    ) {

        const angle =
            Math.atan2(
                direction.x,
                direction.z
            );

        doctor.rotation.y =
            angle;

    }


    // --------------------------------------------------------
    // WALKING MOTION
    // --------------------------------------------------------

    const walk =
        Math.sin(
            progress *
            Math.PI *
            10
        ) * 0.035;

    doctor.position.y =
        Math.abs(walk);


    // --------------------------------------------------------
    // ARRIVED BESIDE BED
    // --------------------------------------------------------

    if (
        progress >= 1
    ) {

        state.doctorMoving =
            false;

        doctor.position.copy(
            target
        );

        doctor.position.y =
            0;


        // Face the patient after reaching the bedside.
        const finalDirection =
            new THREE.Vector3()
                .subVectors(
                    patientPosition,
                    doctor.position
                );

        doctor.rotation.y =
            Math.atan2(
                finalDirection.x,
                finalDirection.z
            );


        updateRobotStatus(
            "DOCTOR ARRIVED",
            "status-warning"
        );

        setRobotDisplay(
            robot,
            "STANDBY"
        );

        setRobotIndicator(
            robot,
            "normal"
        );

        addLog(
            "Doctor reached the patient's bedside."
        );

        addLog(
            "Doctor taking over patient care."
        );

    }

}

// ============================================================
// COMPLETE ASSESSMENT
// ============================================================

function completeAssessment() {

    if (!state.active) {
        return;
    }

    state.conversationRunning =
        false;

    setRobotDisplay(
        robot,
        "ALERT"
    );

    setRobotIndicator(
        robot,
        "alert"
    );

    updateRobotStatus(
        "ALERT SENT",
        "status-alert"
    );

    addLog(
        "Potentially abnormal condition confirmed by AI assessment."
    );

    addLog(
        "Immediate alert prepared for designated caregiver."
    );

    addLog(
        "Nearby healthcare personnel notification initiated."
    );

    showAlert();


    // --------------------------------------------------------
    // START RETURN AFTER NOTIFICATION
    // --------------------------------------------------------

    setTimeout(() => {

        if (!state.active) {
            return;
        }

        beginRobotReturnHome();

    }, 900);

}


// ============================================================
// SHOW ALERT
// ============================================================

function showAlert() {

    state.alertShown =
        true;

    alertOverlay.classList.remove(
        "hidden"
    );

}


// ============================================================
// CLOSE ALERT
// ============================================================

function closeAlertPanel() {

    alertOverlay.classList.add(
        "hidden"
    );

    state.alertShown =
        false;

    addLog(
        "Alert acknowledged. Continuous monitoring resumed."
    );

    setRobotDisplay(
        robot,
        "ASSESSING"
    );

    updateRobotStatus(
        "MONITORING",
        "status-warning"
    );

}


// ============================================================
// RESET SIMULATION
// ============================================================

function resetSimulation(
    writeLog = true
) {

    /*
        Invalidate every currently running
        assessment timeout.
    */

    state.assessmentToken++;


    state.active =
        false;

    state.robotMoving =
        false;

    state.returningHome =
        false;

    state.alertShown =
        false;

    state.conversationRunning =
        false;

    state.movementProgress =
        0;

    state.returnProgress =
        0;

    state.doctorMoving =
        false;

    state.doctorProgress =
        0;

    state.scenario =
        "normal";


    alertOverlay.classList.add(
        "hidden"
    );


    conversation.clear();


    // --------------------------------------------------------
    // DOCTOR
    // --------------------------------------------------------

    doctor.visible =
        false;

    doctor.position.set(
        5.2,
        0,
        3.7
    );

    doctor.rotation.set(
        0,
        Math.PI,
        0
    );


    // --------------------------------------------------------
    // ROBOT
    // --------------------------------------------------------

    robot.position.copy(
        state.robotStart
    );

    robot.rotation.set(
        0,
        0,
        0
    );

    setRobotIndicator(
        robot,
        "normal"
    );

    setRobotDisplay(
        robot,
        "STANDBY"
    );


    // --------------------------------------------------------
    // PATIENT
    // --------------------------------------------------------

    patient.position.set(
        1.45,
        0,
        -2.0
    );

    patient.rotation.set(
        0,
        0,
        0
    );

    setPatientStatus(
        patient,
        "normal"
    );

    animatePatientDistress(
        patient,
        false
    );


    // --------------------------------------------------------
    // VALUES
    // --------------------------------------------------------

    state.values.heartRate =
        74;

    state.values.spo2 =
        98;

    state.values.temperature =
        36.7;

    updateMonitoringDisplay();


    setMonitorIndicator(
        "normal"
    );


    updateRobotStatus(
        "STANDBY",
        "status-standby"
    );


    // --------------------------------------------------------
    // LOG
    // --------------------------------------------------------

    if (writeLog) {

        logContainer.innerHTML = "";

        addLog(
            "System reset."
        );

        addLog(
            "Continuous patient monitoring active."
        );

    }

}


// ============================================================
// BUTTON EVENTS
// ============================================================

document
    .getElementById("normalBtn")
    .addEventListener(
        "click",
        activateNormalScenario
    );


document
    .getElementById("hrBtn")
    .addEventListener(
        "click",
        activateHeartRateScenario
    );


document
    .getElementById("spo2Btn")
    .addEventListener(
        "click",
        activateSpO2Scenario
    );


document
    .getElementById("tempBtn")
    .addEventListener(
        "click",
        activateTemperatureScenario
    );


document
    .getElementById("distressBtn")
    .addEventListener(
        "click",
        activateDistressScenario
    );


document
    .getElementById("resetBtn")
    .addEventListener(
        "click",
        () => {
            resetSimulation(true);
        }
    );


closeAlert.addEventListener(
    "click",
    closeAlertPanel
);


// ============================================================
// WINDOW RESIZE
// ============================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);


// ============================================================
// CLOCK
// ============================================================

const clock =
    new THREE.Clock();


// ============================================================
// ANIMATION LOOP
// ============================================================

function animate() {

    requestAnimationFrame(
        animate
    );

    const elapsedTime =
        clock.getElapsedTime();


    // --------------------------------------------------------
    // ROBOT ANIMATION
    // --------------------------------------------------------

    updateRobot(
        robot,
        elapsedTime
    );


    // --------------------------------------------------------
    // PATIENT ANIMATION
    // --------------------------------------------------------

    updatePatient(
        patient,
        elapsedTime
    );


    // --------------------------------------------------------
    // ROBOT NAVIGATION
    // --------------------------------------------------------

    updateRobotMovement();


    // --------------------------------------------------------
    // ROBOT RETURN
    // --------------------------------------------------------

    updateRobotReturn();


    // --------------------------------------------------------
    // DOCTOR NAVIGATION
    // --------------------------------------------------------

    updateDoctorMovement();


    // --------------------------------------------------------
    // CONVERSATION BUBBLES
    // --------------------------------------------------------

    conversation.update();


    // --------------------------------------------------------
    // CAMERA
    // --------------------------------------------------------

    camera.lookAt(
        cameraTarget
    );


    // --------------------------------------------------------
    // RENDER
    // --------------------------------------------------------

    renderer.render(
        scene,
        camera
    );

}


// ============================================================
// INITIALIZE
// ============================================================

resetSimulation(false);

logContainer.innerHTML = "";

addLog(
    "AI Healthcare Companion Robot initialized."
);

addLog(
    "Physiological monitoring sensors online."
);

addLog(
    "Continuous patient monitoring active."
);

addLog(
    "System ready for autonomous response."
);


// ============================================================
// START
// ============================================================

animate();