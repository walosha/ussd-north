"use strict";

module.exports.requestFromMobile = (event, context, callback) => {
  const { sessionId, serviceCode, phoneNumber, text } = JSON.parse(event.body);

  let response = "";

  if (text == "") {
    // This is the first request. Note how we start the response with CON
    response = `CON Enter 12-digit recharge code`;
  } else if (text.length == 12) {
    // Business logic for first level response
    response = `${phoneNumber} was successfully credited with mobile data END`;
  } else if (text.length !== 12) {
    // This is a second level response where the user selected 1 in the first instance
    response = `END operation failed!, SessionId${sessionId}/${serviceCode}`;
  }

  result = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "text/plain", // Required for CORS support to work
    },
    body: response,
  };

  callback(null, result);
};
