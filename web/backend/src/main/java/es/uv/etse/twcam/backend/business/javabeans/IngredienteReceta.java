package es.uv.etse.twcam.backend.business.javabeans;

public class IngredienteReceta {
    private String cantidad;
    private String category;
    private Image image;
    private String label;
    private String value;

    public IngredienteReceta() {
    }

    public IngredienteReceta(String cantidad, String category, Image image, String label, String value) {
        this.cantidad = cantidad;
        this.category = category;
        this.image = image;
        this.label = label;
        this.value = value;
    }

    public String getCantidad() {
        return cantidad;
    }

    public void setCantidad(String cantidad) {
        this.cantidad = cantidad;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    
}
