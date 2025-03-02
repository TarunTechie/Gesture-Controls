from flask import Flask, jsonify

app = Flask(__name__)

data_store = {"message": "Hello, World!"}

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(data_store)


app.run(debug=True,port=5000)