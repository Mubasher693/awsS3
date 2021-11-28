from flask import Flask, render_template, request, flash, redirect, url_for, send_from_directory
import os, logging
from werkzeug.utils import secure_filename
from flask_debugtoolbar import DebugToolbarExtension
from constants import *
from utils.S3.main import S3

app = Flask(__name__, template_folder='templates')

app.config['SECRET_KEY'] = 'ftesdsdf'
toolbar = DebugToolbarExtension(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

from wtforms import Form, BooleanField, StringField, PasswordField, validators
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed


class S3Form(Form):
    bucket = StringField('Bucket Name', [validators.Length(min=4, max=25),validators.DataRequired()])
    upload = FileField('image', validators=[
        FileRequired(),
        FileAllowed(ALLOWED_EXTENSIONS_TWO, 'csv and doc are allowed only,')
    ])


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    try:
        if request.method == 'POST':
            if 'file' not in request.files or not request.form['bucket']:
                flash('All fields are required.')
                return redirect(request.url)
            file = request.files['file']
            if file.filename == '' or request.form['bucket'] == '':
                flash('All fields are required.')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
                file.save(file_path)
                s3_object = S3(request.form['bucket'])
                s3_object.run()
                s3_object.upload_file(file_path)
                flash('Uploaded successfully.')

                # return redirect(url_for('download_file', name=filename))
    except Exception as e:
        logging.error(e)
        flash(e.args[0])
    finally:
        return render_template('upload.html')


@app.route('/uploads/<name>')
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == "__main__":
    try:
        app.run(debug=True, port=5050)
    finally:
        print("Closing App....")
