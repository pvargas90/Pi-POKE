import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    imagen: "",
    vida: "",
    altura: "",
    peso: "",
    ataque: "",
    defensa: "",
    velocidad: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    tipo: "",
    imagen: "",
    vida: "",
    altura: "",
    peso: "",
    ataque: "",
    defensa: "",
    velocidad: "",
  });

  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;

    validate({ ...Form, [property]: value });

    setForm({ ...Form, [property]: value });
  };

  const validate = (form) => {
    if (form.nombre === "") {
      setErrors({ ...errors, nombre: "El nombre es obligatorio" });
    }
    if (form.tipo === "") {
      setErrors({ ...errors, tipo: "El tipo es obligatorio" });
    }
  };

  const submitHandlert = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/pokemons", form)
    .then(res=>alert(res))
    .catch(err=>alert(err))
    };

  return (
    <form onSubmit={submitHandlert}>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={form.nombre}
          handleChange={handleChange}
          name="nombre"
        />
        {errors.nombre && <p>{errors.nombre}</p>}
      </div>

      <div>
        <label>Tipo: </label>
        <input
          type="text"
          value={form.tipo}
          handleChange={handleChange}
          name="tipo"
        />
        {errors.tipo && <p>{errors.tipo}</p>}
      </div>

      <div>
        <label>Imagen: </label>
        <input
          type="text"
          value={form.imagen}
          handleChange={handleChange}
          name="imagen"
        />
      </div>

      <div>
        <label>Vida: </label>
        <input
          type="text"
          value={form.vida}
          handleChange={handleChange}
          name="vida"
        />
      </div>

      <div>
        <label>Altura: </label>
        <input
          type="text"
          value={form.altura}
          handleChange={handleChange}
          name="altura"
        />
      </div>

      <div>
        <label>Peso: </label>
        <input
          type="text"
          value={form.peso}
          handleChange={handleChange}
          name="peso"
        />
      </div>

      <div>
        <label>Ataque: </label>
        <input
          type="text"
          value={form.ataque}
          handleChange={handleChange}
          name="ataque"
        />
      </div>

      <div>
        <label>Defensa: </label>
        <input
          type="text"
          value={form.defensa}
          handleChange={handleChange}
          name="defensa"
        />
      </div>

      <div>
        <label>Velocidad: </label>
        <input
          type="text"
          value={form.velocidad}
          handleChange={handleChange}
          name="velocidad"
        />
      </div>

      <button type="submit">Crear Pokemon</button>
    </form>
  );
};

export default Form;
