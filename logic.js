const fs = require("fs/promises");

fs.readFile("./data.txt", "utf-8").then((data) => {
  const result = data.toString().split("\n").sort();

  let guardObj = {};
  let guard;

  for (let i = 0; i < result.length; i++) {
    if (result[i].includes("Guard")) {
      guard = result[i].match(/#\d+/).join("");
      guardObj[result[i].match(/#\d+/).join("")]
        ? null
        : (guardObj[result[i].match(/#\d+/).join("")] = 0);
      for (let j = i + 1; j < result.length; j++) {
        if (result[j].includes("Guard")) break;
        else if (result[j].includes("asleep")) {
          const sleepTime = result[j].slice(
            result[j].indexOf(":") + 1,
            result[j].indexOf(":") + 3
          );
          guardObj[guard] -= Number(sleepTime);
        } else if (result[j].includes("wakes")) {
          const wakeTime = result[j].slice(
            result[j].indexOf(":") + 1,
            result[j].indexOf(":") + 3
          );
          guardObj[guard] += Number(wakeTime);
        }
      }
    }
  }
  let sleepiestGuardTime = 0;
  let sleepiestGuard;

  for (let guard in guardObj) {
    if (guardObj[guard] > sleepiestGuardTime) {
      sleepiestGuard = guard;
      sleepiestGuardTime = guardObj[guard];
    }
  }

  const arrayOfSleepTime = [];

  for (let i = 0; i < result.length; i++) {
    if (result[i].includes(sleepiestGuard)) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[j].includes("Guard")) break;
        else if (result[j].includes("asleep")) {
          const sleepTime = result[j].slice(
            result[j].indexOf(":") + 1,
            result[j].indexOf(":") + 3
          );

          arrayOfSleepTime.push(Number(sleepTime));
        } else if (result[j].includes("wakes")) {
          const wakeTime = result[j].slice(
            result[j].indexOf(":") + 1,
            result[j].indexOf(":") + 3
          );
          arrayOfSleepTime.push(Number(wakeTime));
        }
      }
    }
  }

  const totalTimesAsleepInMinute = {};
  for (let i = 0; i < arrayOfSleepTime.length; i++) {
    if (i % 2 !== 2) {
      let counter = arrayOfSleepTime[i];
      while (counter < arrayOfSleepTime[i + 1]) {
        totalTimesAsleepInMinute[counter]
          ? (totalTimesAsleepInMinute[counter] += 1)
          : (totalTimesAsleepInMinute[counter] = 1);
        counter++;
        console.log(totalTimesAsleepInMinute);
      }
    }
  }

  let winner;
  let counter = 0;
  for (let time in totalTimesAsleepInMinute) {
    if (totalTimesAsleepInMinute[time] > counter) {
      winner = time;
      counter = totalTimesAsleepInMinute[time];
    }
  }
  console.log(sleepiestGuard, winner);
  //1523, 14
});
