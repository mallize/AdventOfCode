'use strict'

const fs = require('fs'); 

const readFile = (fileName) => {
   return fs.readFileSync(fileName).toString().split('\n')
}

const extractClaims = (claimsArray) => claimsArray.map(claimString => {
   const atIndex = claimString.indexOf('@')
   const commaIndex = claimString.indexOf(',')
   const colonIndex = claimString.indexOf(':')
   const xIndex = claimString.indexOf('x')

   const id = claimString.slice(1, atIndex - 1)
   const leftOffset = claimString.slice(atIndex + 2, commaIndex)
   const topOffset = claimString.slice(commaIndex + 1, colonIndex)
   const width = claimString.slice(colonIndex + 2, xIndex)
   const height = claimString.slice(xIndex + 1, claimString.length)

   const claim = {
      id: id,
      leftOffset: parseInt(leftOffset, "10"),
      width: parseInt(width, "10"),
      topOffset: parseInt(topOffset, "10"),
      height: parseInt(height, "10")
   }

   return claim
})

const createFabricGrid = (x, y) => {
   const fabricGrid = []
   for (let i = 0; i <= x - 1; i++) {
      for (let j = 0; j <= y - 1; j++) {
         fabricGrid.push({ x: i, y: j, count: 0, claimIds: [] })
      }
   }

   return fabricGrid
}

const sectionHasClaim = (x, y, claim) => {
   const { leftOffset, width, topOffset, height } = claim

   const sectionClaim =
      (leftOffset <= x && x <= (width + leftOffset - 1)) &&
      (topOffset <= y && y <= (height + topOffset - 1))

   return sectionClaim
}

const markClaimedSections = (claims, fabricGrid) => {
   fabricGrid.forEach((section, index) => {
      claims.forEach(claim => {
         if (sectionHasClaim(section.x, section.y, claim)) {
            fabricGrid[index].count = fabricGrid[index].count + 1
            fabricGrid[index].claimIds.push(claim.id)
         }
      })
   })
}
const claimsFeedFromFile = readFile('day3.txt')
const claims = extractClaims(claimsFeedFromFile)
const fabricGrid = createFabricGrid(1000, 1000)
markClaimedSections(claims, fabricGrid)

// Day 3 - Part 1
const overlaps = fabricGrid.filter(section => section.count > 1).length
console.log(`Day 3 - Part 1 answer = ${JSON.stringify(overlaps)}`)

// Day 3 - Part 2
const noOverlap = Array.from(new Set(
   fabricGrid
      .filter(section => section.claimIds.length === 1)
      .map(section => section.claimIds[0]))
   )
   .map(candidate => {
      const sections = fabricGrid.filter(section => section.claimIds.includes(candidate) && section.claimIds.length > 1)
      return sections.length <= 0 ? candidate : null
   })
   .filter(x => x != null)

console.log(`Day 3 - Part 2 = ${JSON.stringify(noOverlap)}`)
