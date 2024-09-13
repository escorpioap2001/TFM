package es.uv.etse.twcam.backend.business.javabeans;

public class Usuario {
    private String nombre;
    private String password;
    
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public Usuario(String nombre, String password) {
        this.nombre = nombre;
        this.password = password;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

}
