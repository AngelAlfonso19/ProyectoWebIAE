let form = document.querySelector('#questioncreator')
let invalid = document.querySelectorAll('input:invalid')
let butreg = document.querySelector('#create')



let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/IAE')
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
xhr.onload = () =>{
    if(xhr.status != 200){
        alert(`${xhr.status} Fallo registro de obtener`)
    }
    else{
        showUsers(JSON.parse(xhr.responseText));
    }
}

function showUsers(data){
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
        <div class="row" >
        <div class="col-11 offset-1">
            <h3 onclick="deletequestion(this.innerHTML)">${obj.id}. ${obj.question}</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-12 d-flex justify-content-center">
            <form class="col-10" name="registrationForm">
                <input style="background-color: #004270;" type="range"
                    name="ageInputName" id="ageInputId" value="0" min="0" max="5"
                    oninput="ageOutputId.value = ageInputId.value">
                <output name="ageOutputName" id="ageOutputId">0</output>
            </form>
        </div>              
    </div>
    `}
    else{
        return `
        <div class="row"  >
        <div class="col-11 mt-4 offset-1">
            <h3 onclick="deletequestion(this.innerHTML)">${obj.id}. ${obj.question}</h3>
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

form.addEventListener("change", () =>{
    let invalid = document.querySelectorAll('input:invalid');
    
   if (invalid.length<1){
        butreg.disabled = false;
    }
    else if ( invalid.length >0){
        butreg.disabled = true;
    }
    
    
});

butreg.addEventListener("click", function(event) {
    event.preventDefault();
    let data = document.querySelectorAll('#questioncreator input')

    console.log(data);
    let cdata =   {
            "question": data[0].value,
            "typequestion": document.querySelector('input[name="question"]:checked').value
    }
    
    let reguser = JSON.stringify(cdata)
    sendregister(reguser)
  
    
})

function question(data1, data2){
    if(data1 == "t"){
        return "t"
    }
    else{
        return "n"
    }
}

function sendregister(datos){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/IAE')
    xhr.setRequestHeader('Content-Type', 'application/json')
    console.log(datos);
    xhr.send(datos)
    xhr.onload = ()=>{
        if(xhr.status != 201){
            alert(`${xhr.status} Fallo registro`)
        }
        else{
            alert("La asignatura fue registrada")
        }
    }
}


function deletequestion(question){
   let answer = confirm("Deseas eliminar la pregunta?")
   if(answer == true){
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE',  `http://localhost:3000/IAE/${question[0]}`)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            alert("Pregunta eliminada");
        }
    }
    }   
}