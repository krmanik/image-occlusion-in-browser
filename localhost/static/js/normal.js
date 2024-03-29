/* Do not remove
MIT License

Copyright (c) 2020 Mani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* Download */
async function createNormalCloze() {

    showSnackbar("Also download notes from side menu.");

    var child = document.getElementById("SVG101").childNodes;

    var oneTime = true;
    var csvLine = "";

    for (i = 0; i < child.length; i++) {

        var origSVG = "";
        var svgQues = "";
        var svgAns = "";
        // don't add svg with 0 width and 0 height
        if (child[i].getBBox().height != 0 && child[i].getBBox().width != 0) {

            for (j = 0; j < child.length; j++) {

                if (child[j].tagName == "rect") {

                    child[j].style.fill = originalColor;

                    origSVG += child[j].outerHTML;

                    if (i == j) {

                        child[j].style.fill = questionColor;

                        svgQues += child[j].outerHTML;

                        child[j].style.fill = originalColor;

                    } else {

                        svgQues += child[j].outerHTML;
                        svgAns += child[j].outerHTML;
                    }
                }
            }

            // add time stamp
            var timeStamp = new Date().getTime();

            if (child[i].tagName == "rect") {

                if (oneTime) {
                    // origin mask
                    //console.log("orig " + origSVG);
                    var origFileName = "cordova-img-occ-orig-" + timeStamp;
                    saveSVG(origFileName, origSVG, imgHeight, imgWidth);
                    oneTime = false;
                }

                // Question Mask
                var quesFileName = "cordova-img-occ-ques-" + timeStamp;
                //console.log("Ques " + svgQues);

                await saveSVG(quesFileName, svgQues, imgHeight, imgWidth);

                // Answer mask
                var ansFileName = "cordova-img-occ-ans-" + timeStamp;
                //console.log("ans " + svgAns);

                await saveSVG(ansFileName, svgAns, imgHeight, imgWidth);

                // get all input note from form
                getNoteFromForm();

                var noteId = "cordova-img-occ-note-" + timeStamp;

                csvLine = noteId +
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


                // var origImgSVG = "<img src='" + originalImageName + "'></img>";
                // var quesImgSVG = "<img src='" + quesFileName + ".svg'></img>";
                // var ansImgSVG = "<img src='" + ansFileName + ".svg'></img>";
                // var origFile = "<img src='" + origFileName + ".svg'></img>";

                // var cardData = [noteId, noteHeader, origImgSVG, quesImgSVG, noteFooter, noteRemarks, noteSources, noteExtra1, noteExtra2, ansImgSVG, origFile];
                // addCardToAnkiDroid(cardData);
            
                // var f = "output-note" + note_num + ".txt";
                // exportFile(csvLine, f);
                // note_num++;
            
                addCsvLineToViewNote(csvLine);
            }
        }
    }
}