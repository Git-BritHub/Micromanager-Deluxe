# Micromanager-Deluxe
A Content Management System for company employee databases

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Walkthrough](#walkthrough)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)


## Description
Micromanager Deluxe is a command-line application that utilizes Node.js, Inquirer and MySQL to manage a company's employee database. This CMS provides companies the option to view, add and/or update the following: company departments, employee roles and employees. 


## Installation
This application requires MySQL, Inquirer and Node. <br/>
1. Clone my respository by inputting the following in your terminal: `git clone https://github.com/Git-BritHub/Micromanager-Deluxe.git`
2. When cloning is complete, input `cd Micromanager-Deluxe`.
3. Next, install the needed package dependencies by running `npm i`.
4. Important: make sure to create and set up your `.env` file for your data base name, MySQL username and password.
5. Once your `.env` file is created, copy and paste the following into your `.env` file and fill in your needed MySQL user name and password information inside the single quotes:

    <p>DB_NAME='company_db'<br/>
       DB_USER=''<br/>
       DB_PW=''<br/></p>


## Usage
1. Input `mysql -u root -p` in the terminal and sign in with your MySQL password.
2. Once signed in to MySQL, input `source db/schema.sql;` in your terminal to create the database.
3. After database has been created, input `quit`.
4. Input `node index.js` in your terminal to run the application.
5. Use the up and down arrow keys on your keyboard to browse the various employee database functions.
6. Input `^C` (ctrl + C) to quit the application. 
<img width="1512" alt="MD_screenshot" src="https://github.com/Git-BritHub/Micromanager-Deluxe/assets/130286884/0e7c43ea-5c10-4058-a766-0356f68d29f2">

## Walkthrough
[Walkthrough Video](https://drive.google.com/file/d/1jg2UMoU_QeA0QigB1twP6nrMFvZJM3_3/view)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-aqua.svg)](https://opensource.org/licenses/MIT)

## Contributing
* Guidance and feedback from Software Developers: Jacob Nordan, CJ Sanders and Eric Sayer.

## Questions
If you find any bugs or have any questions, feel free to reach out to me through GitHub at https://github.com/Git-BritHub 
