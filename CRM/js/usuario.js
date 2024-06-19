var g_id_usuario
//Función para agregar tipo de gestión
function agregarUsuario(){
    

    //Encabezado de la solicitud
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
//Carga útil de datos
var id_usuario = document.getElementById("txt_id_usuario").value
var dv = document.getElementById("txt_dv").value
var nombre = document.getElementById("txt_nombre").value
var apellido = document.getElementById("txt_apellido").value
var email = document.getElementById("txt_email").value
var celular = document.getElementById("txt_celular").value
var username = document.getElementById("txt_username").value
var password = document.getElementById("txt_password").value
var fechaHora = obtenerFechaHora()
if(id_usuario==""||dv==""||nombre==""||apellido==""||email==""||celular==""||username==""||password==""){
  mostrarModalCampoVacio()
}
else{
const raw = JSON.stringify({
  "id_usuario": id_usuario,
  "dv": dv,
  "nombres": nombre,
  "apellidos": apellido,
  "email": email,
  "celular": celular,
  "username": username,
  "password": password,
  "fecha_registro": fechaHora
});

//Opciones de solicitud
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
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
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json)=> {
      json.forEach(completarFila);
      $(`#tbl_usuario`).DataTable();
    } )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
  var fechaHoraFormateada = formatearFechaHora(element.fecha_registro)
  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
`<tr>
<td>${element.id_usuario}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${element.username}</td>
<td>${fechaHoraFormateada}</td>
<td><a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning'>Actualizar</a>
<a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger'>Eliminar</a></td>
</tr>`
}
function obtenerIdActualizar(){
  //obtener datos de la solicitud
  const queryString = window.location.search;
  //obtener todos los parametros
  const parametros = new URLSearchParams(queryString);
  //Obtenemos el parametro en particular
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);
}

function obtenerDatosActualizar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFormulario(element,index,arr){
  var nombre_usuario = element.nombres;
  document.getElementById('Nombre_usuario').value = nombre_usuario
  var apellido_usuario = element.apellidos;
  document.getElementById('Apellido_usuario').value = apellido_usuario
  var Email = element.email;
  document.getElementById('Email').value = Email
  var Celular = element.celular;
  document.getElementById('Celular').value = Celular
  var Username = element.username;
  document.getElementById('Username').value = Username
  var Password = element.password;
  document.getElementById('Password').value = Password
}
function actualizarUsuario(){

  //Encabezado de la solicitud
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//Carga útil de datos

var nombre = document.getElementById("Nombre_usuario").value
var apellido = document.getElementById("Apellido_usuario").value
var email = document.getElementById("Email").value
var celular = document.getElementById("Celular").value
var username = document.getElementById("Username").value
var password = document.getElementById("Password").value

if(nombre==""||apellido==""||email==""||celular==""||username==""||password==""){
  mostrarModalCampoVacio()
}
else{
const raw = JSON.stringify({
"nombres": nombre,
"apellidos": apellido,
"email": email,
"celular": celular,
"username": username,
"password": password
});

//Opciones de solicitud
const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

//Ejecutamos solicitud
fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
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
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);
}

function obtenerDatosEliminar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json)=> json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiqueta(element,index,arr){
  var nombre_usuario = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML = '¿Desea eliminar este usuario <b>' + nombre_usuario + '</b>?';
}



function eliminarUsuario(){
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
fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
.then((response) => {
  if(response.status == 200){
    mostrarModal200Eliminar()
          setTimeout(() => {
            location.href ="listar.html"
          },3000);
  }
  if(response.status == 400){
    mostrarModalError400Eliminar()
  }
})
.then((result) => console.log(result))
.catch((error) => console.error(error));
}

//Alerta Modal Bootstrap
function mostrarModalError400Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se puede eliminar"
  document.getElementById('body-modal').innerHTML = "El usuario debe estar ocupandose en una gestión.";
}

function mostrarModal200Eliminar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Eliminado correctamente"
  document.getElementById('body-modal').innerHTML = "Usuario eliminado :D.";
}

function mostrarModalCodigo200Actualizar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "usuario actualizado con exito"
}

function mostrarModalError400Actualizar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se pudo actualizar"
  document.getElementById('body-modal').innerHTML = "El usuario no se pudo actualizar";
}

function mostrarModalCampoVacio(){
  document.getElementById('staticBackdropLabel').innerHTML = "Error"
  document.getElementById('body-modal').innerHTML = "No se pueden ingresar campos vacios";
}

function mostrarModalCodigo200Agregar(){
  document.getElementById('staticBackdropLabel').innerHTML = "Completado"
  document.getElementById('body-modal').innerHTML = "Usuario agregado correctamente"
}

function mostrarModalError400Agregar(){
  document.getElementById('staticBackdropLabel').innerHTML = "No se puede agregar el usuario"
  document.getElementById('body-modal').innerHTML = "Puede que el rut esté repetido...";
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