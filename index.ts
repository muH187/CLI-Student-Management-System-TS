#! /usr/bin/env node

import inquirer from "inquirer"

class Student{
    static counter = 10000
    id: number,
    name: string,
    courses: string[],
    balance: number,

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

    enroll_student(student_id: number, course: string) {
        let student = this.student.find(std => std.id === student_id)
        if(student) {
            student.enroll_course(course)
            console.log(`${student.name} enrolled in ${course} successfully`)
        }
    }

    view_student_balance() {
        
    }
}