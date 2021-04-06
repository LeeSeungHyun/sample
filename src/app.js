import "./app.css";
import nyancat from "./nyancat.jpg";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `;
});

console.log(process.env.NODE_ENV);
console.log(TWO); // "1+1"
console.log(api.domain);
