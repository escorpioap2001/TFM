import { Image } from "./image";

export class IngredienteReceta {
    cantidad:string;
    category:string;
    image:Image;
    label:string;
    value:string;
  
    constructor() {
      this.cantidad = "";
      this.category = "";
      this.image = new Image();
      this.label = "";
      this.value = "";
    }
  }
  