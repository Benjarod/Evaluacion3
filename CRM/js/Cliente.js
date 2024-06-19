var g_id_cliente = ""
//Funcion para agregar cliente
function agregarCliente(){

var id_cliente = document.getElementById("txt_id_cliente").value
var dv = document.getElementById("txt_dv").value
var nombre = document.getElementById("txt_nombre").value
var apellido = document.getElementById("txt_apellido").value
var email = document.getElementById("txt_email").value
var celular = document.getElementById("txt_celular").value
var fechaHoraActual = obtenerFechaHora();

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
if(id_cliente==""||dv==""||nombre==""||apellido==""||email==""||celular==""){
  mostrarModalCampoVacio()
}
else{
const raw = JSON.stringify({
  "id_cliente": id_cliente,
  "dv": dv,
  "nombres": nombre,
  "apellidos": apellido,
  "email": email,
  "celular": celular,
  "fecha_registro": fechaHoraActual
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
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
function listarClientes(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json)=> {
      json.forEach(completarFila);
      $('#tbl_clientes').DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro)
  arr[index] = document.querySelector("#tbl_clientes tbody").innerHTML +=
`<tr>
<td>${element.id_cliente}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${fechaHoraFormateada}</td>
<td><a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning'>Actualizar</a>
<a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger'>Eliminar</a></td>
</tr>`
}

function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtener todos los parametros
  const parametros = new URLSearchParams(queryString);
  //Obtenemos el parametro en particular
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosActualizar(p_id_cliente);
}

function obtenerDatosActualizar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFormulario(element,index,arr){
  var id_cliente = element.id_cliente;
  document.getElementById('txt_id_cliente').value = id_cliente;
  var dv = element.dv;
  document.getElementById('txt_dv').value = dv;
  var nombre_cliente = element.nombres;
  document.getElementById('txt_nombre').value = nombre_cliente;
  var apellido_cliente = element.apellidos;
  document.getElementById('txt_apellido').value = apellido_cliente;
  var email = element.email;
  document.getElementById('txt_email').value = email;
  var celular = element.celular;
  document.getElementById('txt_celular').value = celular
}
function actualizarCliente(){

  //Encabezado de la solicitud
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var id_cliente = document.getElementById("txt_id_cliente").value
var dv = document.getElementById("txt_dv").value
var nombre = document.getElementById("txt_nombre").value
var apellido = document.getElementById("txt_apellido").value
var email = document.getElementById("txt_email").value
var celular = document.getElementById("txt_celular").value

if(id_cliente==""||dv==""||nombre==""||apellido==""||email==""||celular==""){
  mostrarModalCampoVacio()
}
else{
//Carga útil de datos
const raw = JSON.stringify({
"id_cliente": id_cliente,
"dv": dv,
"nombres": nombre,
"apellidos": apellido,
"email": email,
"celular": celular
});

//Opciones de solicitud
const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
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
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(p_id_cliente);
}

function obtenerDatosEliminar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiqueta(element,index,arr){
  var nombre_cliente = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML = '¿Desea eliminar el cliente: <b>' + nombre_cliente + '</b>?';
}

function eliminarCliente(){
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
fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
      .then((response) => {
        //cambiar a elemento de bootstrap
        if(response.status == 200){
          location.href ="listar.html",
          setTimeout(function(){
            mostrarModal200Eliminar()()
          },3000);
        }
        if(response.status == 400){
          mostrarModalError400Eliminar();
        }
        

      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

//Alerta Modal Bootstrap
function mostrarModalCampoVacio(){
  document.getElementById('staticBackdropLabel').innerHTML = "Error"
  document.getElementById('body-modal').innerHTML = "No se pueden ingresar campos vacios";
}

function mostrarModalError400Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se puede eliminar"
  document.getElementById('body-modal').innerHTML = "El cliente debe estar ocupandose en una gestión.";
}

function mostrarModal200Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Eliminado correctamente"
  document.getElementById('body-modal').innerHTML = "Cliente eliminado :D.";
}

function mostrarModalCodigo200Agregar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Cliente agregado correctamente"
}

function mostrarModalError400Agregar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se puede agregar el Cliente"
  document.getElementById('body-modal').innerHTML = "Puede que el rut esté repetido...";
}

function mostrarModalCodigo200Actualizar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Cliente actualizado con exito"
}

function mostrarModalError400Actualizar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se pudo actualizar"
  document.getElementById('body-modal').innerHTML = "El cliente no se pudo actualizar";
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