const puppeteer = require("puppeteer");
(async () => {
const browser = await puppeteer.launch(
    {
        "headless": false,
        defaultViewport: null,
        args: ['--start-maximized'],
        "slowMo": 1
    });
const page = (await browser.pages())[0];
///////////////////////////////////////////////////////////////////// Here is my code:
await page.exposeFunction('onClick', onClick);  

// Listening for click events on the window
await page.evaluateOnNewDocument(() => {
   window.addEventListener('click', (event) => {
       let tagName = event.target.tagName
       let eClass = event.target.getAttribute("class")
       let id = event.target.getAttribute("id")
       window.onClick(tagName, eClass, id);
   });
});

await page.goto('https://auth.pleaseignore.com/login/', { waitUntil: 'networkidle2' });

function onClick(tagName, eClass, id) {
   console.log(`You have clicked on: id: #${id} class: .${eClass} tagName: ${tagName}`);
   let selector = getSelector(tagName, eClass, id);
   console.log('selector: ', selector)
   elementClicked(selector, page)
}

})();