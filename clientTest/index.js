const fetch = require("node-fetch");

const { API_KEY, AUTH_BEARER_TOKEN, BASE_API_URL, REQUEST_COUNT, SECONDS_TO_WAIT } = process.env;

const requestCount = REQUEST_COUNT || 100;
const secondsToWait = SECONDS_TO_WAIT || 61;

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${AUTH_BEARER_TOKEN}`,
    "x-api-key": API_KEY,
  },
};

let tooManyRequestCount = 0;
let requestUntil429Count = 0;

(async () => {
  for (let i = 0; i < requestCount; i++) {
    let res = await fetch(`${BASE_API_URL}/echo?message=test`, options);
    requestUntil429Count++;
    log(`Response status Code: ${res.status}, Req #${requestUntil429Count}`);

    if (res.status === 429) {
      tooManyRequestCount++;

      if (tooManyRequestCount === 1) {
        requestUntil429Count = 0;
        const miliSecondsToWait = secondsToWait * 1000;
        log(`Waiting ${miliSecondsToWait} milliseconds`);
        await sleep(miliSecondsToWait);
        log("Continue");
      } else if (tooManyRequestCount > 1) {
        // Wait a second to avoid issue after wait a minute,
        // first or second time after wait a second it works.
        log("Waiting 1 second");
        await sleep(1000);
      }
    } else {
      tooManyRequestCount = 0;
    }
  }
})().catch((ex) => {
  process.exit(1);
});

const log = (message) => {
  console.log(`${new Date().toISOString()}: ${message}`);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
