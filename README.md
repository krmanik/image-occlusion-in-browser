# image-occlusion-in-browser

Create image occlusion in browser.

For desktop there is already addon for creating image occlusion. This is implementation for using mobile and creating deck with image occlusion.

# App Features [Version 1.2.0]
   - New design
   - Cards auto added to AnkiDroid
   - Group cloze card generation simplified
   - **Selected image and generated SVG auto copy to ```AnkiDroid/collection.media/``` folder.**

# Tutorials / Features
- [Create question and answer mask](demo/demo_create.gif)
- [Create rectangles by tapping two point anywhere inside editor window](demo/demo_draw_anywhere.gif)
- [Create group question and answer mask](demo/demo_group_element.gif) (Need improvements)
- [Change color of masks](demo/demo_change_color.gif)
- [Export deck on mobile using browser](demo/demo_create_deck.gif)
- [Export deck on mobile using Pydroid 3](demo/demo_pydroid_3.gif)
- [Using offline](demo/demo_img_occ.gif)

### Demo
<img src="demo/new_design_demo.gif" height="450"></img>

# Create deck using Android app [Anki Image Occlusion]

The app made using [Apache Cordova](https://cordova.apache.org/) and [AnkiDroid API](https://github.com/ankidroid/Anki-Android/wiki/AnkiDroid-API) with ```HTML/CSS/JS```.

## Usage
- Download from Github release page.
https://github.com/infinyte7/image-occlusion-in-browser/releases
- First, make sure to give storage and additional permissions
- Selected image and generated SVG copied to ```AnkiDroid/collection.media/``` folder.

### Version 1.1.1
If not using latest version then following steps to be followed.
- Create card click on download icon.
- Card will be added one by one. But wait till ```card added``` toast showing on screen.
- Copy svg image from ```Internal Storage/ Android/ data/ io.infinyte7.ankiimageocclusion/ files/``` and original image file to AnkiDroid ```collection.media``` folder.

# Create image occlusion in browser
View [Create image occlusion in browser](Create-In-Browser.md)

# Create image occlusion offline
View [Create image occlusion Offline](Create-Offline.md)

# Build Anki Image Occlusion android app
1. Download this repository
2. Open ```android``` folder in Android Studio
3. Build and generate apk

# Contributions
This is implemented using javascript. It has bugs and issues. Any contributions to improvement of codes and features will be appreciated.

# License
View [License](License.md)