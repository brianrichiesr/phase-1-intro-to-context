const createEmployeeRecord = (arr) => {
    /* Create an object, create properties to be assigned info from arr with 2 additional properties that assigned empty arrays to be returned when function is called */
    return  {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

const createEmployeeRecords = (arr) => {
    /* Use array method '.map()' to iterate through 'arr' to return a new array of employee record objects */
    return arr.map(item => {
        return createEmployeeRecord(item);
    })
}

const createTimeInEvent = (employeeRecord, dateStamp) => {
    /* Create a new array with '.split()' method on 'dateStamp' which makes index 0 the date and index 1 the time */
    const data = dateStamp.split(" ");
    /* Create a new object, define its properties, and assign values to the properties */
    const newDataToBeAdded = {
        type: "TimeIn",
        date: data[0],
        hour: Number(data[1])
    }
    /* Push 'newDataToAdded' to the 'timeInEvents' property of 'employeeRecord' */
    employeeRecord.timeInEvents.push(newDataToBeAdded);
    /* Return the modified 'employeeRecord' */
    return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {
    /* Create a new array with '.split()' method on 'dateStamp' which makes index 0 the date and index 1 the time */
    const data = dateStamp.split(" ");
    /* Create a new object, define its properties, and assign values to the properties */
    const newDataToBeAdded = {
        type: "TimeOut",
        date: data[0],
        hour: Number(data[1])
    }
    /* Push 'newDataToAdded' to the 'timeOutEvents' property of 'employeeRecord' */
    employeeRecord.timeOutEvents.push(newDataToBeAdded);
    /* Return the modified 'employeeRecord' */
    return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, dateWorked) => {
    /* Declare variables to times to be used in further functionality and assign them a value of 0 */
    let timeOut = 0;
    let timeIn = 0;
    /* Iterate through 'employeeRecord.timeOutEvents' array to find a record with a date that matches 'dateWorked' */
    for (let i = 0; i < employeeRecord.timeOutEvents.length; i++) {
        /* If a match is found, assign the 'hour' the employee signed out to 'timeOut' and the 'hour' the employee signed in to 'timeIn' since the object that keeps track of when the employee signed should have the same index in the 'timeInEvents' property of 'employeeRecord' and break out of the loop */
        if (employeeRecord.timeOutEvents[i].date === dateWorked) {
            timeOut = employeeRecord.timeOutEvents[i].hour;
            timeIn = employeeRecord.timeInEvents[i].hour;
            break;
        }
    }
    /* Return the result of 'timeIn' subtracted from 'timeOut' and divided by 100 to get an accurate number of hours the employee worked  */
    return (timeOut - timeIn)/100;
}

const wagesEarnedOnDate = (employeeRecord, dateStamp) => {
    /* Return the result of calling 'wagesEarnedOnDate', using the same arguments that were passed to this function when called, multiplied by the value of the 'payPerHour' property of 'employeeRecord' */
    return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour;
}

const allWagesFor = (employeeRecord) => {
    /* Return the sum of all wages earned for the hours recorded by using the 'reduce' method and calling 'wagesEarnedOnDate' on each date recorded */
    return employeeRecord.timeOutEvents.reduce((acc, curr) => {
        return acc + wagesEarnedOnDate(employeeRecord, curr.date);
    }, 0)
}

const calculatePayroll = (employeeArray) => {
    /* Return payroll by using the 'reduce' method and calling 'allWagesFor' on each record in 'employeeArray' */
     return employeeArray.reduce((acc, curr) => {
        return acc + allWagesFor(curr);
    }, 0);
}