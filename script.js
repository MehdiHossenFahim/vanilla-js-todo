const year = new Date().getFullYear();
const date = new Date().getDate();
const month = new Date().getMonth();



document.querySelector("#date").textContent = `${date} ${month} ${year}`;

document.querySelector("#footerYear").textContent = year;