from flask import request, jsonify
from app.user import User
from app import db
from app.utils.hash_password import hash_password, check_password

def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if username or email already exists
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    # Hash the password
    hashed_password = hash_password(password)

    # Create new user object
    new_user = User(username=username, email=email, password=hashed_password)

    try:
        # Save the new user to the database
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        # Rollback in case of error
        db.session.rollback()
        return jsonify({'message': f'Failed to register user: {str(e)}'}), 500

def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Query user by username
    user = User.query.filter_by(username=username).first()

    if user and check_password(user.password, password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 400
