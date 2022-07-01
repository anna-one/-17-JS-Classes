// BUTTONS
const buttonCreateTask = document.getElementById('buttonAddTask');
const buttonFindTask = document.getElementById('buttonFindTask');
//

// LIST
const listOfTask = document.getElementById('listOfTask');
//

// INPUT
const inputText = document.getElementById('inputText');
//

class ToDoList {
    constructor(){
        this.items = [];
    };

    addTask(){
        if(inputText.value === ''){
            throw 'Type text';
        };
        const task = new Task(inputText.value);
        this.items.push(task);

        this.render()
    };

    changeStatusTask(item){
        item.isComplited = !item.isComplited;

        this.render();
    };

    buttonDelete(li, id){
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('buttonDelete');
        buttonDelete.textContent = 'Delete';

        li.append(buttonDelete);
        buttonDelete.addEventListener('click', () => {this.removeTask(id)});
    };

    removeTask(id){
        this.items = this.items.filter((item) => {return item.id !== id});
        this.render();
    };

    findTask(){
        this.render(inputText.value);
    };

    render(search){
        listOfTask.innerHTML = '';
        let itemsToRender = this.items;
        if(search){
            itemsToRender = this.items.filter((item) => {return item.text === search});
        };
        itemsToRender.forEach((item) => {
            const newLi = document.createElement('li');
            
            if(!item.isComplited){
                newLi.classList.toggle('task')
            }else{
                newLi.classList.toggle('done')
            };

            newLi.append(item.text);
            listOfTask.append(newLi);
            
            this.buttonDelete(newLi, item.id);
            newLi.addEventListener('click', () => {this.changeStatusTask(item)});
        });
    };
}

const toDolist = new ToDoList();

buttonCreateTask.addEventListener('click', () => {toDolist.addTask(), inputText.value = '';});
buttonFindTask.addEventListener('click', () => {toDolist.findTask()});


class Task {
    constructor(text) {
        this.text = text;
        this.id = Math.random();
        this.isComplited = false;
    }
};