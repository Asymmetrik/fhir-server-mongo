const { COLLECTION } = require('../../constants');
const base_service = require('../base/base.service');

const resource_name = '${ClassName}';
#set($ClassNameUpper = "COLLECTION." + $ClassName.toUpperCase())

const collection_name = ${ClassNameUpper};

module.exports.search = (args) =>
  base_service.search(args, resource_name, collection_name);

module.exports.searchById = (args) =>
  base_service.searchById(args, resource_name, collection_name);

module.exports.create = (args, { req }) =>
  base_service.create(args, { req }, resource_name, collection_name);

module.exports.update = (args, { req }) =>
  base_service.update(args, { req }, resource_name, collection_name);

module.exports.remove = (args, context) =>
  base_service.remove(args, context, resource_name, collection_name);

module.exports.searchByVersionId = (args, context) =>
  base_service.search(args, context, resource_name, collection_name);

module.exports.history = (args) =>
  base_service.history(args, context, resource_name, collection_name);

module.exports.historyById = (args, context) =>
  base_service.historyById(args, context, resource_name, collection_name);

module.exports.patch = (args, context) =>
  base_service.patch(args, context, resource_name, collection_name);
