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
