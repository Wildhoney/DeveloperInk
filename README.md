# Developer Ink

### Configuration

> `npm run init`

Yields a `config.yml` in the repository's root that you can use to configure your email provider.

> **Note:** For a list of supported email providers for the `provider` parameter [see the following link](https://github.com/andris9/nodemailer-wellknown#supported-services).

### Make Template

> `npm run make template-name`

Change `template-name` to a relevant name for the email template. Creates a directory in `templates` for the name of your template, which contains `index.html` and a `sass` directory.

### Switch Template

> `npm run current template-name`

Work on another template where the `template-name` is the name given to your template during the make process &ndash; all commands will work from the `current` template.

### Browser Testing

> `npm run start`

Initialises the server on port 5000 for the current template whilst watching for any changes to your SASS files for automatic compilation to CSS.

### Client Testing

> `npm run test`

Uses the aforementioned configuration options to send a test email to the `recipients` via your chosen `provider`.

> **Note:** For Gmail you need to enable access for less secure apps (see [Stackoverflow](http://stackoverflow.com/questions/26948516/nodemailer-invalid-login)): https://www.google.com/settings/security/lesssecureapps
