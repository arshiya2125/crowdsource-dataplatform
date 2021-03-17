# Test Vakyansh

* Opening Vakyansh

## Check About Us Page
* Select Preferred language as "English"
* Navigate to "About Us" button and click "About Us" button
* Validate about us content
* Start Recording button is disabled
* Select Language "Hindi" enables the Start Recording button


## Validate Locale content on Home Page
* Select Preferred language as "Hindi"
* User should see the content in "Hindi"
* User should see State Wise distribution and Top Languages
* User should be able to change to preffered Language to English again

## Check Dashboard Page
* Select Preferred language as "English"
* When user clicks on View all Details buttton , user shall land on Dashboard page
* user should be able to see "Progress Chart" , "Gender Contribution" , "State Wise distribution" , "Age Group Distribution"
* When user select "हिंदी" Language from dropdown then "languages contributed" should not visible

## Validate the Speaker Details pop-up in Contribute section
* Select Preferred language as "English"
* Navigate to "Contribute" button and click "Contribute" button
* Username field, Mother Tongue dropdown ,Age drop down , Gender Radio buttons should be present
* if a user enter username and click on Not you change user button , the field should be cleared
* Speaker details popup should appear and close button should close the pop up


## Validate Contributor flow
* Select Contribution Language as Hindi
* Select Preferred language as "English"
* Navigate to "Contribute" button and click "Contribute" button
* And User enter random Username and selects Age , Mother tongue ,gender
* when user click on Lets Go Button, user should see instructions to record
* When user closes the Instructions , user should see a sentence , Skip button , Start Recording Button , username
* When user clicks on "START RECORDING" button, "STOP RECORDING" button should appear
* When user clicks on "STOP RECORDING" button, "RE-RECORD" button should appear
* When user clicks on "RE-RECORD" button, "STOP RECORDING" button should appear
* When user clicks on "STOP RECORDING" button, "NEXT" button should appear
* When user clicks on "NEXT" button, "SKIP" button should appear
* When user skips all the rest of the "4" sentences , User should see Thank you Page
* when user clicks on the Contribute More button, user should not see the Instructions page again



## Validate Validator flow
* Select Contribution Language as Hindi
* Select Preferred language as "Hindi"
* Navigate to "Validate" button and click "Validate" button
* "skip_button" should be enabled , "dislike_button" "like_button" buttons should be disabled
* User plays the audio , "dislike_button","like_button" should be enabled
* User clicks on "dislike_button" , he should see next sentence and "dislike_button" "like_button" buttons should be disabled
* User skips the next "4" sentneces user should land on Thank you page in Hindi
* User should see the "अधिक प्रमाणित करें" button
