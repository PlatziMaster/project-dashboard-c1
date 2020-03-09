const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  // mongo
  mdbName: process.env.MDB_NAME,
  mdbPort: process.env.MDB_PORT,
  mdbHost: process.env.MDB_HOST,
  // couchbase
  cdbName: process.env.CDB_NAME,
  cdbPort: process.env.CDB_PORT,
  cdbHost: process.env.CDB_HOST,
  cdbUser: process.env.CDB_USER,
  cdbPassword: process.env.CDB_PASSWORD,
};

console.log(config);

module.exports = { config };