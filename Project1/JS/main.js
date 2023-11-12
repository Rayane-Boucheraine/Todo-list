let missions = [
    {
        "title": "قراءة كتاب",
        "date": "15/8/2023",
        "isDone": false
    },
    {
        "title": "لعب مباراة",
        "date": "15/8/2023",
        "isDone": false
    },
]

function GetElementFromStorage() {
    let retrived = JSON.parse(localStorage.getItem("tasks"))
    if(retrived == null) {
        missions = []
    }
    else {
        missions = retrived
    }
}
GetElementFromStorage()

function FillMission() {
    document.getElementById("missions").innerHTML = ""
    let index = 0
    for(var i = 0; i < missions.length; i++) {
        let content = `<div class="mission ${missions[i].isDone ? "done" : ""}">
                            <div class="text">
                                <h3>${missions[i].title}</h3>
                                <div class="date">
                                    <i class="fa-solid fa-list"></i>
                                    <span>${missions[i].date}</span>
                                </div>
                            </div>
                            <div class="buttons">
                                <button onclick="DeleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                                ${missions[i].isDone ? 
                                    `<button onclick="ToggleMission(${index})" class="ChangeBack"> <i class="fa-solid fa-xmark"></i></button>` : 
                                    `<button onclick="ToggleMission(${index})"><i class="fa-solid fa-check"></i></button>`
                                }
                                <button onclick="UpdateMission(${index})"><i class="fa-solid fa-pen"></i></button>
                            </div>
                    </div>`
        document.getElementById("missions").innerHTML += content
        index++
    }
}

FillMission()


document.getElementById("AddMission").addEventListener("click", function() {
    var NameOfMission = prompt("الرجاء ادخال عنوان المهمة") 
    var date = new Date()
    var MissionObj = {
        "title": NameOfMission,
        "date": `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
        "isDone": false
    }
    missions.push(MissionObj)
    
    let missionString = JSON.stringify(missions)
    localStorage.setItem("tasks", missionString)

    FillMission()
})

function DeleteTask(index) {
    let decision = confirm(`هل تريد حذف المهمة : ${missions[index].title}؟`)
    if(decision == true){
        missions.splice(index, 1)
        TaskStorage()
        FillMission()
    }
}

function UpdateMission(index) {
    var updateName = prompt("الرجاء ادخال عنوان المهمة الجديد", missions[index].title)
    missions[index].title = updateName
    TaskStorage()
    FillMission()
}

function ToggleMission(index) {
    missions[index].isDone = !missions[index].isDone
    TaskStorage()
    FillMission()
}

function TaskStorage() {
    let missionString = JSON.stringify(missions)
    localStorage.setItem("tasks", missionString)
}
