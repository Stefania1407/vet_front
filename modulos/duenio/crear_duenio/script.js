document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('crearDuenioForm');
    const mensaje = document.getElementById('mensaje');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        // Limpiar mensaje previo
        ocultarMensaje();

        // Validación básica de teléfono
        if (!/^\d{7,15}$/.test(telefono)) {
            mostrarMensaje("⚠️ El teléfono debe tener solo números y entre 7 y 15 dígitos.", "mensaje-advertencia");
            return;
        }

        // Enviar datos
        fetch('http://localhost:8080/api/duenios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellidos, correo, telefono })
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(() => {
                    throw new Error("❌ No se pudo registrar el dueño. Verifica los datos.");
                });
            }
            return response.json();
        })
        .then(() => {
            mostrarMensaje("✅ ¡Dueño creado con éxito!", "mensaje-exito");
            setTimeout(() => window.location.href = '../', 3000);
        })
        .catch(error => {
            console.error("Error:", error);
            mostrarMensaje(error.message, "mensaje-error");
        });
    });

    function mostrarMensaje(texto, clase) {
        mensaje.textContent = texto;
        mensaje.className = clase;
        mensaje.style.display = 'block';
    }

    function ocultarMensaje() {
        mensaje.textContent = '';
        mensaje.className = '';
        mensaje.style.display = 'none';
    }
});
