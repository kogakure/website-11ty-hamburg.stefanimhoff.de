/* eslint-disable func-names */
const fs = require('fs');
const moment = require('moment');

const currentDir = process.cwd();
const templatePath = 'plop';
const date = moment().format();
const year = moment().format('YYYY');

module.exports = function (plop) {
  plop.setGenerator('District', {
    description: 'Create a new district',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'Title',
        validate(value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Title is required';
        },
      },
    ],
    actions() {
      process.chdir(plop.getPlopfilePath());

      return [
        {
          type: 'addMany',
          destination: `${currentDir}/src/districts/`,
          base: `${templatePath}`,
          templateFiles: '**/*.txt',
          stripExtensions: ['txt'],
          data: {
            date,
          },
        },
      ];
    },
  });
};
