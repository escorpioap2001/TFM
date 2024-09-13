package es.uv.etse.twcam.backend.business.javabeans;

public class Cancion{
    private String autor;
    private int duracion;
    private String tematica;
    private String titulo;
    public String getAutor() {
        return autor;
    }
    public void setAutor(String autor) {
        this.autor = autor;
    }
    public Cancion(String autor, int duracion, String tematica, String titulo) {
        this.autor = autor;
        this.duracion = duracion;
        this.tematica = tematica;
        this.titulo = titulo;
    }
    public int getDuracion() {
        return duracion;
    }
    public void setDuracion(int duracion) {
        this.duracion = duracion;
    }
    public String getTematica() {
        return tematica;
    }
    public void setTematica(String tematica) {
        this.tematica = tematica;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
}