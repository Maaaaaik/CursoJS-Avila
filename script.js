
fetch("./array.json")
    .then(response => response.json())
    .then(paises => programa(paises))

function programa(paises) {
    let totalViaje = []

    let equipajeMinimo = 2599
    let equipajeMedio = 3599
    let equipajeGrande = 4599

    let ticket = document.getElementById("ticket")
    let cantPasajeros = document.getElementById("numeroPasajeros")
    let contenedorDestinos = document.getElementById("containerDestinos")
    let selectorEquipajes = document.getElementById("selectorEquipaje")
    let botonFinal = document.getElementById("mascaraBoton")

    for (const pais of paises) {
        let tarjetasDestino = document.createElement("div")
        tarjetasDestino.className = "destino"
        tarjetasDestino.id = "pais" + pais.id
        tarjetasDestino.innerHTML = `
    <img src="Otros/${pais.destino}.png">
    <h4> ${pais.destino} </h4>
    <p>Desde $ ${pais.valor} </p>
    <input id= ${pais.id} class="boton btn-grad" type=button value=Seleccionar>
    `
        contenedorDestinos.append(tarjetasDestino)
    }
    let botones = document.getElementsByClassName("boton")
    for (const boton of botones) {
        boton.addEventListener("click", seleccionarPais)
        boton.addEventListener("click", preguntarCuantosPasajeros)
        boton.addEventListener("click", () => {
            Toastify({
                text: "Destino seleccionado correctamente!",
                duration: 3000,
                gravity: "top",
                position: "right",
                stopOnFocus: true
            }).showToast()
            boton.removeEventListener("click", seleccionarPais)
        })

    }
    function seleccionarPais(e) {
        let paisSeleccionado = paises.find(pais => pais.id == e.target.id)
        totalViaje.push(paisSeleccionado)
        let paisSeleccionadoEnJSON = JSON.stringify(paisSeleccionado)
        localStorage.setItem("pais", paisSeleccionadoEnJSON)
    }

    function preguntarCuantosPasajeros() {
        document.getElementById("pasajeros").style.display = "block"
        document.getElementById("cantPasajeros").style.display = "block"
    }

    cantPasajeros.addEventListener("input", formularioEquipaje)

    function formularioEquipaje(e) {
        let numeroDePasajeros = 0
        numeroDePasajeros = e.target.value
        localStorage.setItem("pasajeros", numeroDePasajeros)
        document.getElementById("equipajes").style.display = "block"
        for (i = 1; i <= e.target.value; i++) {
            let selectores = document.createElement("div")
            selectores.id = "selector" + i
            selectores.className = "selectores"
            selectores.innerHTML = `
        <h3>Equipaje del pasajero ${i} </h3>
        <form>
        <select class="Tequipaje" id="${i}">
        <option> Selecconar </option>
        <option value=${equipajeMinimo}>Minimo</option>
        <option value=${equipajeMedio}>Medio</option>
        <option value=${equipajeGrande}>Grande</option>
        </select>
        </form>
        `
            selectorEquipajes.append(selectores)
        }
        cantPasajeros.removeEventListener("input", formularioEquipaje)
        totalViaje.push({ pasajeros: parseInt(e.target.value) })

        let cuenta = 0
        let seleccionar = document.getElementsByClassName("Tequipaje");
        for (const seleccion of seleccionar) {
            seleccion.addEventListener("input", seleccionado);
            if (cuenta >= totalViaje.at(1).pasajeros) {
                seleccionar.removeEventListener("input", seleccionado)
            }
        }


        function seleccionado(e) {
            cuenta++
            totalViaje.push({ equipaje: parseInt(e.target.value), id: parseInt(e.target.id) })
            console.log(totalViaje)
            let cantDeEquipaje = totalViaje.slice(2, numeroDePasajeros + 1)
            let totalEquipajes = cantDeEquipaje.reduce((acumulador, valorActual) => acumulador + valorActual.equipaje, 0)
            if (cuenta >= totalViaje.at(1).pasajeros) {
                totalViaje.push({ totalEquipaje: totalEquipajes })
                localStorage.setItem("total equipaje", totalEquipajes)
                document.getElementById("mascaraBoton").style.display = "block"

            }
            renderizarTotal(totalViaje)
        }
        renderizarTotal(totalViaje)
    }

    botonFinal.addEventListener("click", success)

    function success() {
        Swal.fire({
            title: '¡Muy bien!',
            text: 'Compra del pasaje realizada con exito',
            iconColor: '#019199',
            imageUrl: 'Otros/aeroplano.png',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#85f9ff'
        })
    }
    function renderizarTotal(totalViaje) {
        document.getElementById("ticket").style.display = "block"
        for (const p of totalViaje) {
            ticket.innerHTML = `
        <div id=tickets>
        <h2>Precio final de tu vuelo</h2>
         <img src=Otros/${totalViaje.at(0).destino}.png>
          <p>${totalViaje.at(0).destino}</p>
          <p>$${totalViaje.at(0).valor}
          x ${totalViaje.at(1).pasajeros} pasajeros</p>
          <p>Total del equipaje seleccionado: $${totalViaje.at(-1).totalEquipaje}</p>
          <h3> TOTAL: $${(totalViaje.at(0).valor * totalViaje.at(1).pasajeros) + totalViaje.at(-1).totalEquipaje}</h3>
        </div>
         `
        }
    }
}






