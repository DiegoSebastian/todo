const { argv } = require('./config/yargs');
const todo = require('./todo/todo');
const colors = require('colors/safe');

const command = argv._[0];
let tarea = '';

switch (command) {
    case 'create':
        tarea = todo.create(argv.d, argv.c);
        console.log(`La tarea ${colors.rainbow(tarea.description)} ha sido creada y su estado es: ${tarea.completed == true ? 'Completado' : 'No completado'}`);
        break;
    case 'update':
        tarea = todo.update(argv.d, argv.c);
        console.log(`La tarea ${colors.rainbow(tarea.description)} ha sido actualizada y su nuevo estado es: ${tarea.completed == true ? 'Completado' : 'No completado'}`);
        break;
    case 'check':
        tarea = todo.check(argv.c);
        if (typeof tarea == 'string') {
            console.log(tarea)
        } else {
            tarea.map(item => {
                console.log('============TODO=========='.rainbow);
                console.log(`Tarea: ${item.description}`.yellow);
                console.log(`Estado: ${item.completed == true ? 'Completado' : 'No completado'}`.yellow);
                console.log('=========================='.rainbow);
            });
        }
        break;
    case 'remove':
        tarea = todo.remove(argv.d);
        console.log(`La tarea ${tarea.rainbow} fue eliminada`.red);
        break;
    case 'clear':
        todo.clear();
        break;
    default:
        console.log('Comando no reconocido');
}