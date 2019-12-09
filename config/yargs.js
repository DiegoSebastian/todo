const description = {
    alias: 'd',
    demand: true,
    desc: 'Descripción de la tarea'
}

const completed = {
    alias: 'c',
    default: false,
    desc: 'Estado de la tarea'
}

const { argv } = require('yargs')
    .command('create', 'Crear tarea por hacer', {
        description,
        completed
    })
    .command('update', 'Actualizar estado de una tarea', {
        description,
        completed: {
            ...completed,
            default: true
        }
    })
    .command('remove', 'Borrar una tarea', {
        description
    })
    .help();

module.exports = {
    argv
}