"use strict";
let logged;
function sendAnalytics(data) {
    console.log(data);
    logged = true;
    console.log(logged);
}
sendAnalytics("This is data!");
//# sourceMappingURL=analytics.js.map