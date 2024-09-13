package es.uv.etse.twcam.backend.business.javabeans;

public class Image {
    private String uri;

    public Image() {
    }

    public Image(String uri) {
        this.uri = uri;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }
    
}
