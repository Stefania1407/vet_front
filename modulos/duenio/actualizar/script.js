const id = new URLSearchParams(window.location.search).get('id');

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
            document.getElementById('mensaje').textContent = 'No se pudo cargar el dueño.';
        });
}

document.getElementById('actualizarDuenioForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('duenioId').value;
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const correo = document.getElementById('correo');
    const telefono = document.getElementById('telefono');

    fetch(`http://localhost:8080/api/duenios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value,
            apellidos: apellidos.value,
            correo: correo.value,
            telefono: telefono.value
        })
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
        document.getElementById('mensaje').textContent = 'Dueño actualizado con éxito.';
    })
    .catch(error => {
        console.error("Error al actualizar el dueño:", error);
        document.getElementById('mensaje').textContent = 'Error al actualizar.';
    });
});
