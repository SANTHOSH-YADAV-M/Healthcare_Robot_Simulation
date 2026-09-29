// ============================================
// AI HEALTHCARE COMPANION ROBOT SIMULATION
// ============================================

// Patient baseline
const baseline = {
    heartRate: 72,
    spo2: 98,
    temperature: 36.7
};

// Current patient values
let patient = {
    heartRate: 74,
    spo2: 98,
    temperature: 36.7
};

// Robot state
let robotState = "STANDBY";

// Get HTML elements
const robot = document.getElementById("robot");
const robotStateDisplay = document.getElementById("robotState");

const heartRateDisplay = document.getElementById("heartRate");
const spo2Display = document.getElementById("spo2");
const temperatureDisplay = document.getElementById("temperature");

const systemStatus = document.getElementById("systemStatus");

const eventLog = document.getElementById("eventLog");

const alertBox = document.getElementById("alertBox");
const alertMessage = document.getElementById("alertMessage");

// Buttons
const normalBtn = document.getElementById("normalBtn");
const hrBtn = document.getElementById("hrBtn");
const spo2Btn = document.getElementById("spo2Btn");
const tempBtn = document.getElementById("tempBtn");
const distressBtn = document.getElementById("distressBtn");
const resetBtn = document.getElementById("resetBtn");


// ============================================
// EVENT LOG
// ============================================

function addLog(message) {

    const time = new Date().toLocaleTimeString();

    const entry = document.createElement("p");

    entry.textContent = `${time}  ${message}`;

    eventLog.appendChild(entry);

    eventLog.scrollTop = eventLog.scrollHeight;
}


// ============================================
// UPDATE SENSOR DISPLAY
// ============================================

function updateSensors() {

    heartRateDisplay.textContent =
        `${patient.heartRate} BPM`;

    spo2Display.textContent =
        `${patient.spo2} %`;

    temperatureDisplay.textContent =
        `${patient.temperature.toFixed(1)} °C`;
}


// ============================================
// UPDATE ROBOT STATUS
// ============================================

function updateRobotState(state) {

    robotState = state;

    robotStateDisplay.textContent =
        `ROBOT: ${state}`;

    console.log("Robot State:", state);
}


// ============================================
// SET SYSTEM STATUS
// ============================================

function setSystemStatus(status, abnormal = false) {

    systemStatus.textContent = status;

    if (abnormal) {

        systemStatus.style.color = "#f87171";

        systemStatus.parentElement.style.background =
            "#3b1d22";

        systemStatus.parentElement.style.borderColor =
            "#ef4444";

    } else {

        systemStatus.style.color = "#4ade80";

        systemStatus.parentElement.style.background =
            "#183b2a";

        systemStatus.parentElement.style.borderColor =
            "#286845";
    }
}


// ============================================
// MOVE ROBOT TO PATIENT
// ============================================

function moveRobotToPatient() {

    updateRobotState("NAVIGATING");

    addLog("Robot activated.");

    addLog("Robot navigating toward patient.");

    // Patient is approximately at 45% / 30%
    robot.style.left = "calc(45% - 37px)";
    robot.style.top = "calc(30% + 60px)";

    setTimeout(() => {

        updateRobotState("PATIENT REACHED");

        addLog("Robot reached patient.");

        startInteraction();

    }, 2200);
}


// ============================================
// PATIENT INTERACTION
// ============================================

function startInteraction() {

    updateRobotState("INTERACTING");

    addLog("Voice interaction initiated.");

    setTimeout(() => {

        addLog(
            'Robot: "Hello. I detected a possible health abnormality."'
        );

    }, 800);

    setTimeout(() => {

        addLog(
            'Robot: "Are you experiencing any discomfort?"'
        );

    }, 1600);

    setTimeout(() => {

        updateRobotState("ASSESSING");

        addLog("Additional health assessment started.");

        evaluatePatient();

    }, 2800);
}


// ============================================
// AI PATIENT ASSESSMENT
// ============================================

function evaluatePatient() {

    setTimeout(() => {

        const abnormal =
            patient.heartRate > 100 ||
            patient.heartRate < 50 ||
            patient.spo2 < 94 ||
            patient.temperature > 38.0 ||
            patient.temperature < 35.0;

        if (abnormal) {

            addLog("AI assessment: Potential abnormality confirmed.");

            sendAlert();

        } else {

            addLog("AI assessment: Parameters within simulated limits.");

            setSystemStatus("MONITORING");

            updateRobotState("MONITORING");

            setTimeout(() => {

                returnToStandby();

            }, 2000);
        }

    }, 1800);
}


// ============================================
// SEND ALERT
// ============================================

function sendAlert() {

    updateRobotState("ALERTING");

    setSystemStatus(
        "POTENTIAL ABNORMALITY",
        true
    );

    alertBox.classList.remove("hidden");

    alertMessage.textContent =
        `Potential abnormality detected. HR: ${patient.heartRate} BPM | SpO₂: ${patient.spo2}% | Temperature: ${patient.temperature.toFixed(1)}°C`;

    addLog("Health alert generated.");

    setTimeout(() => {

        addLog("Caretaker notified.");

    }, 500);

    setTimeout(() => {

        addLog("Nearby doctor notified.");

    }, 1000);

    setTimeout(() => {

        updateRobotState("CONTINUOUS MONITORING");

        addLog("Robot continues patient monitoring.");

    }, 1800);
}


// ============================================
// RETURN TO STANDBY
// ============================================

function returnToStandby() {

    updateRobotState("RETURNING");

    addLog("Robot returning to standby position.");

    robot.style.left = "80px";
    robot.style.top = "360px";

    setTimeout(() => {

        updateRobotState("STANDBY");

        addLog("Robot returned to standby mode.");

    }, 2200);
}


// ============================================
// TRIGGER EVENT
// ============================================

function triggerEvent(type) {

    // Remove previous alert
    alertBox.classList.add("hidden");

    // Reset robot position
    robot.style.left = "80px";
    robot.style.top = "360px";

    // NORMAL
    if (type === "normal") {

        patient.heartRate = 74;
        patient.spo2 = 98;
        patient.temperature = 36.7;

        updateSensors();

        setSystemStatus("NORMAL");

        updateRobotState("STANDBY");

        addLog("Patient parameters returned to normal.");

        return;
    }


    // ABNORMAL HEART RATE
    if (type === "hr") {

        patient.heartRate = 118;

        updateSensors();

        setSystemStatus(
            "ABNORMAL HEART RATE",
            true
        );

        addLog(
            "Abnormal heart rate detected: 118 BPM."
        );

        activateRobot(
            "Physiological abnormality detected."
        );

        return;
    }


    // LOW SPO2
    if (type === "spo2") {

        patient.spo2 = 89;

        updateSensors();

        setSystemStatus(
            "LOW SpO₂",
            true
        );

        addLog(
            "Low SpO₂ detected: 89%."
        );

        activateRobot(
            "Low SpO₂ detected."
        );

        return;
    }


    // HIGH TEMPERATURE
    if (type === "temperature") {

        patient.temperature = 39.2;

        updateSensors();

        setSystemStatus(
            "HIGH TEMPERATURE",
            true
        );

        addLog(
            "High temperature detected: 39.2 °C."
        );

        activateRobot(
            "Abnormal temperature detected."
        );

        return;
    }


    // DISTRESS
    if (type === "distress") {

        addLog(
            "Acoustic distress signal detected."
        );

        setSystemStatus(
            "DISTRESS DETECTED",
            true
        );

        activateRobot(
            "Patient distress detected."
        );

        return;
    }
}


// ============================================
// ACTIVATE ROBOT
// ============================================

function activateRobot(reason) {

    updateRobotState("ACTIVATED");

    addLog(reason);

    setTimeout(() => {

        moveRobotToPatient();

    }, 800);
}


// ============================================
// BUTTON EVENTS
// ============================================

normalBtn.addEventListener(
    "click",
    () => triggerEvent("normal")
);

hrBtn.addEventListener(
    "click",
    () => triggerEvent("hr")
);

spo2Btn.addEventListener(
    "click",
    () => triggerEvent("spo2")
);

tempBtn.addEventListener(
    "click",
    () => triggerEvent("temperature")
);

distressBtn.addEventListener(
    "click",
    () => triggerEvent("distress")
);


// ============================================
// RESET
// ============================================

resetBtn.addEventListener("click", () => {

    patient.heartRate = 74;
    patient.spo2 = 98;
    patient.temperature = 36.7;

    updateSensors();

    setSystemStatus("NORMAL");

    alertBox.classList.add("hidden");

    robot.style.left = "80px";
    robot.style.top = "360px";

    updateRobotState("STANDBY");

    eventLog.innerHTML = "";

    addLog("Simulation reset.");

    addLog("Continuous patient monitoring active.");

});


// ============================================
// INITIALIZATION
// ============================================

updateSensors();

setSystemStatus("NORMAL");

updateRobotState("STANDBY");

addLog("AI healthcare monitoring system initialized.");

addLog("Continuous patient monitoring active.");