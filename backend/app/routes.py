from flask import Blueprint, jsonify, request
from . import db
from .models import User, Project, Task, TaskAssignment
from .forms import RegistrationForm, ProjectForm, TaskForm, TaskAssignmentForm #

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
        
        # Create a new User object
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        
          # Save the new user to the database
        db.session.add(new_user)
        db.session.commit()

        
        # Check if user already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 400

        # Return a success response
        return jsonify({'message': 'User registered successfully!'}), 201
    else:
        # Return validation errors if form data is invalid
        return jsonify({'errors': form.errors}), 400

# Other routes for projects, tasks, and task assignments remain unchanged

@main_bp.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@main_bp.route('/api/projects', methods=['POST'])
def create_project():
    form = ProjectForm()
    if form.validate_on_submit():
        project = Project(name=form.name.data, description=form.description.data)
        db.session.add(project)
        db.session.commit()
        return jsonify(project.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@main_bp.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@main_bp.route('/api/tasks', methods=['POST'])
def create_task():
    form = TaskForm()
    if form.validate_on_submit():
        task = Task(title=form.title.data, description=form.description.data,
                    status=form.status.data, project_id=form.project_id.data)
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@main_bp.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@main_bp.route('/api/task_assignments', methods=['POST'])
def create_task_assignment():
    form = TaskAssignmentForm()
    if form.validate_on_submit():
        task_assignment = TaskAssignment(task_id=form.task_id.data, user_id=form.user_id.data,
                                        role=form.role.data, status=form.status.data)
        db.session.add(task_assignment)
        db.session.commit()
        return jsonify(task_assignment.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@main_bp.route('/api/task_assignments', methods=['GET'])
def get_task_assignments():
    task_assignments = TaskAssignment.query.all()
    return jsonify([task_assignment.to_dict() for task_assignment in task_assignments])
