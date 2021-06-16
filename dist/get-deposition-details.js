"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_deposition_details = void 0;
const node_fetch_1 = require("node-fetch");
const get_access_token_from_environment_js_1 = require("./get-access-token-from-environment.js");
const get_api_js_1 = require("./get-api.js");
const get_deposition_details = async (sandbox, id, verbose = false) => {
    if (verbose) {
        console.log(`getting deposition details for deposition with id ${id}...`);
    }
    const access_token = get_access_token_from_environment_js_1.get_access_token_from_environment(sandbox);
    const api = get_api_js_1.get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'GET';
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    };
    const init = { method, headers };
    let response;
    try {
        response = await node_fetch_1.default(`${api}${endpoint}`, init);
        if (response.ok !== true) {
            throw new Error();
        }
    }
    catch (e) {
        console.debug(response);
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText} `);
    }
    try {
        const deposition = await response.json();
        return deposition;
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`);
    }
};
exports.get_deposition_details = get_deposition_details;
