# Demo [Web Browser]
<img src="demo/demo_create.gif" height="380"></img> | <img src="demo/demo_draw_anywhere.gif" height="380"></img> | <img src="demo/demo_change_color.gif" height="380"></img>

# Create image occlusion Anki decks in three steps using only browser

## Step 1 - Create svg question and answers mask 

1. - Visit [https://infinyte7.github.io/image-occlusion-in-browser/](https://infinyte7.github.io/image-occlusion-in-browser/)
   
2. Add rectangles to editor window by pressing "+" in tools.
(Drag or resize to specific location)

3. Add notes for the image

4. Download the notes. It will download svg question masks, answer masks, ```output-note.txt``` and also it will add individual note to view note window.

5. Then download combined notes from view note window. It will download ```output-all-notes.txt``` file. This file will be used to create deck.

## Step 2 - Copy all svg files to AnkiDroid folder
1. Copy question and answer svg files and original image to ```collection.media``` folder

## Step 3 - Generate decks using Pydroid 3 or Use Google colab to run the script
### Step 3 (a)
1. Download and install Pydroid 3 from play store.
2. Install ```genanki``` in Pydroid using Pip. View demo below.
3. Download ```image-occ-deck-export.py``` from release page.
4. Open ```image-occ-deck-export.py``` in Pydroid 3 and run
5. Select ```output-all-notes.txt``` and import 
6. Enter deck details and export.

View demo [Generate deck using Pydroid 3](demo/demo_pydroid_3.gif)

### Step 3 (b)
The deck can also be generate without installing any software using Google colab.
1. Due to some reason, I have removed it. 

   <s>View this link
https://colab.research.google.com<span></span>/drive/1FH_ylTPG-HgZauFsk6sk58B0OVJK4yLw?usp=sharing</s>

   But code can be used by copying [deck_export_console.py](deck_export_console.py) to Google colab.

   <br>a) Click on [Raw](https://raw.githubusercontent.com/infinyte7/image-occlusion-in-browser/master/deck_export_console.py) and copy all code
<br>b) Login to https://colab.research.google.com and paste all the code.
<br>c) If getting any error then copy this and run it 
   ```
   !pip install genanki
   ```
<br>
2. Upload ```output-all-notes.txt``` file
a) Click top left icon
b) Show file browser  

```
connecting to a runtime to enable file browsing
```
   
c) click to upload output-all-notes.txt

3. Tap on play icon to install ```genanki```
```
!pip install genanki
```
4. Tap on next to run and export
```
Enter filename with extension: output-all-notes.txt           # uploaded file name  
Enter title of the deck: learn                                # any title
```
Enter details and it will create the deck

5. Download the deck from Show file browser

View demo: [Generate deck using Google colab in browser](demo/demo_export_from_browser.gif)
