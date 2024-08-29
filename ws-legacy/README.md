# Docenty SaaS

## Development environment setup

<!-- only for first setup -->

1. `initialize:local`

2. `yarn dev`


## Database

 - [How to change database schema](./docs/database_schema_change.md)


## Email Template
 - mjml library (https://mjml.io/)
 - `yarn add mjml --dev`
 - Convert .mjml to html ex
   - `cd src/common/libs/emails`
   - `npx mjml templates/SendEmailTemplate.mjml -o templates/SendEmailTemplate.html`