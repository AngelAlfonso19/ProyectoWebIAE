const xhr = new XMLHttpRequest();
const CS = document.getElementById('SALIR')
const Rolhtml = document.getElementById('profile_ROL');
const forma = document.getElementById('datosVariables')
const Namehtml = document.getElementById('profile_Name')
const Emailhtml = document.getElementById('profile_Email')
const Imghtml = document.getElementById('profile_profilePhoto')
const tipos = ["Administrador","Coordinador","Profesor","Alumno"]
const IAE = document.getElementById('IAE')
const Users = document.getElementById('users')
const assignment = document.getElementById('assignment')
const assessmentDetail = document.getElementById('assessmentDetail')
const Edit = document.getElementById('emailPUT');
const PUTform = document.getElementById('PUTform').children;
let dicto = ['name', 'lastName', 'email']

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

assessmentDetail.addEventListener("click",()=>{
    toView('assessmentDetail','assessmentDetail')
})

xhr.open('GET','http://localhost:3000/api/profile')
let varHTML = forma.children;
console.log(document.cookie);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('x-auth', localStorage.getItem('token'))
if(localStorage.getItem('token')=== undefined){window.location.replace('login')}
xhr.send()
xhr.onload = ()=>{
    if(localStorage.getItem('token'))
    {
        let responses = JSON.parse(xhr.responseText);
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