document.addEventListener('DOMContentLoaded', function () {
    const lista = document.getElementById('lista-duenios');
    const mensaje = document.getElementById('mensaje');

    fetch('http://localhost:8080/api/duenios')
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener los datos");
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                lista.innerHTML = '<li>No hay dueños registrados.</li>';
                return;
            }

            data.forEach(duenio => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="info">
                        <h2>${duenio.nombre ?? 'Sin nombre'} ${duenio.apellidos ?? ''}</h2>
                        <p>${duenio.correo ?? 'Correo no registrado'} — ${duenio.telefono ?? 'Teléfono no registrado'}</p>
                    </div>
                    <div class="acciones">
                        <button class="editar-btn" onclick="editarDuenio(${duenio.id_dueño})">Editar</button>
                        <button class="eliminar-btn" onclick="eliminarDuenio(${duenio.id_dueño})">Eliminar</button>
                    </div>
                `;
                lista.appendChild(li);
            })
        })
        .catch(error => {
            console.error('Error al obtener la lista:', error);
            mensaje.textContent = 'No se pudo cargar la lista de dueños.';
        });
});

function editarDuenio(id) {
    sessionStorage.setItem('idDuenio', id);
    window.location.href = '../actualizar/';
}

function eliminarDuenio(id) {
    const confirmado = confirm("¿Estás seguro que deseas eliminar este dueño?");
    if (!confirmado) return;

    fetch(`http://localhost:8080/api/duenios/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al eliminar");
        location.reload();
    })
    .catch(error => {
        console.error("Error al eliminar:", error);
        alert("Ocurrió un error al intentar eliminar el dueño.");
    });
}