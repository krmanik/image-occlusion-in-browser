/*

Do not remove this header

Author: Infinyte7 (Mani)

*/

var selectedElement = "";
document.addEventListener('click', function (e) {
    //console.log(e.target.id);
    selectedElement = e.target.id;
}, false);

var note_num = 1;
var originalImageName;
var draw;
var rect;
/*SVG.on(document, 'DOMContentLoaded', function () {
    draw = SVG('drawing')
            .height(600)
            .width(600)

    rect = draw.rect(100, 100).move(100, 50).fill('#f06')

    rect
        .on('click', function () {
            this
                .draggable()
                .selectize()
                .resize()
        })
})*/


function addRect() {
    try {
        draw.rect(200, 50).move(100, 50).fill('#f06')
            .on('click', function () {
                this
                    .draggable()
                    .selectize()
                    .resize()
            })
        document.getElementById("statusMsg").innerHTML = "";
    } catch (e) {
        console.log(e);
        document.getElementById("statusMsg").innerHTML = "Add image first";
    }

}

function removeRect() {
    try {
        if (document.getElementById(selectedElement).tagName == "rect") {
            var svgEle = SVG.adopt(document.getElementById(selectedElement))
            svgEle.selectize(false);
            svgEle.remove();
            document.getElementById("statusMsg").innerHTML = "";
        }
    } catch (e) {
        console.log(e);
        document.getElementById("statusMsg").innerHTML = "Select a rectangle";
    }
}



var imgHeight;
var imgWidth;
function addImage() {

    try {
        document.getElementById("drawing").innerHTML = "<img id='uploadPreview'/>";

        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("uploadPreview");
        imgtag.title = selectedFile.name;

        originalImageName = imgtag.title;

        reader.onload = function (event) {
            imgtag.src = event.target.result;

            imgtag.onload = function () {
                // access image size here 
                //console.log(this.width);
                //console.log(this.height);

                imgHeight = this.height;
                imgWidth = this.width;

                draw = SVG('drawing')
                    .height(imgHeight)
                    .width(imgWidth)
                    .id("SVG101")

                document.getElementById("statusMsg").innerHTML = "";

            };
        };

        reader.readAsDataURL(selectedFile);
    } catch (e) {
        console.log(e);
        document.getElementById("statusMsg").innerHTML = "Image import error";
    }

};

/* Download */
async function downloadNote() {
    
    var childs = document.getElementById("SVG101").childNodes;

    var oneTime = true;
    var csvLine = "";

    for (i = 0; i < childs.length; i++) {

        var origSVG = "";
        var svgQues = "";
        var svgAns = "";

        for (j = 0; j < childs.length; j++) {

            if (childs[j].tagName == "rect") {

                var Qcolor = "#FF7E7E";
                var svgColor = "#FFEBA2";
                var strokeColor = "#2D2D2D";

                childs[j].style.fill = "#FFC107";

                origSVG += childs[j].outerHTML;

                if (i == j) {

                    childs[j].style.fill = "#f44336";

                    svgQues += childs[j].outerHTML;

                    childs[j].style.fill = "#FFC107";

                } else {

                    svgQues += childs[j].outerHTML;
                    svgAns += childs[j].outerHTML;
                }
            }
        }

        // add time stamp
        var timeStamp = new Date().getTime();

        if (childs[i].tagName == "rect") {

            if (oneTime) {
                // origin mask
                //console.log("orig " + origSVG);
                var origFileName = "img-occ-orig-" + timeStamp;
                saveSVG(origFileName, origSVG, imgHeight, imgWidth);
                oneTime = false;
            }

            // Question Mask
            var quesFileName = "img-occ-ques-" + timeStamp;
            //console.log("Ques " + svgQues);

            await saveSVG(quesFileName, svgQues, imgHeight, imgWidth);

            // Answer mask
            var ansFileName = "img-occ-ans-" + timeStamp;
            //console.log("ans " + svgAns);

            await saveSVG(ansFileName, svgAns, imgHeight, imgWidth);

            // get all input note from form
            getNoteFromForm();

            var noteId = "img-occ-note-" + timeStamp;

            csvLine += noteId +
                "\t" + noteHeader +
                "\t" + "<img src='" + originalImageName + "'></img>" +
                "\t" + "<img src='" + quesFileName + ".svg'></img>" +
                "\t" + noteFooter +
                "\t" + noteRemarks +
                "\t" + noteSources +
                "\t" + noteExtra1 +
                "\t" + noteExtra2 +
                "\t" + "<img src='" + ansFileName + ".svg'></img>" +
                "\t" + "<img src='" + origFileName + ".svg'></img>" + "\n";
        }

    }

    var f = "output-note" + note_num + ".txt";
    exportFile(csvLine, f);
    note_num++;

    // add to view note side bar
    addCsvLineToViewNote(csvLine);
    //document.getElementById("noteData").innerHTML = csvLine;



}


function exportFile(csv, filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));

    //var filename = "output.txt";
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


/* https://stackoverflow.com/questions/53560991/automatic-file-downloads-limited-to-10-files-on-chrome-browser */
function pause(msec) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(resolve, msec || 1000);
        }
    );
}

var svgNS = "http://www.w3.org/2000/svg";
var xmlns = "http://www.w3.org/2000/svg";

async function saveSVG(name, rect, height, width) {

    await pause(200);

    var svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute("xmlns", xmlns);
    svg.setAttributeNS(null, "height", height);
    svg.setAttributeNS(null, "width", width);

    var g = document.createElementNS(svgNS, "g");
    g.innerHTML = rect;

    svg.append(g);

    var svgData = svg.outerHTML;

    var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });

    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

var noteHeader;
var noteFooter;
var noteRemarks;
var noteSources;
var noteExtra1;
var noteExtra2;

function getNoteFromForm() {
    noteHeader = document.getElementById("noteHeader").value;
    noteFooter = document.getElementById("noteFooter").value;
    noteRemarks = document.getElementById("noteRemarks").value;
    noteSources = document.getElementById("noteSources").value;
    noteExtra1 = document.getElementById("noteExtra1").value;
    noteExtra2 = document.getElementById("noteExtra2").value;
}


var textare_id = 0;
function addCsvLineToViewNote(csv) {
    var container = document.getElementById("noteData");
    var textarea = document.createElement("textarea");
    textarea.id = "note-text-area-" + textare_id;
    textarea.setAttribute("style", "display: block; width:90%; height:10vh; margin-top:6px;");
    textarea.value = csv;
    container.appendChild(textarea);
    document.getElementById(textarea.id).readOnly = true;
    textare_id += 1;
}

function downloadAllNotes() {
    var container = document.getElementById("noteData");

    var textToExport = "";
    for (i=0; i < container.childElementCount; i++) {
        textToExport += container.children[i].value;
    }

    exportFile(textToExport, "output-all-notes.txt");
}

function addNote() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function viewNote() {
    document.getElementById("viewNoteSideNav").style.width = "100%";
}

function closeViewNoteNav() {
    document.getElementById("viewNoteSideNav").style.width = "0";
}

var zoomVar = 100;
function zoomOut() {
    zoomVar -= 4;
    document.getElementById("drawing").style.zoom = zoomVar + "%";
}

function zoomIn() {
    zoomVar += 4;
    document.getElementById("drawing").style.zoom = zoomVar + "%";
}


function viewHelp() {
    document.getElementById("viewHelpSideNav").style.height = "100%";
}

function closeViewHelpNav() {
    document.getElementById("viewHelpSideNav").style.height = "0";
}