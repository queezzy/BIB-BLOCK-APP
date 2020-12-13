/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// PaperNet specifc classes
const BookResource = require('./book.js');
const BookList = require('./booklist.js');

/**
 * A custom context provides easy access to list of all commercial papers
 */
class BookResourceContext extends Context {

    constructor() {
        super();
        // All papers are held in a list of papers
        this.bookList = new BookList(this);
    }

}

/**
 * Define commercial paper smart contract by extending Fabric Contract class
 *
 */
class BookResourceContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.ensimag.bibblockbook');
    }

    /**
     * Define a custom context for the book resource
    */
    createContext() {
        return new BookResourceContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async instantiate(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }

    /**
     * Issue book
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer commercial paper issuer
     * @param {Integer} resourceID resource ID number for this issuer
     * @param {String} resourceTitle resource title
     * @param {String} resourceDescription resource description
     * @param {Integer} resourceValue the price to buy the rights to exploit a resource
     * @param {String} issueDateTime resource rights issue date
     * @param {String} maturityDateTime paper maturity date
    */
    async issue(ctx, issuer, resourceID, resourceTitle,resourceDescription, resourceValue, issueDateTime, maturityDateTime) {

        // create an instance of the paper
        let book = BookResource.createInstance(issuer, resourceID, resourceTitle,resourceDescription, resourceValue, issueDateTime, maturityDateTime);

        // Smart contract, rather than paper, moves paper into ISSUED state
        book.setIssued();

        // Newly issued paper is owned by the issuer
        book.setOwner(issuer);

        // Add the paper to the list of all similar commercial papers in the ledger world state
        await ctx.bookList.addBook(book);

        // Must return a serialized paper to caller of smart contract
        return book;
    }

    /**
     * Buy commercial paper
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer commercial paper issuer
     * @param {Integer} paperNumber paper number for this issuer
     * @param {String} currentOwner current owner of paper
     * @param {String} newOwner new owner of paper
     * @param {Integer} price price paid for this paper
     * @param {String} purchaseDateTime time paper was purchased (i.e. traded)
    */
    
    // Dans la V2, intégrer le prix

    async buy(ctx, resource_issuer, resource_id, resource_currentOwner, resource_newOwner) {

        // Retrieve the current paper using key fields provided
        let resourceKey = BookResource.makeKey([resource_issuer, resource_id]);
        let resource = await ctx.bookList.getBook(resourceKey);

        if(resource == null){
            throw new Error("La ressource que vous avez référencée n'existe pas");
        }
        if(resource_currentOwner == resource_newOwner){
            throw new Error("Vous ne pouvez pas acheter des ressources que vous possédez déjà"); 
        }
        // Validate current owner
        if (resource.getOwner() !== resource_currentOwner) {
            throw new Error('La ressource ' + resource_issuer + resource_id + ' n\'appartient pas à  ' + resource_currentOwner);
        }

        // First buy moves state from ISSUED to TRADING

        if (resource.isIssued()) {
            resource.setTrading();
        }

        // Check paper is not already REDEEMED
        if (resource.isTrading()) {
            resource.setOwner(resource_newOwner);
        } else {
            throw new Error('La Ressource ' + resource_issuer + resource_id + ' est en mode rétrocédé');
        }

        // Update the paper
        await ctx.bookList.updateBook(resource);
        return resource;
    }

    /**
     * Redeem commercial paper
     *
     * @param {Context} ctx the transaction context
     * @param {String} issuer book resource issuer
     * @param {Integer} paperNumber paper number for this issuer
     * @param {String} redeemingOwner redeeming owner of book
     * @param {String} redeemDateTime time book was redeemed
    */
    async redeem(ctx, resource_issuer, resource_id, redeemingOwner) {

        let resource_key = BookResource.makeKey([resource_issuer, resource_id]);

        let resource = await ctx.bookList.getBook(resource_key);

        // Check paper is not REDEEMED
        if (resource.isRedeemed()) {
            throw new Error('Ressource ' + resource_issuer + resource_id + ' déjà rétrocédée');
        }

        // Verify that the redeemer owns the commercial paper before redeeming it
        if (resource.getOwner() === redeemingOwner) {
            resource.setOwner(resource.getIssuer());
            resource.setRedeemed();
        } else {
            throw new Error('Vous essayez de rétrocéder une ressource que vous ne possédez pas');
        }

        await ctx.bookList.updateBook(resource);
        return resource;
    }

    async readAll(ctx,query) {
        // Add the paper to the list of all similar commercial papers in the ledger world state
        let books = await ctx.bookList.couchQuery(query);
        // Must return a serialized book to caller of smart contract
        return books;
    }

    async searchLedger(ctx,query) {
        let book = await ctx.bookList.couchSearch(query);
        return book;
    }

}

module.exports = BookResourceContract;
