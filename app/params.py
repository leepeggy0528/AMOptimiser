from flask import request, jsonify, make_response
from flask_restx import Resource, Namespace, fields
from app import basedir
import json
import os
import app.json_file as jf

params = Namespace("setParams", description="setting material parameters")

# params_model = params.model(
#     "Login", {"username": fields.String(), "password": fields.String()}
# )

@params.route("/getparams", methods=["GET"])
class Params(Resource):
    def get(self):
        json_file_url = os.path.join(basedir, 'data', "init_material_params.json")
        with open(json_file_url, "r") as f:
            data = json.load(f)
        return (make_response(jsonify(data),200))