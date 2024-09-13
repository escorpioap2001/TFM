import * as Yup from "yup";

export function initialVales() {
  return {
    name: "",
    description: "",
    servings: "",
    time: "",
    ingredients: [],
    steps: [],
    tips: "",
    calories: "",
    fat:"",
    carbohydrates:"",
    fiber:"",
    sugar:"",
    protein:"",
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    ingredients: Yup.array().min(1, "Se requiere un ingrediente como minimo")
    .required("El ingrediente es requerida"),
    steps: Yup.array().min(1, "Se requiere un paso como minimo")
    .required("El paso es requerida"),
    servings : Yup.string().required("Campo obligatorio"),
    time: Yup.string().required("Campo obligatorio"),
    description: Yup.string().required("Campo obligatorio"),
    images: Yup.array()
    .min(1, "Se requiere una imagen como minimo")
    .required("La imagen es requerida"),
    tips: Yup.string(),
    calories: Yup.string(),
    fat: Yup.string(),
    carbohydrates: Yup.string(),
    fiber: Yup.string(),
    sugar: Yup.string(),
    protein: Yup.string(),
  });
}