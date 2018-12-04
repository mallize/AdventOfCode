'use strict'

const fs = require('fs');

const readFile = (fileName) => {
   return fs.readFileSync(fileName).toString().split('\n').map(item =>  parseInt(item, 10))
}

// Advent Day 1 - Part 1
const frequencyAdjustments = readFile('day1.txt')
console.log(`Day 1 - Part 1 answer = ${frequencyAdjustments.reduce((acc, current) => acc + current)}`)

// Advent Day 1 - Part 2
const findFirstDuplicateFrequency = (numbers, frequencies, start = 0) => {
   let answer

   numbers.reduce((acc, current) => {
      const newAcc = acc + current
      if((frequencies.includes(newAcc)) && (answer == undefined)) {
         answer = newAcc
      } 
      frequencies.push(newAcc)
      return newAcc
   }, start)
   return answer ? answer : findFirstDuplicateFrequency(numbers, frequencies, frequencies[frequencies.length-1])
}

const result = findFirstDuplicateFrequency(frequencyAdjustments, [0]);
console.log(`Day 1 - Part 2 answer = ${result}`)