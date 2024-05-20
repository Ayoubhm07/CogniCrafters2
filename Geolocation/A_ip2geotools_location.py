from flask import Flask, request, jsonify
from flask_cors import CORS
from ip2geotools.databases.noncommercial import DbIpCity

app = Flask(__name__)
CORS(app)

@app.route('/get_ip_info', methods=['POST'])
def get_ip_info():
    data = request.get_json()
    ip_address = data.get('ip_address')
    if not ip_address:
        return jsonify({"error": "No IP address provided"}), 400

    try:
        ip_location = DbIpCity.get(ip_address, api_key="free")
        return jsonify({
            "country": ip_location.country,
            "region": ip_location.region,
            "city": ip_location.city,
            "latitude": ip_location.latitude,
            "longitude": ip_location.longitude
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5201)
