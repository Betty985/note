//编译ts文件：  tsc greeter.ts
class Student{
    fullName:string;
    constructor(public firstName,public middleInitial,public lastName){
        this.fullName=firstName+ ' '+middleInitial +' '+lastName
    }
}

interface Person{
    firstName:string;
    lastName:string;
}
function greeter(person:Person){
    return 'Hello, '+person.firstName+' '+person.lastName
}
let user={firstName:'Jane',lastName:'White'},student=new Student("Jane", "M.", "User")
document.body.innerText=greeter(student)