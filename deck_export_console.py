import random
import genanki
import csv
import traceback
import os.path
from os import path

def exportDeck():
   try:
        
      # front side
      front = """
{{#Image}}
<div id="io-header">{{Header}}</div>
<div id="io-wrapper">
<div id="io-overlay">{{Question Mask}}</div>
<div id="io-original">{{Image}}</div>
</div>
<div id="io-footer">{{Footer}}</div>

<script>
// Prevent original image from loading before mask
aFade = 50, qFade = 0;
var mask = document.querySelector('#io-overlay>img');
function loaded() {
var original = document.querySelector('#io-original');
original.style.visibility = "visible";
}
if (mask === null || mask.complete) {
loaded();
} else {
mask.addEventListener('load', loaded);
}
</script>
{{/Image}}

"""

      style = """
/* GENERAL CARD STYLE */
.card {
font-family: "Helvetica LT Std", Helvetica, Arial, Sans;
font-size: 150%;
text-align: center;
color: black;
background-color: white;
}

/* OCCLUSION CSS START - don't edit this */
#io-overlay {
position:absolute;
top:0;
width:100%;
z-index:3
}

#io-original {
position:relative;
top:0;
width:100%;
z-index:2;
visibility: hidden;
}

#io-wrapper {
position:relative;
width: 100%;
}
/* OCCLUSION CSS END */

/* OTHER STYLES */
#io-header{
font-size: 1.1em;
margin-bottom: 0.2em;
}

#io-footer{
max-width: 80%;
margin-left: auto;
margin-right: auto;
margin-top: 0.8em;
font-style: italic;
}

#io-extra-wrapper{
/* the wrapper is needed to center the
left-aligned blocks below it */
width: 80%;
margin-left: auto;
margin-right: auto;
margin-top: 0.5em;
}

#io-extra{
text-align:center;
display: inline-block;
}

.io-extra-entry{
margin-top: 0.8em;
font-size: 0.9em;
text-align:left;
}

.io-field-descr{
margin-bottom: 0.2em;
font-weight: bold;
font-size: 1em;
}

#io-revl-btn {
font-size: 0.5em;
}

/* ADJUSTMENTS FOR MOBILE DEVICES */

.mobile .card, .mobile #content {
font-size: 120%;
margin: 0;
}

.mobile #io-extra-wrapper {
width: 95%;
}

.mobile #io-revl-btn {
font-size: 0.8em;
}

"""

      # back side
      back = """
{{#Image}}
<div id="io-header">{{Header}}</div>
<div id="io-wrapper">
<div id="io-overlay">{{Answer Mask}}</div>
<div id="io-original">{{Image}}</div>
</div>
{{#Footer}}<div id="io-footer">{{Footer}}</div>{{/Footer}}
<button id="io-revl-btn" onclick="toggle();">Toggle Masks</button>
<div id="io-extra-wrapper">
<div id="io-extra">
{{#Remarks}}
<div class="io-extra-entry">
<div class="io-field-descr">Remarks</div>{{Remarks}}
</div>
{{/Remarks}}
{{#Sources}}
<div class="io-extra-entry">
<div class="io-field-descr">Sources</div>{{Sources}}
</div>
{{/Sources}}
{{#Extra 1}}
<div class="io-extra-entry">
<div class="io-field-descr">Extra 1</div>{{Extra 1}}
</div>
{{/Extra 1}}
{{#Extra 2}}
<div class="io-extra-entry">
<div class="io-field-descr">Extra 2</div>{{Extra 2}}
</div>
{{/Extra 2}}
</div>
</div>

<script>
// Toggle answer mask on clicking the image
var toggle = function() {
var amask = document.getElementById('io-overlay');
if (amask.style.display === 'block' || amask.style.display === '')
amask.style.display = 'none';
else
amask.style.display = 'block'
}

// Prevent original image from loading before mask
aFade = 50, qFade = 0;
var mask = document.querySelector('#io-overlay>img');
function loaded() {
var original = document.querySelector('#io-original');
original.style.visibility = "visible";
}
if (mask === null || mask.complete) {
loaded();
} else {
mask.addEventListener('load', loaded);
}
</script>
{{/Image}}
"""
      
      # print(self.fields)
      anki_model = genanki.Model(
          model_id,
          anki_model_name,
          fields=[{"name": "id"},{"name": "Header"}, {"name": "Image"}, {"name": "Question Mask"}, {"name": "Footer"}, {"name": "Remarks"}, {"name": "Sources"}, {"name": "Extra 1"}, {"name": "Extra 2"}, {"name": "Answer Mask"}, {"name": "Original"}],
          templates=[
              {
                  "name": "Card 1",
                  "qfmt": front,
                  "afmt": back,
              },
          ],
          css=style,
      )

      anki_notes = []

      with open(data_filename, "r", encoding="utf-8") as csv_file:
          csv_reader = csv.reader(csv_file, delimiter="\t")
          for row in csv_reader:
              flds = []
              for i in range(len(row)):
                  flds.append(row[i])

              anki_note = genanki.Note(
                  model=anki_model,
                  fields=flds,
              )
              anki_notes.append(anki_note)

      #random.shuffle(anki_notes)

      anki_deck = genanki.Deck(model_id, anki_deck_title)
      anki_package = genanki.Package(anki_deck)

      for anki_note in anki_notes:
          anki_deck.add_note(anki_note)

      
      anki_package.write_to_file(deck_filename)

      print("Deck generated with {} flashcards".format(
          len(anki_deck.notes)))

   except Exception:
       traceback.print_exc()

# imported file name
data_filename = str(input("Enter filename with extension: "))
if not path.exists(data_filename):
  print("File not exists")
  quit()

# title
anki_deck_title = str(input("Enter title of the deck: "))

# model name
r1 = str(random.randrange(1 << 10, 1 << 11))

anki_model_name = "image-occlusion-in-browser-" + r1

# exported deck name
r2 = str(random.randrange(1 << 15, 1 << 16))

deck_filename = anki_deck_title + "_export_" + r2 + ".apkg"

model_id = random.randrange(1 << 30, 1 << 31)


exportDeck()
