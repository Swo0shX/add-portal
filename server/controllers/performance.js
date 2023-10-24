import PerformanceDetails from "../models/performance.js";
import { join } from "path";
import excel from "exceljs";

export const uploadMonitoringFile = async (req, res) => {
  try {
    const { userId, filename } = req.body;
    processWorkSheet(userId, filename);
    res.status(200).json({ message: "uploaded successfully." });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

async function processWorkSheet(userId, filename) {
  try {
    console.log(filename);
    const fullname = join("./public/", "assets/", filename);
    console.log(fullname);
    const workbook = new excel.Workbook();
    await workbook.xlsx.readFile(fullname);

    let jData = [
      {
        RequestType: "",
        RequestNumber: "",
        Description: "",
        DateReceived: new Date(),
        TargetEndDate: new Date(),
        DateCompleted: new Date(),
        RequestStatus: "",
        KRA: "",
        Rating: 0,
        Remarks: "",
        PauseTime: 0,
      },
    ];
    workbook.worksheets.forEach(function (sheet) {
      let firstRow = sheet.getRow(1);
      if (!firstRow.cellCount) return;
      let keys = firstRow.values;

      sheet.eachRow((row, rowNumber) => {
        if (rowNumber == 1) return;
        let values = row.values;
        let obj = {};

        for (let i = 1; i < keys.length; i++) {
          obj[keys[i]] = values[i];
        }
        jData.push(obj);
      });
    });

    uploadFile({ filename: fullname, user: "mark", jsonData: jData });
  } catch (err) {
    console.log({ message: err.message });
  }
}

const uploadFile = async ({ filename, user, jsonData }) => {
  console.log(filename);
  console.log(user);

  jsonData.forEach(async (element) => {
    if (element.RequestType.length > 0) {
      const savedFile = await PerformanceDetails.create({
        filename,
        userId: user,
        requestType: element.RequestType,
        requestNo: element.RequestNumber,
        description: element.Description,
        dateReceived: element.DateReceived,
        targetEndDate: element.TargetEndDate,
        dateCompleted: element.DateCompleted,
        requestStatus: element.RequestStatus,
        kra: element.KRA,
        remarks: element.Remarks,
        rating: await getRating(
          // element.DateReceived.toLocaleString("en-EN", { hour12: false }),
          // element.TargetEndDate.toLocaleString("en-EN", { hour12: false }),
          // element.DateCompleted.toLocaleString("en-EN", { hour12: false }),
          element.DateReceived,
          element.TargetEndDate,
          element.DateReceived,
          2
        ),
      });
    }
  });
};

const getRating = async (
  dateReceived,
  targetEndDate,
  dateCompleted,
  pauseTime
) => {
  const target = new Date(targetEndDate);
  let received = new Date(dateReceived);
  const completed = new Date(dateCompleted);

  console.log("targetEndDate: " + targetEndDate);
  console.log("dateReceived: " + targetEndDate);
  console.log("dateCompleted: " + dateCompleted);

  //this will result in time measured in milliseconds
  let budget = Math.abs(target - received);
  budget = Math.ceil(budget / (1000 * 60 * 60));
  //remove weekends
  budget = removeWeekendHours(target, received, budget);
  // console.log("budget: " + budget);
  //diff time in hours
  received = new Date(dateReceived);
  let actual = Math.abs(completed - received);
  actual = Math.ceil(actual / (1000 * 60 * 60));
  actual = removeWeekendHours(completed, received, actual);
  // console.log("actual: " + actual);

  actual = actual - pauseTime;

  // console.log("actual: " + actual);
  let rating = 100 * (1 - actual / budget);
  // console.log("rating: " + rating);
  rating = getFinalRating(rating);
  // res.status(200).json(`rating: ${rating}`);
  // console.log("rating: " + rating);
  // res.status(400).json(`hellow`);
  return rating;
};

function removeWeekendHours(endDate, startDate, budget) {
  let weekendCtr = 0;

  // console.log("endDate: " + endDate);
  // console.log("startDate: " + startDate);
  // console.log("budget: " + budget);
  while (startDate.getDate() != endDate.getDate()) {
    if (startDate.getDate() == 6 || startDate.getDate() == 7) {
      weekendCtr++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }

  budget = budget - 24 * weekendCtr;

  return budget;
}
function getFinalRating(percentage) {
  // console.log("percentage: " + percentage);
  if (percentage >= 10 && percentage < 15) {
    return 4;
  } else if (percentage >= 15) {
    return 5;
  } else if (percentage >= 0 && percentage < 10) {
    return 3;
  } else if (percentage < 0) {
    return 2;
  }
}

export async function getPerfDetails(req, res) {
  try {
    // connectToDB();
    const { user } = req.params;
    const details = await PerformanceDetails.find({
      requestType: { $in: ["IR/PL/SR", "CR/PR"] },
      // requestType: { $in: ["CR/PR"] },
    });
    // console.log(perfDetails);

    res.status(200).json(details);
  } catch (error) {
    throw new Error(`Failed to get performance details: ${error.message}`);
  }
}
