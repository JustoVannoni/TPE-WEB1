function loadpage(){
  "use strict";
  const urlapi="https://web-unicen.herokuapp.com/api/groups/092justovalentin/productos/";
  //declaro los objetos que voy a enviar a la api
  let info_tabla = {
    "thing" : {
    "nombre_del_producto": "Notebook HP",
    "modelo_del_producto": "6FU25LT",
    "valor_del_producto": "$34.999"
  }};
  let info_tabla1 = {
    "thing" : {
    "nombre_del_producto": "Notebook Asus",
    "modelo_del_producto": "X543MA-GQ495",
    "valor_del_producto": "$41.999"
  }};
  let info_tabla2 = {
    "thing" : {
    "nombre_del_producto": "Notebook MSI",
    "modelo_del_producto": "GL73 8SD-297US",
    "valor_del_producto": "$176.999"
  }};
  let info_tabla3 = {
    "thing" : {
    "nombre_del_producto": "Pendrive Kingston",
    "modelo_del_producto": "SE9",
    "valor_del_producto": "$539"
  }};
  let info_tabla4 = {
    "thing" : {
    "nombre_del_producto": "Disco duro externo Western Digital",
    "modelo_del_producto": "WDBUZG0010BBK",
    "valor_del_producto": "$4.379"
  }};
  let info_tabla5 = {
    "thing" : {
    "nombre_del_producto": "SSD Kingston",
    "modelo_del_producto": "SA400S37/240G",
    "valor_del_producto": "$4.139"
  }};
  let info_tabla6 = {
    "thing" : {
    "nombre_del_producto": "Router TP-Link",
    "modelo_del_producto": "TL-WR840N	",
    "valor_del_producto": "$1.440"
  }};
  let info_tabla7 = {
    "thing" : {
    "nombre_del_producto": "Router Mercusys",
    "modelo_del_producto": "MW325R",
    "valor_del_producto": "$1.120"
  }};
  let info_tabla8 = {
    "thing" : {
    "nombre_del_producto": "Router Nexxt Solutions",
    "modelo_del_producto": "ARN02304U6",
    "valor_del_producto": "$1.399"
  }};
  //enviado se encarga de notificar al cliente que cargo efectivamente los datos en la api
let enviado = document.getElementById("enviado");
// esta funcion me va a servir para insertar los datos de la tabla en la misma
let tabla = document.getElementById("Tabla");
 //creo una funcion que me cargue el primer td
  
 function crear_td_nombre(vacio) {
  let celda = document.createElement('td');
  celda.setAttribute("class", "columna1");
  celda.innerHTML = vacio;
  return celda;
}

//creo una funcion que me cargue el segundo td

function crear_td_modelo(vacio) {
  let celda = document.createElement('td');
  celda.setAttribute("class", "columna2");
  celda.innerHTML = vacio;
  return celda;
}

//creo una funcion que me cargue el tercer td

function crear_td_valor(vacio) {
  let celda = document.createElement('td');
  celda.setAttribute("class", "columna3");
  celda.innerHTML = vacio;
  return celda;
}
// cree 3 funciones que carguen 3 td distintos asi puedo darle diferentes clases


//creo 2 funciones que se encargan del encabezado
function crear_th(vacio) {
  let celda = document.createElement("th");
  celda.innerHTML = vacio;
  return celda;
}
function encabezado() {
  let encabezado = document.createElement("tr");
  encabezado.appendChild(crear_th("Nombre del Producto"));
  encabezado.appendChild(crear_th("Modelo del Producto"));
  encabezado.appendChild(crear_th("Valor del Producto"));
  tabla.appendChild(encabezado);
}
//carga los datos que el usuario ingreso
function cargar_datos() {
  let nombre = document.getElementById("nombre_produ").value;
  let modelo = document.getElementById("modelo_produ").value;
  let valor = document.getElementById("valor_produ").value;
  let completar = document.getElementById("completar_campos");
  if (nombre.length != 0 && modelo.length != 0 && valor.length != 0) {
    let info_enviada = {
      "thing": {
        "nombre_del_producto": nombre,
        "modelo_del_producto": modelo,
        "valor_del_producto": valor,
      },
    };
    fetch(urlapi, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info_enviada),
    })
      .then(function (r) {
        if (!r.ok) {
          console.log("error");
        }
        return r.json();
      })
      .then(function (json) {
        enviado.innerHTML = JSON.stringify(json);
        console.log(json);
        mostrar_datos();
      })
      .catch(function (e) {
        console.log(e);
      });
  } else {
    completar.innerHTML = "<h1> Complete todos los campos </h1>";
  }
}
//funcion que ejecuta todo, hace un get(trae datos de la api),carga encabezado
//crea la tabla con sus respectivos elementos
//creo los botones de borrar y editar
function mostrar_datos() {
  console.log("contenedor" + tabla);

  fetch(urlapi, {
    method: "GET",
    mode: "cors",
  }).then((respuesta) => {
    if (respuesta.ok) {
      respuesta.json().then((json) => {
        console.log(json);
        tabla.innerHTML = "";
        encabezado();
        
        for (let data of json.productos){
          // estas dos variables me sirven para almacenar el id para borrar y editar
          let boton_borrar = data._id;
          let boton_editar = data._id + 1;
          let hilera = document.createElement("tr");
          hilera.appendChild(crear_td_nombre(data.thing.nombre_del_producto));

          hilera.appendChild(crear_td_modelo(data.thing.modelo_del_producto));

          hilera.appendChild(crear_td_valor(data.thing.valor_del_producto));

          hilera.innerHTML+= '<td><input class="btn_borrar" type="button"' +` id="${boton_borrar}"` + 'value="borrar"></td>';

          hilera.innerHTML+= '<td><input class="btn_editar" type="button"' +` id="${boton_editar}"` + 'value="editar"></td>';
          //inserto las celdas en la tabla
          tabla.appendChild(hilera);
          document.addEventListener("keyup",function(event){
          event.preventDefault();
          filtrar();
          }
          );
        document.getElementById(boton_borrar).addEventListener("click", function (event) {
        event.preventDefault();
        alert("Borrado con exito");
        fetch(urlapi+ data._id, {
            "method": "DELETE",
            "mode": 'cors',
        }).then(respuesta => {
            if (respuesta.ok) {
                respuesta.json().then(json => {
                  mostrar_datos();
                })
            } else {
                tabla.innerHTML = "<h1>Error - Failed URL!</h1>";
            }
        }).catch(error => {
            console.log(error);
            tabla.innerHTML = "<h1>Error - Conection Failed!</h1>";
        });
    });
    document.getElementById(boton_editar).addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(".formulario_editar").classList.toggle("mostrar");
        document.getElementById("boton_editar_enviar").addEventListener("click", function () {
            event.preventDefault();

            let nombre_editado = document.getElementById("editar_nombre_produ").value;
            let modelo_editado = document.getElementById("editar_modelo_produ").value;
            let valor_editado = document.getElementById("editar_valor_produ").value;

            let data = {
                "thing": {
                    "nombre_del_producto": nombre_editado,
                    "modelo_del_producto":  modelo_editado,
                    "valor_del_producto": valor_editado            
                }
            };
            fetch(urlapi + boton_borrar, {                            
                "method": "PUT",
                "mode": 'cors',
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(data)
            }).then(respuesta => {
                if (respuesta.ok) {
                    respuesta.json().then(json => {
                        console.log(respuesta);
                        mostrar_datos();
                    })
                } else {
                    contenedor.innerHTML = "<h1>Error - Failed URL!</h1>";
                }
            }).catch(error => {
                console.log(error);
                contenedor.innerHTML = "<h1>Error - Conection Failed!</h1>";
            });
        })
    });               
  }
})
} else {
tabla.innerHTML = "<h1>Error - Failed URL!</h1>";
}
}).catch(error => {
console.log(error);
tabla.innerHTML = "<h1>Error - Conection Failed!</h1>";
});
}


let boton_cargar_tabla = document.getElementById("crear_tabla_input");
if (boton_cargar_tabla) {
  boton_cargar_tabla.addEventListener("click", function (a) {
    a.preventDefault();
    cargar_datos();
  });
}
let boton_3_items =document.getElementById("crear3input");
if (boton_3_items) {
  boton_3_items.addEventListener("click", function (a) {
    a.preventDefault();
    cargar_datos();
    cargar_datos();
    cargar_datos();
  });
}
function cargar_datos_iniciales() {

  fetch(urlapi, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info_tabla),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      return r.json();
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (e) {
      console.log(e);
    });
    fetch(urlapi, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info_tabla1),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      return r.json();
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (e) {
      console.log(e);
    });
    fetch(urlapi, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info_tabla2),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      return r.json();
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (e) {
      console.log(e);
    });
    fetch(urlapi, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info_tabla3),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      return r.json();
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (e) {
      console.log(e);
    });
    fetch(urlapi, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info_tabla4),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      return r.json();
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (e) {
      console.log(e);
    });
    fetch(urlapi, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info_tabla5),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      return r.json();
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (e) {
      console.log(e);
    });
    fetch(urlapi, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info_tabla6),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      return r.json();
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (e) {
      console.log(e);
    });
    fetch(urlapi, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info_tabla7),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      return r.json();
    })
    .then(function (json) {
      console.log(json);
    })
    .catch(function (e) {
      console.log(e);
    });
    fetch(urlapi, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info_tabla8),
  })
    .then(function (r) {
      if (!r.ok) {
        console.log("error");
      }
      return r.json();
    })
    .then(function (json) {
      console.log(json);
      mostrar_datos();
    })
    .catch(function (e) {
      console.log(e);
    });
  }
  mostrar_datos();
  function filtrar(){
    let textoingresado,td,tr,texto,filtro;
    textoingresado=document.getElementById("filtro");
    filtro=textoingresado.value.toUpperCase();
    tr=tabla.getElementsByTagName("tr");
    for (let j = 0; j < tr.length; j++) {
      td = tr[j].getElementsByTagName("td")[0];
      if (td) {
        texto = td.textContent || td.innerText;
        if (texto.toUpperCase().indexOf(filtro) > -1) {
          tr[j].style.display = "";
        } else {
          tr[j].style.display = "none";
          }
      }       
    }
    }
}

document.addEventListener("DOMContentLoaded",loadpage);