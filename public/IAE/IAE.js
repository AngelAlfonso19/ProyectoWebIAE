
let form = document.querySelector('#asignatura')
let invalid = document.querySelectorAll('input:invalid')
let butreg = document.querySelector('#CrearAsignatura')


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


function assignmentToHtml(obj) {
    //console.log(obj);
    if (obj != undefined)
        return `
        <!-- Row1 -->
        <tr id = "${obj.SubjectID}${obj.SubjectName}" onclick="deleteassign(this.id)">
          <!-- Column1 -->
          <td> 
            <div class="container-fluid">
              <div class="row">
                <div class="col-12 mt-3 d-flex justify-content-center">
                  <p class="userName">${obj.SubjectName}</p>
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
                  <img class="img-circle" id="tableProfilePhoto" src="https://randomuser.me/api/portraits/men/${obj.TeacherID}.jpg" alt="userProfilePhoto.jpg">
                </div>
                <div class="col-6 d-flex justify-content-center">
                  <p class="userName">${obj.TeacherID}</p>
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
                  <p class="userName">${obj.AvailableTime}</p>
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
    let data = document.querySelectorAll('input')
    let selected = document.getElementById('profesor')
    let selanswer = selected.options[selected.selectedIndex].value;
    let cdata =   {
            "pollID": makeid(),
            "SubjectID": selanswer,
            "pollDate": ""
    }
    
    let reguser = JSON.stringify(cdata)
    sendregister(reguser)
  
    
})

function sendregister(datos){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/IAE')
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
      console.log(iaedata);
      let assignment = JSON.parse(xhr.responseText);
      console.log(assignment);
      getAssignment(assignment)
      let text = ''
      iaedata.forEach((iae)=>{
        if(iae.SubjectID == assignment.SubjectID){
          //console.log(assignment);
          text += assignmentToHtml(assignment);
        }
      })
      document.getElementById("lista").innerHTML = text;
  }
  }
}


function getAssignment(data){
  var text = "";
   data.forEach(element => {
      console.log(element);
      text += userprofesorToHtml(element)
 
   });
   console.log(text);
    document.getElementById("profesor").innerHTML = text;
}

function assignToHtml(obj){
  if(obj != undefined)
    return `<option value="${obj.SubjectName} - ${obj.TeacherID}">${obj.SubjectName} - ${obj.TeacherID}</option>`
  
}




