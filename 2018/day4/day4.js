'use strict'

const fs = require('fs');

const readFile = (fileName) => {
   return fs.readFileSync(fileName).toString().split('\n')
}

const BEGINS_SHIFT = "begins shift"
const FALLS_ASLEEP = "falls asleep"
const WAKES_UP = "wakes up"

const createSleepJournal = (logs) => {
   const guardsSleep = []

   let currentGuard
   let sleepStart
   let sleepEnd

   logs.forEach(log => {
      const { action, timestamp } = log
      if (action.indexOf(BEGINS_SHIFT) >= 0) {
         const guardAction = action.split('#')[1]
         currentGuard = guardAction.slice(0, guardAction.indexOf(" "))

      } else if (action.indexOf(FALLS_ASLEEP) >= 0) {
         sleepStart = timestamp


      } else if (action.indexOf(WAKES_UP) >= 0) {
         sleepEnd = timestamp
         let guardIndex = guardsSleep.findIndex(entry => entry.guardId === currentGuard)
         if (guardIndex < 0) {
            guardIndex = guardsSleep.push({ guardId: currentGuard, sleepMinutes: {}, totalSleepMinutes: 0 }) - 1
         }

         guardsSleep[guardIndex].totalSleepMinutes = guardsSleep[guardIndex].totalSleepMinutes + (sleepEnd.getMinutes() - sleepStart.getMinutes())
         for (let i = sleepStart.getMinutes(); i < sleepEnd.getMinutes(); i++) {
            if (guardsSleep[guardIndex].sleepMinutes[i]) {
               guardsSleep[guardIndex].sleepMinutes[i]++
            } else {
               guardsSleep[guardIndex].sleepMinutes[i] = 1
            }
         }

         sleepStart = 0
         sleepEnd = 0
      }
   });

   return guardsSleep
}

const logs = readFile('day4.test.txt')
   .map(log => {
      const timeAction = log.split(']');
      const timestamp = new Date(timeAction[0].replace('[', '').replace(' ', 'T') + ':00')
      const action = timeAction[1].substring(1)

      return {
         timestamp: timestamp,
         action: action
      };
   }).sort((a, b) => a.timestamp - b.timestamp)

const journal = createSleepJournal(logs)

const findMostTotalMinutes = (journal) => {
   const minutes = journal.map(x => x.totalSleepMinutes)
   return Math.max(...minutes)
}

const findMostMinute = (guardEntry) => {
   const { sleepMinutes } = guardEntry
   const minutes = Object.values(sleepMinutes)
   const mostSleepForMinute = Math.max(...minutes)
   return Object
      .keys(mostAsleepGuard.sleepMinutes)
      .filter(x => mostAsleepGuard.sleepMinutes[x] === mostSleepForMinute)[0];
}

const mostSleepMinutes = findMostTotalMinutes(journal)
const mostAsleepGuard = journal.find(sleepEntry => sleepEntry.totalSleepMinutes === mostSleepMinutes)
const mostAsleepMinute = findMostMinute(mostAsleepGuard)

journal.forEach(log => console.log(`${JSON.stringify(log)}`))
console.log(`Guard ${mostAsleepGuard.guardId} slept the most during minute ${mostAsleepMinute}`)
console.log(`Day 4 - Part 1 answer = ${parseInt(mostAsleepGuard.guardId, 10) * parseInt(mostAsleepMinute, 10)}`)