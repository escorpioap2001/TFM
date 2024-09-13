package es.uv.etse.twcam.backend.business.javabeans;

public class Ingrediente {
    private int id;
    private String nombre;
    private String tipo;
    private static int numeroIngredientes;

    public Ingrediente() {
    }

    public Ingrediente(String nombre, String tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.id = numeroIngredientes;
        numeroIngredientes++;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
