'use strict'

const fs = require('fs'); 

const readFile = (fileName) => {
   return fs.readFileSync(fileName).toString().split('\n')
}

// Advent Day 2 - Part 1
const findExactly = (id, times) => {
   let hits = [];

   for (var i = 0; i < id.length; i++) {
      const letter = id[i]
      const hitIndex = hits.findIndex(x => x.letter === letter)
      
      if(hitIndex === -1) {
         hits.push({letter : letter, count : 1})
      } else {
         hits[hitIndex].count = hits[hitIndex].count + 1
      }
   }

   return hits.find(hit => hit.count === times) ? 1 : 0;
}

const checksum = (ids) => {
   const idsTwice = ids.map(id => findExactly(id, 2)).reduce((acc, current) => acc + current)
   const idsThrice = ids.map(id => findExactly(id, 3)).reduce((acc, current) => acc + current)

   return idsTwice * idsThrice
}

const ids = readFile('day2.txt')

console.log(`Day 2, Part 1 result = ${checksum(ids)}`)
