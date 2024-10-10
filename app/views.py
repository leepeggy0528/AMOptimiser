from flask import render_template, request, jsonify
from app import allowedFile
from uuid import uuid4
from werkzeug.utils import secure_filename
import csv
import pandas as pd
from flask_restx import Api
from app.signIn import sign_in
from app.params import params
import numpy as np
from app.training import Training_rl
from threading import Thread
from app.json_file import *

api = Api(app, doc="/docs")
api.add_namespace(sign_in)
api.add_namespace(params)

opt_result={}

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

    # return params_result
    opt_result=params_result

def train_para_num(params_result,params):
    global opt_result
    power = []
    speed = []
    hatch = []
    # The remaining varaibles dictate the minimum, maximum, and interval values for the three process parameters
    for param in params:
        power.append(param['power'])
        speed.append(param['speed'])
        hatch.append(param['hatch'])

    result= Training_rl(power,speed,hatch)
    params_result=result.training()
    print(params_result, type(params_result))
    opt_result=params_result

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

# Attempt to remove a file but silently cancel any exceptions if anything goes wrong
def silent_remove(filepath):
    try:
        os.remove(filepath)
    except:
        pass
    return


#quality
@app.route('/upload/quality/<number>', methods=['POST','GET'])
# API to upload file
def Quality(number):
    global opt_result
    number = int(number)
    if (number <= 2):
        if request.method == 'POST':
            file=request.files.getlist('file')
            material_params = request.form.get("params")
            material_params_data=json.loads(material_params)
            channge_material_params(material_params_data)

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
    else:
        if request.method == 'POST':
            data = request.get_json()
            nums = data.get('number')
            material_params_data=data.get('material')
            channge_material_params(material_params_data)
            params_result = {"states": 200}
            thread = Thread(target=train_para_num, args=(params_result, nums))
            thread.start()
            return jsonify({'message': 'Optimal started'})
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
            data = request.get_json()
            material_params=data.get("params")
            file = data.files.getlist('file')
            channge_material_params(material_params)
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
        response.headers.add('Access-Control-Allow-Origin', '*')
        opt_result={}
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
