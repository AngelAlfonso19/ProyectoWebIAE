// let asssigmentList
// let temporalAssessments
let subjectID
let teacherID
let temporalPollID = localStorage.getItem('pollID')


getAnswers()
getAssessment()
getAssigments()
getProfessor()
// window.location.reload()

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
            console.log("Obtiene answerList:");
            console.log(answerList);
            let filteredList = answerList.filter(a => a.pollID.includes(temporalPollID))
            console.log("Filtra answerList");
            console.log(filteredList);
            filteredAnswers = filteredList
            answerListToHTML(filteredList)
        }
    }
}

function answerListToHTML(answerList){
    let questions = document.getElementById("questions")
    let rankq1 = [0,0,0,0,0,0]
    let rankq2 = [0,0,0,0,0,0]
    let rankq3 = [0,0,0,0,0,0]
    let rankq4 = [0,0,0,0,0,0]
    let rankq5 = [0,0,0,0,0,0]
    let rankq6 = []
    let rankq7 = []
    let rankq8 = []
    let i = 0
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
        }

        if(a.q3.type == 0){
            switch(a.q3.answer){
                case 0:
                    rankq3[0]++;
                    break;
                case 1:
                    rankq3[1]++;
                    break;
                case 2:
                    rankq3[2]++;
                    break;
                case 3:
                    rankq3[3]++;
                    break;
                case 4:
                    rankq3[4]++;
                    break;
                case 5:
                    rankq3[5]++;
                    break;
            }
        }
        
        if(a.q4.type == 0){
            switch(a.q4.answer){
                case 0:
                    rankq4[0]++;
                    break;
                case 1:
                    rankq4[1]++;
                    break;
                case 2:
                    rankq4[2]++;
                    break;
                case 3:
                    rankq4[3]++;
                    break;
                case 4:
                    rankq4[4]++;
                    break;
                case 5:
                    rankq4[5]++;
                    break;
            }
        }

        if(a.q5.type == 0){
            switch(a.q5.answer){
                case 0:
                    rankq5[0]++;
                    break;
                case 1:
                    rankq5[1]++;
                    break;
                case 2:
                    rankq5[2]++;
                    break;
                case 3:
                    rankq5[3]++;
                    break;
                case 4:
                    rankq5[4]++;
                    break;
                case 5:
                    rankq5[5]++;
                    break;
            }
        }
        if(a.q6.type == 1){
            rankq6[i] = a.q6.answer;
            i++;
        }
        if(a.q7.type == 1){
            rankq7[i] = a.q7.answer;
            i++;
        }
        if(a.q8.type == 1){
            rankq8[i] = a.q8.answer;
            i++;
        }   
    })
    questions.innerHTML = numericAnswerToHTML(rankq1, answerList[0].q1.title, answerList.length)
    questions.innerHTML += numericAnswerToHTML(rankq2, answerList[0].q2.title, answerList.length)
    questions.innerHTML += numericAnswerToHTML(rankq3, answerList[0].q3.title, answerList.length)  
    questions.innerHTML += numericAnswerToHTML(rankq4, answerList[0].q4.title, answerList.length)
    questions.innerHTML += numericAnswerToHTML(rankq4, answerList[0].q5.title, answerList.length)
    questions.innerHTML += stringAnswerToHTML(rankq6, answerList[0].q6.title)
    questions.innerHTML += stringAnswerToHTML(rankq7, answerList[0].q7.title)
    questions.innerHTML += stringAnswerToHTML(rankq8, answerList[0].q8.title)
}

function numericAnswerToHTML(answers, answerTitle, answerListSize){ 
    let i = 0
    let percentage = [0,0,0,0,0,0]
    answers.forEach(a =>{
        percentage[i] = (a * 100)/answerListSize
        i++
    })
    console.log(percentage)

    return `                                                        
    <!-- Answer1 -->
    <div class="row mt-4">
        <div class="container-fluid">
            <div class="row">
                <div class="col mt-5 offset-1">
                    <h3>${answerTitle}</h3>
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

function stringAnswerToHTML(answers, answerTitle){
    let answersBox = answers.map(a => stringAnswersBoxToHTML(a)).join('')

return `
    <!-- Answer8 -->
    <div class="row mt-4">
        <div class="col-11 mt-5 offset-1">
            <h3>${answerTitle}</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-10 offset-1 d-flex justify-content-center">
            <form class="col-12" name="registrationForm">                               
                ${answersBox}   
            </form>
        </div>              
    </div>
    <!-- /Answer8 -->`;
}

function stringAnswersBoxToHTML(answer){
    return `
    <textarea class="col-12 inputText">${answer}</textarea>`;
}
//-------------------------------------------------/Answers------------------------------------------------------------------------

//-------------------------------------------------Assessment------------------------------------------------------------------------
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
            let assessmentList = (JSON.parse(xhr.responseText));
            console.log("Obtiene assessmentList:");
            console.log(assessmentList)
            let filteredList = assessmentList.find(a => a.pollID == temporalPollID)
            console.log("Filtra assessmentList");
            console.log(filteredList)
            subjectID = filteredList.subjectID
            console.log("Obtiene subjectID");
            console.log(subjectID)
        }
    }
}
//-------------------------------------------------/Assessment------------------------------------------------------------------------

//-------------------------------------------------Assignments------------------------------------------------------------------------
function getAssigments(){
    let assignmentInfo = document.getElementById("assignmentInfo")
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
            assignmentInfo.innerHTML = assignmentToHTML(assignment)
        }
    }
}

function assignmentToHTML(assignment){
    return `
    <div class="col-12 mt-4 d-flex justify-content-center">
    <p class="statusBar_profileInformation">Materia:</p>
    <p class="statusBar_profileInformation">${assignment.subjectName}</p>
    </div>`;
}
//-------------------------------------------------/Assignments------------------------------------------------------------------------

//-------------------------------------------------Professor------------------------------------------------------------------------
function getProfessor(){
    let professorInfo =  document.getElementById("professorInformation")
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
            professorInfo.innerHTML = professorToHTML(teacher)
        }
    }
}

function professorToHTML(professor){
    return `
    <div class="row">
    <div class="col-12 mt-0 d-flex justify-content-center">
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


//-------------------------------------------------/Professor------------------------------------------------------------------------

//Assigments
function assigmentListToHTML(assigmentsList){
    document.getElementById("listSubject").innerHTML = assigmentsList.map(a => assigmentToHTML(a)).join('<br>')
}

function assigmentToHTML(assigment){
    return `                                                        
    <option>${assigment.SubjectName}</option>`;
}