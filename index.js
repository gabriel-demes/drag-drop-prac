const containers = document.querySelectorAll('.container')



const load = () =>{
    contEvent()
    fetch('http://localhost:3000/students')
    .then(resp => resp.json())
    .then(students => {
        students.forEach(student =>{
            addPerson(student)
        })
    })

}

const addPerson = (student) => {
    const element = document.querySelector(`#${student.list}`)
    const p = document.createElement('p')
    p.textContent = student.name
    p.classList.add('draggable')
    p.draggable = "true"
    p.dataset.id = student.id
    p.dataset.list = student.list
    element.append(p)
    pEvent(p)
}

const pEvent = p =>{
    p.addEventListener('dragstart', ()=>{
            console.log('start')
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
        .then(student => {p.dataset.id = student.list})
    }
}

const contEvent = () => {
    containers.forEach(container => {
        container.addEventListener("dragover", (event)=>{
            event.preventDefault()
            const item = document.querySelector(".dragging")
            container.append(item)
        })
    });
}


load()