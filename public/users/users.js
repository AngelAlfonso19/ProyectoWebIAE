const bat = document.getElementById('studentsTable').children
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
<<<<<<< HEAD
        let users = JSON.parse(xhr.responseText);

        let data1 = users.filter(usr =>usr.typo == 4)
        console.log(data1);
        userListToHTML1(data1);
        let data2 = users.filter(usr =>usr.typo == 3)
        userListToHTML2(data2);
        let data3 = users.filter(usr =>usr.typo == 2)
        userListToHTML3(data3);
        let data4 = users.filter(usr =>usr.typo == 1)
        userListToHTML4(data4);
    
=======
        userListToHTML(JSON.parse(xhr.responseText));
        buttonsP();
>>>>>>> master
    }
}


<<<<<<< HEAD
function userListToHTML1(userList){
    document.getElementById("studentsTable").innerHTML = userList.map(u => userToHTML(u)).join('<br>')
=======

function userListToHTML(userList){
    document.getElementById("studentsTable").innerHTML = userList.map(u => userToHTML(u)).join('')
>>>>>>> master
}
function userListToHTML2(userList){
    document.getElementById("teachertable").innerHTML = userList.map(u => userToHTML(u)).join('<br>')
}
function userListToHTML3(userList){
    document.getElementById("coordinatortable").innerHTML = userList.map(u => userToHTML(u)).join('<br>')
}
function userListToHTML4(userList){
    document.getElementById("unitcoordinatortable").innerHTML = userList.map(u => userToHTML(u)).join('<br>')
}

function userToHTML(user){
    return `                                                        
    <tr id="${user.username}" >
        <td> 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-6 d-flex justify-content-center">
                        <img class="img-circle" id="tableProfilePhoto" src="${user.img}" alt="userProfilePhoto.jpg">
                    </div>
                    <div class="col-6 d-flex justify-content-center">
                        <p  class="userName">${user.name} ${user.lastName}</p>
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

function buttonsP (){
    for(let i =0 ; i<bat.length;i++){
        console.log(`btn ${i} listo:  ${bat[i]}`);
        bat[i].addEventListener('click',()=>{
            localStorage.setItem('username', bat[i].id)
            console.log(bat[i].id);
            toView('userProfile','userProfile')
        })
    }
}


function toView(link, view){
    xhrr.open('GET', `http://localhost:3000/${link}`)
    xhrr.send()
    xhrr.onload = ()=>{
        // localStorage.setItem('username', this.id)
        window.location.replace(`../${view}`)
    }
}
