'use strict'

const { Client } = require('cassandra-driver');
const fs = require('fs');


var keyspace = {};

async function getKeyspaceDefinition() {
  const client = new Client({
    cloud: { secureConnectBundle: 'secure-connect-astrademo.zip' },
    credentials: { username: 'datastax', password: 'datastax' }
  });

  await client.connect();

  let tables = await client.execute('select table_name from system_schema.tables where keyspace_name=\'astrademo\'');

  var tableList = {};
  var tableList= new Object();
  tableList['tables'] = [];

  for(const table of tables) {

    var columns = [];
    var indexes = [];
    var partitionsKey = [];
    var clusteringKeys = [];

    var currentTable = {};
    currentTable.name = table['table_name'];

    await  client.metadata.getTable('astrademo', table['table_name'])
      .then(function (table) {
        table.columns.forEach(function (column) {
          var currentColumn = {};
          currentColumn.name = column.name;
          currentColumn.type = column.type.code;
          columns.push(currentColumn);
        });
        table.partitionKeys.forEach(function (partitionKey) {
          var currentPartition = {}
          currentPartition.name = partitionKey.name;
          currentPartition.type = partitionKey.type.code;
          partitionsKey.push(currentPartition);
        });
        table.clusteringKeys.forEach(function (clusteringKey) {
          var currentClusteringKey = {};
          currentClusteringKey.name = clusteringKey.name;
          currentClusteringKey.type = clusteringKey.type.code;
          clusteringKeys.push(currentClusteringKey);
        });
        table.indexes.forEach(function (index) {
           var currentIndex = {};
           currentIndex.name = index.name;
           currentIndex.target = index.options.target;
           indexes.push(currentIndex);
        });
      });

      var primaryKey = [];

      primaryKey[0] = partitionsKey;

      if(clusteringKeys.length > 0) {
        primaryKey[1] = clusteringKeys;
      }

      if(indexes.length > 0) {
        currentTable.indexes = indexes;
      }

      currentTable.primaryKey = primaryKey;

      currentTable.columns = columns;

      currentTable.name = table['table_name'];

      tableList['tables'].push(currentTable);
  }

  keyspace = tableList;
  keyspace.keyspace = 'astrademo';

  let currentKeyspace = JSON.stringify(keyspace)
  fs.writeFileSync('schema.json', currentKeyspace);

  await client.shutdown();

  return currentKeyspace;
}

module.exports = {
  keyspace: getKeyspaceDefinition()
};
