let getForm = document.getElementById("form")
let getTable = document.getElementById("table")
let createTbody = document.createElement("tbody")
getTable.appendChild(createTbody)

function Movies(name , image , relase){
    this.name = name;
    this.image = image;
    this.relase = relase;
Movies.all.push(this)
}
Movies.all=[]

getForm.addEventListener("submit",addMovies)

function addMovies(event){
    event.preventDefault()

    let name = event.target.name.value
    let image = event.target.image.value
    let relase = event.target.relase.value

    let newMoves = new Movies (name,image,relase)
    saveData()
    newMoves.render()
}

Movies.prototype.render = function(){

let createTr = document.createElement("tr")
createTbody.appendChild(createTr)
let createTdRemove = document.createElement('td')
createTr.appendChild(createTdRemove)
createTdRemove.textContent = "x"
createTdRemove.id='remove'
getTable.addEventListener('click' , removeItem)

let createTd = document.createElement('td')
createTr.appendChild(createTd)
let createImg = document.createElement("img")
createTd.appendChild(createImg)
createImg.src= "./img/"+ this.image

 createTd = document.createElement('td')
createTr.appendChild(createTd)
createTd.textContent = this.name


createTd = document.createElement('td')
createTr.appendChild(createTd)
createTd.textContent = this.relase

}

function saveData(){
    localStorage.setItem('data',JSON.stringify(Movies.all))
}

getData()

function getData(){
    let data =JSON.parse(localStorage.getItem('data'))
    if(data){
        for(let i =0 ;i<data.length ; i++){
            let newData = new Movies(data[i].name,data[i].image,data[i].relase)
            newData.render()
        }
    }
}
function removeItem(event){
    event.preventDefault()
    if(event.target.id = "remove"){
    let index = parseInt(event.target.parentElement.rowIndex)
    Movies.all.splice(index-1, 1)
    event.target.parentElement.remove()

 localStorage.setItem('data',JSON.stringify(Movies.all))

    }
}

let getClear = document.getElementById("clear")

getClear.addEventListener('click' , clear)
    function clear(event){

        event.preventDefault()

localStorage.clear()
getTable.innerHTML=""

}