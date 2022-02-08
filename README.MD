# Automated script for mass-removing employees from medarbejdesignatur.dk

## Requirements

- chromedriver in the root folder (may be different depending on your Chrome version or your OS)
- emails.json with all the employees' emails in the root folder with the following structure: `["test@practio.com", "test1@practio.com]`

## Steps to execute

- `npm ci`
- node index.js
- A browser should open
- Login to your medarbejdesignatur login
- Go to Manage employees (You have 60 seconds until the script starts)
- Select Advanced Search and press "Search" (no need to insert anything)
- Select to show all employees (not only 15, 25)
- Wait until the script finish
