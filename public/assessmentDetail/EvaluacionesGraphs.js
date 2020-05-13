let asssigmentList
let temporalAssessments
let SubjectID
getAssessment();
getAssigments();
getProfessors();

function getAssessment(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/assessmentDetail')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            temporalAssessments = (JSON.parse(xhr.responseText));
            SubjectID = temporalAssessments[0].SubjectID
            console.log(SubjectID)
            // getRelatedAssignment(SubjectID)
        }
    }
}

function getAssigments(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/assignment')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            assigmentsList = JSON.parse(xhr.responseText);
            assigmentListToHTML(JSON.parse(xhr.responseText))
        }
    }
}

function getProfessors(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/users')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            userList = JSON.parse(xhr.responseText);
            console.log(userList)
            professorsListToHTML(userList)
        }
    }
}

function professorsListToHTML(userList){
    let professorsList = "";
    userList.forEach(professsor => {
        if(professsor.typo == 3){
            console.log(professsor);
            professorsList += professorToHTML(professsor)
        }
    });
    console.log(professorsList);
    document.getElementById("listTeachers").innerHTML = professorsList
}

function professorToHTML(professor){
    return `                                                        
    <option>${professor.name}</option>`;
}

//Assigments
function assigmentListToHTML(assigmentsList){
    document.getElementById("listSubject").innerHTML = assigmentsList.map(a => assigmentToHTML(a)).join('<br>')
}

function assigmentToHTML(assigment){
    return `                                                        
    <option>${assigment.SubjectName}</option>`;
}