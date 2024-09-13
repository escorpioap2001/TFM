package es.uv.etse.twcam.backend.business.javabeans;

import java.util.List;

import com.google.cloud.Timestamp;

public class Receta {
    private String id;
    private String name;
    private String description;
    private String servings;
    private String time;
    private List<IngredienteReceta> ingredients;
    private String tips;
    private List<String> images;
    private List<String> steps;
    private Double ratingMedia;
    private Timestamp createdAt;
    private String calories;
    private String fat;
    private String carbohydrates;
    private String fiber;
    private String sugar;
    private String protein;
    
    public Receta() {
    }

    public Receta(String id, String name, String description, String servings, String time,
            List<IngredienteReceta> ingredients, String tips, List<String> images, List<String> steps,
            Double ratingMedia, Timestamp createdAt, String calories, String fat, String carbohydrates, String fiber,
            String sugar, String protein) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.servings = servings;
        this.time = time;
        this.ingredients = ingredients;
        this.tips = tips;
        this.images = images;
        this.steps = steps;
        this.ratingMedia = ratingMedia;
        this.createdAt = createdAt;
        this.calories = calories;
        this.fat = fat;
        this.carbohydrates = carbohydrates;
        this.fiber = fiber;
        this.sugar = sugar;
        this.protein = protein;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getServings() {
        return servings;
    }

    public void setServings(String servings) {
        this.servings = servings;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public List<IngredienteReceta> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredienteReceta> ingredients) {
        this.ingredients = ingredients;
    }

    public String getTips() {
        return tips;
    }

    public void setTips(String tips) {
        this.tips = tips;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    public Double getRatingMedia() {
        return ratingMedia;
    }

    public void setRatingMedia(Double ratingMedia) {
        this.ratingMedia = ratingMedia;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getCalories() {
        return calories;
    }

    public void setCalories(String calories) {
        this.calories = calories;
    }

    public String getFat() {
        return fat;
    }

    public void setFat(String fat) {
        this.fat = fat;
    }

    public String getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(String carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public String getFiber() {
        return fiber;
    }

    public void setFiber(String fiber) {
        this.fiber = fiber;
    }

    public String getSugar() {
        return sugar;
    }

    public void setSugar(String sugar) {
        this.sugar = sugar;
    }

    public String getProtein() {
        return protein;
    }

    public void setProtein(String protein) {
        this.protein = protein;
    }

    
    
}
