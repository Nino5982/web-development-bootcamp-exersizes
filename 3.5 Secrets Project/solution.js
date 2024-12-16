import express from "express"; // იმპორტირდება Express - ვებ ჩარჩო Node.js-სთვის
import bodyParser from "body-parser"; // იმპორტირდება body-parser - ფორმის მონაცემების დასამუშავებლად
import { dirname } from "path"; // იმპორტირდება dirname - ფაილის პათის მიღება
import { fileURLToPath } from "url"; // იმპორტირდება fileURLToPath - URL-ს ფაილში გადაყვანა
const __dirname = dirname(fileURLToPath(import.meta.url)); // იღებს მოდულის დირექტორიის დასახელებას

const app = express(); // ქმნის Express აპლიკაციას
const port = 3000; // განსაზღვრავს პორტს, რომელზეც აპლიკაცია იმუშავებს

var userIsAuthorised = false; // ცვლადი, რომელიც ატარებს ინფორმაციას ავტორიზაციაზე (საწყისში false)

app.use(bodyParser.urlencoded({ extended: true })); // midlleware რო მიიღოს ფორმის მონაცემები (url-კოდირებული)

function passwordCheck(req, res, next) {
  // middleware ფუნქცია პაროლის დასამოწმებლად
  const password = req.body["password"]; // იღებს პაროლს ფორმის მონაცემებიდან (req.body.password)

  if (password === "ILoveProgramming") {
    // თუ პაროლი ემთხვევა სწორ პაროლს:
    userIsAuthorised = true; // ავტორიზაციის ცვლადი გადადის true-მდე
  }

  next(); // გადადის შემდეგ middleware ან მარშრუტის დამუშავების ფუნქციაზე
}

app.use(passwordCheck); // იყენებს passwordCheck middleware-ს ყველა შემომავალი მოთხოვნისთვის

app.get("/", (req, res) => {
  // ღებულობს GET მოთხოვნებს root URL-ზე ("/")
  res.sendFile(__dirname + "/public/index.html"); // აგზავნის index.html ფაილს მომხმარებლისთვის
});

app.post("/check", (req, res) => {
  // ღებულობს POST მოთხოვნებს "/check"-ზე
  if (userIsAuthorised) {
    // თუ მომხმარებელი ავტორიზებულია:
    res.sendFile(__dirname + "/public/secret.html"); // აგზავნის secret.html ფაილს
  } else {
    res.sendFile(__dirname + "/public/index.html"); // თუ არ არის ავტორიზებული, აგზავნის index.html-ს
    // ალტერნატიულად: res.redirect("/");  // ან გადამისამართება root გვერდზე
  }
});

app.listen(port, () => {
  // აწყობს აპლიკაციას კონკრეტულ პორტზე
  console.log(`Listening on port ${port}`); // კონსოლზე ბეჭდავს ინფორმაციას, რომ აპლიკაცია სმენას აწარმოებს პორტზე
});

// კოდი ქმნის ვებ აპლიკაციას, სადაც მომხმარებელს შეუძლია შეიყვანოს პაროლი. თუ პაროლი სწორი არის (ILoveProgramming), მას უჩვენდება საიდუმლო გვერდი (secret.html). თუ პაროლი არასწორია, მას ისევ აჩვენებს მთავარ გვერდს (index.html).

// passwordCheck ფუნქცია შეამოწმებს პაროლს.
// bodyParser მოდული parses ფორმის მონაცემებს.
// კოდი იყენებს middleware-ს, რომ ყველა მოთხოვნაზე ჩატარდეს პაროლის შემოწმება.
// თუ მომხმარებელი ავტორიზებულია, მას გადაეცემა საიდუმლო გვერდი, სხვაგვარად მთავარია გვერდი.
// მოკლედ, ამ კოდით ხდება პაროლის შემოწმება და შესაბამისი გვერდის ჩვენება.
