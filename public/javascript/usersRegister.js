const $ = (element) => document.getElementById(element);

console.log("userRegister success!");
console.log("maxi");


const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
const exRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/;

let formulariooo = document.getElementById("formulariooo");
let btnnn =document.getElementById("btnnn")
const msgError = (element, msg, { target }) => {
  $(element).innerText = msg;
  target.classList.add("form__label input-invalid"); // aca tenes que poner una clase para que esten rojos los input
};

const cleanField = (element, target) => {
  $(element).innerText = null;
  target.classList.remove("form__label input-invalid");
};

const validField = () => {

}

$("name").addEventListener("blur", function (e) {
  switch (true) {
    case !this.value.trim():
      msgError("errorNombre", "El nombre es obligatorio", e); 
          /*console.log("userRegister success!");*/
      break;
    case this.value.trim().length < 2:
      msgError("errorNombre", "El nombre debe tener como minimo dos caracteres", e);
      break;
      case !exRegAlfa.test(this.value):
          msgError("errorNombre" , "solo se permiten caracteres alfabeticos" ,e);
      break;    
    default:
      break;
  }
});

$("name").addEventListener("focus", function ({ target }) {
  cleanField("errorNombre", target);
});


$("surname").addEventListener("blur", function (e) {
    switch (true) {
      case !this.value.trim():
        msgError("errorApellido", "El Apellido es obligatorio", e); 
            /*console.log("userRegister success!");*/
        break;
      case this.value.trim().length < 2:
        msgError("errorApellido", "El Apellido debe tener como minimo dos caracteres", e);
        break;
        case !exRegAlfa.test(this.value):
            msgError("errorApellido" , "solo se permiten caracteres alfabeticos" ,e);
        break;    
      default:
        break;
    }
  });
  
  $("surname").addEventListener("focus", function ({ target }) {
    cleanField("errorApellido", target);
  });



  
$("email").addEventListener("blur", function (e) {
    switch (true) {
      case !this.value.trim():
        msgError("errorEmail", "El Email es obligatorio", e); 
           
        break;
      case exRegEmail.test(this.value):
        msgError("errorEmail","El email tiene un formato invalido")
        break;
       default:
        validField("errorEmail",e)
        break;
    }
  });
  
  $("email").addEventListener("focus", function ({ target }) {
    cleanField("errorEmail", target);
  });




  $("tel").addEventListener("blur", function (e) {
    switch (true) {
      case !this.value.trim():
        msgError("errortel", "El tel es obligatorio", e); 
           
        break;
      case !exRegtel.test(this.value):
        msgError("errortel","El tel tiene un formato invalido")
        break;
       default:
        validField("errortel",e)
        break;
    }
  });
  
  $("tel").addEventListener("focus", function ({ target }) {
    cleanField("errortel", target);
  });



  $("password").addEventListener("blur", function (e) {
    switch (true) {
      case !this.value.trim():
        msgError("errorpassword", "El password es obligatorio", e); 
           
        break;
      case !exRegPass.test(this.value):
        msgError("errorpassword","El password tiene un formato invalido")
        break;
       default:
        validField("errorpassword",e)
        break;
    }
  });
  
  $("password").addEventListener("focus", function ({ target }) {
    cleanField("errorpassword", target);
  });

  $("password2").addEventListener("blur", function (e) {
    switch (true) {
      case !this.value.trim():
        msgError("errorpassword2", "El password es obligatorio", e); 
           
        break;
      case !exRegPass.test(this.value):
        msgError("errorpassword2","El password tiene un formato invalido")
        break;
       default:
        validField("errorpassword2",e)
        break;
    }
  });
  
  $("password2").addEventListener("focus", function ({ target }) {
    cleanField("errorpassword2", target);
  });


  formulariooo.addEventListener("submit", function (e) {
    if ( $("name").value === "" || $("tel").value === "" || $("surname").value === "" || $("email").value === "" || $$("password").value === "" || $("password2").value === "") {
       console.log('esta vacio');
       btnnn.style.backgroundColor = "red"
    e.preventDefault();// detengo la funcion del boton
    
    }
    })






