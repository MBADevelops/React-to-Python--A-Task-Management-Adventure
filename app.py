# I start by importing necessary libraries and modules.
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, Task
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

# Here, I'm initializing my Flask application.
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # I ensure to replace this with my actual secret key in a secure manner.

db.init_app(app)  # I'm initializing the database with my Flask app.

jwt = JWTManager(app)  # I setup the JWT manager for handling tokens.

cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)  # I enable Cross-Origin Resource Sharing for my app.

@app.route('/')
def home():
    # I define a simple home page route.
    return 'Hello, this is the home page!'

@app.route('/register', methods=['POST'])
def register():
    # I define the registration route to register new users.
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # I check if the username is already taken.
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({'message': 'Username already exists'}), 400

    # I securely hash the user's password before storing it.
    password_hash = generate_password_hash(password)
    new_user = User(username=username, password=password_hash)

    # I add and commit the new user to the database.
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Registration successful!'}), 201

@app.route('/login', methods=['POST'])
def login():
    # I define the login route to authenticate users.
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    # I validate the provided credentials.
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    # I create and return an access token if the user is authenticated.
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

@app.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    # I define the task creation route to allow users to create tasks.
    current_user = get_jwt_identity()  # I retrieve the identity of the current user.
    data = request.get_json()
    new_task = Task(title=data.get('title'), description=data.get('description'), due_date=data.get('due_date'), priority=data.get('priority'), user_id=current_user)

    # I add and commit the new task to the database.
    db.session.add(new_task)
    db.session.commit()

    return jsonify(new_task.serialize()), 201

@app.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    # I define the route to get all tasks of the current user.
    current_user = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=current_user).all()
    return jsonify([task.serialize() for task in tasks]), 200

@app.route('/tasks/<int:task_id>', methods=['GET'])
@jwt_required()
def get_task(task_id):
    # I define the route to get a specific task.
    task = Task.query.get_or_404(task_id)
    return jsonify(task.serialize()), 200

@app.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    # I define the route to update a specific task.
    current_user = get_jwt_identity()
    task = Task.query.get_or_404(task_id)
    data = request.get_json()

    # I check if the current user has permission to update the task.
    if task.user_id != current_user:
        return jsonify({'message': 'You do not have permission to update this task'}), 403

    # I update the task fields.
    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.due_date = data.get('due_date', task.due_date)
    task.priority = data.get('priority', task.priority)
    task.status = data.get('status', task.status)

    db.session.commit()

    return jsonify(task.serialize()), 200

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    # I define the route to delete a specific task.
    current_user = get_jwt_identity()
    task = Task.query.get_or_404(task_id)

    # I check if the current user has permission to delete the task.
    if task.user_id != current_user:
        return jsonify({'message': 'You do not have permission to delete this task'}), 403

    # I delete the task and commit the changes.
    db.session.delete(task)
    db.session.commit()

    return jsonify({'message': 'Task deleted successfully'}), 200

# I define the main entry point of the application.
if __name__ == '__main__':
    app.run(debug=False)  # I remember to remove 'debug=True' for production.
