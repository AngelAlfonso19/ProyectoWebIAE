let asssigmentList
let temporalAssessments
let SubjectID
let temporalIAEkey = "1234A"
// getAssessment();
// getAssigments();
getProfessor();
getAnswers();
// getProfessors();


function getAnswers(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/IAEAnwers')
    xhr.setRequestHeader("Content-Type", "application/json");w
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            let anwersList = JSON.parse(xhr.responseText);
            console.log(anwersList)
            answerListTooHTML(anwersList)

        }
    }
}

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

function getProfessor(){
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
            console.log(userList[6]) 
            document.getElementById("professorInformation").innerHTML = professorToHTML(userList[6]);
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
    <div class="row">
    <div class="col-12 mt-4 d-flex justify-content-center">
        <!-- ProfessorProfilePhoto -->
        <div class="col-3 p-0 d-flex justify-content-center"> 
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col d-flex justify-content-center">
                        <a href="">
                            <img class="img-circle evaluation_professorPhoto" src="ProfilePhotoProfessor.jpg" alt="profilePhotoProfessor.jpg">
                        </a>                                            
                    </div>
                </div> 
            </div>
        </div>
        <!-- /ProfessorProfilePhoto -->
        <!-- ProfessorDataEvaluation -->
        <div class="col-5 p-0 mt-3 d-flex justify-content-center">
            <div class="container-fluid p-0">
                <div class="row">
                    <div class="col-5 pr-0">
                        <p class="evaluation_professorInformation">Promedio:</p>
                    </div>
                    <div class="col-1 p-0">
                        <p class="evaluation_professorInformation">A</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <p class="evaluation_professorInformation">Promedio clase:</p>
                    </div>
                    <div class="col-2 p-0">
                        <p class="evaluation_professorInformation">A+</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form">
                            <input type="text" id="form1" class="form-control">
                            <label class="mb-0" for="form1">Fecha</label>
                        </div>
                    </div>
                    <div class="col-4">
                        <input class="button" type="submit" value="Eliminar">
                    </div>
                </div>
            </div>
        </div>
        <!-- /ProfessorDataEvaluation -->
    </div>                            
</div>
<!-- ProfessorName -->
<div class="row">
    <div class="col-5 offset-1 p-0 d-flex justify-content-center" id="evaluation_professorNameContainer">
        <a href="">
            <p class="evaluation_professorInformation text-center" id="evaluation_professorName">${professor.lastName} ${professor.name}</p>
        </a>
    </div>
</div>
 <!-- /ProfessorName  -->
<!-- /ProfessorInformation  -->`;
}

//Assigments
function assigmentListToHTML(assigmentsList){
    document.getElementById("listSubject").innerHTML = assigmentsList.map(a => assigmentToHTML(a)).join('<br>')
}

function assigmentToHTML(assigment){
    return `                                                        
    <option>${assigment.SubjectName}</option>`;
}