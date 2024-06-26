# app/schemas.py

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models import User, Project, Task, TaskAssignment
from app import ma

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User

class ProjectSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Project

class TaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Task

class TaskAssignmentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TaskAssignment
