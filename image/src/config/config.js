const env = require('../utils/env')

module.exports = {
  INGRESS_HOST: env('INGRESS_HOST', '127.0.0.1'),
  INGRESS_PORT: env('INGRESS_PORT', '8080'),
  MODULE_NAME: env('MODULE_NAME', 'CSV Export'),
  EGRESS_URL: env('EGRESS_URL', ''),
  FILENAME: env('FILENAME', 'export.csv'),
  DELIMITER: env('DELIMITER', 'comma'),
  LIMIT_TYPE: env('LIMIT_TYPE', 'size'),
  LIMIT_SIZE: env('LIMIT_SIZE', 1024),
  INCLUDE_TIMESTAMP: env('INCLUDE_TIMESTAMP', true),
}
