window.onload = init;

function init() {
    let teacher = new Teacher({
        name: 'John',
        surname: 'Willy',
        age: 25,
        group: []
    });

    let buttonAddStudent = document.querySelector('.form-button').firstElementChild;
    let buttonUpdate = document.getElementById('update');

    let form = document.querySelector('.form-addStudent');
    let listOfStudents = document.querySelector('.listOfStudents');

    buttonAddStudent.onclick = function () {
        let inputs = Array.from(form).filter( (item) => item.type === 'text').map( (item) => item.value);

        [name, surname, age, mark, specialization] = inputs;

        teacher.group.push(new Student({
            name,
            surname,
            age: Number.parseInt(age),
            mark: mark.split(',').map( (item) => Number.parseInt(item)),
            specialization,
        }));
    }

    buttonUpdate.onclick = function () {
        teacher.group.sort( (student1, student2) => student2.averageMark() - student1.averageMark());

        let newStudent = teacher.group.map( (item) => '<li>' + item.name + ' - ' + item.surname + 
        ' - ' + item.averageMark() + '</li>').join("");

        listOfStudents.innerHTML = newStudent;
    }
}


class Human {
    constructor({name, surname, age}) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    getFullName() {
        return `${name} ${this.surname}`;
    }

    setFullName(fullName) {
        [this.name, this.surname] = fullName.split(' ');
    }
}

class Teacher extends Human {
    constructor({name, surname, age, group}){
        super({name, surname, age});
        this.group = group;
    }

    static setMarkByStudentName(teacherObj, mark, name) {
        [].find.call(teacherObj.group, (item) => item.name === name ? item.mark.push(mark) : false );
    }

    getListOfNamesByAverageMark() {
        return this.group.sort((a, b) => b.averageMark() - a.averageMark())
        .map( (item) => item.name );
    }

    getStudentByName(name) {
        return this.group.find( (item) => item.name === name);
    }

    removeStudentByName(name) {
        this.group.splice(this.group.indexOf(this.getStudentByName(name)), 1);
    }

    updateStudentByName(student, name) {
        this.group.splice(this.group.indexOf(this.getStudentByName(name)), 1, new Student(student));
    }
}

class Student extends Human {
    #specialization = '';

    constructor({name, surname, age, mark, specialization}) {
        super({name, surname, age});
        this.mark = mark;
        this.#specialization = specialization;
    }

    get specialization() {
        return this.#specialization;
    }

    averageMark() {
        return Math.round(this.mark.reduce( (acc, item) => acc += item, 0) / this.mark.length);
    }

    minMark() {
        return this.mark.sort( (a, b) => b - a )[mark.length - 1];
    }

    maxMark() {
        return this.mark.sort( (a, b) => a - b )[mark.length - 1];
    }

    getFullName() {
        return Human.prototype.getFullName.call(this) + ' - student';
    }
}