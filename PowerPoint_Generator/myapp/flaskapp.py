import os
from flask import Flask, render_template, url_for, flash, redirect, request, send_from_directory, abort
from flask_login import LoginManager, login_user, login_required, logout_user, current_user

from forms import RegistrationForm, LoginForm
from flask_bcrypt import Bcrypt
from database import db
from models import User
from utils.gpt_generate import chat_development
from utils.text_pp import parse_response, create_ppt
from dotenv import load_dotenv
import convertapi
from pymongo import MongoClient

load_dotenv()  # This loads the .env file

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
bcrypt = Bcrypt(app)
db.init_app(app)

client = MongoClient('mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb')
db1 = client['pptxDB']
collection = db1['pptx']
convertapi.api_secret = '4NPm2b4CQKdRkdKN'


# Configure Flask-Login
login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html', user=current_user)


@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html')


@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        login_user(user, remember=True)
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form, user=current_user)


@app.route("/login", methods=['GET', 'POST'])
def login():
    # if the user is already authenticated, redirect them to home page
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form=form, user=current_user)



@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/generator', methods=['GET', 'POST'])
def generate():
    if request.method == 'POST':
        number_of_slide = request.form['number_of_slide']
        user_text = request.form['user_text']
        template_choice = request.form.get('template_choice')
        presentation_title = request.form['presentation_title']
        presenter_name = request.form['presenter_name']
        insert_image = 'insert_image' in request.form

        user_message = f"I want you to come up with the idea for the PowerPoint. The number of slides is {number_of_slide}. " \
                       f"The content is: {user_text}.The title of content for each slide must be unique, " \
                       f"and extract the most important keyword(within two words.) for each slide. Can you summarize the content for each slide? "

        assistant_response = chat_development(user_message)
        #Check the response
        print(assistant_response)
        slides_content = parse_response(assistant_response)
        create_ppt(slides_content, template_choice, presentation_title, presenter_name, insert_image)
        # Write PPTX file to MongoDB
        def write_to_mongodb(file_path):
            with open(file_path, 'rb') as file:
                pptx_content = file.read()
                collection.insert_one({'file_name': file_path, 'content': pptx_content})

        # Read PPTX file from MongoDB and save to local system
        def read_from_mongodb_save_locally(file_name, save_path):
            pptx_data = collection.find_one({'file_name': file_name})
            if pptx_data:
                pptx_content = pptx_data['content']
                pptx_path = os.path.join(save_path, file_name)  # Specify save path
                
                # Write pptx content to a temporary file
                with open(pptx_path, 'wb') as tmp_pptx:
                    tmp_pptx.write(pptx_content)
                
                return pptx_path
            else:
                return None

            # Delete local PPTX file after inserting to MongoDB
        def delete_local_file(file_path):
                os.remove(file_path)

            # Convert PPTX to PDF
        def convert_pptx_to_pdf(input_path, output_path):
                convertapi.convert('pdf', {'File': input_path}, from_format='pptx').save_files(output_path)
        # File paths
        pptx_file_path = '.\myapp\generated\generated_presentation.pptx'
        save_path = '.'
        pdf_output_path = '1.pdf'  # Define the PDF output path

        # Write to MongoDB and delete local file
        write_to_mongodb(pptx_file_path)
        delete_local_file(pptx_file_path)

        # Read from MongoDB and save locally with a new name
        loaded_pptx_path = read_from_mongodb_save_locally(pptx_file_path, save_path)

        if loaded_pptx_path:
            print(f'Successfully loaded PPTX from MongoDB: {loaded_pptx_path}')
        else:
            print(f'Failed to load PPTX from MongoDB: {pptx_file_path}')

        # Convert the loaded PPTX to PDF
        convert_pptx_to_pdf(loaded_pptx_path, pdf_output_path)

        # Print success message if the PDF was created
        if os.path.exists(pdf_output_path):
            print(f'Successfully converted PPTX to PDF: {pdf_output_path}')

            # Replace the previous PDF with the new one
            os.replace(pdf_output_path, 'previous_presentation.pdf')  # Replace the previous PDF
        else:
            print(f'Failed to convert PPTX to PDF')

    return render_template('generator.html', title='Generate')


@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        return send_from_directory('generated', filename, as_attachment=True)

    except FileNotFoundError:
        abort(404)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=5001, debug=True)
