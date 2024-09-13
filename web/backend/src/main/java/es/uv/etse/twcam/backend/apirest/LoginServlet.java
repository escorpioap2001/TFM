package es.uv.etse.twcam.backend.apirest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.apache.logging.log4j.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import es.uv.etse.twcam.backend.business.Cocina;

@WebServlet("/login.html")
public class LoginServlet extends HttpServlet {
    private static Cocina discoteca;
    private static final Logger logger = LogManager.getLogger("Logger");

    public LoginServlet(){
        super();
        logger.info("Servlet login creado");
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

        String username = jsonObject.get("username").getAsString();
        String password = jsonObject.get("password").getAsString();
        discoteca = Cocina.getInstance();

        addCORSHeaders(response);

        String tipo = discoteca.LoginUser(username, password);

        if (!tipo.equals("desconocido")) {
            response.setStatus(HttpServletResponse.SC_OK);
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("tipo", tipo);
            response.getWriter().write(responseJson.toString());
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("¡Inicio de sesión fallido!" + username + " " + password);
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
		response.addHeader("Access-Control-Allow-Methods", "OPTIONS, HEAD, POST");
		response.addHeader("Access-Control-Allow-Headers", "authorization,content-type");
		response.addHeader("Access-Control-Allow-Origin", "*");
	}
}
