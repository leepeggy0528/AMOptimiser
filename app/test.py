# from rl import *
from flask import Flask, request, jsonify
import numpy as np
import time
import pandas as pd
import csv
import json
from app import app


def test():
        data = {}
        # Open a csv reader called DictReader
        with app.open_resource('test.xlsx', 'rb') as xlsxf:
            xlsxfReader = pd.read_excel(xlsxf)
            for rows in xlsxfReader:
                value=xlsxfReader[rows].values
                data[rows] = float(value)
        print(data)
        #
        #     # Convert each row into a dictionary
        #     # and add it to data
        #     for rows in csvReader:
        #         for key in rows:
        #         # Assuming a column named 'No' to
        #         # be the primary key
        #             key = key
        #             data[key] = float(rows[key])
        #
        # # Open a json writer, and use the json.dumps()
        # # function to dump data
        # with open('API/material_params.json', 'w', encoding='utf-8') as jsonf:
        #     jsonf.write(json.dumps(data, indent=4))

from app import app
if __name__ == "__main__":
    test()