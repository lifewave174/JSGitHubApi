const input= document.querySelector(".form-control")
const button=document.querySelector(".btn-primary")
const targetContainer= document.querySelector(".targetContainer")
let user=""
let url;




function getUsername(){
    return new Promise((resolve)=>{
        input.addEventListener("change",(e)=>{
           resolve(user=e.target.value);
           url=`https://api.github.com/users/${user}/repos`
          })
    })
}


async function getUserRepos(){
   await getUsername();
   fetch(`${url}`)
   .then(response=>response.json())
   .then(data=> {
       console.log(data)
       for(let item of data){
            let targetLi= document.createElement("li")
            targetContainer.appendChild(targetLi)  
            targetLi.style.listStyle="none"
            targetLi.style.margin="15px"
            targetLi.innerHTML=`<div class="card">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Description: ${item.description}</p>
              <a href=${item.html_url} class="btn btn-primary" target="_blank">Go to repository</a>
              <span style="padding-left: 76%;">Published at: ${item.pushed_at.slice(0,10)}</span>
            </div>
          </div>`
          
       }
   })
}

getUserRepos()