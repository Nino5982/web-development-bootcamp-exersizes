const { log } = require("console");
const fs = require("fs");

// fs.writeFile("ninoe.txt", "hi , am nino", (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });

// const fs = require("fs");

fs.readFile("ninoe.txt",'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    
    data = "hi mika";
    
  console.log(data);
});

