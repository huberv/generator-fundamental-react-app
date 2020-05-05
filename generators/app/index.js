const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    async prompting() {
        this.answers = await this.prompt([
            {
                name: "niceAppName",
                type: "input",
                message: "Human-readable app name (e.g. for page title)",
                default: this.appname
            }
        ]);
    }

    writing() {
        this._maybeCreatePackageJson();

        this._copy("index.html", "public/index.html", {
            title: this.answers.niceAppName
        });

        this._copy("index.js", "src/index.js");
        this._copy("index.css", "src/index.css");
        this._copy("app.jsx", "src/app.jsx");
        this._copy("themesReadme.md", "themes/Readme.md");
        this._copy(".gitignore", ".gitignore");
        this._copy("README.md", "README.md");
        this._copy("settings.json", ".vscode/settings.json");

        this._extendPackageJsonWithScripts({
            start: "parcel public/index.html",
            build: "parcel build public/index.html"
        });
    }

    install() {
        this.npmInstall([
            "parcel-bundler",
            "react",
            "react-dom",
            "fundamental-react",
            "@sap-theming/theming-base-content"],
            ["--save-dev"]);
    }

    end() {
    }

    _maybeCreatePackageJson() {
        if (!this.fs.exists(this.destinationPath("package.json"))) {
            this.log("Running npm init -y");
            this.spawnCommand("npm", ["init", "-y"]);
        }
    }

    _copy(from, to, options) {
        this.fs.copyTpl(
            this.templatePath(from),
            this.destinationPath(to),
            options);
    }

    _extendPackageJsonWithScripts(scripts) {
        this.fs.extendJSON(this.destinationPath('package.json'), { scripts });
    }

};
