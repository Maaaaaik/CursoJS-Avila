
fetch("./array.json")
    .then(response => response.json())
    .then(paises => programa(paises))

function programa(paises) {
    let totalViaje = []

    let equipajeMinimo = 2000
    let equipajeMedio = 3000
    let equipajeGrande = 4000

    let contadorEquipajeMinimo = 0
    let contadorEquipajeMedio = 0
    let contadorEquipajeGrande = 0

    let ticket = document.getElementById("ticket")
    let cantPasajeros = document.getElementById("numeroPasajeros")
    let contenedorDestinos = document.getElementById("containerDestinos")
    let selectorEquipajes = document.getElementById("selectorEquipaje")

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
            boton.removeEventListener("click",)
        })

    }
    function seleccionarPais(e) {
        let paisSeleccionado = paises.find(pais => pais.id == e.target.id)
        totalViaje.push(paisSeleccionado)
    }

    function preguntarCuantosPasajeros() {
        document.getElementById("pasajeros").style.display = "block"
        document.getElementById("cantPasajeros").style.display = "block"
    }

    cantPasajeros.addEventListener("input", formularioEquipaje)

    function formularioEquipaje(e) {
        let numeroDePasajeros = 0
        numeroDePasajeros = e.target.value
        document.getElementById("equipajes").style.display = "block"
        for (i = 1; i <= e.target.value; i++) {
            let selectores = document.createElement("div")
            selectores.id = "selector" + i
            selectores.className = "selectores"
            selectores.innerHTML = `
        <h3>Equipaje del pasajero ${i} </h3>
        <form>
        <select class="Tequipaje">
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
        totalViaje.push({ pasajeros: e.target.value })
        renderizarTotal(totalViaje)

        let seleccionar = document.getElementsByClassName("Tequipaje");
        for (const seleccion of seleccionar) {
            seleccion.addEventListener("change", seleccionado);
        }
        function seleccionado(e) {
            totalViaje.push({ equipaje: parseInt(e.target.value) })
            let cantDeEquipaje = totalViaje.slice(2, numeroDePasajeros + 1)
            console.log(cantDeEquipaje)
            let totalEquipajes = cantDeEquipaje.reduce((acumulador, valorActual) => acumulador + valorActual.equipaje, 0)
            console.log(totalEquipajes)
        }
    }

    function renderizarTotal(totalViaje) {
        document.getElementById("ticket").style.display = "block"
        for (const p of totalViaje) {
            ticket.innerHTML = `
        <div id=tickets>
        <h2>Precio final de tu vuelo</h2>
         <img src=Otros/${totalViaje.at(0).destino}.png>
          <p>${totalViaje.at(0).destino}</p>
          <p>$${totalViaje.at(0).valor}</p>
          <p>X ${totalViaje.at(1).pasajeros} pasajeros</p>
          <p>Equipaje</p
        </div>
         `
        }
    }
}



