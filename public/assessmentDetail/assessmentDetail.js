let asssigmentList
let temporalAssessments
let SubjectID
let temporalPollID = "1234A"

// getProfessor();
getAnswers()

//-------------------------------------------------Answers------------------------------------------------------------------------
function getAnswers(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/answers')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            let answerList = JSON.parse(xhr.responseText);
            console.log(answerList);
            const filteredList = answerList.filter(a => a.pollID.includes(temporalPollID))
            console.log(filteredList);
            answerListToHTML(filteredList)
        }
    }
}

function answerListToHTML(answerList){
    let rankq1 = [0,0,0,0,0,0]
    let rankq2 = [0,0,0,0,0,0]
    let rankq3 = [0,0,0,0,0,0]
    let rankq4 = [0,0,0,0,0,0]
    let rankq5 = [0,0,0,0,0,0]
    answerList.forEach(a => {
        if(a.q1.type == 0){
            switch(a.q1.answer){
                case 0:
                    rankq1[0]++;
                    break;
                case 1:
                    rankq1[1]++;
                    break;
                case 2:
                    rankq1[2]++;
                    break;
                case 3:
                    rankq1[3]++;
                    break;
                case 4:
                    rankq1[4]++;
                    break;
                case 5:
                    rankq1[5]++;
                    break;
            }
            document.getElementById("questions").innerHTML = numericAnswerToHTML(rankq1, answerList.length)
        }

        if(a.q2.type == 0){
            switch(a.q2.answer){
                case 0:
                    rankq2[0]++;
                    break;
                case 1:
                    rankq2[1]++;
                    break;
                case 2:
                    rankq2[2]++;
                    break;
                case 3:
                    rankq2[3]++;
                    break;
                case 4:
                    rankq2[4]++;
                    break;
                case 5:
                    rankq2[5]++;
                    break;
            }
            document.getElementById("questions").innerHTML += numericAnswerToHTML(rankq2, answerList.length)
        }    
    })
    
}

function numericAnswerToHTML(answers, answerListSize){ 
    let i = 0
    let percentage = [0,0,0,0,0,0]
    answers.forEach(a =>{
        percentage[i] = (a * 100)/answerListSize
        i++
    })
    // console.log(percentage)

    return `                                                        
    <!-- Answer1 -->
    <div class="row">
        <div class="container-fluid">
            <div class="row">
                <div class="col mt-5 offset-1">
                    <h3>1. Pregunta 1</h3>
                </div>
            </div>
            <div class="row">
                <div class="col d-flex justify-content-center">
                    <table class="graph">                                        
                        <caption>Bar Chart HTML From HTML Table</caption>
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Percent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="height:${percentage[0]}%">
                                <th scope="row">0</th>
                                <td><span>${percentage[0]}%</span></td>
                            </tr>
                            <tr style="height:${percentage[1]}%">
                                <th scope="row">1</th>
                                <td><span>${percentage[1]}%</span></td>
                            </tr>
                            <tr style="height:${percentage[2]}%">
                                <th scope="row">2</th>
                                <td><span>${percentage[2]}%</span></td>
                            </tr>
                            <tr style="height:${percentage[3]}%">
                                <th scope="row">3</th>
                                <td><span>${percentage[3]}%</span></td>
                            </tr>
                            <tr style="height:${percentage[4]}%">
                                <th scope="row">4</th>
                                <td><span>${percentage[4]}%</span></td>
                            </tr>
                            <tr style="height:${percentage[5]}%">
                                <th scope="row">5</th>
                                <td><span>${percentage[5]}%</span></td>
                            </tr>
                        </tbody>
                    </table>  
                </div>                             
            </div>
        </div>
    </div>
    <!-- /Answer1 -->`;
}

function splitAnswer(answerList){

}

//-------------------------------------------------/Answers------------------------------------------------------------------------

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
            console.log(userList[7]) 
            document.getElementById("professorInformation").innerHTML = professorToHTML(userList[7]);
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
                            <img class="img-circle evaluation_professorPhoto" src="${professor.img}" alt="profilePhotoProfessor.jpg">
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