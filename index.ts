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
