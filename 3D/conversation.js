import * as THREE from "three";


// ======================================================
// CONVERSATION MANAGER
// ======================================================

export class ConversationManager {

    constructor(
        camera,
        robot,
        patient
    ) {

        this.camera =
            camera;

        this.robot =
            robot;

        this.patient =
            patient;


        this.robotBubble =
            document.getElementById(
                "robotSpeech"
            );

        this.patientBubble =
            document.getElementById(
                "patientSpeech"
            );


        this.activeBubble =
            null;

        this.activeType =
            null;


        this.messageToken =
            0;
    }


    // ==================================================
    // ROBOT SPEECH
    // ==================================================

    robotSpeak(
        message,
        duration = 2200
    ) {

        this.showBubble(
            this.robotBubble,
            message,
            "robot"
        );

        this.scheduleClear(
            this.robotBubble,
            duration
        );
    }


    // ==================================================
    // PATIENT SPEECH
    // ==================================================

    patientSpeak(
        message,
        duration = 2200
    ) {

        this.showBubble(
            this.patientBubble,
            message,
            "patient"
        );

        this.scheduleClear(
            this.patientBubble,
            duration
        );
    }


    // ==================================================
    // SHOW BUBBLE
    // ==================================================

    showBubble(
        bubble,
        message,
        type
    ) {

        if (!bubble) {
            return;
        }


        // Increase token so old
        // messages cannot remove
        // newer messages.

        this.messageToken++;

        bubble.textContent =
            message;


        bubble.classList.remove(
            "hidden"
        );


        bubble.style.opacity =
            "0";


        bubble.style.transform =
            "translate(-50%, -100%) scale(0.92)";


        // Force browser layout

        void bubble.offsetWidth;


        requestAnimationFrame(
            () => {

                bubble.style.opacity =
                    "1";

                bubble.style.transform =
                    "translate(-50%, -100%) scale(1)";

            }
        );


        this.activeBubble =
            bubble;

        this.activeType =
            type;
    }


    // ==================================================
    // SCHEDULE BUBBLE CLEAR
    // ==================================================

    scheduleClear(
        bubble,
        duration
    ) {

        const token =
            this.messageToken;


        setTimeout(
            () => {

                if (
                    token !==
                    this.messageToken
                ) {
                    return;
                }


                if (
                    bubble
                    ===
                    this.activeBubble
                ) {

                    this.hideBubble(
                        bubble
                    );
                }

            },
            duration
        );
    }


    // ==================================================
    // HIDE BUBBLE
    // ==================================================

    hideBubble(
        bubble
    ) {

        if (!bubble) {
            return;
        }


        bubble.style.opacity =
            "0";


        bubble.style.transform =
            "translate(-50%, -100%) scale(0.92)";


        setTimeout(
            () => {

                bubble.classList.add(
                    "hidden"
                );

            },
            250
        );
    }


    // ==================================================
    // CLEAR ALL
    // ==================================================

    clear() {

        this.messageToken++;


        this.hideBubble(
            this.robotBubble
        );

        this.hideBubble(
            this.patientBubble
        );


        this.activeBubble =
            null;

        this.activeType =
            null;
    }


    // ==================================================
    // UPDATE POSITION
    // ==================================================

    update() {

        if (
            !this.camera
        ) {
            return;
        }


        if (
            !this.robot
        ) {
            return;
        }


        if (
            !this.patient
        ) {
            return;
        }


        // ----------------------------------------------
        // ROBOT BUBBLE
        // ----------------------------------------------

        if (
            this.robotBubble &&
            !this.robotBubble
                .classList
                .contains("hidden")
        ) {

            this.positionBubble(
                this.robotBubble,
                this.robot,
                2.95
            );
        }


        // ----------------------------------------------
        // PATIENT BUBBLE
        // ----------------------------------------------

        if (
            this.patientBubble &&
            !this.patientBubble
                .classList
                .contains("hidden")
        ) {

            this.positionBubble(
                this.patientBubble,
                this.patient,
                2.75
            );
        }
    }


    // ==================================================
    // POSITION BUBBLE
    // ==================================================

    positionBubble(
        bubble,
        object,
        height
    ) {

        if (
            !bubble ||
            !object
        ) {
            return;
        }


        const worldPosition =
            new THREE.Vector3();


        object.getWorldPosition(
            worldPosition
        );


        worldPosition.y +=
            height;


        worldPosition.project(
            this.camera
        );


        const x =
            (
                worldPosition.x
                * 0.5
                + 0.5
            )
            *
            window.innerWidth;


        const y =
            (
                -worldPosition.y
                * 0.5
                + 0.5
            )
            *
            window.innerHeight;


        // ----------------------------------------------
        // Don't display bubbles behind camera
        // ----------------------------------------------

        if (
            worldPosition.z > 1
        ) {

            bubble.style.opacity =
                "0";

            return;

        }


        bubble.style.left =
            `${x}px`;


        bubble.style.top =
            `${y}px`;
    }


    // ==================================================
    // COMPLETE CONVERSATION
    // ==================================================

    async speakSequence(
        sequence
    ) {

        if (
            !Array.isArray(
                sequence
            )
        ) {
            return;
        }


        const sequenceToken =
            ++this.messageToken;


        for (
            const message
            of sequence
        ) {

            if (
                sequenceToken
                !==
                this.messageToken
            ) {
                return;
            }


            if (
                message.type
                ===
                "robot"
            ) {

                this.showBubble(
                    this.robotBubble,
                    message.text,
                    "robot"
                );

            }


            else if (
                message.type
                ===
                "patient"
            ) {

                this.showBubble(
                    this.patientBubble,
                    message.text,
                    "patient"
                );

            }


            const duration =
                message.duration
                ||
                2200;


            await this.wait(
                duration
            );


            if (
                sequenceToken
                !==
                this.messageToken
            ) {
                return;
            }
        }


        this.clear();
    }


    // ==================================================
    // WAIT
    // ==================================================

    wait(
        milliseconds
    ) {

        return new Promise(
            resolve => {

                setTimeout(
                    resolve,
                    milliseconds
                );

            }
        );
    }
}