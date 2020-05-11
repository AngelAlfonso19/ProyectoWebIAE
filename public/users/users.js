let xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users')
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Content-Type", "text/html");
xhr.send();
xhr.onload = () =>{
    if(xhr.status != 200){
        alert(`${xhr.status} Fallo registro de obtener`)
    }
    else{
        console.log(JSON.parse(xhr.responseText));
    }
}


function userListToHTML(userList){
    document.getElementById("studentsTable").innerHTML = userList.map(u => userToHTML(u)).join('<br>')
}

function userToHTML(user){
    return `                                                        
    <tr>
        <td> 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-6 d-flex justify-content-center">
                        <img class="img-circle" id="tableProfilePhoto" src="https://randomuser.me/api/portraits/men/1.jpg" alt="userProfilePhoto.jpg">
                    </div>
                    <div class="col-6 d-flex justify-content-center">
                        <p class="userName">${user.name} ${user.lastName}</p>
                    </div>
                </div>
            </div>                                            
        </td>

        <td> 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 mt-3 d-flex justify-content-center">
                        <p class="userName">${user.email}</p>
                    </div>
                </div>
            </div>                                
        </td>

        <td> 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 mt-3 d-flex justify-content-center">
                        <p class="userName">${user.department}</p>
                    </div>
                </div>
            </div>                     
        </td>                        
    </tr>`;
}