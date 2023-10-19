import React from "react";

function formatDate(dateTime) {
  var hours = new Date(dateTime).getHours();
  var minutes = new Date(dateTime).getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    new Date(dateTime).getDate() +
    "/" +
    (new Date(dateTime).getMonth() + 1) + // Add 1 to the month to get the correct month number
    "/" +
    new Date(dateTime).getFullYear() +
    "  " +
    strTime
  );
}
export { formatDate };
