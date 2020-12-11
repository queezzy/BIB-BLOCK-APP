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
 * 4. Construct request to issue commercial paper
 * 5. Submit transaction
 * 6. Process response
 */

'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const CURRENT_DIR = path.join(process.cwd(), 'magnetocorp/');
const CommercialPaper = require('../contract/lib/paper.js');

class IssueApp {


    static async main(transactionType,paperID,paperIssuer,paperFaceValue) {

        // A wallet stores a collection of identities for use
        const wallet = await Wallets.newFileSystemWallet(path.join(CURRENT_DIR,'identity/user/isabella/wallet'));
    
        // A gateway defines the peers used to access Fabric networks
        const gateway = new Gateway();
    
        // Main try/catch block
        try {
    
            // Specify userName for network access
            // const userName = 'isabella.issuer@magnetocorp.com';
            const userName = 'isabella';
    
            // Load connection profile; will be used to locate a gateway
            console.log(process.cwd())
            let connectionProfile = yaml.safeLoad(fs.readFileSync(path.join(CURRENT_DIR,'gateway/connection-org2.yaml'),'utf8'));
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
            console.log('Use org.papernet.commercialpaper smart contract.');
    
            const contract = await network.getContract('papercontract');
    
            query = "{"
    
            // process response
            console.log('Process issue transaction response.'+issueResponse);
    
            let paper = CommercialPaper.fromBuffer(issueResponse);
    
            console.log(`${paper.issuer} commercial paper : ${paper.paperNumber} successfully issued for value ${paper.faceValue}`);
            console.log('Transaction complete.');
    
        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.');
            gateway.disconnect();
    
        }
    }

    static async issue_contract(transactionType,paperID,paperIssuer,paperFaceValue){

        IssueApp.main(transactionType,paperID,paperIssuer,paperFaceValue).then(() => {

            console.log('Issue program complete.');
            return true;
        
        }).catch((e) => {
        
            console.log('Issue program exception.');
            console.log(e);
            console.log(e.stack);
            process.exit(-1);
        
        });

    }

    
}
module.exports = IssueApp;
// Main program function


