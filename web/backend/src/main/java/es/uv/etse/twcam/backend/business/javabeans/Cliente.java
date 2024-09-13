package es.uv.etse.twcam.backend.business.javabeans;

import java.util.ArrayList;
import java.util.List;

public class Cliente extends Usuario {

    private String dni;

    public Cliente(String nombre, String password, String dni) {
        super(nombre, password);
        this.dni = dni;
    }
    
    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }
}
