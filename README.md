This project was bootstrapped with [@enact/cli](https://github.com/enactjs/cli).

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  .gitignore
  node_modules/
  package.json
  src/
    App/
      App.js
      App.less
      package.json
    components/
    views/
      MainPanel.js
    index.js
  resources/
```

For the project to build, **these files must exist with exact filenames**:

* `package.json` is the core package manifest for the project
* `src/index.js` is the JavaScript entry point.

## Available Scripts

To run the project, make sure you have your SSL certs that allow devServer to serve `https` and then run the following line in the project directory:

### `HTTPS=true npm run serve`

Builds and serves the app in the development mode.<br>
Open [https://localhost:8080](https://localhost:8080) to view it in the browser.


