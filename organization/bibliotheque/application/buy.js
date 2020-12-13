/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

/*
 * This application has 6 basic steps:
 * 1. Select an identity from a wallet
 * 2. Connect to network gateway
 * 3. Access PaperNet network
 * 4. Construct request to buy commercial paper
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
const BookResource = require('../contract/lib/book.js');
const path = require('path');
const CURRENT_DIR = path.join(process.cwd(), 'organization/bibliotheque/');

class BuyApp {

    static async buy_contract (transactionType,resource_issuer,resource_id,resource_currentOwner,resource_newOwner) {

        // A wallet stores a collection of identities for use
        const wallet = await Wallets.newFileSystemWallet(path.join(CURRENT_DIR,'identity/user/balaji/wallet'));
    
        // A gateway defines the peers used to access Fabric networks
        const gateway = new Gateway();
    
        // Main try/catch block
        try {
    
            // Specify userName for network access
            const userName = 'balaji';
    
            // Load connection profile; will be used to locate a gateway
            let connectionProfile = yaml.safeLoad(fs.readFileSync(path.join(CURRENT_DIR,'gateway/connection-org1.yaml'),'utf8'));
    
            // Set connection options; identity and wallet
            let connectionOptions = {
                identity: userName,
                wallet: wallet,
                discovery: { enabled: true, asLocalhost: true }
    
            };
    
            // Connect to gateway using application specified parameters
            console.log('Connect to Fabric gateway.');
    
            await gateway.connect(connectionProfile, connectionOptions);
    
            // Access PaperNet network
            console.log('Use network channel: mychannel.');
    
            const network = await gateway.getNetwork('mychannel');
    
            // Get addressability to commercial paper contract
            console.log('Use org.ensimag.bibblockbook smart contract.');
    
            const contract = await network.getContract('bookcontract', 'org.ensimag.bibblockbook');
    
            // buy commercial paper
            console.log('Submit book resource buy transaction.');
    
            const buyResponse = await contract.submitTransaction(transactionType, resource_issuer, resource_id, resource_currentOwner, resource_newOwner);
            

            // process response
            console.log('Process buy transaction response.');
    
            let resource = BookResource.fromBuffer(buyResponse);
            console.log(resource)
            console.log('Transaction complete.');

            return 0;
    
        } catch (error) {
            
            return 1
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.');
            gateway.disconnect();
    
        }
    }
}

module.exports = BuyApp;

