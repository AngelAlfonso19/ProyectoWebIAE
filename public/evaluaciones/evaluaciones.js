

let xhr = new XMLHttpRequest();
xhr.open('GET', '/api/assignment')
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Content-Type", "text/html");
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



