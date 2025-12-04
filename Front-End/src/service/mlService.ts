const ML_API_BASE_URL = 'http://192.168.1.6:5001'; // Android emulator

export interface PredictionResponse {
  prediction: number;
  message: string;
}

export interface PredictionInput {
  umur: number;
  jenis_kelamin: 'Laki-laki' | 'Perempuan';
  tinggi_badan: number;
}

export const predictNutritionStatus = async (
  input: PredictionInput,
): Promise<PredictionResponse> => {
  try {
    const response = await fetch(`${ML_API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    const data: PredictionResponse & { error?: string } = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unknown error from ML API');
    }

    return data;
  } catch (error) {
    console.error('Error calling ML API:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to connect to prediction service');
  }
};

// ==============
// Rekomendasi Makanan
// ==============

export interface FoodRecommendationItem {
  Kategori: string;
  'Nama Pangan': string;
  'Kandungan Gizi Utama': string;
  'Manfaat untuk Anak Stunting': string;
}

export interface FoodRecommendationResponse {
  wilayah_tumbuh: string;
  rekomendasi: FoodRecommendationItem[];
}

export interface FoodRecommendationInput {
  wilayah_tumbuh: string; // contoh: "Dataran Rendah"
  jumlah?: number; // opsional, default = 5
}

export const recommendFood = async (
  input: FoodRecommendationInput,
): Promise<FoodRecommendationResponse> => {
  try {
    const payload = {
      wilayah_tumbuh: input.wilayah_tumbuh,
      jumlah: input.jumlah ?? 5,
    };

    const response = await fetch(`${ML_API_BASE_URL}/recommend-food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: FoodRecommendationResponse & { error?: string } =
      await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unknown error from ML API');
    }

    return data;
  } catch (error) {
    console.error('Error calling food recommendation API:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to connect to food recommendation service');
  }
};
