import { } from "https://unpkg.com/@workadventure/scripting-api-extra@^1";

var currentPopup = undefined;
var isCoWebSiteOpened =  false;

export function closePopUp(){
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
export function openPopUpOkOnly(popUpName, msg, label) {
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
export function openPopupWithWebsiteYesNo(popUpName, msg, websiteUrl) {
    currentPopup = WA.ui.openPopup(popUpName, msg, [
        {
            label: "Nein",
            callback: (popup => {
                isCoWebSiteOpened = false;
                closePopUp();
            })
        },
        {
            label: "Ja",
            callback: (popup => {
                WA.openTab(websiteUrl);
                isCoWebSiteOpened = true;
                closePopUp();
            })
        }
    ]);
}

export function closePopupWithWebsite() {
    closePopUp();
    
    if (isCoWebSiteOpened) {
        WA.nav.closeCoWebSite();
        isCoWebSiteOpened = false;
    }
}