package es.uv.etse.twcam.backend.apirest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;
import org.apache.logging.log4j.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import es.uv.etse.twcam.backend.business.Cocina;
import es.uv.etse.twcam.backend.business.javabeans.Ingrediente;

@WebServlet("/ingredientes")
public class IngredientesServlet extends HttpServlet {
    private static Cocina cocina;
    private static final Logger logger = LogManager.getLogger("Logger");

    public IngredientesServlet() {
        super();
        logger.info("Servlet Pistas iniciado");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        cocina = Cocina.getInstance();

        addCORSHeaders(response);

        // Obtener las ingredientes
        List<Ingrediente> ingredientes = cocina.getIngredientes();

        // Convertir los ingredientes a formato JSON
        Gson gson = new Gson();
        String jsonReservas = gson.toJson(ingredientes);

        // Respuesta con las reservas del cliente
        response.setStatus(HttpServletResponse.SC_OK);
        PrintWriter out = response.getWriter();
        out.write(jsonReservas);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Lectura del cuerpo de la solicitud
        StringBuilder requestBody = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
        }

        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(requestBody.toString(), JsonObject.class);

        String nombre = jsonObject.get("nombre").getAsString();
        String tipo = jsonObject.get("tipo").getAsString();

        cocina = Cocina.getInstance();

        addCORSHeaders(response);

        Boolean realizado = cocina.addIngrediente(nombre, tipo);

        if (realizado) {
            response.setStatus(HttpServletResponse.SC_OK);
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Añadido con éxito");
            response.getWriter().write(responseJson.toString());
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Ingrediente no valido");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
                
        Integer id = Integer.parseInt(request.getParameter("id"));

        cocina = Cocina.getInstance();

        addCORSHeaders(response);

        Boolean borrados = cocina.deleteIngrediente(id);

        if (borrados) {
            response.setStatus(HttpServletResponse.SC_OK);
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Ingrediente borrado con exito");
            response.getWriter().write(responseJson.toString());
        } else {
            // Cliente no encontrado, respuesta de error
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("Ingrediente no encontrado: " + id);
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
        response.addHeader("Access-Control-Allow-Methods", "OPTIONS, HEAD, DELETE, GET, POST");
        response.addHeader("Access-Control-Allow-Headers", "authorization,content-type");
        response.addHeader("Access-Control-Allow-Origin", "*");
    }
}
