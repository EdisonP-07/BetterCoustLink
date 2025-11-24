"use strict";
exports.__esModule = true;
exports.validateClientPeerConfig = void 0;
var ajv_1 = require("ajv");
exports.validateClientPeerConfig = new ajv_1["default"]({
    format: 'full',
    allErrors: true
}).compile({
    type: 'object',
    properties: {
        forceRelayOnly: {
            type: 'boolean'
        },
        iceServers: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    urls: {
                        type: ['string', 'array'],
                        format: 'uri',
                        items: {
                            type: 'string',
                            format: 'uri'
                        }
                    },
                    username: {
                        type: 'string'
                    },
                    credential: {
                        type: 'string'
                    }
                },
                required: ['urls']
            }
        }
    },
    required: ['forceRelayOnly', 'iceServers']
});
