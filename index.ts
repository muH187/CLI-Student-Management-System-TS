#! /usr/bin/env node

import inquirer from "inquirer"

class Student{
    static counter = 10000
    id: number
    name: string
    courses: string[]
    balance: number

    constructor(name: string) {
        this.id = Student.counter++
        this.name = name
        this.courses = []
        this.balance = 100
    }

    enroll_course(course: string) {
        this.courses.push(course)
    }

    view_balance() {    
        console.log(`Balance for ${this.name}: $${this.balance}`)
    }

    pay_fees(amount: number) {
        this.balance -= amount
        console.log(`$${amount} Fees paid successfully for ${this.name}`)
    }

    all_details() {
        console.log(this)
    }
}

class Student_manager{
    student: Student[]

    constructor() {
        this.student = []
    }

    add_student(name: string) {
        
        let student = new Student(name)
        this.student.push(student)
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`)
    }

    findStudent(student_id: number) {
        return this.student.find(std => std.id === student_id)
    }

    enroll_student(student_id: number, course: string) {
        let student = this.findStudent(student_id)
        if(student) {
            student.enroll_course(course)
            console.log(`${student.name} enrolled in ${course} successfully`)
        }
    }

    view_student_balance(student_id: number) {
        let student = this.findStudent(student_id)
        if(student) {
            student.view_balance()
        } else {
            console.log("Student Not Found! Please Enter A Correct Student ID.")
        }
    }

    payStudentFee(student_id: number, amount: number) {
        let student = this.findStudent(student_id)
        if(student) {
            student.pay_fees(amount)
        } else {
            console.log("Student Not Found! Please Enter A Correct Student ID.")
        }
    }

    showStudentStatus(student_id: number) {
        let student = this.findStudent(student_id)
        if(student) {
            student.all_details()
        }
    }
}

async function main() {
    console.log("Welcome To Student Management System!")
    console.log("-".repeat(50))

    let studentManager = new Student_manager()

    while(true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                message: "Select an Option",
                type: "list",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ])
        
        switch(choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student name"
                    }
                ])
                studentManager.add_student(nameInput.name)
                break

            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        message: "Enter Student ID",
                        type: "number"
                    },
                    {
                        name: "course",
                        message: "Enter Course Name",
                        type: "input"
                    }
                ])
                studentManager.enroll_student(courseInput.studentId, courseInput.course)
                break
            
            case "View Student Balance": 
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter Student ID."
                    }
                ])
                studentManager.view_student_balance(balanceInput.studentId)
                break
            
            case "Pay Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "StudentId",
                        type: "number",
                        message: "Enter Student ID" 
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter The Amount to Pay"
                    }
                ])
                studentManager.payStudentFee(feesInput.StudentId, feesInput.amount)
                break
            
            case "Show Status":
                let showStatus = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter Student ID"
                    }
                ])
                studentManager.showStudentStatus(showStatus.studentId)
                break

            case "Exit":
                console.log("Exiting")
                process.exit()

        }
    }
}

main()