import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['SECRET_KEY'] =  b'WR#&f&+%78er0we=%799eww+#7^90-;s'
# login = LoginManager(app)
# login.login_view = 'login'
JWTManager(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:x880528@localhost:5432/AMOtimiser'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.app_context().push()

CORS(app, supports_credentials=True)

app.config['UPLOAD_FOLDER'] = os.path.join(basedir, 'data', 'uploads')
ALLOWED_EXTENSIONS = set(['txt', 'png', 'jpg', 'jpeg', 'xls', 'xlsx', 'csv'])
app.config['MAX_CONTENT_LENGTH'] = 8 * 1024 * 1024


def allowedFile(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_root():
    return os.path.realpath(__file__)[:-len(os.path.basename(__file__))]

from app import views
from app.models import *

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User, LoginManager=LoginManager)
