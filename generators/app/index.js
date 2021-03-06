const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    async prompting() {
        this.answers = await this.prompt([
            {
                name: "niceAppName",
                type: "input",
                message: "Human-readable app name (e.g. for page title)",
                default: this.appname
            },
            {
                name: "useTypescript",
                type: "confirm",
                message: "Would you like to use Typescript?",
                default: true
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

        if (this.answers.useTypescript) {
            this._copy("app.tsx", "src/app.tsx");
            this._copy("tsconfig.json", "tsconfig.json");
            this._copy(".eslintrc.ts.json", ".eslintrc.json");
        } else {
            this._copy("app.jsx", "src/app.jsx");
            this._copy(".eslintrc.json", ".eslintrc.json");
        }

        this._copy("themesReadme.md", "themes/Readme.md");
        this._copy("_gitignore", ".gitignore");
        this._copy("README.md", "README.md");
        this._copy("settings.json", ".vscode/settings.json");

        this._extendPackageJsonWithScripts({
            start: "parcel public/index.html",
            build: "npm run lint && parcel build public/index.html",
            lint: this.answers.useTypescript ? "eslint src/**/*.tsx" : "eslint src/**/*.jsx"
        });
    }

    install() {
        const deps = [
            "eslint",
            "eslint-plugin-import",
            "eslint-plugin-node",
            "eslint-plugin-promise",
            "eslint-plugin-react",
            "eslint-plugin-prettier",
            "eslint-config-prettier",
            "prettier",
            "parcel-bundler",
            "react",
            "react-dom",
            "fundamental-react",
            "@sap-theming/theming-base-content"
        ];

        const tsDeps = [
            "typescript",
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser"
        ]

        const jsDeps = [
            "prop-types"
        ]

        this.npmInstall(deps.concat(this.answers.useTypescript ? tsDeps : jsDeps),
            { 'save-dev': true });
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
