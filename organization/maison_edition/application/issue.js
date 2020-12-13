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
const CURRENT_DIR = path.join(process.cwd(), 'organization/maison_edition/');

//const CURRENT_DIR = path.join("/home/franck/Documents/code/bib-block-app/",'magnetocorp/');
const BookResource = require('../contract/lib/book.js');

class IssueApp {


    static async issue_contract(transactionType,resourceID,resourceTitle,resourceDescription,resourceValue,resourceRightsIssuer) {

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
            console.log('Use org.ensimag.bibblockbook smart contract.');
    
            const contract = await network.getContract('bookcontract');
    
            // issue commercial paper
            console.log('Submit commercial paper issue transaction.');
    
            let d = new Date(); let month = d.getMonth()+1; let day = d.getDate();
            const currentDate = d.getFullYear() + '-' +((''+month).length<2 ? '0' : '') + month 
                                    + '-' +((''+day).length<2 ? '0' : '') + day;
        
            d.setDate(d.getDate()+60); month = d.getMonth()+1; day = d.getDate()
            const maturationDate = d.getFullYear() + '-' +((''+month).length<2 ? '0' : '') + month 
                                    + '-' +((''+day).length<2 ? '0' : '') + day;
            
            const issueResponse = await contract.submitTransaction(transactionType, resourceRightsIssuer, resourceID, resourceTitle,resourceDescription, resourceValue, currentDate, maturationDate);
    
            // process response
            console.log('Process issue transaction response.'+issueResponse);
    
            let resource = BookResource.fromBuffer(issueResponse);
            
            console.log(`${resource.issuer} resource rights of : ${resource.resourceTitle} successfully issued for value ${resource.resourceValue}`);
            console.log('Transaction complete.');

            return 0;

        } catch (error) {
    
            console.log(`Error processing transaction. ${error}`);
            console.log(error.stack);
            return 1;
    
        } finally {
    
            // Disconnect from the gateway
            console.log('Disconnect from Fabric gateway.');
            gateway.disconnect();
    
        }
    }


}


module.exports = IssueApp;
