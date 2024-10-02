//import content json interface (to avoid ts errors)
import {Root} from "./interface-declaration";

(async() => { 
//load json
var content: Root = await fetch("./station_sign_files/content.json").then((response) => { 
    return response.json().then((data) => {
        return data
        })
    }
)

//load links in title bar for each link in json
//append db logo in the end
const titleBarRight = document.getElementById("tbr")!;
titleBarRight.innerHTML = "";
for (let x of content.tafel.misc.links) {
    let a = document.createElement("a");
    a.classList.add("impressumLink");
    a.setAttribute("href",x.link.to);
    a.innerHTML = x.link.title;
    titleBarRight.appendChild(a);
}
titleBarRight.innerHTML += "<span class='logos'><img id='logo-0-0' class='logo' src='./station_sign_files/Logo.gif'></span>"

//append Tafel Header
document.getElementById("tafelHeader")!.innerHTML = content.tafel.misc.header;

// load yellow Bar Headers
document.getElementById("col1")!.innerHTML = content.tafel.misc.gelbeLeiste.col1
document.getElementById("col2")!.innerHTML = content.tafel.misc.gelbeLeiste.col2
document.getElementById("col3")!.innerHTML = content.tafel.misc.gelbeLeiste.col3
//document.getElementById("col4")!.innerHTML = content.tafel.misc.gelbeLeiste.col4

//load content into table
const tbody = document.getElementById("tbody")!;
tbody.innerHTML = "";
for (let row of content.tafel.content) {
    //create row
    let eintrag = document.createElement("tr");

    //col1
    let col1 = document.createElement("td");
    col1.classList.add("cell_time");
    let time = document.createElement("span");
    time.classList.add("time")
    time.innerHTML = row.eintrag.col1.zeit;
    col1.appendChild(time);
    let zugnummer = document.createElement("span");
    zugnummer.classList.add("tripID")
    zugnummer.innerHTML = row.eintrag.col1.zugnummer;
    col1.appendChild(zugnummer);

    //col2
    let col2 = document.createElement("td");
    let tofrom = document.createElement("span");
    let col2cont = document.createElement("span");
    tofrom.classList.add("to_from");
    col2cont.classList.add("additionalStyling");
    col2cont.innerHTML = row.eintrag.col2;
    tofrom.appendChild(col2cont);
    col2.appendChild(tofrom);

    //col3 
/*    let col3 = document.createElement("td");
    let path = document.createElement("span");
    let pathContent = document.createElement("span");
    path.classList.add("path");
    pathContent.classList.add("additionalStyling");
    pathContent.innerHTML = row.eintrag.col3.whiteText;
    path.appendChild(pathContent);
    col3.appendChild(path);
    let tripMSG = document.createElement("span");
    let tripMSGContent = document.createElement("span");
    tripMSG.classList.add("tripMessage");
    tripMSGContent.classList.add("additionalStyling");
    tripMSGContent.innerHTML = row.eintrag.col3.yellowText;
    tripMSG.appendChild(tripMSGContent);
    path.appendChild(tripMSG);
*/

    //col3
    let col3 = document.createElement("td");
    let platform = document.createElement("span");
    let platformContent = document.createElement("span");
    platform.classList.add("platform");
    platformContent.classList.add("additionalStyling");

    let a = document.createElement("a");
    a.classList.add("trackLink");
    a.setAttribute("href",row.eintrag.col3.to);
    a.setAttribute("target","_blank")
    a.innerHTML = row.eintrag.col3.title;
 //   titleBarRight.appendChild(a);
    
    platformContent.innerHTML = row.eintrag.col3.title;
 //   platform.appendChild(platformContent);
    platform.appendChild(a);
    col3.appendChild(platform);

    //add cols to row and row to table
    eintrag.appendChild(col1);
    eintrag.appendChild(col2);
    eintrag.appendChild(col3);
    tbody.appendChild(eintrag);
}


//add unterschrift
if(content.tafel.misc.unterschrift != ""){
    const additionalText = document.createElement("div");
    additionalText.classList.add("additionalText");
    additionalText.setAttribute("id","disruption");
    additionalText.innerHTML = content.tafel.misc.unterschrift;
    document.getElementById("additionalTextContainer")?.appendChild(additionalText);
}

;})().catch(e => console.error(e));

export {};
