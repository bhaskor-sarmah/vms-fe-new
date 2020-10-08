let baseSalary = 2000;
let overtime = 10;
let rate = 20;

function getSalary() {
  return baseSalary + overtime * rate;
}

function get3MonthOvertime() {
  return overtime * rate * 3;
}

console.log("Procedural Approach");
console.log(getSalary());
