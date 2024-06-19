var g_id_gestion = " "
//Función para agregar tipo de gestión
function agregarGestion(){
  
    //Encabezado de la solicitud
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Carga útil de datos
var id_usuario = document.getElementById("sel_id_usuario").value
var id_cliente = document.getElementById("sel_id_cliente").value
var id_tipo_gestion = document.getElementById("sel_id_tipo_gestion").value
var id_resultado = document.getElementById("sel_id_resultado").value
var comentarios = document.getElementById("txt_comentarios").value
var fechaHoraActual = obtenerFechaHora();

if(id_usuario==""||id_cliente==""||id_tipo_gestion==""||id_resultado==""||comentarios==""){
  mostrarModalCampoVacio();
}
else{
const raw = JSON.stringify({
  "id_usuario": id_usuario,
  "id_cliente": id_cliente,
  "id_tipo_gestion": id_tipo_gestion,
  "id_resultado": id_resultado,
  "comentarios": comentarios,
  "fecha_registro":fechaHoraActual
});

//Opciones de solicitud
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/gestion", requestOptions)
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

function listarGestion(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify({
"query": "select ges.id_gestion as id_gestion,cli.id_cliente, ges.comentarios as comentarios,CONCAT(cli.nombres, ' ',cli.apellidos) as nombre_cliente,CONCAT(usu.nombres,' ' ,usu.apellidos) as nombre_usuario,tge.nombre_tipo_gestion as nombre_tipo_gestion,res.nombre_resultado as nombre_resultado,ges.fecha_registro as fecha_registro from gestion ges,usuario usu,cliente cli,tipo_gestion tge,resultado res where ges.id_usuario = usu.id_usuario and ges.id_cliente = cli.id_cliente and ges.id_tipo_gestion = tge.id_tipo_gestion and ges.id_resultado = res.id_resultado "
});
var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};
fetch("http://144.126.210.74:8080/dynamic", requestOptions)
.then(response => response.json())
.then((json) => {
    json.forEach(completarFila)
    $(`#tbl_gestion`).DataTable();
})
.then(result => console.log(result))
.catch(error => console.log('error', error));

}
function completarFila(element,index,arr){
  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro)
  arr[index] = document.querySelector("#tbl_gestion tbody").innerHTML +=
`<tr>
<td>${element.id_gestion}</td>
<td>${element.nombre_usuario}</td>
<td>${element.nombre_cliente}</td>
<td>${element.nombre_tipo_gestion}</td>
<td>${element.nombre_resultado}</td>
<td>${element.comentarios}</td>
<td>${fechaHoraFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_gestion}' class='btn btn-warning'>Actualizar</a>
<a href='eliminar.html?id=${element.id_gestion}' class='btn btn-danger'>Eliminar</a></td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtener todos los parametros
  const parametros = new URLSearchParams(queryString);
  //Obtenemos el parametro en particular
  const p_id_gestion = parametros.get('id');
  g_id_gestion = p_id_gestion;
  obtenerDatosActualizar(p_id_gestion);
}

function obtenerDatosActualizar(p_id_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/gestion/"+p_id_gestion, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFormulario(element,index,arr){
    //Carga útil de datos
  var id_usuario = element.id_usuario;
  var id_cliente = element.id_cliente;
  var id_tipo_gestion = element.id_tipo_gestion;
  var id_resultado = element.id_resultado;
  var comentarios = element.comentarios

  document.getElementById("sel_id_usuario").value = id_usuario;
  document.getElementById("sel_id_cliente").value = id_cliente;
  document.getElementById("sel_id_tipo_gestion").value = id_tipo_gestion;
  document.getElementById("sel_id_resultado").value = id_resultado;
  document.getElementById("txt_comentarios").value = comentarios;
  cargarListasDesplegables();
}
function actualizarGestion(){

  //Encabezado de la solicitud
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Carga útil de datos
var id_usuario = document.getElementById('sel_id_usuario').value;
var id_cliente = document.getElementById('sel_id_cliente').value;
var id_tipo_gestion = document.getElementById('sel_id_tipo_gestion').value;
var id_resultado = document.getElementById('sel_id_resultado').value;
var comentarios = document.getElementById('txt_comentarios').value;
if(id_usuario==""||id_cliente==""||id_tipo_gestion==""||id_resultado==""||comentarios==""){
  mostrarModalCampoVacio();
}
else{
const raw = JSON.stringify({
"id_usuario": id_usuario,
"id_cliente": id_cliente,
"id_tipo_gestion": id_tipo_gestion,
"id_resultado": id_resultado,
"comentarios": comentarios
});

//Opciones de solicitud
const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/gestion/"+g_id_gestion, requestOptions)
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
  const p_id_gestion = parametros.get('id');
  g_id_gestion = p_id_gestion;
  obtenerDatosEliminar(p_id_gestion);
}

function obtenerDatosEliminar(p_id_gestion){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/gestion/"+p_id_gestion, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiqueta(element,index,arr){
  //var id_cliente = element.id_cliente;
  //var id_usuario = element.nombre_usuario;
  //var id_tipo_gestion = element.nombre_tipo_gestion;
  //var id_resultado = element.nombre_resultado;
  var comentarios = element.comentarios
  document.getElementById('lbl_eliminar').innerHTML = '¿Desea eliminar la gestion con comentario: <b>' + comentarios + '</b>?'
}
function eliminarGestion(){
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
fetch("http://144.126.210.74:8080/api/gestion/"+g_id_gestion, requestOptions)
.then((response) => {
  if(response.status == 200){
    mostrarModal200Eliminar()
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

function CargarSelectResultado(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json)=> {
      json.forEach(completarOptionResultado);
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarOptionResultado(element,index,arr){
  arr[index] = document.querySelector("#sel_id_resultado").innerHTML +=
  `<option value='${element.id_resultado}'> ${element.nombre_resultado} </option>`
}

function CargarSelectCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json)=> {
      json.forEach(completarOptionCliente);
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarOptionCliente(element,index,arr){
  arr[index] = document.querySelector("#sel_id_cliente").innerHTML +=
`<option value='${element.id_cliente}'> ${element.apellidos},${element.nombres} </option>`
}

function CargarSelectUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json)=> {
      json.forEach(completarOptionUsuario);
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarOptionUsuario(element,index,arr){
  arr[index] = document.querySelector("#sel_id_usuario").innerHTML +=
`<option value='${element.id_usuario}'> ${element.apellidos},${element.nombres} </option>`
}

function CargarSelectTipoGestion(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json)=> {
      json.forEach(completarOptionTipoGestion);
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarOptionTipoGestion(element,index,arr){
  arr[index] = document.querySelector("#sel_id_tipo_gestion").innerHTML +=
`<option value='${element.id_tipo_gestion}'> ${element.nombre_tipo_gestion}</option>`
}

function cargarListasDesplegables(){
  CargarSelectResultado();
  CargarSelectCliente();
  CargarSelectUsuario();
  CargarSelectTipoGestion();

}

//Alerta Modal Bootstrap

function mostrarModalCampoVacio(){
  document.getElementById('staticBackdropLabel').innerHTML = "Error"
  document.getElementById('body-modal').innerHTML = "No se pueden ingresar campos vacios.";
}

function mostrarModalCodigo200Agregar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Gestion agregada correctamente."
}

function mostrarModalError400Agregar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Error"
  document.getElementById('body-modal').innerHTML = "No se ha podido agregar la gestión.";
}

function mostrarModalError400Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se puede eliminar"
  document.getElementById('body-modal').innerHTML = "La gestión no se pudo eliminar";
}

function mostrarModal200Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Eliminado correctamente"
  document.getElementById('body-modal').innerHTML = "Gestión eliminada :D.";
}

function mostrarModalCodigo200Actualizar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Gestión actualizada con exito."
}

function mostrarModalError400Actualizar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se pudo actualizar"
  document.getElementById('body-modal').innerHTML = "La gestion no se pudo actualizar";
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