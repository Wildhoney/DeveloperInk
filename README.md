# Developer Ink

<img src="http://zurb.com/blog/system/images/1132/original/blog-post-image.png?1383854387" width="400" />

### Configuration

> `npm run init`

You'll discover a `config.yml` file in the root of the `DeveloperInk` directory &ndash; open this in a plain-text editor and modify the `mail` section accordingly. The details used in the configuration are used for sending test emails to yourself &ndash; or anybody else.

> **Note:** For a list of supported email providers for the `provider` parameter [see the following link](https://github.com/andris9/nodemailer-wellknown#supported-services).

### Make Template

> `npm run make template-name`

Change `template-name` to a relevant name for your first email template &ndash; once you have create your first template file, if you open the `templates/template-name` directory, you will find an `index.html` and a `sass` directory to begin working from. The `make` command will also setup a symlink in the `templates` directory called `.current` &ndash; this is so `DeveloperInk` knows which email template you're currently working on.

### Browser Testing

> `npm run start`

Using the `start` command you will automatically get a whole host of useful features, such as a Node server running on port `5000` by default, as well as automatic compilation of your SASS files. Open `http://localhost:5000/` in your browser and you *should* see your `index.html` document &ndash; any SASS that you add to your `sass/default.scss` file will be automatically compiled whenever changes are detected.

### Client Testing

> `npm run test`

Once you have created your first email template using [Ink's documentation](http://zurb.com/ink/docs.php) for reference, you'll likely want to see how your email renders. For this you can issue the above command, which will use the configuration previously created to send an email. All of the inlining of your SASS and Ink's CSS is done for you automagically!

> **Note:** For Gmail you need to enable access for less secure apps (see [Stackoverflow](http://stackoverflow.com/questions/26948516/nodemailer-invalid-login)): https://www.google.com/settings/security/lesssecureapps

## Switching Templates

Once you have a handful of email templates in the `templates` directory, you'll want to be able to switch between them. For this you can use the `npm run current template-name` where `template-name` is the name of your template's directory.
