# I start by importing SQLAlchemy and datetime module.
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Here, I'm initializing SQLAlchemy which will be used to communicate with my database.
db = SQLAlchemy()

# I then define my User model that will represent users in my application.
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # I ensure each user has a unique id.
    username = db.Column(db.String(50), unique=True, nullable=False)  # Each user will have a unique username.
    password = db.Column(db.String(120), nullable=False)  # I store the user's hashed password.

# Here, I define the Task model to represent tasks in the application.
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # I ensure each task has a unique id.
    title = db.Column(db.String(100), nullable=False)  # Each task will have a title.
    description = db.Column(db.String(200))  # I provide a field for an optional description.
    due_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Each task will have a due date.
    priority = db.Column(db.String(20), nullable=False)  # I include a field for the task's priority.
    status = db.Column(db.String(20), nullable=False, default="Pending")  # I add a status field for each task.
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # I associate each task with a user.
    user = db.relationship('User', backref=db.backref('tasks', lazy=True))  # I establish a relationship between tasks and their respective users.

    # This method will return the task's data in a dictionary format.
    def serialize(self): 
        return { 
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'due_date': self.due_date.isoformat(),
            'priority': self.priority,
            'status': self.status,
            'user_id': self.user_id
        }
