from app import app, get_root, basedir
import json
import os

def write_json(data):
    json_file_url = os.path.join(basedir, 'data', "params.json")
    # with open(f"{get_root()}data/params.json", "w") as jsonf:
    with open(json_file_url, "w") as jsonf:
        jsonf.write(json.dumps(data, indent=4))

def channge_material_params(datas):
    json_file_url = os.path.join(basedir, 'data', "material_params.json")
    # with open(f"{get_root()}data/params.json", "w") as jsonf:
    with open(json_file_url, "w") as jsonf:
        jsonf.write(json.dumps(datas, indent=4))
