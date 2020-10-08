# Requirements for running it offline
1. Termux or any app that create localhost
2. Pydroid 3

Download from playstore.

# Steps for running offline

1. If using termux then install ```python```
```
pkg install python
```
2. Download files from release page
3. Extract to any folder
4. Use termux to traverse to that folder using 

```
cd storage/downloads/image-occlusion-in-browser
```
5. Run localhost

```
python -m http.server
```

6. Open chrome and enter url
```
localhost:8000
```
7. First, add image then add rectangle. After adding notes, click on download to get svg files with question mask and answer mask. 

8. Copy all the files (svg files and original image) to ```collection.media``` folder

9. Now open ```Pydroid 3``` and open ```image-occ-deck-export.py``` and import ```output.txt``` file and generate deck by entering name, model and title.

10. Import it in AnkiDroid and start reviewing.

View demo: [Using offline](demo/demo_img_occ.gif)
