import * as THREE from "three";


// ======================================================
// MATERIALS
// ======================================================

const materials = {

    floor:
        new THREE.MeshStandardMaterial({
            color: 0x293746,
            roughness: 0.72,
            metalness: 0.05
        }),

    wall:
        new THREE.MeshStandardMaterial({
            color: 0xcbd5df,
            roughness: 0.82,
            metalness: 0
        }),

    wallDark:
        new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            roughness: 0.75
        }),

    ceiling:
        new THREE.MeshStandardMaterial({
            color: 0xe5e7eb,
            roughness: 0.9
        }),

    metal:
        new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            metalness: 0.85,
            roughness: 0.2
        }),

    darkMetal:
        new THREE.MeshStandardMaterial({
            color: 0x334155,
            metalness: 0.75,
            roughness: 0.25
        }),

    black:
        new THREE.MeshStandardMaterial({
            color: 0x111827,
            roughness: 0.4
        }),

    mattress:
        new THREE.MeshStandardMaterial({
            color: 0xf1f5f9,
            roughness: 0.9
        }),

    blanket:
        new THREE.MeshStandardMaterial({
            color: 0xb9d2e7,
            roughness: 0.9
        }),

    wood:
        new THREE.MeshStandardMaterial({
            color: 0x475569,
            roughness: 0.72
        }),

    glass:
        new THREE.MeshPhysicalMaterial({
            color: 0x7dd3fc,
            transparent: true,
            opacity: 0.24,
            roughness: 0.08,
            metalness: 0,
            transmission: 0.15
        }),

    blue:
        new THREE.MeshStandardMaterial({
            color: 0x2563eb,
            emissive: 0x1d4ed8,
            emissiveIntensity: 1.0
        }),

    green:
        new THREE.MeshStandardMaterial({
            color: 0x22c55e,
            emissive: 0x16a34a,
            emissiveIntensity: 1.0
        }),

    red:
        new THREE.MeshStandardMaterial({
            color: 0xef4444,
            emissive: 0xdc2626,
            emissiveIntensity: 1.0
        })
};


// ======================================================
// CREATE ROOM
// ======================================================

export function createRoom(scene) {

    const room =
        new THREE.Group();

    room.name =
        "HospitalRoom";


    // ==================================================
    // FLOOR
    // ==================================================

    const floor =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                18,
                14
            ),
            materials.floor
        );

    floor.rotation.x =
        -Math.PI / 2;

    floor.receiveShadow = true;

    room.add(floor);


    // ==================================================
    // FLOOR BORDER
    // ==================================================

    const border =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                18,
                0.08,
                14
            ),
            materials.darkMetal
        );

    border.position.y =
        0.01;

    border.scale.set(
        0.99,
        1,
        0.99
    );

    border.visible = false;

    room.add(border);


    // ==================================================
    // BACK WALL
    // ==================================================

    const backWall =
        createWall(
            0,
            2.4,
            -7,
            18,
            4.8,
            0.25
        );

    room.add(backWall);


    // ==================================================
    // LEFT WALL
    // ==================================================

    const leftWall =
        createWall(
            -9,
            2.4,
            0,
            0.25,
            4.8,
            14
        );

    room.add(leftWall);


    // ==================================================
    // RIGHT WALL
    // ==================================================

    const rightWall =
        createWall(
            9,
            2.4,
            0,
            0.25,
            4.8,
            14
        );

    room.add(rightWall);


    // ==================================================
    // FRONT WALL
    // ==================================================

    const frontWall =
        createWall(
            0,
            2.4,
            7,
            18,
            4.8,
            0.25
        );

    room.add(frontWall);


    // ==================================================
    // CEILING
    // ==================================================

    const ceiling =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                18,
                14
            ),
            materials.ceiling
        );

    ceiling.rotation.x =
        Math.PI / 2;

    ceiling.position.y =
        4.8;

    room.add(ceiling);


    // ==================================================
    // HOSPITAL BED
    // ==================================================

    const bed =
        createHospitalBed();

    bed.position.set(
        1.5,
        0,
        -2
    );

    room.add(bed);


    // ==================================================
    // BEDSIDE TABLE
    // ==================================================

    const bedsideTable =
        createBedsideTable();

    bedsideTable.position.set(
        -1.25,
        0,
        -2.35
    );

    room.add(
        bedsideTable
    );


    // ==================================================
    // PATIENT MONITOR
    // ==================================================

    const monitor =
        createPatientMonitor();

    monitor.position.set(
        -0.85,
        0,
        -2.8
    );

    room.add(monitor);


    // ==================================================
    // IV STAND
    // ==================================================

    const ivStand =
        createIVStand();

    ivStand.position.set(
        4.0,
        0,
        -1.4
    );

    room.add(ivStand);


    // ==================================================
    // OXYGEN CYLINDER
    // ==================================================

    const oxygen =
        createOxygenCylinder();

    oxygen.position.set(
        -2.9,
        0,
        -2.4
    );

    room.add(oxygen);


    // ==================================================
    // WALL MEDICAL PANEL
    // ==================================================

    const medicalPanel =
        createWallMedicalPanel();

    medicalPanel.position.set(
        3.5,
        2.4,
        -6.82
    );

    room.add(
        medicalPanel
    );


    // ==================================================
    // WINDOW
    // ==================================================

    const window =
        createWindow();

    window.position.set(
        -4.5,
        2.7,
        -6.82
    );

    room.add(window);


    // ==================================================
    // DOOR
    // ==================================================

    const door =
        createDoor();

    door.position.set(
        6.0,
        2.2,
        6.82
    );

    room.add(door);


    // ==================================================
    // WALL DECORATION
    // ==================================================

    const wallPanel =
        createInformationPanel();

    wallPanel.position.set(
        -6.0,
        2.0,
        -6.82
    );

    room.add(
        wallPanel
    );


    // ==================================================
    // CEILING LIGHTS
    // ==================================================

    const ceilingLights = [];

    const lightPositions = [
        [-3.5, 4.65, -1],
        [2.0, 4.65, -1],
        [2.0, 4.65, 4]
    ];

    lightPositions.forEach(
        position => {

            const light =
                createCeilingLight();

            light.position.set(
                position[0],
                position[1],
                position[2]
            );

            room.add(light);

            ceilingLights.push(
                light
            );
        }
    );


    // ==================================================
    // BEDSIDE LAMP
    // ==================================================

    const lamp =
        createBedsideLamp();

    lamp.position.set(
        -1.25,
        1.05,
        -2.35
    );

    room.add(lamp);


    // ==================================================
    // SMALL PLANT
    // ==================================================

    const plant =
        createPlant();

    plant.position.set(
        7,
        0,
        -5.5
    );

    room.add(plant);


    // ==================================================
    // ROOM LABEL
    // ==================================================

    const label =
        createRoomLabel();

    label.position.set(
        5.7,
        3.7,
        -6.75
    );

    room.add(label);


    // ==================================================
    // ADD ROOM
    // ==================================================

    scene.add(room);

    return room;
}


// ======================================================
// CREATE WALL
// ======================================================

function createWall(
    x,
    y,
    z,
    width,
    height,
    depth
) {

    const wall =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            materials.wall
        );

    wall.position.set(
        x,
        y,
        z
    );

    wall.receiveShadow = true;

    wall.castShadow = true;

    return wall;
}


// ======================================================
// HOSPITAL BED
// ======================================================

function createHospitalBed() {

    const bed =
        new THREE.Group();


    // ----------------------------------------------
    // MAIN FRAME
    // ----------------------------------------------

    const frame =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4.3,
                0.28,
                2.05
            ),
            materials.darkMetal
        );

    frame.position.y =
        0.72;

    frame.castShadow = true;

    bed.add(frame);


    // ----------------------------------------------
    // MATTRESS
    // ----------------------------------------------

    const mattress =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4.0,
                0.38,
                1.82
            ),
            materials.mattress
        );

    mattress.position.y =
        1.03;

    mattress.castShadow = true;

    bed.add(mattress);


    // ----------------------------------------------
    // MATTRESS TOP
    // ----------------------------------------------

    const mattressTop =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.85,
                0.08,
                1.72
            ),
            materials.blanket
        );

    mattressTop.position.y =
        1.25;

    bed.add(mattressTop);


    // ----------------------------------------------
    // HEADBOARD
    // ----------------------------------------------

    const headboard =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.22,
                2.1,
                2.1
            ),
            materials.darkMetal
        );

    headboard.position.set(
        -2.0,
        1.55,
        0
    );

    headboard.castShadow = true;

    bed.add(headboard);


    // ----------------------------------------------
    // HEADBOARD PAD
    // ----------------------------------------------

    const headPad =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.12,
                1.7,
                1.75
            ),
            materials.wallDark
        );

    headPad.position.set(
        -1.87,
        1.58,
        0
    );

    bed.add(headPad);


    // ----------------------------------------------
    // FOOTBOARD
    // ----------------------------------------------

    const footboard =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.16,
                1.25,
                2.1
            ),
            materials.darkMetal
        );

    footboard.position.set(
        2.05,
        1.25,
        0
    );

    footboard.castShadow = true;

    bed.add(footboard);


    // ----------------------------------------------
    // BED RAILS
    // ----------------------------------------------

    const leftRail =
        createBedRail();

    leftRail.position.set(
        0,
        1.48,
        -0.92
    );

    bed.add(leftRail);


    const rightRail =
        createBedRail();

    rightRail.position.set(
        0,
        1.48,
        0.92
    );

    bed.add(rightRail);


    // ----------------------------------------------
    // BED LEGS
    // ----------------------------------------------

    const legPositions = [
        [-1.65, 0.35, -0.72],
        [-1.65, 0.35, 0.72],
        [1.65, 0.35, -0.72],
        [1.65, 0.35, 0.72]
    ];


    legPositions.forEach(
        position => {

            const leg =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.15,
                        0.65,
                        0.15
                    ),
                    materials.darkMetal
                );

            leg.position.set(
                position[0],
                position[1],
                position[2]
            );

            bed.add(leg);
        }
    );


    // ----------------------------------------------
    // CASTERS
    // ----------------------------------------------

    legPositions.forEach(
        position => {

            const caster =
                new THREE.Mesh(
                    new THREE.SphereGeometry(
                        0.10,
                        12,
                        12
                    ),
                    materials.black
                );

            caster.position.set(
                position[0],
                0.08,
                position[2]
            );

            bed.add(caster);
        }
    );


    return bed;
}


// ======================================================
// BED RAIL
// ======================================================

function createBedRail() {

    const rail =
        new THREE.Group();


    const bar =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.5,
                0.08,
                0.08
            ),
            materials.metal
        );

    rail.add(bar);


    const support1 =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.06,
                0.45,
                0.06
            ),
            materials.metal
        );

    support1.position.x =
        -1.5;

    support1.position.y =
        -0.20;

    rail.add(support1);


    const support2 =
        support1.clone();

    support2.position.x =
        1.5;

    rail.add(support2);


    return rail;
}


// ======================================================
// BEDSIDE TABLE
// ======================================================

function createBedsideTable() {

    const table =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.1,
                1.0,
                0.9
            ),
            materials.wood
        );

    body.position.y =
        0.55;

    body.castShadow = true;

    table.add(body);


    const top =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.2,
                0.10,
                1.0
            ),
            materials.metal
        );

    top.position.y =
        1.08;

    table.add(top);


    const drawer =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.72,
                0.24,
                0.035
            ),
            materials.darkMetal
        );

    drawer.position.set(
        0,
        0.73,
        0.47
    );

    table.add(drawer);


    const handle =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.18,
                0.035,
                0.035
            ),
            materials.metal
        );

    handle.position.set(
        0,
        0.73,
        0.50
    );

    table.add(handle);


    return table;
}


// ======================================================
// PATIENT MONITOR
// ======================================================

function createPatientMonitor() {

    const monitor =
        new THREE.Group();


    // ----------------------------------------------
    // STAND
    // ----------------------------------------------

    const stand =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.045,
                0.045,
                1.8,
                16
            ),
            materials.darkMetal
        );

    stand.position.y =
        1.25;

    monitor.add(stand);


    // ----------------------------------------------
    // BASE
    // ----------------------------------------------

    const base =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.35,
                0.35,
                0.08,
                24
            ),
            materials.darkMetal
        );

    base.position.y =
        0.36;

    monitor.add(base);


    // ----------------------------------------------
    // SCREEN
    // ----------------------------------------------

    const screen =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.45,
                1.0,
                0.12
            ),
            materials.black
        );

    screen.position.y =
        2.0;

    screen.castShadow = true;

    monitor.add(screen);


    // ----------------------------------------------
    // SCREEN DISPLAY
    // ----------------------------------------------

    const display =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                1.15,
                0.70
            ),
            new THREE.MeshBasicMaterial({
                color: 0x07111f
            })
        );

    display.position.set(
        0,
        2.0,
        0.065
    );

    monitor.add(display);


    // ----------------------------------------------
    // ECG LINE
    // ----------------------------------------------

    const ecg =
        createECGLine();

    ecg.position.set(
        0,
        2.12,
        0.08
    );

    monitor.add(ecg);


    // ----------------------------------------------
    // MONITOR INDICATOR
    // ----------------------------------------------

    const indicator =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.045,
                12,
                12
            ),
            materials.green
        );

    indicator.position.set(
        -0.52,
        2.38,
        0.08
    );

    monitor.add(indicator);


    monitor.userData.ecg =
        ecg;

    monitor.userData.indicator =
        indicator;


    return monitor;
}


// ======================================================
// ECG LINE
// ======================================================

function createECGLine() {

    const points = [];

    const step =
        0.08;

    for (
        let i = 0;
        i < 15;
        i++
    ) {

        const x =
            (i - 7) * step;

        let y =
            Math.sin(i * 0.8)
            * 0.015;

        if (i === 5) {
            y = 0.12;
        }

        if (i === 6) {
            y = -0.08;
        }

        if (i === 7) {
            y = 0.20;
        }

        if (i === 8) {
            y = 0;
        }

        points.push(
            new THREE.Vector3(
                x,
                y,
                0
            )
        );
    }


    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(
                points
            );


    const material =
        new THREE.LineBasicMaterial({
            color: 0x22c55e
        });


    return new THREE.Line(
        geometry,
        material
    );
}


// ======================================================
// IV STAND
// ======================================================

function createIVStand() {

    const stand =
        new THREE.Group();


    const pole =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.035,
                0.035,
                2.8,
                16
            ),
            materials.metal
        );

    pole.position.y =
        1.55;

    pole.castShadow = true;

    stand.add(pole);


    const base =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.42,
                0.42,
                0.08,
                24
            ),
            materials.darkMetal
        );

    base.position.y =
        0.10;

    stand.add(base);


    // wheels

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const angle =
            i *
            Math.PI /
            2;

        const wheel =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.08,
                    12,
                    12
                ),
                materials.black
            );

        wheel.position.set(
            Math.cos(angle) * 0.32,
            0.04,
            Math.sin(angle) * 0.32
        );

        stand.add(wheel);
    }


    // hooks

    const hook =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.16,
                0.025,
                8,
                20,
                Math.PI
            ),
            materials.metal
        );

    hook.rotation.x =
        Math.PI / 2;

    hook.position.y =
        2.9;

    stand.add(hook);


    // IV bag

    const bag =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.38,
                0.55,
                0.12
            ),
            new THREE.MeshPhysicalMaterial({
                color: 0xe0f2fe,
                transparent: true,
                opacity: 0.7,
                roughness: 0.15
            })
        );

    bag.position.set(
        0,
        2.55,
        0
    );

    stand.add(bag);


    // IV fluid

    const fluid =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.31,
                0.35,
                0.07
            ),
            new THREE.MeshStandardMaterial({
                color: 0x93c5fd,
                transparent: true,
                opacity: 0.7
            })
        );

    fluid.position.set(
        0,
        2.44,
        0.01
    );

    stand.add(fluid);


    // tube

    const tube =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.012,
                0.012,
                0.85,
                8
            ),
            new THREE.MeshStandardMaterial({
                color: 0xf8fafc,
                transparent: true,
                opacity: 0.65
            })
        );

    tube.position.y =
        2.0;

    stand.add(tube);


    return stand;
}


// ======================================================
// OXYGEN CYLINDER
// ======================================================

function createOxygenCylinder() {

    const oxygen =
        new THREE.Group();


    const cylinder =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.25,
                0.25,
                1.35,
                24
            ),
            new THREE.MeshStandardMaterial({
                color: 0xdbeafe,
                metalness: 0.5,
                roughness: 0.3
            })
        );

    cylinder.position.y =
        0.75;

    cylinder.castShadow = true;

    oxygen.add(cylinder);


    const top =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.18,
                0.22,
                20
            ),
            materials.blue
        );

    top.position.y =
        1.53;

    oxygen.add(top);


    const valve =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.08,
                0.08,
                0.12,
                16
            ),
            materials.darkMetal
        );

    valve.position.y =
        1.70;

    oxygen.add(valve);


    return oxygen;
}


// ======================================================
// WALL MEDICAL PANEL
// ======================================================

function createWallMedicalPanel() {

    const panel =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.4,
                0.65,
                0.12
            ),
            materials.white ||
            materials.wall
        );

    panel.add(body);


    // oxygen socket

    const oxygenSocket =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.07,
                0.07,
                0.05,
                16
            ),
            materials.green
        );

    oxygenSocket.rotation.x =
        Math.PI / 2;

    oxygenSocket.position.set(
        -0.75,
        0,
        0.08
    );

    panel.add(oxygenSocket);


    // power socket

    const powerSocket =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.16,
                0.16,
                0.04
            ),
            materials.black
        );

    powerSocket.position.set(
        -0.35,
        0,
        0.08
    );

    panel.add(powerSocket);


    // monitor light

    const indicator =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.045,
                12,
                12
            ),
            materials.blue
        );

    indicator.position.set(
        0.2,
        0,
        0.08
    );

    panel.add(indicator);


    // call button

    const callButton =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.18,
                0.18,
                0.05
            ),
            materials.red
        );

    callButton.position.set(
        0.65,
        0,
        0.08
    );

    panel.add(callButton);


    return panel;
}


// ======================================================
// WINDOW
// ======================================================

function createWindow() {

    const windowGroup =
        new THREE.Group();


    const frame =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.3,
                2.2,
                0.16
            ),
            materials.darkMetal
        );

    windowGroup.add(frame);


    const glass =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.0,
                1.9,
                0.04
            ),
            materials.glass
        );

    glass.position.z =
        0.10;

    windowGroup.add(glass);


    const verticalBar =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.06,
                1.9,
                0.08
            ),
            materials.darkMetal
        );

    verticalBar.position.z =
        0.13;

    windowGroup.add(
        verticalBar
    );


    const horizontalBar =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.0,
                0.06,
                0.08
            ),
            materials.darkMetal
        );

    horizontalBar.position.z =
        0.13;

    windowGroup.add(
        horizontalBar
    );


    return windowGroup;
}


// ======================================================
// DOOR
// ======================================================

function createDoor() {

    const door =
        new THREE.Group();


    const frame =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.4,
                4.4,
                0.20
            ),
            materials.darkMetal
        );

    door.add(frame);


    const panel =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.0,
                4.0,
                0.08
            ),
            materials.wood
        );

    panel.position.z =
        0.14;

    door.add(panel);


    const handle =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.08,
                16,
                16
            ),
            materials.metal
        );

    handle.position.set(
        0.65,
        0,
        0.25
    );

    door.add(handle);


    return door;
}


// ======================================================
// INFORMATION PANEL
// ======================================================

function createInformationPanel() {

    const panel =
        new THREE.Group();


    const frame =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.8,
                1.3,
                0.08
            ),
            materials.darkMetal
        );

    panel.add(frame);


    const display =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.55,
                1.05,
                0.04
            ),
            materials.black
        );

    display.position.z =
        0.07;

    panel.add(display);


    const indicator =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.05,
                12,
                12
            ),
            materials.green
        );

    indicator.position.set(
        -0.6,
        0.35,
        0.10
    );

    panel.add(indicator);


    return panel;
}


// ======================================================
// CEILING LIGHT
// ======================================================

function createCeilingLight() {

    const light =
        new THREE.Group();


    const housing =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.4,
                0.08,
                0.55
            ),
            materials.white ||
            materials.ceiling
        );

    light.add(housing);


    const glow =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.0,
                0.025,
                0.32
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xffffff,
                emissiveIntensity: 2
            })
        );

    glow.position.y =
        -0.055;

    light.add(glow);


    return light;
}


// ======================================================
// BEDSIDE LAMP
// ======================================================

function createBedsideLamp() {

    const lamp =
        new THREE.Group();


    const pole =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.025,
                0.025,
                0.6,
                12
            ),
            materials.metal
        );

    pole.position.y =
        0.35;

    lamp.add(pole);


    const shade =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                0.18,
                0.24,
                20
            ),
            materials.wallDark
        );

    shade.position.y =
        0.68;

    lamp.add(shade);


    const glow =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.07,
                16,
                16
            ),
            new THREE.MeshStandardMaterial({
                color: 0xfff7ed,
                emissive: 0xfef3c7,
                emissiveIntensity: 2
            })
        );

    glow.position.y =
        0.60;

    lamp.add(glow);


    return lamp;
}


// ======================================================
// PLANT
// ======================================================

function createPlant() {

    const plant =
        new THREE.Group();


    const pot =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.28,
                0.22,
                0.45,
                20
            ),
            materials.darkMetal
        );

    pot.position.y =
        0.23;

    plant.add(pot);


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const leaf =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.18,
                    12,
                    12
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x3f8f63,
                    roughness: 0.85
                })
            );

        const angle =
            i *
            Math.PI /
            3;

        leaf.position.set(
            Math.cos(angle) * 0.18,
            0.65 +
            (i % 2) * 0.15,
            Math.sin(angle) * 0.18
        );

        leaf.scale.set(
            0.65,
            1.25,
            0.35
        );

        plant.add(leaf);
    }


    return plant;
}


// ======================================================
// ROOM LABEL
// ======================================================

function createRoomLabel() {

    const group =
        new THREE.Group();


    const panel =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.6,
                0.42,
                0.05
            ),
            materials.darkMetal
        );

    group.add(panel);


    return group;
}


// ======================================================
// ROOM LIGHTING
// ======================================================

export function createRoomLighting(
    scene
) {

    // ----------------------------------------------
    // Ambient
    // ----------------------------------------------

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1.1
        );

    scene.add(ambient);


    // ----------------------------------------------
    // Main ceiling light
    // ----------------------------------------------

    const mainLight =
        new THREE.DirectionalLight(
            0xffffff,
            2.4
        );

    mainLight.position.set(
        2,
        9,
        2
    );

    mainLight.castShadow =
        true;

    mainLight.shadow.mapSize.width =
        2048;

    mainLight.shadow.mapSize.height =
        2048;

    mainLight.shadow.camera.left =
        -12;

    mainLight.shadow.camera.right =
        12;

    mainLight.shadow.camera.top =
        12;

    mainLight.shadow.camera.bottom =
        -12;

    mainLight.shadow.camera.near =
        0.5;

    mainLight.shadow.camera.far =
        30;

    scene.add(
        mainLight
    );


    // ----------------------------------------------
    // Blue hospital fill
    // ----------------------------------------------

    const blueLight =
        new THREE.PointLight(
            0x7dd3fc,
            1.3,
            18
        );

    blueLight.position.set(
        -4,
        3,
        0
    );

    scene.add(
        blueLight
    );


    // ----------------------------------------------
    // Warm bedside light
    // ----------------------------------------------

    const warmLight =
        new THREE.PointLight(
            0xffe4b5,
            0.9,
            10
        );

    warmLight.position.set(
        -1,
        2.5,
        -2
    );

    scene.add(
        warmLight
    );


    return {
        ambient,
        mainLight,
        blueLight,
        warmLight
    };
}