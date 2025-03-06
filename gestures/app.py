from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from asyncio import sleep
import time
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)



@socketio.on('start')
def sendGest():
    for i in range(5):
        socketio.emit('gesture', {"message": f"Gesture {i}"})
       
@socketio.on('hello')
def printit(test):
    print(test)
    
if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)
