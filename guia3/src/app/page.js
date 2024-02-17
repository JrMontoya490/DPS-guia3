"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [marca, setMarca] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [listaCompras, setListaCompras] = useState([]);
  const [resultado, setResultado] = useState(null);

  const agregarCompra = () => {
    // Validar que se ingresen todos los campos necesarios
    if (!nombreProducto || !marca || !cantidad || !precio) {
      setResultado("Por favor, complete todos los campos.");
      return;
    }

    // Crear un nuevo objeto de compra
    const nuevaCompra = {
      nombreProducto,
      marca,
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
    };

    // Agregar la compra a la lista
    setListaCompras([...listaCompras, nuevaCompra]);

    // Limpiar los campos después de agregar la compra
    setNombreProducto('');
    setMarca('');
    setCantidad('');
    setPrecio('');

    // Limpiar el resultado
    setResultado(null);
  };

  const mostrarTotal = () => {
    // Calcular el total de la lista de compras
    const total = listaCompras.reduce((acc, compra) => acc + compra.cantidad * compra.precio, 0);
    setResultado(`Total de la compra: $${total.toFixed(2)}`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.calculadora}>
        <div className={styles.numeros}>
          <label className={styles.text}>Nombre del Producto:</label>
          <input
            className={styles.inputnum}
            type="text"
            value={nombreProducto}
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </div>
        <div className={styles.numeros}>
          <label className={styles.text}>Marca:</label>
          <input
            className={styles.inputnum}
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>
        <div className={styles.numeros}>
          <label className={styles.text}>Cantidad:</label>
          <input
            className={styles.inputnum}
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <div className={styles.numeros}>
          <label className={styles.text}>Precio:</label>
          <input
            className={styles.inputnum}
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <div>
          <button className={styles.button} onClick={agregarCompra}>
            Agregar a la lista
          </button>
          <button className={styles.button} onClick={mostrarTotal}>
            Calcular Total
          </button>
        </div>
        {resultado && <div className={styles.resultado}>{resultado}</div>}
        {listaCompras.length > 0 && (
          <div>
            <h2>Lista de Compras:</h2>
            <ul>
              {listaCompras.map((compra, index) => (
                <li key={index}>
                  {`${compra.cantidad} ${compra.nombreProducto} - ${compra.marca} - $${(
                    compra.cantidad * compra.precio
                  ).toFixed(2)}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
