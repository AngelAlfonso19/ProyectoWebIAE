let form = document.querySelector('#asignatura')
let invalid = document.querySelectorAll('input:invalid')
let butreg = document.querySelector('#CrearAsignatura')
let assignmentid = 0;
let row = document.getElementsByClassName("open")
console.log(row);
let xhr = new XMLHttpRequest();
xhr.open('GET', '/api/assignment')
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
xhr.onload = () =>{
    if(xhr.status != 200){
        alert(`${xhr.status} Fallo registro de obtener`)
    }
    else{
      showTeacher()
      showUsers(JSON.parse(xhr.responseText));
        
    }
}

function showUsers(data){
    var text = "";

   data.forEach((element) => {
      text += userToHtml(element)
   });
    document.getElementById("lista").innerHTML = text;
}

function userToHtml(obj) {
    //console.log(obj);
    if (obj != undefined)
        return `
        <!-- Row1 -->
        <tr id = "${obj.subjectID}">
          <!-- Column1 -->
          <td> 
            <div class="container-fluid">
              <div class="row">
                <div class="col-12 mt-3 d-flex justify-content-center">
                <a data-toggle="modal" data-target="#modeleditId"href="#modeleditId" data-toggle="modal" data-target="#modeleditId" onclick="editassignment(${obj.subjectID})">
                  <p class="userName">${obj.subjectName}</p>
                </a> 
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
                  <img class="img-circle" id="tableProfilePhoto" src="https://randomuser.me/api/portraits/men/${obj.teacherID % 100}.jpg" alt="userProfilePhoto.jpg">
                </div>
                <div class="col-6 d-flex justify-content-center">
                  <p class="userName">${obj.teacherID}</p>
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
                  <p class="userName">${obj.availableTime}</p>
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
    console.log(invalid);
   if (invalid.length<3){
        butreg.disabled = false;
    }
    else if ( invalid.length >2){
        butreg.disabled = true;
    }
    
    
});

function makeid() {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 5; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * 10));
  }
  return result;
}


butreg.addEventListener("click", function(event) {
    event.preventDefault();
    let data = document.querySelectorAll('input')
    let selected = document.getElementById('profesor')
    let selanswer = selected.options[selected.selectedIndex].value;

    let cdata =   {
            "subjectID": makeid(),
            "teacherID": selanswer,
            "subjectName": data[0].value,
            "score":  0,
            "availableTime": data[1].value
    }
    
    let reguser = JSON.stringify(cdata)
    sendregister(reguser)
  
    
})

function sendregister(datos){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/assignment')
    xhr.setRequestHeader("Content-Type", "application/json")
    //xhr.setRequestHeader("Content-Type", "text/html")
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

function showTeacher(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/users')
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onload = () =>{
    if(xhr.status != 200){
      alert(`${xhr.status} Fallo registro de obtener`)
  }
  else{
      getTeacher(JSON.parse(xhr.responseText));
  }
  }
}

function getTeacher(data){
  var text = "";
   data.forEach((element) => {
     if(element.typo == 3){
      console.log(element);
      text += userprofesorToHtml(element)
     }
   });
   console.log(text);
    document.getElementById("profesor").innerHTML = text;
    document.getElementById("editprofesor").innerHTML = text
}

function userprofesorToHtml(obj){
  if(obj != undefined)
    return `<option value="${obj.userID}">${obj.name} ${obj.lastName}</option>`
  
}

function deleteassign(identify){
  let answer = confirm("Deseas eliminar la asignatura?")
  if(answer == true){
   let xhr = new XMLHttpRequest();
   console.log(identify);
   xhr.open('DELETE',  `/api/assignment/${identify}`)
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

function editassignment(id){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/assignment/${id}`)
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onload = () =>{
    if(xhr.status != 200){
        alert(`${xhr.status} Fallo registro de obtener`)
    }
    else{
      
    
      let data = JSON.parse(xhr.responseText)
      console.log(data);
      let name = document.getElementById("editname")
      let period = document.getElementById("editperiod")
      let selected = document.getElementById("editprofesor")
      let selanswer = selected.options[selected.selectedIndex].value;
      name.value = data.subjectName;
      period.value = data.availableTime;
      let confirm = document.getElementById("edit")
      let erase = document.getElementById("delete")
      confirm.addEventListener("click", () =>{
        editassign(id, name.value, period.value, selanswer);
      })

      erase.addEventListener("click", () =>{
        deleteassign(id);
      })

    }
}
}

function editassign(id, name, period, profesor){
  let data = {
    "subjectName": name,
    "availableTime": period,
    "teacherID": profesor
  }
  let xhr = new XMLHttpRequest();
  xhr.open('PATCH', `/api/assignment/${id}`)
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data))
  xhr.onload = ()=>{
    if(xhr.status != 200){
      alert(`${xhr.status} Fallo registro de obtener`)
  }
  else{
      

    }
  }
}

