# ml_api.py
from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# === LOAD MODEL & ENCODER SEKALI SAAT SERVER START ===
MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
try:
    model = joblib.load(os.path.join(MODEL_DIR, 'model_stunting.pkl'))
    le_gender = joblib.load(os.path.join(MODEL_DIR, 'encoder_gender.pkl'))
    le_status = joblib.load(os.path.join(MODEL_DIR, 'encoder_status.pkl'))
    print("Model dan encoder berhasil dimuat.")
except Exception as e:
    print(f"Error memuat model/encoder: {e}")
    exit(1)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # === VALIDASI INPUT ===
        required_fields = ['umur', 'jenis_kelamin', 'tinggi_badan']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        umur = float(data['umur'])
        jenis_kelamin_str = data['jenis_kelamin']
        tinggi_badan = float(data['tinggi_badan'])

        # === ENCODE JENIS KELAMIN ===
        # *** SESUAIKAN DENGAN DATA TRAINING ANDA ***
        if jenis_kelamin_str.lower() == 'laki-laki':
            jenis_kelamin_encoded = 1
        elif jenis_kelamin_str.lower() == 'perempuan':
            jenis_kelamin_encoded = 0
        else:
            return jsonify({'error': 'Invalid jenis_kelamin. Use "Laki-laki" or "Perempuan".'}), 400

        # === BUAT ARRAY FITUR ===
        features = np.array([[umur, jenis_kelamin_encoded, tinggi_badan]])

        # === PREDIKSI ===
        prediction_encoded = model.predict(features)[0]

        return jsonify({
            'prediction': int(prediction_encoded),
            'message': 'Prediksi berhasil'
        })
        

    except ValueError as ve:
        return jsonify({'error': f'Invalid input data type: {ve}'}), 400
    except Exception as e:
        print(f"Error saat prediksi: {e}") # Log ke console untuk debugging
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True) # Port berbeda dari server Node.js