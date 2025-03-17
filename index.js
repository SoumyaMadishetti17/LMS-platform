function generateandFetch(){
    let email=document.getElementById('email').value;
    let student_code=document.getElementById('student-code').value;
    if(!email || !student_code){
        alert('Please enter your email and id ...')
        return;
    }
    let authId=generateauthId(email,student_code)
    localStorage.setItem("authId",authId);
    fetchProblem(authId);
}
function generateauthId(email,student_code){
    let emailPrefix=email.split('@')[0];
    let combinedString=student_code+emailPrefix;
    combinedString=combinedString.toLowerCase();

    let filteredString='';
    for(let i=0;i<combinedString.length;i++){
        if((i+1)%2!==0){
            filteredString+=combinedString[i];

        }
    }
    let numericString="";
    for(let char of filteredString){
        if(/[a-z]/.test(char)){
            numericString+=(char.charCodeAt(0)-96);
        }else if(/[0-9]/.test(char)){
            numericString+=char;
        }else{
            numericString+='1';
        }
        
    }
        let left=0;
        let right=numericString.length-1;
        let authId='';
        while(left<=right){
            if(left===right) authId+=numericString[left]
            else authId+=numericString[left]+numericString[right];
            left++;
            right--;
        }
        return authId;    
}

function fetchProblem(authId){
    let problemsApi=`https://questionmapping.onrender.com/api/problem/${authId}`;
    fetch(problemsApi)
    .then(res =>
        res.json()
    ).then(data => {
        document.getElementById('auth-section').style.display="none";
        document.getElementById('problem-section').style.display="block";
        document.getElementById('pro-title').innerText=data.title;
        document.getElementById('pro-desc').innerText=data.description;
    })
    .catch(()=>{
        document.getElementById('pro-title').innerText='Problem=not-found';
        document.getElementById('pro-desc').innerText='please try other';
    })
}
function nextpro(){
    let authId=localStorage.getItem("authId")
    fetchProblem(authId)
}