# app/forms.py

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length

class UserForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])

class ProjectForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description')

class TaskForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = TextAreaField('Description')
    status = SelectField('Status', choices=[('todo', 'To Do'), ('inprogress', 'In Progress'), ('done', 'Done')])
    project_id = SelectField('Project', coerce=int, validators=[DataRequired()])

class TaskAssignmentForm(FlaskForm):
    task_id = SelectField('Task', coerce=int, validators=[DataRequired()])
    user_id = SelectField('User', coerce=int, validators=[DataRequired()])
    role = StringField('Role', validators=[DataRequired()])
    status = SelectField('Status', choices=[('todo', 'To Do'), ('inprogress', 'In Progress'), ('done', 'Done')])

# Add the RegistrationForm class
class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])

    submit = SubmitField('Register')