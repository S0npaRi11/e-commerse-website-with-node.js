const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const orders = require('../models/Orders');

let printReceipt = async (product) => {
    // html template
    let order = await orders.findById(product);
    let template = `
        <h1> Invoice </h1>
        <ul>
            <li> <big> Product Name </big> : ${order.productName} </li>
            <li> <big> Prize </big> : RS ${order.productPrice} </li>
            <li> <big> Order ID </big> : ${order.id} </li>
            <li> <big>  Order Date </big> : ${order.orderDate} </li>
        </ul>
    `;

    const options = {
        format: 'A4',
        displayHeaderFooter: false,
        margin:{
            top: "40px",
            bottom: "100px"
        },
        printBackground: true,
        path: `receipts/${order.id}.pdf`
    }
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html,${template}`, {
        waitUntil: 'networkidle0'
    });
    await page.pdf(options);
    await browser.close();

    const script = await exec(`sh printReceipt.sh ${order.id}.pdf`,(error,stdout,stderr) => {
        console.log(stdout);
        console.log(stderr);
        if( error != null){
            console.log(`exec error: ${error}`);
        }
    });

    await orders.findByIdAndUpdate(product,{isReceiptPrinted: true})
}
