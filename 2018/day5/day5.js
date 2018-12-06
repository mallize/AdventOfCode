'use strict'

const fs = require('fs');

const readFile = (fileName) => {
   return fs.readFileSync(fileName, 'utf8').toString().trim()
}

const hasReaction = (unit1, unit2) => (unit1.toLowerCase() === unit2.toLowerCase()) && (unit1 !== unit2)

const shouldStop = (polymer, position) => (polymer.length - 1) == position

const executeReactions = (polymer) => {
   let position = 0
   let currentPolymer = polymer

   while (!shouldStop(currentPolymer, position)) {
      const unit1 = currentPolymer[position]
      const unit2 = currentPolymer[position + 1]

      if (hasReaction(unit1, unit2)) {
         currentPolymer = currentPolymer.replace(unit1 + unit2, '')
         position = position === 0 ? 0 : position - 1
      } else {
         position = position + 1
      }
   }

   return currentPolymer
}

const polymer = readFile('day5.txt')

// part 1
console.log(`Day 5 - Part 1 answer = ${polymer.length} // units before`)
console.log(`Day 5 - Part 1 answer = ${executeReactions(polymer).length}`)

// part 2
// assume units = A-Z
const unitClasses = "abcdefghijklmnopqrstuvwxyz".split('')
const unitClassReductionLengths = unitClasses.map(unitClass => {
   const polymerWithClassRemoved = polymer.replace(new RegExp(unitClass, 'g'), '').replace(new RegExp(unitClass.toUpperCase(), 'g'), '')
   return executeReactions(polymerWithClassRemoved).length
})
const answer = Math.min(...unitClassReductionLengths)
console.log(`Day 5 - Part 2 answer = ${answer}`)






