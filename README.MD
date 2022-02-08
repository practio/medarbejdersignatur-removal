# Automated script for mass-removing employees from medarbejdesignatur.dk

## Requirements

- chromedriver in the root folder (may be different depending on your Chrome version or your OS)
  - Find your current chrome version (99.x, 98.x, 97.x)
  - Download your chromedriver based on the chrome version from over here https://chromedriver.chromium.org/downloads
  - Unzip the folder you downloaded
  - Put the chromedriver in the root folder on the current project
- emails.json with all the employees' emails in the root folder with the following structure: `["test@practio.com", "test1@practio.com]`

## Steps to execute

- Run `npm ci`
- Run `node index.js`
- A browser should open
- Login to your medarbejdesignatur login
- Go to Manage employees (You have 60 seconds until the script starts)
- Select Advanced Search and press "Search" (no need to insert anything)
- Select to show all employees (not only 15, 25)
- Wait until the script finish
