const colors = require('colors');
const fs = require('fs');

let list = []

const saveDB = () => {
    let data = JSON.stringify(list)
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw err;
        console.log('Se ha guardado el archivo data.json'.green);
    });
}

const loadDB = () => {
    try {
        list = require('../db/data.json');
    } catch (err) {
        list = []
    }
}

const create = (description, completed = falase) => {
    let tarea = {
        description,
        completed
    }
    loadDB();
    list.push(tarea);
    saveDB();
    return tarea;
}

const update = (description, completed = true) => {
    loadDB();
    let index = list.findIndex(tarea => tarea.description == description);
    list[index].completed = completed;
    saveDB();
    return list[index];
}

const remove = (description) => {
    loadDB();
    let index = list.findIndex(tarea => tarea.description == description);
    list.splice(index, 1);
    saveDB();
    return description;
}

const check = (completed) => {
    loadDB();
    let newList = '';
    switch (completed) {
        case 'true':
            newList = list.filter(item => item.completed == true);
            break;
        case 'false':
            newList = list.filter(item => item.completed == false);
            break;
        default:
            newList = list;

    }
    if (list.length == 0) return 'No hay tareas';
    return newList;
}

const clear = () => {
    fs.writeFile('db/data.json', JSON.stringify(list), (err) => {
        if (err) throw err;
        console.log('Se ha limpiado la base de datos'.red);
    })
}

module.exports = {
    create,
    update,
    remove,
    check,
    clear
}