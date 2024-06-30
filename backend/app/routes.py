from flask import Blueprint, jsonify, request
from . import db
from .models import User, Project, Task, TaskAssignment
from .forms import RegistrationForm, ProjectForm, TaskForm, TaskAssignmentForm 
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return "Welcome to the TeamTasker API!"

@main_bp.route('/api/register', methods=['POST'])
def register_user():
    data = request.json

    # Extract data from JSON request
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate form data using WTForms
    form = RegistrationForm(username=username, email=email, password=password)
    if form.validate():
        # Check if user already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 400

        # Create a new User object
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        
        # Save the new user to the database
        db.session.add(new_user)
        db.session.commit()

        # Return a success response
        return jsonify({'message': 'User registered successfully!'}), 201
    else:
        # Return validation errors if form data is invalid
        return jsonify({'errors': form.errors}), 400

# Example of login endpoint
@main_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# Example of getting all users (JWT protected)
@main_bp.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

# Example of creating a project (JWT protected)
@main_bp.route('/api/projects', methods=['POST'])
@jwt_required()
def create_project():
    form = ProjectForm()
    if form.validate_on_submit():
        user_id = get_jwt_identity()
        project = Project(name=form.name.data, description=form.description.data, user_id=user_id)
        db.session.add(project)
        db.session.commit()
        return jsonify(project.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

# Example of getting projects (JWT protected)
@main_bp.route('/api/projects', methods=['GET'])
@jwt_required()
def get_projects():
    user_id = get_jwt_identity()
    projects = Project.query.filter_by(user_id=user_id).all()
    return jsonify([project.to_dict() for project in projects]), 200

# Example of creating a task (JWT protected)
@main_bp.route('/api/tasks', methods=['POST'])
@jwt_required()
def create_task():
    form = TaskForm()
    if form.validate_on_submit():
        user_id = get_jwt_identity()
        task = Task(title=form.title.data, description=form.description.data,
                    status=form.status.data, project_id=form.project_id.data, user_id=user_id)
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

# Example of getting tasks (JWT protected)
@main_bp.route('/api/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([task.to_dict() for task in tasks]), 200

# Example of creating a task assignment (JWT protected)
@main_bp.route('/api/task_assignments', methods=['POST'])
@jwt_required()
def create_task_assignment():
    form = TaskAssignmentForm()
    if form.validate_on_submit():
        task_assignment = TaskAssignment(task_id=form.task_id.data, user_id=form.user_id.data,
                                         role=form.role.data, status=form.status.data)
        db.session.add(task_assignment)
        db.session.commit()
        return jsonify(task_assignment.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

# Example of getting all task assignments (JWT protected)
@main_bp.route('/api/task_assignments', methods=['GET'])
@jwt_required()
def get_task_assignments():
    task_assignments = TaskAssignment.query.all()
    return jsonify([task_assignment.to_dict() for task_assignment in task_assignments])

