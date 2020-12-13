/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access  network
 * 4. Construct request to issue book resource
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const CURRENT_DIR = path.join(process.cwd(), 'organization/bibliotheque/');

//const CURRENT_DIR = path.join("/home/franck/Documents/code/bib-block-app/",'magnetocorp/');
//const CommercialPaper = require('../contract/lib/paper.js');

class ReadApp {

  
    static async read_all_assets() {

        let query = '{"selector": {"_id": {"$gt": null}} }'

        // A wallet stores a collection of identities for use
        const wallet = await Wallets.newFileSystemWallet(path.join(CURRENT_DIR,'identity/user/balaji/wallet'));
    
        // A gateway defines the peers used to access Fabric networks
        const gateway = new Gateway();
    
        // Main try/catch block
        try {
    
            // Specify userName for network access
            // const userName = 'isabella.issuer@magnetocorp.com';
            const userName = 'balaji';
    
            // Load connection profile; will be used to locate a gateway
            console.log(process.cwd())
            let connectionProfile = yaml.safeLoad(fs.readFileSync(path.join(CURRENT_DIR,'gateway/connection-org1.yaml'),'utf8'));
            // Set connection options; identity and wallet
            let connectionOptions = {
                identity: userName,
                wallet: wallet,
                discovery: { enabled:true, asLocalhost: true }
            };
    
            // Connect to gateway using application specified parameters
            console.log('Connect to Fabric gateway.');
    
            await gateway.connect(connectionProfile, connectionOptions);
    
            // Access PaperNet network
            console.log('Use network channel: mychannel.');
    
            const network = await gateway.getNetwork('mychannel');
    
            // Get addressability to commercial paper contract
            console.log('Use org.ensimag.bibblockbook smart contract.');
    
            const contract = await network.getContract('bookcontract');
    
            console.log('Submit  read transaction.');
            
            const readResponse = await contract.submitTransaction("readAll",query);
    
            // process response
            let json_data = JSON.parse(readResponse.toString("utf8"));
            
            /*Object.entries(json_data).forEach(
                ([position,state]) => console.log(state.Record)
            );*/

    
            console.log('Transaction complete.');

            return json_data

    
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
            return -1
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.');
            gateway.disconnect();
    
        }
    }

}

module.exports = ReadApp;
