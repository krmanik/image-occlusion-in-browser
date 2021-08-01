# Image Occlusion in Browser v3
Create image occlusion in browser for Desktop and iOS devices v12 or later.

>Anki Image Occlusion app used to create normal and combine cloze anki cards for reviewing and studying flashcards in [Anki](https://apps.ankiweb.net) software (spaced repetition flashcard app). Anki decks created using [genanki-js](https://github.com/infinyte7/genanki-js), [sql.js](https://github.com/sql-js/sql.js), [FileSaver.js](https://github.com/eligrey/FileSaver.js), [JSZip](https://github.com/Stuk/jszip) and [svg.js](https://svgdotjs.github.io/) JavaScript library. It creates ready to import decks for Anki and AnkiMobile.

> Use [version 3](https://infinyte7.github.io/image-occlusion-in-browser/v3/index.html) of this project because version 1 and version 2 of this project deprecated. [Read more](Version2.md)

# QuickStart
Open following website in browser and start creating image occlusion decks.

>https://infinyte7.github.io/image-occlusion-in-browser/v3/index.html


#### Anki Occlusion for AnkiDroid source code and apk moved here https://github.com/infinyte7/Anki-Occlusion, also download apk from [F-Droid](https://f-droid.org/en/packages/io.infinyte7.ankiimageocclusion/)


## Create Anki decks in five steps
1. Select image to editor window
2. Draw rectangles, ellipses, polygons or textbox
3. Add notes to decks
4. Download the decks
5. Import in Anki

# Tutorials / Features
- [Create image occlusion anki deck inside browser](demo/iOSv13_demo.gif)
- [Download ready to import deck](demo/multiple_cards.gif)
- [Create multiple cards in same deck](demo/multiple_cards.gif)
- [Create rectangles](demo/demo_draw_anywhere.gif)
- [Create ellipse](https://github.com/infinyte7/image-occlusion-in-browser/blob/master/demo/demo_multiple_polygon.gif)
- [Create textbox](https://github.com/infinyte7/image-occlusion-in-browser/blob/master/demo/demo_text_box.gif)
- [Create polygon](https://github.com/infinyte7/image-occlusion-in-browser/blob/master/demo/demo_multiple_polygon.gif)
- [Create normal cloze](demo/demo_create.gif) <!-- - [Create group cloze](demo/demo_group_element.gif) -->
- [Create combine cloze](demo/combine_cloze_demo_browser.gif)
- [Change color of masks](demo/demo_change_color.gif)
- [Undo / Redo feature](https://github.com/infinyte7/image-occlusion-in-browser/blob/master/demo/demo_undo_redo.gif)

# Demo
![iOS v13](demo/iOSv13_demo.gif)

# Faq ?
### How to change question and answer rectangles mask color?
Go to settings and put valid hex color.

View hex color example https://www.materialpalette.com/colors

### How to group cloze with different color?
1. Draw rectangles
2. Go to settings and change question mask color
3. Click top right image button, then click rectangles. It will change rectangles color. The rectangles with new color will be added to list.
4. Again click top right image button to stop adding rectangles to list. 
5. Click done to add data to AnkiDroid.
6. Repeat from step 2 to step 5 for creating group cloze with different color.

### How to group cloze with different color in same cloze ?
1. Draw rectangles
2. Select group cloze button (top right) add rectangles to list.
3. Change question mask color from settings
4. Select more rectangles to list
5. Finally click done button to add notes data to AnkiDroid

View [demo](https://user-images.githubusercontent.com/12841290/95605099-0d038b00-0a8b-11eb-81ed-58a7e03c254e.gif)

### How to view version 1 and version 2 of this project?
View [version2.md](Version2.md)

# Contributions
This is implemented using javascript. It has bugs and issues. Any contributions to improvement of codes and features will be appreciated.

### View updates
[Changelog.md](Changelog.md)

# License
View [License](License.md)