# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_jwt_extended import JWTManager


from .config import Config

db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    
     # Initialize JWTManager
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this to your actual secret key
    jwt = JWTManager(app)

    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app
