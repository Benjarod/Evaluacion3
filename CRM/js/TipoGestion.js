var g_id_tipo_gestion = ""
//Función para agregar tipo de gestión
function agregarTipoGestion(){
  
    //Encabezado de la solicitud
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Carga útil de datos
var nombre_tipo_gestion = document.getElementById("TipoGestion").value
var fechaHoraActual = obtenerFechaHora();

if(nombre_tipo_gestion == ""){
  mostrarModalCampoVacio();
}
else{
const raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion,
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
fetch("http://144.126.210.74:8080/api/tipo_gestion", requestOptions)
  .then((response) => {
    if(response.status == 200){
      mostrarModalCodigo200Agregar()
          setTimeout(() => {
            location.href ="listar.html"
          },3000);
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}
}
function listarTipoGestion(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json)=> {
      json.forEach(completarFila);
      $(`#tbl_tipo_gestion`).DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro)
  arr[index] = document.querySelector("#tbl_tipo_gestion tbody").innerHTML +=
`<tr>
<td>${element.id_tipo_gestion}</td>
<td>${element.nombre_tipo_gestion}</td>
<td>${fechaHoraFormateada}</td>
<td><a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning'>Actualizar</a>
<a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger'>Eliminar</a></td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtener todos los parametros
  const parametros = new URLSearchParams(queryString);
  //Obtenemos el parametro en particular
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosActualizar(p_id_tipo_gestion);
}

function obtenerDatosActualizar(p_id_tipo_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFormulario(element,index,arr){
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('TipoGestion').value = nombre_tipo_gestion
}

function mostrarModalCampoVacio(){
  document.getElementById('staticBackdropLabel').innerHTML = "Error"
  document.getElementById('body-modal').innerHTML = "No se pueden ingresar campos vacios";
}

function mostrarModalCodigo200Actualizar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Tipo de gestion actualizada con exito"
}

function actualizarTipoGestion(){

  //Encabezado de la solicitud
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Carga útil de datos
var nombre_tipo_gestion = document.getElementById("TipoGestion").value
if(nombre_tipo_gestion==""){
  mostrarModalCampoVacio()
}
else{
const raw = JSON.stringify({
"nombre_tipo_gestion": nombre_tipo_gestion
});

//Opciones de solicitud
const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/tipo_gestion/"+g_id_tipo_gestion, requestOptions)
.then((response) => {
  if(response.status == 200){
    mostrarModalCodigo200Actualizar()
          setTimeout(() => {
            location.href ="listar.html"
          },3000);
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
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosEliminar(p_id_tipo_gestion);
}

function obtenerDatosEliminar(p_id_tipo_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiqueta(element,index,arr){
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('lbl_eliminar').innerHTML = '¿Desea eliminar tipo gestion <b>' + nombre_tipo_gestion + '</b>?';
}

function mostrarModalError400Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Error"
  document.getElementById('body-modal').innerHTML = "Se ha producido un error en la solicitud, el tipo de gestion debe estar ocupandose en alguna gestión.";
}

function mostrarModalCodigo200Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Solicitud realizada con exito"
}

function mostrarModalCodigo200Agregar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Tipo de gestion agregada correctamente"
}

function eliminarTipoGestion(){
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
fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
      .then((response) => {
        //cambiar a elemento de bootstrap
        if(response.status == 200){
          
          mostrarModalCodigo200Eliminar()
          setTimeout(() => {
            location.href ="listar.html"
          },3000);
        }
        if(response.status == 400){
          mostrarModalError400Eliminar();
        }
        

      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
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