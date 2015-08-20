# Developer Ink

![Travis](http://img.shields.io/travis/Wildhoney/DeveloperInk.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/developer-ink.svg?style=flat-square)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat-square)

* **Clone:** `git clone git@github.com:Wildhoney/DeveloperInk.git`
* **Official:** [http://zurb.com/ink/](http://zurb.com/ink/)

<img src="http://i.imgur.com/zqJCkme.jpg" />

## Getting Started

Ink is all about creating email templates that work in a wide array of email clients. With the unpredictability of email clients &mdash; especially legacy email clients and web-based clients such as Gmail &mdash; every little helps when it comes to putting together your email client. `DeveloperInk` lets Ink do what it does best &ndash; the HTML markup and structure, whereas `DeveloperInk` provides an extension for developers.

* Code your styles in individual SASS files using partials;
* Auto-refresh of SASS updates and changes to your HTML document;
* In-built Node server for testing your email templates;
* Ability to quickly send test emails using common email providers;
* Handle multiple email templates to keep all templates in one place;
* Compile your email templates to a chosen destination once you're happy;
* Keep your HTML templates free of Ink related markup and styles;
* Automatically inlines all of your SASS styles to support web-based clients;

To get started with `DeveloperInk` you'll need to create your configuration file &mdash; `config.yml` &mdash; an example is provided in the `config-example.yml` file, therefore copy that file &mdash; or run `npm run init` &mdash; rename it to `config.yml` and modify the appropriate settings in order to be able to send test emails.

Once you're all up and running with the configuration, create your first template using `npm run make my-first-template` and [follow the steps below](#configuration) depending on what you're after.

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

### Email Testing

> `npm run test`

Uses the aforementioned configuration options to send a test email to the `recipients` via your chosen `provider`.

> **Note:** For Gmail you need to enable access for less secure apps (see [Stackoverflow](http://stackoverflow.com/questions/26948516/nodemailer-invalid-login)): https://www.google.com/settings/security/lesssecureapps

### Render Template

> `npm run render developerink.html`

Render the finished email template to the `developerink.html` file, which inlines all CSS.

---

<img src="http://codeanchor.com/wp-content/uploads/2013/12/ink.png" />
