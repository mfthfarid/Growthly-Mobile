const ML_API_BASE_URL = 'http://192.168.0.109:5001'; // Android emulator

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
