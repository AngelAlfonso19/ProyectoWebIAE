
let form = document.querySelector('#asignatura')
let invalid = document.querySelectorAll('input:invalid')
let butreg = document.querySelector('#CrearAsignatura')


let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/asignaturas')
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
xhr.onload = () =>{
    if(xhr.status != 200){
        alert(`${xhr.status} Fallo registro de obtener`)
    }
    else{
        showUsers(JSON.parse(xhr.responseText));
    }
}

function showUsers(data){
    var text = "";

   data.forEach(element => {
      text += userToHtml(element)
   });

    document.getElementById("lista").innerHTML = text;

}

function userToHtml(obj) {
    //console.log(obj);
    if (obj != undefined)
        return `
        <!-- Row1 -->
        <tr id = "${obj.id}${obj.title}" onclick="deleteassign(this.id)">
          <!-- Column1 -->
          <td> 
            <div class="container-fluid">
              <div class="row">
                <div class="col-12 mt-3 d-flex justify-content-center">
                  <p class="userName">${obj.title}</p>
                </div>
              </div>
            </div>                                
          </td>
          <!-- /Column1 -->
          <!-- Column2 -->
          <td> 
            <div class="container-fluid">
              <div class="row">
                <div class="col-6 d-flex justify-content-center">
                  <img class="img-circle" id="tableProfilePhoto" src="https://randomuser.me/api/portraits/men/${obj.id}.jpg" alt="userProfilePhoto.jpg">
                </div>
                <div class="col-6 d-flex justify-content-center">
                  <p class="userName">${obj.teacher}</p>
                </div>
              </div>
            </div>                                            
          </td>
          <!-- /Column2 -->
          <!-- Column3 -->
          <td> 
            <div class="container-fluid">
              <div class="row">
                <div class="col-12 mt-3 d-flex justify-content-center">
                  <p class="userName">${obj.period}</p>
                </div>
              </div>
            </div>                     
          </td>
          <!-- /Column3  -->
        </tr>
        <!-- /Row1 -->
    `
}

form.addEventListener("change", () =>{
    let invalid = document.querySelectorAll('input:invalid');
    
   if (invalid.length<1){
        butreg.disabled = false;
    }
    else if ( invalid.length >0){
        butreg.disabled = true;
    }
    
    
});

butreg.addEventListener("click", function(event) {
    event.preventDefault();
    let data = document.querySelectorAll('input')

    let cdata =   {
            "title": data[0].value,
            "teacher": data[1].value,
            "email": data[2].value,
            "period": data[3].value,
            "creditos":  data[4].value,
            "alumnos": "",
            "IAE": ""
    }
    
    let reguser = JSON.stringify(cdata)
    sendregister(reguser)
  
    
})

function sendregister(datos){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/asignaturas')
    xhr.setRequestHeader('Content-Type', 'application/json')
    console.log(datos);
    xhr.send(datos)
    xhr.onload = ()=>{
        if(xhr.status != 201){
            alert(`${xhr.status} Fallo registro`)
        }
        else{
            alert("La asignatura fue registrada")
        }
    }
}

function deleteassign(identify){
  let answer = confirm("Deseas eliminar la asignatura?")
  if(answer == true){
   let xhr = new XMLHttpRequest();
   xhr.open('DELETE',  `http://localhost:3000/asignaturas/${identify[0]}`)
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.send();
   xhr.onload = () =>{
       if(xhr.status != 200){
           alert(`${xhr.status} Fallo registro de obtener`)
       }
       else{
           alert("Asignatura eliminada");
       }
   }
   }   
}

