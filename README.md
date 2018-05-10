![Room Booking App logo](src/img/icon/logo-1x.png)

# Room Booking App

Customizable Room Booking Application for your organization.

* display meetings agenda on tablet next to conference rooms
* instantly book quick meetings
* customize application to meet visual identity of your organization
* easily integrate with organization's calendar (platform independent)

## Demo

* [original application (use DevTools to adjust resolution)](https://siili-room-booking-app.netlify.com/)
* [iframe with tablet resolution](http://quirktools.com/screenfly/#u=http%3A//siili-room-booking-app.netlify.com/&w=800&h=1280&a=23)

## Features

* Application can be run in two modes: single-room or dual-room.

* Application presents agenda of current and upcoming events for selected room. Agenda is refreshed automatically every minute.

* User can book quick meeting if a room is currenly available using the application
  (known limitation: user cannot make bookings in advance).

## Requirements

### REST API compatible with Room Booking App

Minimal requirement to use this app in your organization is to implement
[OpenAPI](https://swagger.io/docs/specification/about/) specification from
[`swagger.yml`](swagger.yml) included in this repository. Specification can be
inspected using [Swagger Editor](https://editor.swagger.io/).

### Tablets with Chrome

Use latest version of Chrome browser on your tablets for best performance and ability
to use kiosk mode by _Add to homescreen_ functionality.

# Command-line interface

The Room Booking App ships with Command-line interface tool to make creating custom solution even easier.

After installation in your project, the CLI tool will be available to build and test your custom
application with provided config.

## Prerequisites

Make sure you have **Node v8.5.0** installed (preferred way is to use
[NVM](https://github.com/creationix/nvm))

## Installation

CLI tool should be installed within existing empty project.

Create new empty project:

```
$ mkdir my-roombooking-project
$ cd my-roombooking-project
$ npm init -y
```

Then install CLI:

```
$ npm install --save git+ssh://git@gitlab.siilicloud.com:siili-pl-cba/rba.git
```

## CLI Usage

Once installed, creating a new custom app is very simple.

### Customized build

```bash
$ rba build <config> [output]
```

This command builds the application and puts the output into `output` directory.

```bash
USAGE
  rba build <config> [output]

ARGUMENTS
  <config>      JSON config file path      required
  [output]      Output directory           optional      default: "public"
```

The JSON config file specification is described [below] (#general-config-file).

```bash
# Example
$ rba build my/config.json dist
```

### Customized development build

You can also run app in development mode.

```bash
$ rba dev <config>
```

This command serves the application using the development server and listens for changes.

```bash
USAGE
  rba dev <config>

ARGUMENTS
  <config>      JSON config file path      required

OPTIONS
  -p, --port <num>       Dev server port      optional      default: 3000
  -h, --host <host>      Dev server host      optional      default: "localhost"
```

The JSON config file specification is described [below] (#general-config-file).

```bash
# Example
$ rba dev my/config.json --port 8080
```

### Global options

```bash
-h, --help         Display help
-V, --version      Display version
--no-color         Disable colors
--quiet            Quiet mode - only displays warn and error messages
-v, --verbose      Verbose mode - will also output debug messages
```

### General config file

Entry point for configuration is JSON config file that has following available options:

```javascript
{
  // apiUrl     - (REQUIRED) URL to your API that implements specification from `swagger.yml`.
  "apiUrl": "https://example.com/api/",

  // apiHeaders - dictionary of any additional headers that will be added to every
  //              request to the API. This can include API security tokens.
  "apiHeaders": {
    "x-api-key": "00000000-0000-0000-0000-000000000000",
    "x-your-other-headers": "values"
  }

  // assetsDir  - path to directory with static files that is copied into `/assets`
  //              directory of final build (e.g. fonts, images).
  "assetsDir": "my/assets",

  // sassPath   - path to .sass/.scss file that is imported to build of final Sass styles.
  "sassPath": "my/styles.scss",

  // mockedApi  - this flag determines if app should not call real API and use fake data.
  //              Helpful during development or testing. `apiUrl` option is not required
  //              when this is set to `true`.
  "mockedApi": false,

  // maxEndTime - maximum allowed end time of meeting in H:mm format, defaults to "23:59"
  "maxEndTime": "17:00",
}
```

#### Styles

Within file pointed in `sassPath` you are able to change appearance of the application using
[Sass](http://sass-lang.com/) stylesheet. You can add your own sass rules and/or override predefined variables.

Sass Variables that can be overriden:
```scss
$color-brand: #03a9f4; // main color of the app
$font-family: "Roboto"; // font-family of all text in the app
$font-weight-lighter: 300; // font-weight of normal text
$font-weight-bolder: 500; // font-weight of bold text
$rounded-icons: false; // determines style (rounded/square) of plus icon
```
```
// Or you can include your own styles, e.g. add custom font from Google Fonts:
@import url('//fonts.googleapis.com/css?family=Roboto');
```

#### Room photos

Within `assetsDir` you can add photos to use them as room backgrounds. They will be included in final
build automatically using following convention - filename of `.jpg` file has to be exact room `name`
that is returned from API.

For example room with property `name` equal to `Room on 2nd floor` will match
`Room on 2nd floor.jpg`.

## Contributors

* [Mateusz Metelski](http://metelski.pl/) (concept, design & MVP implementation)
* [Karolina Czerniawska](https://www.linkedin.com/in/karolina-czerniawska-992b8465/)
* [Kacper Kozak](https://github.com/KacperKozak/)
* [Paweł Meller](https://github.com/pmeller)
* [Michał Światowy](https://github.com/swiatek25)
* [Dariusz Gunia](https://www.linkedin.com/in/dariuszgunia/)
* [Paweł Bocheński](https://pbochenski.pl/)
