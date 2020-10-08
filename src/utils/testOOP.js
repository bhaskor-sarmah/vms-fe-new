class employee {
  constructor(empSalary, empOvertime, empRate) {
    this.baseSalary = empSalary;
    this.overtime = empOvertime;
    this.rate = empRate;
  }

  getWage() {
    return this.baseSalary + this.overtime * this.rate;
  }
}

console.log("Class Based Approach");

const emp1 = new employee(2000, 10, 20);

console.log(emp1.getWage());
