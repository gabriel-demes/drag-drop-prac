const containers = document.querySelectorAll('.container')



const load = () =>{
    dropEvent()
    fetch('http://localhost:3000/students')
    .then(resp => resp.json())
    .then(students => {
        students.forEach(studentObj =>{
            addStudentToList(studentObj)
        })
    })

}

const addStudentToList = (studentObj) => {
    const correctList = document.querySelector(`#${studentObj.list}`)
    const nameP = document.createElement('p')
    nameP.textContent = studentObj.name
    nameP.classList.add('draggable')
    nameP.draggable = "true"
    nameP.dataset.id = studentObj.id
    nameP.dataset.list = studentObj.list
    correctList.append(nameP)
    dragEvent(nameP)
}

const dragEvent = p =>{
    p.addEventListener('dragstart', ()=>{
            p.classList.add('dragging')
        })
    p.addEventListener('dragend', ()=>{
        p.classList.remove('dragging')
        handleMovement(p)
        })  
}

const handleMovement = p =>{
    let currList = p.dataset.list
    if (currList != p.parentElement.id){
        if (currList === 'naughty'){currList = 'nice'}
        else{currList = 'naughty'}
        fetch(`http://localhost:3000/students/${p.dataset.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({list: currList})
        })
        .then(resp => resp.json())
        .then(student => {p.dataset.list = student.list})
    }
}

const dropEvent = () => {
    containers.forEach(container => {
        container.addEventListener("dragover", (event)=>{
            event.preventDefault()
            const item = document.querySelector(".dragging")
            container.append(item)
        })
    });
}


load()