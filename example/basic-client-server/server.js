/*
 * Copyright (c) 2014, Intel Corporation.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms and conditions of the GNU Lesser General Public License,
 * version 2.1, as published by the Free Software Foundation.
 *
 * This program is distributed in the hope it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for
 * more details.
 */

/**
 * @file Basic server that replies with the message 'hi' to any message sent
 * by the corresponding client.
 * @see example/basic-client-server/client.js
 */
var iecf = require('iecf');
var path = require('path');

var validator = new iecf.ServiceSpecValidator();
validator.readServiceSpecFromFile(path.join(__dirname, "server-spec.json"));

iecf.createService(validator.getValidatedSpec(), function (service) {
  "use strict";

  service.comm.setReceivedMessageHandler(function(client, msg, context) {
    "use strict";
    console.log("received from client: " + msg.toString());
    service.comm.sendTo(client, "hi");
  });

});
