# check_db.py

from app import create_app, db
from sqlalchemy import text, inspect

app = create_app()

with app.app_context():
    # Check if the database is connected
    try:
        db.session.execute(text('SELECT 1'))
        print("Database is connected.")
    except Exception as e:
        print(f"Database connection error: {e}")

    inspector = inspect(db.engine)

    # List all tables in the database
    tables = inspector.get_table_names()
    print(f"Tables in the database: {tables}")

    # Check if specific tables exist
    for table in ['user', 'project', 'task', 'task_assignment','register','login']:
        if table in tables:
            print(f"Table '{table}' exists.")
        else:
            print(f"Table '{table}' does not exist.")
