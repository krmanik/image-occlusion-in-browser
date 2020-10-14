from flask import Flask, render_template, request, redirect, url_for, flash, send_file, send_from_directory
import image_occ_deck_export
import random, os

app = Flask(__name__)
app.config["CACHE_TYPE"] = "null"

@app.route("/", methods=["GET","POST"])
def home():
    if request.method == "POST":
        print(request.form['notes'])
        notes = request.form['notes']
        folder = request.form['folder']

        data = request.form['notes']
        print(data)

        random_f = random.randrange(1 << 30, 1 << 31)
        return create_random_folder(folder, data)

    else:
        return render_template("index.html")

        
def create_random_folder(random_f, data):
    directory = str(random_f)
    parent_dir = "static/uploads/"
    path = os.path.join(parent_dir, directory)

    if not os.path.exists(path):
        os.mkdir(path)

    random_file = directory + ".txt"
    random_deck_name = "Anki-image-occlusion.apkg"

    file_loc = path + "/" + random_file

    deck_loc = path + "/" + random_deck_name

    with open(file_loc, 'w') as f:
        f.write(str(data))

    image_occ_deck_export.exportDeck(file_loc, deck_loc)

    return redirect(url_for('uploaded', path_name=random_f))

@app.route('/uploaded/<path_name>', methods=['GET'])
def uploaded(path_name):
    url = "uploads/" + path_name + "/" + "Anki-image-occlusion.apkg"
    return render_template("download.html", url = url)

if __name__ == "__main__":
    app.run(debug=True)