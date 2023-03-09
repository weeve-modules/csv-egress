const env = require('../utils/env')

module.exports = {
  INGRESS_HOST: env('INGRESS_HOST', '127.0.0.1'),
  INGRESS_PORT: env('INGRESS_PORT', '8080'),
  MODULE_NAME: env('MODULE_NAME', 'CSV Export'),
  FILENAME: env('FILENAME', 'export'),
  DIR_PATH: env('DIR_PATH', '/data'),
  DELIMITER: env('DELIMITER', 'comma'),
  SPLIT_TYPE: env('SPLIT_TYPE', 'size'),
  SPLIT_SIZE: env('SPLIT_SIZE', 1024),
  INCLUDE_TIMESTAMP: env('INCLUDE_TIMESTAMP', true),
}
