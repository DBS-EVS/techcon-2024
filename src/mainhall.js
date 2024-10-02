import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { getLayersMap } from "@workadventure/scripting-api-extra";
bootstrapExtra();

console.log("Script started successfully")

var programMsg = "Möchtest Du Dir das Programm der DB TechCon 2024 ansehen?";
var urlProgram = "https://db-planet.deutschebahn.com/pages/dbtechcon/apps/content/programm";

const zone2PopUpMap = new Map ([
    ["programPopUp1", "popUpProgram1"],
    ["programPopUp2", "popUpProgram2"],
    ["programPopUp3", "popUpProgram3"],
    ["programPopUp4", "popUpProgram4"],
    ["programPopUp5", "popUpProgram5"],
    ["programPopUp6", "popUpProgram6"],
    ["programPopUp7", "popUpProgram7"],
    ["programPopUp8", "popUpProgram8"],
    ["programPopUp9", "popUpProgram9"],
    ["programPopUp10", "popUpProgram10"],
    ["programPopUp11", "popUpProgram11"]
]);

var introArea = "silent1";

var currentPopup = undefined;

var hidingTrainLayerOnInitBorder = 4265;


/***********************************************
 * Waiting for the API to be ready
 ***********************************************/
WA.onInit().then(() => {
    console.log("Scripting API ready")
    console.log("Player tags: ", WA.player.tags)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
    .then(() => {
        console.log("Scripting API Extra ready")
    })
    .catch(e => console.error(e))

    processProgramPopups();
    processBookstorePopUp();
    hideTrainLayers();
    initVoting();
    
    // hide train layers when spawning in train area
    hideTrainByInitPosition();
})
.catch(e => console.error(e))


/***********************************************
 * Adding navigation button
 ***********************************************/

var btnImageNavigaitonUrl = "https://metawork.deutschebahn.com/techcon-24/Destination_Solid.png";
var layerNavigation1 = "navigation1";
var layerNavigation2 = "navigation2";
var layerIsHidden = true;

WA.ui.actionBar.addButton({
    id:"toggleNavigation",
    type:"action",
    imageSrc:btnImageNavigaitonUrl,
    toolTip:"Navigation ein-/ausschalten",
    callback: async () => {
        if(layerIsHidden) {
            WA.room.showLayer(layerNavigation1);
            WA.room.showLayer(layerNavigation2);    
            layerIsHidden = false;
        } else {
            WA.room.hideLayer(layerNavigation1);
            WA.room.hideLayer(layerNavigation2);
            layerIsHidden = true;
        }
    }
})


/***********************************************
 * Player position functions
 ***********************************************/

async function logPlayerPosition() {
    var position = await WA.player.getPosition();
    console.log(position.x, position.y);
}

async function getPlayerPosX() {
    var position = await WA.player.getPosition();
    console.log("getPosX: ", position.x);
    
    return position.x;
}

async function getPlayerPosY() {
    var position = await WA.player.getPosition();
    console.log("getPosY: ", position.y);
    
    return position.y;
}


/***********************************************
 * Sign functions
 ***********************************************/
/*
const sign1 = await WA.room.website.get("sign1");
const sign2 = await WA.room.website.get("sign2");
const sign3 = await WA.room.website.get("sign3");
const sign4 = await WA.room.website.get("sign4");
const sign5 = await WA.room.website.get("sign5");
const sign6 = await WA.room.website.get("sign6");
const sign7 = await WA.room.website.get("sign7");
const sign8 = await WA.room.website.get("sign8");

const signToTrackMap = new Map ([
    [sign1, track1Map],
    [sign2, track2Map],
    [sign3, track3Map],
    [sign4, track4Map],
    [sign5, track5Map],
    [sign6, track6Map],
    [sign7, track7Map],
    [sign8, track8Map]
]);

setTrackContent(signToTrackMap);
refreshSigns(signToTrackMap);
*/

/***********************************************
 * Voting
 ***********************************************/
var areaVoteOne = "voteOne";
var areaVoteTwo = "voteTwo";
var areaVoteThree = "voteThree";

function initVoting() {
    WA.room.area.onEnter(areaVoteOne).subscribe(() => {
        WA.state.vote1 += 1;
    })
    WA.room.area.onLeave(areaVoteOne).subscribe(() => {
        WA.state.vote1 -= 1;
    })
    WA.room.area.onEnter(areaVoteTwo).subscribe(() => {
        WA.state.vote2 += 1;
    })
    WA.room.area.onLeave(areaVoteTwo).subscribe(() => {
        WA.state.vote2 -= 1;
    })
    WA.room.area.onEnter(areaVoteThree).subscribe(() => {
        WA.state.vote3 += 1;
    })
    WA.room.area.onLeave(areaVoteThree).subscribe(() => {
        WA.state.vote3 -= 1;
    })
}

function addOneDigit(currVal) {
    if (typeof currVal !== 'number') {
        return;
    } else {
        return currVal + 1;
    }
}

/***********************************************
 * Hiding Layers functions
 ***********************************************/
var layerTrack1roof = "trainsTopFading/track1";
var layerTrack2roof = "trainsTopFading/track2";
var layerTrack21roof = "trainsTopFading/track2.1";
var layerTrack3roof = "trainsTopFading/track3";
var layerTrack4roof = "trainsTopFading/track4";
var layerTrack41roof = "trainsTopFading/track4.1";
var layerTrack5roof = "trainsTopFading/track5";
var layerTrack6roof = "trainsTopFading/track6";
var layerTrack61roof = "trainsTopFading/track6.1";

var areaHideTrack1 = "hideTrack1";
var areaHideTrack2 = "hideTrack2";
var areaHideTrack3 = "hideTrack3";
var areaHideTrack4 = "hideTrack4";
var areaHideTrack5 = "hideTrack5";
var areaHideTrack6 = "hideTrack6";

function hideTrainLayers() {
    WA.room.area.onEnter(areaHideTrack1).subscribe(() => {
        WA.room.hideLayer(layerTrack1roof);
    })
    WA.room.area.onLeave(areaHideTrack1).subscribe(() => {
        WA.room.showLayer(layerTrack1roof);
    })

    WA.room.area.onEnter(areaHideTrack2).subscribe(() => {
        WA.room.hideLayer(layerTrack2roof);
        WA.room.hideLayer(layerTrack21roof);
    })
    WA.room.area.onLeave(areaHideTrack2).subscribe(() => {
        WA.room.showLayer(layerTrack2roof);
        WA.room.showLayer(layerTrack21roof);
    })

    WA.room.area.onEnter(areaHideTrack3).subscribe(() => {
        WA.room.hideLayer(layerTrack3roof);
    })
    WA.room.area.onLeave(areaHideTrack3).subscribe(() => {
        WA.room.showLayer(layerTrack3roof);
    })

    WA.room.area.onEnter(areaHideTrack4).subscribe(() => {
        WA.room.hideLayer(layerTrack4roof);
        WA.room.hideLayer(layerTrack41roof);
    })
    WA.room.area.onLeave(areaHideTrack4).subscribe(() => {
        WA.room.showLayer(layerTrack4roof);
        WA.room.showLayer(layerTrack41roof);
    })

    WA.room.area.onEnter(areaHideTrack5).subscribe(() => {
        WA.room.hideLayer(layerTrack5roof);
    })
    WA.room.area.onLeave(areaHideTrack5).subscribe(() => {
        WA.room.showLayer(layerTrack5roof);
    })

    WA.room.area.onEnter(areaHideTrack6).subscribe(() => {
        WA.room.hideLayer(layerTrack6roof);
        WA.room.hideLayer(layerTrack61roof);
    })
    WA.room.area.onLeave(areaHideTrack6).subscribe(() => {
        WA.room.showLayer(layerTrack6roof);
        WA.room.showLayer(layerTrack61roof);
    })
}

var track1TrainYtop = 3926;
var track1TrainYbottom = 4100;
var track2TrainYtop = 3104;
var track2TrainYbottom = 3288;
var track3TrainYtop = 2829;
var track3TrainYbottom = 3013;
var track4TrainYtop = 2024;
var track4TrainYbottom = 2202;
var track5TrainYtop = 1738;
var track5TrainYbottom = 1922;
var track6TrainYtop = 942;
var track6TrainYbottom = 1111;

async function hideTrainByInitPosition() {
    var posX = await getPlayerPosX();

    if(posX > hidingTrainLayerOnInitBorder) {
        var posY = await getPlayerPosY();

        if(posY > track1TrainYtop && posY < track1TrainYbottom) {        
            WA.room.hideLayer(layerTrack1roof);
        }
        else if(posY > track2TrainYtop && posY < track2TrainYbottom) {
            WA.room.hideLayer(layerTrack2roof);
            WA.room.hideLayer(layerTrack21roof);
        }
        else if(posY > track3TrainYtop && posY < track3TrainYbottom) {
            WA.room.hideLayer(layerTrack3roof);    
        }
        else if(posY > track4TrainYtop && posY < track4TrainYbottom) {
            WA.room.hideLayer(layerTrack4roof);
            WA.room.hideLayer(layerTrack41roof);
        }
        else if(posY > track5TrainYtop && posY < track5TrainYbottom) {
            WA.room.hideLayer(layerTrack5roof);
        }
        else if(posY > track6TrainYtop && posY < track6TrainYbottom) {
            console.log("hiding track6 layers...")
            WA.room.hideLayer(layerTrack6roof);
            WA.room.hideLayer(layerTrack61roof);
        }
    }
}

/***********************************************
 * Bookstore pop up functions
 ***********************************************/
var bookstoreZone = "bookstore-npc";
var popUpBookstore = "popUpBookstore";
var urlShareCommunity = "https://dbsw.sharepoint.com/:l:/s/DB.Cloud.Bar.Camp/FF2-HHKW5M5KrenCwoYZQf4BtOLWSTdvp6xXm23grE_56A?e=1uxJoc";
var bookstoreMsg = "Willkommen bei Schmied & Huhn!\nMöchtest du Informationen zu einer Community erhalten oder teilen?";

function processBookstorePopUp() {
    WA.room.area.onEnter(bookstoreZone).subscribe(() => {
        openPopupWithWebsiteYesNo(popUpBookstore, bookstoreMsg, urlShareCommunity);
    });

    WA.room.area.onLeave(bookstoreZone).subscribe(() => {
        closePopupWithWebsite();
    });
}


/***********************************************
 * Program pop up functions
 ***********************************************/
function processProgramPopups() {
    for (const progZone of zone2PopUpMap.keys()) {
    
        WA.room.area.onEnter(progZone).subscribe(() => {
            currentPopup = WA.ui.openPopup(zone2PopUpMap.get(progZone), programMsg, [
                {
                    label: "Nein",
                    callback: (popup => {
                        closePopUp();
                    })
                },
                {
                    label: "Ja",
                    callback: (popup => {
                        WA.openTab(urlProgram);
                        closePopUp();
                    })
                }
            ]);
        });

        WA.room.area.onLeave(progZone).subscribe(() => {
            closePopUp();
        });
    }
}

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

/**
 * @param {String} popUpName
 * @param {String} msg
 * @param {String} label
 */
function openPopUpOkOnly(popUpName, msg, label) {
    currentPopup = WA.ui.openPopup(popUpName, msg, [
        {
            label: label,
            callback: (popup => {
                closePopUp();
            })
        }]);
}

/**
 * @param {String} popUpName
 * @param {String} msg
 * @param {String} websiteUrl
 */
function openPopupWithWebsiteYesNo(popUpName, msg, websiteUrl) {
    currentPopup = WA.ui.openPopup(popUpName, msg, [
        {
            label: "Nein",
            callback: (popup => {
                closePopUp();
            })
        },
        {
            label: "Ja",
            callback: (popup => {
                WA.nav.openTab(websiteUrl);
                closePopUp();
            })
        }
    ]);
}

function closePopupWithWebsite() {
    closePopUp();    
}
