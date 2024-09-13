package es.uv.etse.twcam.backend.apirest;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.io.IOException;
import java.io.InputStream;

public class FirebaseInitializer {
    private static boolean initialized = false;

    public static void initialize() throws IOException {
        if (!initialized) {
            InputStream serviceAccount = InitServlet.class.getClassLoader().getResourceAsStream("cookingV2.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

            FirebaseApp.initializeApp(options);
            
            initialized = true;
        }
    }
}



