const BV = {id: 0, destino:"Bolivia", valor: 8000}
const CH = {id: 1, destino:"Chile" ,valor: 9200}
const MX = {id: 2, destino:"Mexico" ,valor: 40000}
const BR = {id: 3, destino:"Brasil" ,valor: 20000}
const VZ = {id: 4, destino:"Venezuela",valor: 20000}
const UGY = {id: 5, destino:"Uruguay" ,valor: 8000}

let paises = [BV, CH, MX, BR , VZ, UGY]
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
    tarjetasDestino.id = "pais"+pais.id
    tarjetasDestino.innerHTML = `
    <img>
    <h4> ${pais.destino} </h4>
    <p>desde $ ${pais.valor} </p>
    <input id= ${pais.id} class=boton type=button value=Seleccionar>
    `
    contenedorDestinos.append(tarjetasDestino)
}
let botones = document.getElementsByClassName("boton")
  for (const boton of botones) {
    boton.addEventListener("click", seleccionarPais)
    boton.addEventListener("click", preguntarCuantosPasajeros)
  }
function seleccionarPais(e) {
    let paisSeleccionado = paises.find(pais => pais.id == e.target.id)
    totalViaje.push(paisSeleccionado)
    renderizarTotal(totalViaje)
  }

function preguntarCuantosPasajeros() {
    document.getElementById("pasajeros").style.display = "block"
    document.getElementById("cantPasajeros").style.display = "block"
}


cantPasajeros.addEventListener("change", formularioEquipaje)


function formularioEquipaje(e){
    document.getElementById("equipajes").style.display = "block"
    for (i=1; i <= e.target.value; i++){
        let selectores = document.createElement("div")
        selectores.id = "selector" + i
        selectores.className = "selectores"
        selectores.innerHTML = `
        <h3>Equipaje del pasajero ${ i } </h3>
        <select id="tamañoEquipaje" name="simple">
        <option selected>Minimo</option>
        <option>Medio</option>
        <option>Grande</option>
        </select>
        `
        selectorEquipajes.append(selectores)
    } 

    totalViaje.push({pasajeros: e.target.value})
    console.log(totalViaje)
    console.log(totalViaje.at(1).pasajeros)
    }
   

function renderizarTotal(arrayDelTotal) {
    for (const p of arrayDelTotal) {
      ticket.innerHTML = `
        <div id=ticket>
        <h2>Precio final de tu vuelo</h2>
         <img src=${p.img}>
          <p>${p.destino}</p>
          <p>${p.valor}</p>
          <p>X ${totalViaje.at(1).pasajeros} </p>
        </div>
         `
    }
}

/* function calcularEquipaje() {
    return (contadorEquipajeGrande * equipajeGrande + contadorEquipajeMedio * equipajeMedio + contadorEquipajeMinimo * equipajeMinimo)
}

function precioFinal() {
    return ((totalViaje.hacia * pasajeros + calcularEquipaje()) * 1.21)
}





if (pasajeros > 1) {
    for (let i = 1; i <= pasajeros; i++) {

        let equipaje = ""

        switch (equipaje) {
            case "minimo":
                contadorEquipajeMinimo++
                break
            case "medio":
                contadorEquipajeMedio++
                break
            case "grande":
                contadorEquipajeGrande++
                break
        }
    } 
} else {
    let equipaje = hh
    switch (equipaje) {
        case "minimo":
            contadorEquipajeMinimo++
            break
        case "medio":
            contadorEquipajeMedio++
            break
        case "grande":
            contadorEquipajeGrande++
           break
    }
}




// alert("el precio final de su vuelo seria de $" + precioFinal() + "\n" + "\n" + "DESGLOSE:" + "\n" + "\n" + "Pasaje basico por " + pasajeros + " pasajero/s =  $" + hacia * pasajeros + "\n" + "Equipaje agregado por " + pasajeros + " pasajero/s  =  $" + calcularEquipaje() + "\n" + "Impuesto IVA" + "\n" + "\n" + "Muchas gracias por elegirnos!") //
 */