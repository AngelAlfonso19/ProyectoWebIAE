const IAE = document.getElementById('IAE')
const homeLink = document.getElementById('homeLink')
const Users = document.getElementById('users')
const Nameehtml = document.getElementById('statusBarName')
const Rollhtml = document.getElementById('statusBarRol');
const tiposs = ["Administrador","Coordinador","Profesor","Alumno"]
const assignment = document.getElementById('assignment')
const assessmentDetail = document.getElementById('assessmentDetail')
const Imghtmll = document.getElementById('statusBarProfilePhoto')
console.log('SIDEBAR');
const xhrr = new XMLHttpRequest()


xhrr.open('GET','http://localhost:3000/api/profile')
xhrr.setRequestHeader('Content-Type', 'application/json');
xhrr.setRequestHeader('x-auth', localStorage.getItem('token'))
if(localStorage.getItem('token')=== undefined){window.location.replace('login')}
xhrr.send()
xhrr.onload = ()=>{
    if(localStorage.getItem('token'))
    {
        let responses = JSON.parse(xhrr.responseText);
        console.log(responses.typo);
        Rollhtml.innerHTML = (responses.typo == 0)?tiposs[0]:tiposs[responses.typo-1]
        Nameehtml.innerHTML = `${responses.name} ${responses.lastName}`
        // Emaillhtml.innerHTML = `${responses.email}`
        Imghtmll.src = responses.img
        console.log(Imghtml.src)
    }else {
         window.location.replace('login')
     }
}



IAE.addEventListener("click", ()=>{
    toView("iae", "IAE");
})

Users.addEventListener("click", ()=>{
    toView("users", "users");
})
homeLink.addEventListener("click", ()=>{
    toView("profile", "");
})
assignment.addEventListener("click", ()=>{
    toView("assignment", "assignment");
})

assessmentDetail.addEventListener("click", ()=>{
    toView("assessmentDetail", "assessmentDetail");
})
function toView(link, view){
    xhrr.open('GET', `http://localhost:3000/${link}`)
    xhrr.send()
    xhrr.onload = ()=>{
        window.location.replace(`../${view}`)
    }
}

