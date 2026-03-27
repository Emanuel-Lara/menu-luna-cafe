// Función para filtrar por categorías
function filtrar(categoria, evento) {
    const secciones = document.querySelectorAll('.categoria-menu');
    
    secciones.forEach(seccion => {
        if (categoria === 'todos') {
            seccion.style.display = 'block';
        } else {
            if (seccion.classList.contains(categoria)) {
                seccion.style.display = 'block';
            } else {
                seccion.style.display = 'none';
            }
        }
    });

    // Cambiar estado activo de los botones
    const botones = document.querySelectorAll('.filtro-btn');
    botones.forEach(btn => btn.classList.remove('activo'));
    evento.currentTarget.classList.add('activo');

    // Scroll suave hacia arriba al filtrar
    window.scrollTo({ top: 150, behavior: 'smooth' });
}

// Función de WhatsApp
function pedirDirecto(producto, precio) {
    const telefono = "584120000000"; // Reemplaza con el número de Luna Café
    const mensaje = `Hola Luna Café 👋, deseo pedir: ${producto} ($${precio})`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
// Enlace de tu Google Sheets (Ya configurado como CSV)
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS5yFvdfemKWhUSTOjF-Uxr5SryN1UMYLBcHcmWG58U-dXvvmEc5MDkjDdtYCr3jrmQJZFcD6iXv-3f/pub?output=csv";

async function cargarMenu() {
    try {
        const respuesta = await fetch(SHEET_URL);
        const csvText = await respuesta.text();
        
        // Dividimos por filas y eliminamos la primera (encabezados)
        const filas = csvText.split(/\r?\n/).slice(1); 
        const contenedor = document.getElementById('menu-container');
        contenedor.innerHTML = ""; 

        filas.forEach(fila => {
            // Separamos por comas, pero limpiamos espacios y comillas extras
            const columnas = fila.split(',').map(col => col.replace(/^"|"$/g, '').trim());
            const [nombre, precio, categoria, descripcion] = columnas;

            // Solo creamos el plato si tiene nombre y precio
            if (nombre && precio) {
                const htmlPlato = `
                    <section class="categoria-menu ${categoria.toLowerCase()}">
                        <div class="item-menu">
                            <div class="info">
                                <h3>${nombre}</h3>
                                <p class="precio">$${precio}</p>
                                ${descripcion ? `<small style="color:#888;">${descripcion}</small>` : ''}
                            </div>
                            <button class="btn-wa" onclick="pedirDirecto('${nombre}', '${precio}')">
                                Pedir
                            </button>
                        </div>
                    </section>
                `;
                contenedor.innerHTML += htmlPlato;
            }
        });

        // Por defecto, al cargar mostramos "Todos"
        filtrar('todos', { currentTarget: document.querySelector('.filtro-btn.activo') });

    } catch (error) {
        console.error("Error al conectar con el Menú Digital:", error);
    }
}

// Función para filtrar (Actualizada para trabajar con datos dinámicos)
function filtrar(categoria, evento) {
    const secciones = document.querySelectorAll('.categoria-menu');
    
    secciones.forEach(seccion => {
        if (categoria === 'todos') {
            seccion.style.display = 'block';
        } else {
            // Comprobamos si la sección contiene la clase de la categoría
            seccion.classList.contains(categoria) 
                ? seccion.style.display = 'block' 
                : seccion.style.display = 'none';
        }
    });

    // Estética de botones
    const botones = document.querySelectorAll('.filtro-btn');
    botones.forEach(btn => btn.classList.remove('activo'));
    if(evento) evento.currentTarget.classList.add('activo');
}

// Función de WhatsApp
function pedirDirecto(producto, precio) {
    const telefono = "584120000000"; // <--- PON AQUÍ EL NÚMERO DE LUNA CAFÉ
    const mensaje = `Hola Luna Café 👋, deseo consultar disponibilidad de: ${producto} ($${precio})`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Iniciar al cargar la web
window.onload = cargarMenu;
