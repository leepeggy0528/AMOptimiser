from flask import render_template, redirect, url_for, flash, request, jsonify, make_response
from app import app, db, allowedFile, basedir,get_root
from app.models import User, History
from urllib.parse import urlsplit
from uuid import uuid4
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
import os
from email_validator import validate_email, EmailNotValidError
import csv
import json
import chardet
import pandas as pd
from flask_restx import Api
from app.signIn import sign_in
import numpy as np
from app.training import Training_rl
from threading import Thread

api = Api(app, doc="/docs")
api.add_namespace(sign_in)


opt_result={}
def write_json(data):
    with open(f"{get_root()}data/params.json", "w") as jsonf:
        jsonf.write(json.dumps(data, indent=4))
def train_para(params_result):
    global opt_result
    # The remaining varaibles dictate the minimum, maximum, and interval values for the three process parameters
    with app.open_resource('data/params.json', 'r') as jsonf2:
        data1 = json.load(jsonf2)
    min_power = data1['min_power']
    max_power = data1['max_power']
    interval_power = data1['interval_power']
    min_speed = data1['min_speed']
    max_speed = data1['max_speed']
    interval_speed = data1['interval_speed']
    min_hatch = data1['min_hatch']
    max_hatch = data1['max_hatch']
    interval_hatch = data1['interval_hatch']

    power = np.arange(min_power, max_power + 1, interval_power)
    speed = np.arange(min_speed, max_speed + 1, interval_speed)
    hatch = np.arange(min_hatch, max_hatch + 0.001, interval_hatch)
    result= Training_rl(power,speed,hatch)
    params_result=result.training()
    print(params_result, type(params_result))
    opt_result=params_result

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if current_user.is_authenticated:
#         user = current_user.username
#         response = jsonify({'user': user})
#         response.headers.add('Access-Control-Allow-Origin', '*')
#         return response
#     if request.method == 'POST':
#         data = request.get_json()
#         username = data.get('username')
#         password = data.get('password')
#         user = User.query.filter_by(username=username).first()
#         if user is None or not user.check_password(password):
#             flash('Invalid username or password', 'danger')
#             response = jsonify({'message' : 'Invalid username or password', 'status' : 'success'})
#             response.headers.add('Access-Control-Allow-Origin', '*')
#             return response
#         login_user(user)
#         user=current_user.username
#         response = jsonify({'user': user})
#         response.headers.add('Access-Control-Allow-Origin', '*')
#         return response
#     #     next_page = request.args.get('next')
#     #     if not next_page or urlsplit(next_page).netloc != '':
#     #         next_page = url_for('index')
#     #     return redirect(next_page)
#     # return render_template('login.html', title='Sign In')
#
#
# @app.route('/logout')
# def logout():
#     logout_user()
#     return redirect(url_for('index'))


# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     if current_user.is_authenticated:
#         return redirect(url_for('index'))
#     if request.method == 'POST':
#         data = request.get_json()
#         username = data.get('username')
#         email = data.get('email')
#         password = data.get('password')
#         msg = {}
#         new_user = User(username=username, email=email,
#                         password_hash=generate_password_hash(password, salt_length=32))
#         db.session.add(new_user)
#         try:
#             db.session.commit()
#             msg['message1'] = 'User created successfuly'
#             msg['status'] = 'success'
#             response = jsonify(msg)
#             response.headers.add('Access-Control-Allow-Origin', '*')
#             return make_response(response, 201)
#         except:
#             db.session.rollback()
#             if User.query.filter_by(username=username).first():
#                 msg['message1'] = 'This username is already taken.'
#             if User.query.filter_by(email=email).first():
#                 msg['message2'] = 'This email address is already registered.'
#             msg['status'] = 'danger'
#             response = jsonify(msg)
#             response.headers.add('Access-Control-Allow-Origin', '*')
#             return response
#
#
# def is_valid_email(email):
#     try:
#         validate_email(email, check_deliverability=False)
#     except EmailNotValidError as error:
#         return False
#     return True


# Attempt to remove a file but silently cancel any exceptions if anything goes wrong
def silent_remove(filepath):
    try:
        os.remove(filepath)
    except:
        pass
    return


#quality
@app.route('/upload/quality/<number>', methods=['POST', 'GET'])
# API to upload file
def Quality(number):
    global opt_result
    number = int(number)
    if (number <= 2):
        if request.method == 'POST':
            file = request.files.getlist('file')
            for f in file:
                unique_str = str(uuid4())
                filename = secure_filename(f'{unique_str}-{f.filename}')
                data={}
                if allowedFile(filename):
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    f.save(filepath)
                    if filename.rsplit('.', 1)[1].lower()=='csv':
                        with open(filepath, encoding='utf-8') as csvf:
                            csvReader = csv.DictReader(csvf)
                            for rows in csvReader:
                                for key in rows:
                                    key = key
                                    data[key] = float(rows[key])
                    if filename.rsplit('.', 1)[1].lower()=='xlsx':
                        with open(filepath, 'rb') as xlsxf:
                            xlsxfReader = pd.read_excel(xlsxf)
                            for rows in xlsxfReader:
                                value = xlsxfReader[rows].values
                                data[rows] = float(value)
                    write_json(data)
                    params_result={"states": 200}
                    thread = Thread(target=train_para, args=params_result)
                    thread.start()
                    return jsonify({'message': 'Optimal started'})

                    # @login_required
                    # def save():
                    #     f.save(os.path.join(basedir, filename))
                    # try:
                    #     with open(filepath, mode='r') as txtfile:
                    #         resource = txtfile.read().splitlines()
                    #         # reader = csv.reader(csvfile)
                    #         error_count = 0
                else:
                    return jsonify({'message': 'File type not allowed'}), 400

            #return jsonify({"name": filename, "status": "success"})
    else:
        if request.method == 'POST':
            data = request.get_json()
            nums = data.get('number')
            response = jsonify({"nums": nums})
            #     response.headers.add('Access-Control-Allow-Origin', '*')
            return response


#wastes
@app.route('/upload/wastes/<number>', methods=['POST', 'GET'])
# API to upload file
def Wastes(number):
    global opt_result
    number = int(number)
    if (number <= 2):
        if request.method == 'POST':
            file = request.files.getlist('file')
            for f in file:
                unique_str = str(uuid4())
                filename = secure_filename(f'{unique_str}-{f.filename}')
                data = {}
                if allowedFile(filename):
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    f.save(filepath)
                    if filename.rsplit('.', 1)[1].lower() == 'csv':
                        with open(filepath, encoding='utf-8') as csvf:
                            csvReader = csv.DictReader(csvf)
                            for rows in csvReader:
                                for key in rows:
                                    key = key
                                    data[key] = float(rows[key])
                    if filename.rsplit('.', 1)[1].lower() == 'xlsx':
                        with open(filepath, 'rb') as xlsxf:
                            xlsxfReader = pd.read_excel(xlsxf)
                            for rows in xlsxfReader:
                                value = xlsxfReader[rows].values
                                data[rows] = float(value)
                    write_json(data)
                    params_result = {"states": 200}
                    thread = Thread(target=train_para, args=params_result)
                    thread.start()
                    return jsonify({'message': 'Optimal started'})

                    # @login_required
                    # def save():
                    #     f.save(os.path.join(basedir, filename))
                    # try:
                    #     with open(filepath, mode='r') as txtfile:
                    #         resource = txtfile.read().splitlines()
                    #         # reader = csv.reader(csvfile)
                    #         error_count = 0
                else:
                    return jsonify({'message': 'File type not allowed'}), 400

            # return jsonify({"name": filename, "status": "success"})
    else:
        if request.method == 'POST':
            data = request.get_json()
            nums = data.get('number')
            response = jsonify({"nums": nums})
            #     response.headers.add('Access-Control-Allow-Origin', '*')
            return response


#efficient
@app.route('/upload/efficient/<number>', methods=['POST', 'GET'])
# API to upload file
def Efficient(number):
    global opt_result
    number = int(number)
    if (number <= 2):
        if request.method == 'POST':
            file = request.files.getlist('file')
            for f in file:
                unique_str = str(uuid4())
                filename = secure_filename(f'{unique_str}-{f.filename}')
                data = {}
                if allowedFile(filename):
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    f.save(filepath)
                    if filename.rsplit('.', 1)[1].lower() == 'csv':
                        with open(filepath, encoding='utf-8') as csvf:
                            csvReader = csv.DictReader(csvf)
                            for rows in csvReader:
                                for key in rows:
                                    key = key
                                    data[key] = float(rows[key])
                    if filename.rsplit('.', 1)[1].lower() == 'xlsx':
                        with open(filepath, 'rb') as xlsxf:
                            xlsxfReader = pd.read_excel(xlsxf)
                            for rows in xlsxfReader:
                                value = xlsxfReader[rows].values
                                data[rows] = float(value)
                    write_json(data)
                    params_result = {"states": 200}
                    thread = Thread(target=train_para, args=params_result)
                    thread.start()
                    return jsonify({'message': 'Optimal started'})

                    # @login_required
                    # def save():
                    #     f.save(os.path.join(basedir, filename))
                    # try:
                    #     with open(filepath, mode='r') as txtfile:
                    #         resource = txtfile.read().splitlines()
                    #         # reader = csv.reader(csvfile)
                    #         error_count = 0
                else:
                    return jsonify({'message': 'File type not allowed'}), 400

            # return jsonify({"name": filename, "status": "success"})
    else:
        if request.method == 'POST':
            data = request.get_json()
            nums = data.get('number')
            response = jsonify({"nums": nums})
            #     response.headers.add('Access-Control-Allow-Origin', '*')
            return response

@app.route('/result', methods=['GET'])
def result():
    global opt_result
    if opt_result:

        response = jsonify({"opt_result":opt_result, 'status':200})
        print(response)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 200
    else:
        return jsonify({'message': 'Optimal in progress', 'status':202}), 202
# Handler for 413 Error: "RequestEntityTooLarge". This error is caused by a file upload
# exceeding its permitted Capacity
# Note, you should add handlers for:
# 403 Forbidden
# 404 Not Found
# 500 Internal Server Error
# See: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
@app.errorhandler(413)
def error_413(error):
    return render_template('errors/413.html'), 413
