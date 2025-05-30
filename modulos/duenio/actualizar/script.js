const mensaje = document.getElementById('mensaje');
const id = sessionStorage.getItem('idDuenio');

if (id) {
    fetch(`http://localhost:8080/api/duenios/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener los datos del dueño');
            return response.json();
        })
        .then(data => {
            document.getElementById('duenioId').value = id;
            document.getElementById('nombre').value = data.nombre ?? '';
            document.getElementById('apellidos').value = data.apellidos ?? '';
            document.getElementById('correo').value = data.correo ?? '';
            document.getElementById('telefono').value = data.telefono ?? '';
        })
        .catch(error => {
            console.error("Error al obtener el dueño:", error);
            mostrarMensaje('No se pudo cargar el dueño.', 'mensaje-error');
        });
}

document.getElementById('actualizarDuenioForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('duenioId').value;
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;

    fetch(`http://localhost:8080/api/duenios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellidos, correo, telefono })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
        return response.text();
    })
    .then(() => {
        mostrarMensaje('Dueño actualizado con éxito. Serás redirigido a la Lista de Usuarios.', 'mensaje-exito');
        sessionStorage.removeItem('idDuenio');
        setTimeout(() => {
            window.location.href = '../lista/';
        }, 3000);
    })
    .catch(error => {
        console.error("Error al actualizar el dueño:", error);
        mostrarMensaje('Error al actualizar.', 'mensaje-error');
    });
});

document.getElementById('cancelar').addEventListener('click', () => {
    window.location.href = '../lista/';
});

function mostrarMensaje(texto, claseCSS) {
    mensaje.textContent = texto;
    mensaje.className = claseCSS;
    mensaje.style.display = 'block';
}
