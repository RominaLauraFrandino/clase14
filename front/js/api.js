// ============================================================
// MÓDULO api.js: TODA la comunicación con el backend, en un
// solo lugar (es la "capa de servicios" del front).
//
// export = "esto lo ofrezco a otros módulos".
// Ningún otro archivo del front escribe fetch: si mañana
// cambia una URL, se toca SOLO este módulo.
// ============================================================
const API_URL = "/api";   // mismo servidor: ya no hace falta localhost:3000

async function pedirJson(url, opciones) {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
        // El mensaje del back viaja en datos.mensaje
        throw new Error(datos.mensaje || "Error al comunicarse con la API.");
    }

    return datos;
}

export function obtenerCategorias() {
    return pedirJson(`${API_URL}/categorias`);
}

export function obtenerProductos(idCategoria) {
    const query = idCategoria ? `?categoria=${idCategoria}` : "";
    return pedirJson(`${API_URL}/productos${query}`);
}

export function crearProducto(producto) {
    return pedirJson(`${API_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });
}
