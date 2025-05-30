document.getElementById('crearDuenioForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const correo = document.getElementById('correo');
    const telefono = document.getElementById('telefono');

    fetch('http://localhost:8080/api/duenios', {
        method: 'POST',
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
        return response.json();
    })
    .then(data => {
        console.log('Duenio creado:', data);
        alert('¡Dueño creado con éxito!');
        setTimeout(() => {
            window.location.href = '../'
        }, 3000)
    })
    .catch(error => {
        console.error('Error al crear el duenio:', error);
        alert('Error al crear el dueño: ' + error.message);
    });
});
