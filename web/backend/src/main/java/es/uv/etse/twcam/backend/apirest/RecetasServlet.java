package es.uv.etse.twcam.backend.apirest;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.google.gson.Gson;

import es.uv.etse.twcam.backend.business.javabeans.Receta;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.*;

@WebServlet("/recetas")
public class RecetasServlet extends HttpServlet {

    private static final Logger logger = LogManager.getLogger(RecetasServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {

            addCORSHeaders(response);

            FirebaseInitializer.initialize();

            // Accede a Firestore
            Firestore db = FirestoreClient.getFirestore();

            // Accede a la colección "recetas"
            CollectionReference recetasCollection = db.collection("recetas");

            ApiFuture<QuerySnapshot> future = recetasCollection.get();
            QuerySnapshot querySnapshot = future.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();

            // Construye la lista de objetos Receta
            List<Receta> recetas = new ArrayList<>();
            for (QueryDocumentSnapshot document : documents) {
                System.out.println(document);
                Receta receta = document.toObject(Receta.class);
                recetas.add(receta);
            }

            // Configura la respuesta HTTP
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            // Convierte la lista de recetas a JSON y envía la respuesta
            response.getWriter().write(new Gson().toJson(recetas));
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {

            addCORSHeaders(response);

            FirebaseInitializer.initialize();

            // Accede a Firestore
            Firestore db = FirestoreClient.getFirestore();

            // Paso 0: Obtiene el ID de la receta a eliminar del parámetro de la solicitud
            String recetaId = request.getParameter("id");

            if (recetaId != null && !recetaId.isEmpty()) {

                // Paso 1: Eliminar todos los favoritos encontrados
                DocumentReference recetaRef = db.collection("recetas").document(recetaId);
                ApiFuture<WriteResult> future = recetaRef.delete();
                future.get(); // Espera a que se complete la eliminación

                CollectionReference comentariosCollection = db.collection("comentarios");
                Query query = comentariosCollection.whereEqualTo("idRecipe", recetaId);
                ApiFuture<QuerySnapshot> querySnapshotFuture = query.get();
                QuerySnapshot querySnapshot = querySnapshotFuture.get();
                List<QueryDocumentSnapshot> comentarios = querySnapshot.getDocuments();

                // Paso 2: Eliminar todos los comentarios encontrados
                for (QueryDocumentSnapshot comentario : comentarios) {
                    // Obtiene la referencia al documento del comentario
                    DocumentReference comentarioRef = comentario.getReference();
                    // Elimina el comentario
                    ApiFuture<WriteResult> deleteFuture = comentarioRef.delete();
                    // Espera a que se complete la eliminación
                    deleteFuture.get();
                }

                comentariosCollection = db.collection("favoritos");
                query = comentariosCollection.whereEqualTo("idRecipe", recetaId);
                querySnapshotFuture = query.get();
                querySnapshot = querySnapshotFuture.get();
                List<QueryDocumentSnapshot> favoritos = querySnapshot.getDocuments();

                // Paso 3: Eliminar todos los favoritos encontrados
                for (QueryDocumentSnapshot favorito : favoritos) {
                    // Obtiene la referencia al documento del favorito
                    DocumentReference favoritoRef = favorito.getReference();
                    // Elimina el favorito
                    ApiFuture<WriteResult> deleteFuture = favoritoRef.delete();
                    // Espera a que se complete la eliminación
                    deleteFuture.get();
                }

                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) {

        addCORSHeaders(response);

        try {
            super.doOptions(request, response);
        } catch (ServletException se) {
            logger.error("Error genérico en la clase padre");
        } catch (IOException ioe) {
            logger.error("Error genérico de salida la clase padre");
        }
    }

    private void addCORSHeaders(HttpServletResponse response) {
        response.addHeader("Content-Type", "application/json");
        response.setCharacterEncoding("UTF-8");
        response.addHeader("Access-Control-Allow-Credentials", "true");
        response.addHeader("Access-Control-Allow-Methods", "OPTIONS, HEAD, DELETE, GET");
        response.addHeader("Access-Control-Allow-Headers", "authorization,content-type");
        response.addHeader("Access-Control-Allow-Origin", "*");
    }
}
