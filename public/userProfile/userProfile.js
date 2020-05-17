const CS = document.getElementById('SALIR')
const Rolhtml = document.getElementById('profile_ROL');
const forma = document.getElementById('datosVariables')
const Namehtml = document.getElementById('profile_Name')
const Emailhtml = document.getElementById('profile_Email')
const Imghtml = document.getElementById('profile_profilePhoto')
const tipos = ["Administrador","Coordinador","Profesor","Alumno"]
const username = localStorage.getItem('username');
const IAE = document.getElementById('IAE')
const Users = document.getElementById('users')
const assignment = document.getElementById('assignment')
const assessmentDetail = document.getElementById('assessmentDetail')
const evaluaciones = document.getElementById('evaluaciones')
const Edit = document.getElementById('emailPUT');
const PUTform = document.getElementById('PUTform').children;
const updateButton = document.getElementById('updateButton');
const studentsTable = document.getElementById('studentsTable')
// const modifyOtherUsers = document.getElementById(`${studentsTable.tr.id.value}`)
let dicto = ['name', 'lastName', 'email']
const xhr = new XMLHttpRequest();

CS.addEventListener("click", ()=>{
    cerrarSesion();
})

IAE.addEventListener("click", ()=>{
    toView("iae", "IAE");
})

Users.addEventListener("click", ()=>{
    toView("users", "users");
})

assignment.addEventListener("click", ()=>{
    toView("assignment", "assignment");
})

evaluaciones.addEventListener("click",()=>{
    toView('evaulaciones','evaluaciones')
})

updateButton.addEventListener('click', ()=>{
    update();
})


















xhr.open('GET',`http://localhost:3000/api/userProfile`)
let varHTML = forma.children;
console.log(document.cookie);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('x-auth', localStorage.getItem('token'))
xhr.setRequestHeader('username', username)
if(localStorage.getItem('token')=== undefined){window.location.replace('login')}
xhr.send()
xhr.onload = ()=>{
    if(localStorage.getItem('token'))
    {
        let responses = JSON.parse(xhr.responseText)
        console.log( responses);
        console.log(PUTform[0]);
        let j=0
        for(let i = 0 ; i< PUTform.length-2;i++){ //poner regla que si contraseña igual a "", no tomar en schema
            let foo = (i==0)?`responses.${dicto[i]}`:`responses.${dicto[j]}`
            // let foo =`responses.${dicto[i]}`
            if(PUTform[i].type === undefined){
                console.log('esElBR:' + PUTform[i].type+i);
                continue
            }else{
                console.log(foo);
                PUTform[i].setAttribute('value' ,eval(foo))
            }
            j++
        }

        Rolhtml.innerHTML = (responses.typo == 0)?tipos[0]:tipos[responses.typo-1]
        Namehtml.innerHTML = `${responses.name} ${responses.lastName}`
        Emailhtml.innerHTML = `${responses.email}`
        // Edit.setAttribute('value', )
        console.log(responses.img)
        Imghtml.src = responses.img
        console.log(Imghtml.src)
    }else {
         window.location.replace('login')
     }
}


function toView(link, view){
    xhr.open('GET', `http://localhost:3000/${link}`)
    xhr.send()
    xhr.onload = ()=>{
        window.location.replace(`../${view}`)
    }
}


function cerrarSesion(){
    xhr.open('GET', 'http://localhost:3000/login')
    xhr.send()
    xhr.onload = ()=>{
        localStorage.removeItem('token')
        window.location.replace('../login')
    }
}








function update(){
    let skel = {name: "", lastName: "", email: "", password: ""};
    let skel2 = {name: "", lastName: "", email: ""};
    let i,j =0
    if(PUTform.password == ""){
        for( i in skel){
            console.log(skel[i] + "\n");
            skel[i] = PUTform[j].value
            j+=2
        } 
    }else{
        for( i in skel2){
            skel2[i] = PUTform[j].value
            j+=2
        } 
    }
    let header = (skel.password != "")?skel:skel2
    console.log(header.email);
    xhr.open('PUT',`http://localhost:3000/api/users/${header.email}`)
    xhr.setRequestHeader('Content-Type',"application/json")
    
    xhr.send(JSON.stringify(header))
    xhr.onload = () =>{
        if(xhr.status != 200){
            xhr.responseText='No existe usuario con ese e-mail'
        }else{
            alert(`El usuario ha sido modificado`)
            window.location.reload()
        }
    }
    }