package es.uv.etse.twcam.backend.business.javabeans;

public class MiLocalizacion {

    // Atributos de la clase MiLocalizacion
    private float latitude;
    private float longitude;
    private float latitudeDelta;
    private float longitudeDelta;

    // Constructor con argumentos
    public MiLocalizacion(float latitud, float longitud, float deltaLatitud, float deltaLongitud) {
        this.latitude = latitud;
        this.longitude = longitud;
        this.latitudeDelta = deltaLatitud;
        this.longitudeDelta = deltaLongitud;
    }

    // Constructor sin argumentos
    public MiLocalizacion() {
        this(0.01f, 0.01f, 0.01f, 0.01f);
    }

    //Getters y Setters
    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getLatitudeDelta() {
        return latitudeDelta;
    }

    public void setLatitudeDelta(float latitudeDelta) {
        this.latitudeDelta = latitudeDelta;
    }

    public float getLongitudeDelta() {
        return longitudeDelta;
    }

    public void setLongitudeDelta(float longitudeDelta) {
        this.longitudeDelta = longitudeDelta;
    }

    

}
