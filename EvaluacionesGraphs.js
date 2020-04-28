let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/IAE')
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
xhr.onload = () =>{
    if(xhr.status != 200){
        alert(`${xhr.status} Fallo registro de obtener`)
    }
    else{
        
        showQuestions(JSON.parse(xhr.responseText));
    }
}

function showQuestions(data){
    var text = "";

   data.forEach(element => {
      text += userToHtml(element)
   });

    document.getElementById("questions").innerHTML = text;

}

function userToHtml(obj) {
    //console.log(obj);
    if (obj.typequestion == "n"){
        return `
        <div class="row">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col mt-5 offset-1">
                                            <h3>${obj.id}. ${obj.question}</h3>
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
                                                    <tr style="height:85%">
                                                        <th scope="row">0</th>
                                                        <td><span>85%</span></td>
                                                    </tr>
                                                    <tr style="height:23%">
                                                        <th scope="row">1</th>
                                                        <td><span>23%</span></td>
                                                    </tr>
                                                    <tr style="height:7%">
                                                        <th scope="row">2</th>
                                                        <td><span>7%</span></td>
                                                    </tr>
                                                    <tr style="height:38%">
                                                        <th scope="row">3</th>
                                                        <td><span>38%</span></td>
                                                    </tr>
                                                    <tr style="height:35%">
                                                        <th scope="row">4</th>
                                                        <td><span>35%</span></td>
                                                    </tr>
                                                    <tr style="height:35%">
                                                        <th scope="row">5</th>
                                                        <td><span>50%</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>  
                                        </div>                             
                                    </div>
                                </div>
                            </div>
    `}
    else{
        return `
        <div class="row">
                                <div class="col-11 mt-5 offset-1">
                                    <h3>${obj.id}. ${obj.question}</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-10 offset-1 d-flex justify-content-center">
                                    <form class="col-12" name="registrationForm">                               
                                        <textarea class="col-12 inputText"></textarea>            
                                    </form>
                                </div>              
                            </div>
    `
    }
}

let xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'http://localhost:3000/asignaturas')
xhr2.setRequestHeader("Content-Type", "application/json");
xhr2.send();
xhr2.onload = () =>{
    if(xhr2.status != 200){
        alert(`${xhr2.status} Fallo registro de obtener`)
    }
    else{
        
        calificacion(JSON.parse(xhr2.responseText));
    }
}

function calificacion(data){
    let teacher = document.getElementById('listTeachers').value
    let course = document.getElementById('listSubject').value
    console.log(data);
    data.forEach(ele, () =>{
        console.log(ele);
        if(ele.teacher == teacher && ele.title == course){
            let answers = data.IAE
            console.log(answers);
            answers.forEach(e, () => {
                console.log(e);
            })
        }
    })
    
}


