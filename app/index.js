'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');

var keyspaceReader = require('cassandra-keyspace-reader');

let astra_config = undefined;

module.exports = class extends Generator {

        async prompting() {

            console.log('===================================================================');
            console.log(chalk.white(
              '  _________  __                                      __            \n' +
              ' /   _____/_/  |_ _____   _______    ____  _____   _/  |_   ____   \n' +
              ' \\_____  \\ \\   __\\\\__   \\ \\_  __ \\  / ___\\ \\__  \\  \\   __\\_/ __ \\  \n' +
              ' /        \\ |  |   / __ \\_ |  | \\/ / /_/  > / __ \\_ |  |  \\  ___/  \n' +
              '/_______  / |__|  (____  / |__|    \\___  / (____  / |__|   \\___  > \n' +
              '        \\/             \\/         /_____/       \\/             \\/  '));
            console.log('===================================================================');
            console.log('Tag: Cassandra/Datastax spring boot application yeoman generator\nAuthor: Clavis Team\nEmail: bruno.guedes@gmail.com');
            console.log('===================================================================');

            const input = await this.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Enter project name",
                    default: this.appname
                }
            ]);

            const infratype = await this.prompt([
                {
                    type: "list",
                    name: "infra",
                    message: "What infrastrcuture to use ?",
                        choices: ["Astra", "DSE", "Cassandra"]
                }
            ]);

            if(infratype.infra == 'Astra') {
                astra_config = await this.prompt([
                    {
                        type: "input",
                        name: "keyspace",
                        message: "Name of the Astra keyspace"
                    },
                    {
                        type: "input",
                        name: "Cluster Id",
                        message: "Enter the CLuster Identifier",
                    },
                    {
                        type: "input",
                        name: "Regionn",
                        message: "Enter the Cloud Provider region us",
                    },
                    {
                        type: "input",
                        name: "username",
                        message: "Name of the Astra user"
                    },
                    {
                        type: "password",
                        name: "password",
                        message: "Password of the Astra user"
                    }
                ]);
            };

            const enpointtype = await this.prompt([
                {
                    type: "list",
                    name: "endpoint",
                    message: "Endpoint type?",
                        choices: ["REST/CQL", "REST/Json", "GraphQL"]
                }
            ]);


            const keyspaceDef = await keyspaceReader;

            this.log("Project name: ", input.name);
            this.log("Infra: ", infratype.infra);
            this.log("Infra: ", astra_config.keyspace);
            this.log("Endpoint: ", enpointtype.endpoint);

            let schemaKeyspace = await keyspaceReader.keyspace;

            //console.log("schemaKeyspace = " + schemaKeyspace);
        }

};
