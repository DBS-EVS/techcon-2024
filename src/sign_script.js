import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";

export const track1Map = new Map ([
    ["TrackNo", "Track+1"],
    [new Date(2022,4,12,20), "DevOps"]
]);

export const track2Map = new Map ([
    ["TrackNo", "Track+2"],
    [new Date(2022,4,11,13,55), "Data+Lake"],
    [new Date(2022,4,11,20), "Robotics"],
    [new Date(2022,4,12,20), "Cyber%26OT-Sec"]
]);

export const track3Map = new Map ([
    ["TrackNo", "Track+3"],
    [new Date(2022,4,11,13,55), "Bahn-Tech"],
    [new Date(2022,4,11,20), "UX"],
    [new Date(2022,4,12,20), "Bahn-Tech"]
]);

export const track4Map = new Map ([
    ["TrackNo", "Track+4"],
    [new Date(2022,4,11,13,55), "Recruiting+IT"],
    [new Date(2022,4,12,20), "KI+%26+Daten"]
]);

export const track5Map = new Map ([
    ["TrackNo", "Track+5"],
    [new Date(2022,4,11,20), "API"],
    [new Date(2022,4,12,13,55), "Open+Source"],
    [new Date(2022,4,12,20), "Digitale+Inkl."]
]);

export const track6Map = new Map ([
    ["TrackNo", "Track+6"],
    [new Date(2022,4,11,13,55), "Immersive"],
    [new Date(2022,4,11,20), "DevOps+2"],
    [new Date(2022,4,12,13,55), "UX"],
    [new Date(2022,4,12,20), "Digital+Twin"]
]);

export function setTrackContent(signToTrackMap) {
    let currentTime = Date.now();

    for (const sign of signToTrackMap.keys()) {
        const currTrackMap = signToTrackMap.get(sign);

        for (const trackTime of currTrackMap.keys()) {
            if (currentTime < trackTime) {
                sign.url = "sign.html?line1=" + currTrackMap.get("TrackNo") + "&line2=" + currTrackMap.get(trackTime);
                sign.visible = true;

                break;
            }
        }
    }
}

export function refreshSigns(signToTrackMap) {
    var now = new Date();
    var millisTill14 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0, 0) - now;
    if (millisTill14 < 0) {
        millisTill14 += 120960000; // it's after 14, try tomorrow.
    }
    setTimeout(function(){
        console.log("refreshing track signs");
        setTrackContent(signToTrackMap)
    }, millisTill14);
}


