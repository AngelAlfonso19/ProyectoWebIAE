let subjectID
let teacherID
let temporalPollID = "1234A"
let form = document.querySelector('#questioncreator')
let invalid = document.querySelectorAll('input:invalid')
let butSend = document.getElementById('SEND1')

getIAE()
getAssigments()
getProfessor()

butSend.addEventListener("click", function(event) {
    console.log("Entra al listener") 
    event.preventDefault();
    let numericData = document.querySelectorAll('input')
    let stringData = document.querySelectorAll('textarea')
    // let selected = document.getElementById('profesor')
    // let selanswer = selected.options[selected.selectedIndex].value;
    console.log(stringData)
    console.log(numericData[6].value)
    console.log(stringData[0].value)


    let answerdata =   {
            "answerID": makeid(),
            "pollID": temporalPollID,
            "q1": {
                "type":0,
                "title": "1. hola",
                "answer": parseInt(numericData[0].value)
            },
            "q2": {
                "type":0,
                "title": "1. hola",
                "answer": parseInt(numericData[1].value)
            },
            "q3": {
                "type":0,
                "title": "1. hola",
                "answer": parseInt(numericData[2].value)
            },
            "q4": {
                "type":0,
                "title": "1. hola",
                "answer": parseInt(numericData[3].value)
            },
            "q5": {
                "type":0,
                "title": "1. hola",
                "answer": parseInt(numericData[4].value)
            },
            "q6": {
                "type":1,
                "title": "1. hola",
                "answer": stringData[0].value
            },
            "q7": {
                "type":1,
                "title": "1. hola",
                "answer": stringData[1].value
            },
            "q8": {
                "type":1,
                "title": "1. hola",
                "answer": stringData[2].value
            }
        }

    let answer = JSON.stringify(answerdata)
    sendregister(answer)
    // console.log(data) 
})

function makeid() {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * 10));
    }
    return result;
  }
  


function sendregister(answer){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/answers')
    xhr.setRequestHeader("Content-Type", "application/json")
    //xhr.setRequestHeader("Content-Type", "text/html")
    console.log(answer);
    xhr.send(answer)
    xhr.onload = ()=>{
        if(xhr.status != 201){
            alert(`${xhr.status} Fallo registro`)
        }
        else{
            alert("La respuesta fue registrada")
        }
    }
}

//-------------------------------------------------IAE------------------------------------------------------------------------
function getIAE(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/iae')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            let iaeList = (JSON.parse(xhr.responseText));
            console.log("Obtiene assessmentList:");
            console.log(iaeList)
            let filteredList = iaeList.find(iae => iae.pollID == temporalPollID)
            console.log("Filtra assessmentList");
            console.log(filteredList)
            subjectID = filteredList.subjectID
            console.log("Obtiene subjectID");
            console.log(subjectID)
        }
    }
}
//-------------------------------------------------/IAE------------------------------------------------------------------------

//-------------------------------------------------Assignment------------------------------------------------------------------------
function getAssigments(){
    let assignmentName = document.getElementById("subjectName")
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/assignment')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            let assigmentsList = (JSON.parse(xhr.responseText));
            console.log("Obtiene assigmentsList:");
            console.log(assigmentsList)
            let assignment = assigmentsList.find(a => a.subjectID == subjectID)
            console.log("Filtra assigmentsList:");
            console.log(assignment)
            console.log("Obtiene teacherID:");
            teacherID = assignment.teacherID
            console.log(teacherID)
            assignmentName.innerHTML = assignmentToHTML(assignment)
        }
    }
}

function assignmentToHTML(assignment){
    return `
    <p class="statusBar_profileInformation">Materia:</p>
    <p class="statusBar_profileInformation">${assignment.subjectName}</p>`;
}
//-------------------------------------------------/Assignment------------------------------------------------------------------------

//-------------------------------------------------Professor------------------------------------------------------------------------
function getProfessor(){
    let professorName =  document.getElementById("professorName")
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/users')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            let usersList = (JSON.parse(xhr.responseText));
            console.log("Obtiene usersList:");
            console.log(teacherID)
            let teacher = usersList.find(a => a.userID == teacherID)
            console.log("Obtiene teacher:");
            console.log(teacher)
            professorName.innerHTML = professorToHTML(teacher)
        }
    }
}

function professorToHTML(professor){
    return `
    <p class="statusBar_profileInformation">Profesor:</p>  
    <p class="statusBar_profileInformation">${professor.name}</p>`;
}
//-------------------------------------------------/Professor------------------------------------------------------------------------

// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://localhost:3000/IAE')
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.send();
// xhr.onload = () =>{
//     if(xhr.status != 200){
//         alert(`${xhr.status} Fallo registro de obtener`)
//     }
//     else{
//         showUsers(JSON.parse(xhr.responseText));
//     }
// }

// function showUsers(data){
//     var text = "";

//    data.forEach(element => {
//       text += userToHtml(element)
//    });

//     document.getElementById("questions").innerHTML = text;

// }

// function userToHtml(obj) {
//     //console.log(obj);
//     if (obj.typequestion == "n"){
//         return `
//         <div class="row" >
//         <div class="col-11 offset-1">
//             <h3 onclick="deletequestion(this.innerHTML)">${obj.id}. ${obj.question}</h3>
//         </div>
//     </div>
//     <div class="row">
//         <div class="col-12 d-flex justify-content-center">
//             <form class="col-10" name="registrationForm">
//                 <input style="background-color: #004270;" type="range"
//                     name="ageInputName" id="ageInputId" value="0" min="0" max="5"
//                     oninput="ageOutputId.value = ageInputId.value">
//                 <output name="ageOutputName" id="ageOutputId">0</output>
//             </form>
//         </div>              
//     </div>
//     `}
//     else{
//         return `
//         <div class="row"  >
//         <div class="col-11 mt-4 offset-1">
//             <h3 onclick="deletequestion(this.innerHTML)">${obj.id}. ${obj.question}</h3>
//         </div>
//     </div>
//     <div class="row">
//         <div class="col-10 offset-1 d-flex justify-content-center">
//             <form class="col-12" name="registrationForm">                               
//                 <textarea class="col-12 inputText"></textarea>            
//             </form>
//         </div>              
//     </div>
//     `
//     }
// }

// form.addEventListener("change", () =>{
//     let invalid = document.querySelectorAll('input:invalid');
    
//    if (invalid.length<1){
//         butreg.disabled = false;
//     }
//     else if ( invalid.length >0){
//         butreg.disabled = true;
//     }
    
    
// });

// butreg.addEventListener("click", function(event) {
//     event.preventDefault();
//     let data = document.querySelectorAll('#questioncreator input')

//     console.log(data);
//     let cdata =   {
//             "question": data[0].value,
//             "typequestion": document.querySelector('input[name="question"]:checked').value
//     }
    
//     let reguser = JSON.stringify(cdata)
//     sendregister(reguser)
  
    
// })

// function question(data1, data2){
//     if(data1 == "t"){
//         return "t"
//     }
//     else{
//         return "n"
//     }
// }

// function sendregister(datos){
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost:3000/IAE')
//     xhr.setRequestHeader('Content-Type', 'application/json')
//     console.log(datos);
//     xhr.send(datos)
//     xhr.onload = ()=>{
//         if(xhr.status != 201){
//             alert(`${xhr.status} Fallo registro`)
//         }
//         else{
//             alert("La asignatura fue registrada")
//         }
//     }
// }


// function deletequestion(question){
//    let answer = confirm("Deseas eliminar la pregunta?")
//    if(answer == true){
//     let xhr = new XMLHttpRequest();
//     xhr.open('DELETE',  `http://localhost:3000/IAE/${question[0]}`)
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send();
//     xhr.onload = () =>{
//         if(xhr.status != 200){
//             alert(`${xhr.status} Fallo registro de obtener`)
//         }
//         else{
//             alert("Pregunta eliminada");
//         }
//     }
//     }   
// }