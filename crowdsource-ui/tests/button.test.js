const {readFileSync} = require('fs');
const {stringToHTML} = require('./utils');
const {} = require('../build/js/common/report-btn');

document.body = stringToHTML(
  readFileSync(`${__dirname}/../build/views/common/report-btn.ejs`, 'UTF-8')+
  readFileSync(`${__dirname}/../build/views/common/report.ejs`, 'UTF-8')
);

describe("report_btn",()=>{
  test("should open report modal",()=>{
  })
})
