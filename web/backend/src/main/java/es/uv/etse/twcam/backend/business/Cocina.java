package es.uv.etse.twcam.backend.business;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import es.uv.etse.twcam.backend.business.javabeans.Administrador;
import es.uv.etse.twcam.backend.business.javabeans.Cliente;
import es.uv.etse.twcam.backend.business.javabeans.Ingrediente;
import es.uv.etse.twcam.backend.business.javabeans.Registro;
import es.uv.etse.twcam.backend.business.javabeans.Usuario;

public class Cocina {

    private static Cocina instance;
    private ArrayList<Usuario> usuarios;
    private ArrayList<Cliente> clientes;
    private ArrayList<Administrador> admins;
    private Registro registro;
    private ArrayList<Ingrediente> ingredientes;

    public ArrayList<Cliente> getClientes() {
        return clientes;
    }

    public void setClientes(ArrayList<Cliente> clientes) {
        this.clientes = clientes;
    }

    public ArrayList<Administrador> getAdmins() {
        return admins;
    }

    public void setAdmins(ArrayList<Administrador> admins) {
        this.admins = admins;
    }

    public Cocina() {
        Initialize();
    }

    public static Cocina getInstance() {
        if (instance == null) {
            instance = new Cocina();
        }
        return instance;
    }

    public void Cleanup() {
        instance = null;
    }

    private void Initialize() {
        Ingrediente i0 = new Ingrediente("Harina", "Granos y cereales");
        Ingrediente i1 = new Ingrediente("Zanahoria", "Vegetales");
        Ingrediente i2 = new Ingrediente("Pollo", "Carnes");
        Ingrediente i3 = new Ingrediente("Salmón", "Pescados y mariscos");
        Ingrediente i4 = new Ingrediente("Leche", "Productos lácteos");
        Ingrediente i5 = new Ingrediente("Garbanzos", "Legumbres y frijoles");
        Ingrediente i6 = new Ingrediente("Aceite de oliva", "Aceites y grasas");
        Ingrediente i7 = new Ingrediente("Perejil", "Hierbas y especias");
        Ingrediente i8 = new Ingrediente("Salsa de tomate", "Salsas y condimentos");
        Ingrediente i9 = new Ingrediente("Azúcar", "Endulzantes");
        Ingrediente i10 = new Ingrediente("Almendras", "Frutos secos y semillas");
        ingredientes = new ArrayList<Ingrediente>(Arrays.asList(i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10));


        Cliente cliente1 = new Cliente("Alfredo", "password", "123456789L");
        Cliente cliente2 = new Cliente("Itziar", "password", "123456789P");
        clientes = new ArrayList<Cliente>(Arrays.asList(cliente1, cliente2));

        

        Administrador administrador1 = new Administrador("Silvia", "password");
        Administrador administrador2 = new Administrador("Pepe", "password");
        admins = new ArrayList<Administrador>(Arrays.asList(administrador1, administrador2));

        usuarios = new ArrayList<Usuario>(
                Arrays.asList(cliente1, cliente2, administrador1, administrador2));


        registro = Registro.getInstance();
    }

    public ArrayList<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(ArrayList<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }

    public boolean addIngrediente(String name, String tipo)
    {
        if(name != "" && tipo != "")
        {
            Ingrediente ingrediente = new Ingrediente(name,tipo);
            this.ingredientes.add(ingrediente);
            return true;
        }
        return false;
    }

    public boolean deleteIngrediente(int id) {

        // Buscar el índice del ingrediente con el ID especificado
        int indice = -1;
        for (int i = 0; i < ingredientes.size(); i++) {
          if (ingredientes.get(i).getId() == id) {
            indice = i;
            break;
          }
        }
      
        // Si se encontró el índice
        if (indice != -1) {
          ingredientes.remove(indice);
          return true;
        } else {
          return false;
        }
      }

    public ArrayList<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(ArrayList<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public String LoginUser(String name, String password) {
        String res = "desconocido";
        for (Cliente user : clientes) {
            if (user.getNombre().equals(name) && user.getPassword().equals(password)) {
                return "cliente";
            }
        }
        for (Administrador user : admins) {
            if (user.getNombre().equals(name) && user.getPassword().equals(password)) {
                return "admin";
            }
        }
        return res;
    }
}
