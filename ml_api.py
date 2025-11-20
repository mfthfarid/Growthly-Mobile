# ml_api.py
from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import os
import random

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

    # === LOAD FOOD RECOMMENDATION DATA & ENCODER ===
try:
    df_makanan = pd.read_csv(os.path.join(MODEL_DIR, 'makanan_terbaru.csv'))
    le_wilayah = joblib.load(os.path.join(MODEL_DIR, 'encoder_wilayah.pkl'))
    print("✅ Dataset makanan dan encoder wilayah berhasil dimuat.")
except Exception as e:
    print(f"❌ Error memuat dataset makanan/encoder wilayah: {e}")
    df_makanan = None  # fallback agar tidak crash total

# === ENDPOINT: PREDIKSI STUNTING ===
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

# === ENDPOINT: REKOMENDASI MAKANAN ===
@app.route('/recommend-food', methods=['POST'])
def recommend_food():
    if df_makanan is None:
        return jsonify({'error': 'Dataset makanan tidak tersedia.'}), 500

    try:
        data = request.get_json()
        wilayah = data.get('wilayah_tumbuh')
        jumlah = data.get('jumlah', 5)

        if not wilayah:
            return jsonify({'error': 'Field "wilayah_tumbuh" diperlukan.'}), 400

        # Normalisasi: pastikan nama wilayah cocok persis (case-insensitive dan strip)
        wilayah_norm = wilayah.strip().title()
        available_wilayah = df_makanan['Wilayah Tumbuh'].str.title().unique()

        if wilayah_norm not in available_wilayah:
            return jsonify({
                'error': f'Wilayah "{wilayah}" tidak dikenali. Wilayah yang tersedia: {list(available_wilayah)}'
            }), 400

        # Filter data berdasarkan wilayah
        filtered = df_makanan[df_makanan['Wilayah Tumbuh'].str.title() == wilayah_norm]

        if filtered.empty:
            return jsonify({'error': f'Tidak ada makanan ditemukan untuk wilayah: {wilayah}'}), 404

        # Ambil sampel acak (atau semua jika kurang dari `jumlah`)
        n = min(int(jumlah), len(filtered))
        sampled = filtered.sample(n=n, random_state=random.randint(0, 1000))

        # Konversi ke list of dict agar bisa di-JSON
        result = sampled[[
            'Kategori', 
            'Nama Pangan', 
            'Kandungan Gizi Utama', 
            'Manfaat untuk Anak Stunting'
        ]].to_dict(orient='records')

        return jsonify({
            'wilayah_tumbuh': wilayah_norm,
            'rekomendasi': result,
            'jumlah': len(result)
        })

    except Exception as e:
        print(f"Error saat rekomendasi makanan: {e}")
        return jsonify({'error': f'Rekomendasi gagal: {str(e)}'}), 500

# === RUN SERVER ===
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True) # Port berbeda dari server Node.js