var g_id_resultado = ""
//Función para agregar tipo de gestión
function agregarResultado(){
    
    //Encabezado de la solicitud
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Carga útil de datos
var nombre_resultado = document.getElementById("Resultado").value
var fechaHoraActual = obtenerFechaHora();

if (nombre_resultado == ""){
  mostrarModalCampoVacio();
}
else{
  const raw = JSON.stringify({
    "nombre_resultado": nombre_resultado,
    "fecha_registro": fechaHoraActual
  });

  //Opciones de solicitud
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  //Ejecutamos solicitud
  fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
    .then((response) => {
      if(response.status == 200){
        mostrarModalCodigo200Agregar()
          setTimeout(() => {
            location.href ="listar.html"
          },3000);
      }
      if(response.status == 400){
        mostrarModalError400Agregar();
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  }
}
function listarResultado(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json)=> {
      json.forEach(completarFila);
      $(`#tbl_resultado`).DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro)
  arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML +=
`<tr>
<td>${element.id_resultado}</td>
<td>${element.nombre_resultado}</td>
<td>${fechaHoraFormateada}</td>
<td><a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning'>Actualizar</a>
<a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger'>Eliminar</a></td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtener todos los parametros
  const parametros = new URLSearchParams(queryString);
  //Obtenemos el parametro en particular
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosActualizar(p_id_resultado);
}

function obtenerDatosActualizar(p_id_resultado){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFormulario(element,index,arr){
  var nombre_resultado = element.nombre_resultado;
  document.getElementById('Resultado').value = nombre_resultado
}
function actualizarResultado(){

  //Encabezado de la solicitud
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Carga útil de datos
var nombre_resultado = document.getElementById("Resultado").value
if(nombre_resultado==""){
  mostrarModalCampoVacio()
}
else{
const raw = JSON.stringify({
"nombre_resultado": nombre_resultado
});

//Opciones de solicitud
const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
.then((response) => {
  if(response.status == 200){
    mostrarModalCodigo200Actualizar()
          setTimeout(() => {
            location.href ="listar.html"
          },3000);
  }
  if(response.status == 400){
    mostrarModalError400Actualizar();
  }
})
.then((result) => console.log(result))
.catch((error) => console.error(error));

}
}
function obtenerIdEliminar(){
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtener todos los parametros
  const parametros = new URLSearchParams(queryString);
  //Obtenemos el parametro en particular
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosEliminar(p_id_resultado);
}

function obtenerDatosEliminar(p_id_resultado){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiqueta(element,index,arr){
  var nombre_resultado = element.nombre_resultado;
  document.getElementById('lbl_eliminar').innerHTML = '¿Desea eliminar el resultado: <b>' + nombre_resultado + '</b>?';
}
function eliminarResultado(){
  //Encabezado de la solicitud
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Opciones de solicitud
const requestOptions = {
method: "DELETE",
headers: myHeaders,
redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_resultado, requestOptions)
      .then((response) => {
        //cambiar a elemento de bootstrap
        if(response.status == 200){
          mostrarModal200Eliminar()
          setTimeout(() => {
            location.href ="listar.html"
          },3000);
        }
        if(response.status == 400)
          mostrarModalError400Eliminar();

      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

function mostrarModalCampoVacio(){
  document.getElementById('staticBackdropLabel').innerHTML = "Error"
  document.getElementById('body-modal').innerHTML = "No se pueden ingresar campos vacios";
}

function mostrarModalCodigo200Actualizar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Resultado actualizado con exito."
}

function mostrarModalError400Actualizar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se pudo actualizar"
  document.getElementById('body-modal').innerHTML = "El resultado no se pudo actualizar";
}

function mostrarModalError400Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se puede eliminar"
  document.getElementById('body-modal').innerHTML = "El resultado debe estar ocupandose en una gestión.";
}

function mostrarModal200Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Eliminado correctamente"
  document.getElementById('body-modal').innerHTML = "resultado eliminado :D.";
}

function mostrarModalCodigo200Agregar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Resultado agregado correctamente"
}

function mostrarModalError400Agregar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Error"
  document.getElementById('body-modal').innerHTML = "No se pudo agregar el resultado";
}

function obtenerFechaHora(){
  var fecha_hora_Actual = new Date();//obtiene la fecha y hora actual del sistema
  var fecha_hora_formateada = fecha_hora_Actual.toLocaleString('es-ES',{
    hour12 :false,
    year:'numeric', 
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
  return fecha_hora_formateada;
}
//despues de obtener la fecha arriba, se formatea para que sea legible en la pagina (eliminar "T" y "Z").
function formatearFechaHora(fecha_registro){
  var fecha_hora_Actual = new Date(fecha_registro);//te genera un objeto de la clase fecha para ese parametro
  var fecha_hora_formateada = fecha_hora_Actual.toLocaleString('es-ES',{
    hour12 :false,
    year:'numeric', 
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    timeZone: 'UTC'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
  return fecha_hora_formateada;
}