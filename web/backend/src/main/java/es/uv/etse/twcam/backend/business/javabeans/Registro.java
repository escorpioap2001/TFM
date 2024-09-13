package es.uv.etse.twcam.backend.business.javabeans;

import java.util.HashMap;
import java.util.Map;

public class Registro {
    private static Registro instancia;
    private Map<String, String> informacionCanciones;

    private Registro(){
        Initialize();
    }

    private void Initialize(){
        informacionCanciones = new HashMap<>();
    }

    public static Registro getInstance(){
        if(instancia == null){
            instancia = new Registro();
        }
        return instancia;
    }

    public void Cleanup(){
        instancia = null;
    }


    public void registrarCancion(String cancionNombre, String fecha){
        informacionCanciones.put(cancionNombre, fecha);
    }

    public String obtenerFechaCancion(String nombreCancion) {
        return informacionCanciones.get(nombreCancion);
    }
}
