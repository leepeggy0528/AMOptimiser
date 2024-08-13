from flask_restx import Resource, Namespace, fields
from app.models import User
from werkzeug.security import generate_password_hash, check_password_hash
from email_validator import validate_email, EmailNotValidError
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)
from flask import request, jsonify, make_response


sign_in = Namespace("signIn", description="A namespace for our Authentication")

signup_model = sign_in.model(
"SignUp",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
    },
)


login_model = sign_in.model(
    "Login", {"username": fields.String(), "password": fields.String()}
)


@sign_in.route("/register")
class SignUp(Resource):
    @sign_in.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        msg = {}

        db_user = User.query.filter_by(username=username).first()
        db_email = User.query.filter_by(email=email).first()
        try:
            new_user = User(username=username, email=email,
                            password_hash=generate_password_hash(password, salt_length=32))
            new_user.save()
            msg['message1'] = 'User created successfuly'
            msg['status'] = 'success'
            response = jsonify(msg)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return make_response(response, 201)
        except:
            new_user.back()
            if db_user is not None:
                msg['message1'] = 'This username is already taken.'
            if db_email is not None:
                msg['message2'] = 'This email address is already registered.'
            msg['status'] = 'danger'
            response = jsonify(msg)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return make_response(response,400)

    def is_valid_email(email):
        try:
            validate_email(email, check_deliverability=False)
        except EmailNotValidError as error:
            return False
        return True


@sign_in.route("/login")
class Login(Resource):
    @sign_in.expect(login_model)
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):

            access_token = create_access_token(identity=user.username)
            refresh_token = create_refresh_token(identity=user.username)

            return make_response(jsonify(
                {"access_token": access_token, "refresh_token": refresh_token, "user": user.username}
            ),200)
        else:
            return make_response(jsonify({"message": "Invalid username or password", "status": "danger"}),400)


@sign_in.route("/refresh")
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)

        return make_response(jsonify({"access_token": new_access_token, "user":current_user.username}), 200)