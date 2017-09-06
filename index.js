/*!
 * Bedrock AngularJS JSON-LD support.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
'use strict';

import angular from 'angular';
import jsonld from 'jsonld';

const module = angular.module('bedrock.jsonld');

/* @ngInject */
module.run(config => {
  // TODO: move this into a new brJsonLdService? needs to load early to
  // configure default document loader to load contexts locally
  jsonld.useDocumentLoader('xhr', {secure: true});
  const documentLoader = jsonld.documentLoader;
  jsonld.documentLoader = (url, callback) => {
    // TODO: add integration w/$http cache
    if(url in config.data.contextMap) {
      url = config.data.contextMap[url];
    }
    return documentLoader(url, callback);
  };
});
