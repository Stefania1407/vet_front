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
                    <button onclick="editarDuenio(${duenio.id_dueño})">Editar</button>
                `;
                lista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista:', error);
            mensaje.textContent = 'No se pudo cargar la lista de dueños.';
        });
});

function editarDuenio(id) {
    window.location.href = '../actualizar/index.html?id=' + id;
}
