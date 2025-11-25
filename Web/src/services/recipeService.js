import { apiClient } from "../api/apiClient";

export const getRecipeStats = () => {
  return apiClient.get("/api/makanan/stats");
};

export const addRecipe = async (recipeData, imageFile) => {
  const formData = new FormData();
  formData.append("nama_makanan", recipeData.nama_makanan);
  formData.append("isi", recipeData.isi);
  if (imageFile) {
    formData.append("foto", imageFile);
  }
  return apiClient.post("/api/makanan", formData);
};

export const getAllRecipes = () => {
  return apiClient.get("/api/makanan");
};
export const deleteRecipe = (id) => {
  return apiClient.delete(`/api/makanan/${id}`);
};

export const updateRecipe = async (id, recipeData, imageFile = null) => {
  const formData = new FormData();
  formData.append("nama_makanan", recipeData.nama_makanan);
  formData.append("isi", recipeData.isi);
  if (imageFile) {
    formData.append("foto", imageFile);
  }
  return apiClient.put(`/api/makanan/${id}`, formData);
};
