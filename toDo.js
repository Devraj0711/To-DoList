const myToDo = document.querySelector('#toDo');
const item_Id1 = document.getElementById("toDolist");
const item_Id2 = document.getElementById("toDodone");

myToDo.addEventListener('submit', onSubmit);

const Tname=document.getElementById('ToDoname');
const description=document.getElementById('Dsp');

async function onSubmit(e) {
    e.preventDefault();
    console.log(Tname.value);
    console.log(description.value);
    const des = description.value.replace(/\n+/g, '\n').trim();
    let myobj = { my_name: Tname.value, my_des: des };
    console.log(myobj);
    let MyObj = JSON.stringify(myobj);
    localStorage.setItem(Tname.value, MyObj);
  
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/dc062205ab63494d931df412c646bfa9/ToDo",
        myobj
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  
    showOnScreen(myobj);
  }

function showOnScreen(myobj)
{
    const parentElement = document.getElementById("toDolist");
    const childElement = document.createElement('li');
    
    
    childElement.textContent = myobj.my_name + ' - ' ;
    const sentences = myobj.my_des.split("\n");

    sentences.forEach((sentence) => {
        const trimmedSentence = sentence.trim();
        if (trimmedSentence !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = trimmedSentence;
            childElement.appendChild(listItem);
        }
    });

    //childElement.appendChild(document.createTextNode('Done'));

    const TickButton = document.createElement('button');
    TickButton.className = 'button';
    TickButton.appendChild(document.createTextNode('Done'));
   
    childElement.appendChild(TickButton);
    parentElement.appendChild(childElement);

    //to add event listener to TickButton
    TickButton.addEventListener('click', async function () {
        
      try {
        localStorage.removeItem(myobj.my_des);
        parentElement.removeChild(childElement);
  
        const parentElement2 = document.getElementById("toDodone");
        const childElement2 = document.createElement('li');
        childElement2.textContent = myobj.my_name + ' - ';
        const sentences = myobj.my_des.split("\n");
  
        sentences.forEach((sentence) => {
          const trimmedSentence = sentence.trim();
          if (trimmedSentence !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = trimmedSentence;
            childElement2.appendChild(listItem);
          }
        });
  
        parentElement2.querySelector("h2").textContent = "Tasks Completed";
        parentElement2.appendChild(childElement2);
  
        // Assuming myobj._id has a valid value assigned
        const url = `https://crudcrud.com/api/dc062205ab63494d931df412c646bfa9/ToDo/${myobj._id}`;
  
        await axios.delete(url);
        console.log("Task deleted successfully!");
      } 
      catch (error) {
        console.log("Error deleting task:", error);
      }
    });
}