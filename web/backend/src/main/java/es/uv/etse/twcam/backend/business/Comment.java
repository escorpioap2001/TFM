package es.uv.etse.twcam.backend.business;

public class Comment {


    private Integer estrellas;
    private String comentario;
    private String autor;
    private String fecha;

    

    /**
     * Crea un comentario a partir de sus campos
     * @param estrellas Estrellas
     * @param comentario Texto del comentario
     * @param autor Autor del comentario
     * @param fecha Fecha del comentario
     */
    public Comment(Integer estrellas, String comentario, String autor, String fecha) {
        this.estrellas = estrellas;
        this.comentario = comentario;
        this.autor = autor;
        this.fecha = fecha;
    }

    public Integer getEstrellas() {
        return estrellas;
    }

    public void setEstrellas(Integer estrellas) {
        this.estrellas = estrellas;
    }

    
    public String getComentario() {
        return comentario;
    }

    
    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    
    public String getAutor() {
        return autor;
    }

    
    public void setAutor(String autor) {
        this.autor = autor;
    }

    
    public String getFecha() {
        return fecha;
    }

    
    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
    
    @Override
    public String toString() {
        return "Comentario [autor=" + autor + ", comentario=" + comentario + ", estrellas=" + estrellas + ", fecha="
                + fecha + "]";
    } 
   
}