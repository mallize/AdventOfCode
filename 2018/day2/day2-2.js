'use strict'

const fs = require('fs'); 

const readFile = (fileName) => {
   return fs.readFileSync(fileName).toString().split('\n')
}

// Advent Day 2 - Part 1
const findMatch = (list, id) => list.filter(currentId => {
   if (currentId === id) return false

   let differences = 0
   for (var i = 0; i < id.length; i++) {
      if (currentId[i] !== id[i]) {
         differences++
      }
   }

   return differences === 1
})

const findMatches = (list) => {
   const matches = list
      .map(id => ({id : id, matches : findMatch(list, id)}))
      .filter(matches => matches.matches.length > 0)

   const first = matches[0].id
   const second = matches[0].matches[0]

   let result = ""
   for (var i = 0; i < first.length; i++) {   
      if(first[i] == second[i]) {
         result = result + first[i]
      }
   }

   return result;
}

const ids = readFile('day2.txt')

console.log(`Day 2, Part 2 result = ${findMatches(ids)}`)
