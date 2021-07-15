## Fieldist – Field Marketing Management Made Simple

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

- [License](#license)
- [Description ](#description)
- [Installation](#installation)

# Description

Fllo is a marketplace platform for real estae private equity firms and banks to seek and give out commerical loans.

Private equity firms can upload real estate property profiles to seek for loans from several banks. The firms then can see all the loan offers each property has received and then select one of the many offers.

Banks can see all of the properties that private equity firms have uploaded and may submit offers if it is of the bank's interest.

# Installation

Clone this repository. From the root directory, run

```
npm i
```

Set up a .env file in the root directory. 

```
DB_NAME=
DB_USER=
DB_PW=
SERVER_PORT=
SECRET=
```

Go into client/package.json and update the ‘Proxy” to match your server port.

Once this is all complete, you can start the app by running

```
npm start
```