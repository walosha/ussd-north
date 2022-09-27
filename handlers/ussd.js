"use strict";

module.exports.requestFromMobile = (event, context, callback) => {
  const { sessionId, serviceCode, phoneNumber, text } = Object.fromEntries(
    new URLSearchParams(event.body)
  );

  console.log({ sessionId, serviceCode, phoneNumber, text });

  let response = "";

  if (text == "") {
    // This is the first request. Note how we start the response with CON
    response = `CON Enter 12-digit recharge code`;
  } else if (Number(text.length) == 12) {
    // Business logic for first level response
    response = `END ${phoneNumber} was successfully credited with mobile data`;
  } else if (Number(text.length) != 12) {
    // This is a second level response where the user selected 1 in the first instance
    response = `END Operation failed!, SessionId${sessionId} END`;
  }

  let result = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "text/plain", // Required for CORS support to work
    },
    body: response,
  };

  callback(null, result);
};
