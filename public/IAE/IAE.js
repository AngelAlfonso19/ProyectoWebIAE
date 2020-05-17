
let form = document.querySelector('#asignatura')
let invalid = document.querySelectorAll('input:invalid')
let butreg = document.getElementById('CrearAsignatura')


let xhr = new XMLHttpRequest();
xhr.open('GET', '/api/IAE')
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
xhr.onload = () =>{
    if(xhr.status != 200){
        alert(`${xhr.status} Fallo registro de obtener`)
    }
    else{
      console.log("Entro");
      sendTeAssignment(JSON.parse(xhr.responseText));
    }
}


function assignmentToHtml(obj, objiae) {
    console.log(obj.SubjectName);
    if (obj != undefined)
        return `
        <!-- Row1 -->
        <tr>
          <!-- Column1 -->
          <td> 
            <div class="container-fluid">
              <div class="row">
              <p class="userName" id = "${objiae.pollID}" onclick="deleteIAE(this.id)"> X </p>
                <div class="col-12 mt-3 d-flex justify-content-center">
                <a id="${objiae.pollID}" onclick="openassesment(this.id)">
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
    
   if (invalid.length<1){
        butreg.disabled = false;
    }
    else if ( invalid.length >0){
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
    let selected = document.getElementById('profesor')
    let selanswer = selected.options[selected.selectedIndex].value;
    console.log(selanswer);
    let cdata =   {
            "pollID": makeid(),
            "subjectID": selanswer,
            "pollDate": ""
    }
    
    let reguser = JSON.stringify(cdata)
    console.log(reguser);
    sendregister(reguser)
  
    
})

function sendregister(datos){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/IAE')
    xhr.setRequestHeader("Content-Type", "application/json")
    //xhr.setRequestHeader("Content-Type", "text/html")
    //console.log(datos);
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

function sendTeAssignment(iaedata){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/assignment')
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
  xhr.onload = () =>{
    if(xhr.status != 200){
      alert(`${xhr.status} Fallo registro de obtener`)
  }
  else{
      //console.log(iaedata);
      let assignment = JSON.parse(xhr.responseText);
      //console.log(assignment);
      getAssignment(assignment)
      let text = ''
      iaedata.forEach((iae)=>{
        //console.log(iae);
        assignment.forEach((assign)=>{
        if(iae.subjectID == assign.subjectID){
          text += assignmentToHtml(assign, iae);
        }
      })
      })
      document.getElementById("lista").innerHTML = text;
  }
  }
}


function getAssignment(data){
  var text = "";
   data.forEach(element => {
      //console.log(element);
      text += assignToHtml(element)
 
   });
    document.getElementById("profesor").innerHTML = text;
}

function assignToHtml(obj){
  if(obj != undefined)
    return `<option value="${obj.subjectID}">${obj.subjectName} - ${obj.teacherID}</option>`
  
}

function deleteIAE(identify){
  let answer = confirm("Deseas eliminar el IAE?")
  console.log(identify);
  if(answer == true){
   let xhr = new XMLHttpRequest();
   xhr.open('DELETE',  `/api/IAE/${identify}`)
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

function openassesment(id){
  localStorage.setItem("pollID", id);
  toView("IAEDetail", "IAEDetail")
}

function toView(link, view){
  xhrr.open('GET', `http://localhost:3000/${link}`)
  xhrr.send()
  xhrr.onload = ()=>{
      window.location.replace(`../${view}`)
  }
}

