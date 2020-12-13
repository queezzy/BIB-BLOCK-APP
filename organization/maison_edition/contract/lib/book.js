/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');

// Enumerate Book state values
const cpState = {
    ISSUED: 1,
    TRADING: 2,
    REDEEMED: 3
};

/**
 * BookResource class extends State class
 * Class will be used by application and smart contract to define a paper
 */
class BookResource extends State {

    constructor(obj) {
        super(BookResource.getClass(), [obj.issuer, obj.resourceID]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getIssuer() {
        return this.issuer;
    }

    setIssuer(newIssuer) {
        this.issuer = newIssuer;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate book states
     */
    setIssued() {
        this.currentState = cpState.ISSUED;
    }

    setTrading() {
        this.currentState = cpState.TRADING;
    }

    setRedeemed() {
        this.currentState = cpState.REDEEMED;
    }

    isIssued() {
        return this.currentState === cpState.ISSUED;
    }

    isTrading() {
        return this.currentState === cpState.TRADING;
    }

    isRedeemed() {
        return this.currentState === cpState.REDEEMED;
    }

    static fromBuffer(buffer) {
        return BookResource.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to book 
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, BookResource);
    }

    /**
     * Factory method to create a book object
     */
    static createInstance(issuer, resourceID, resourceTitle,resourceDescription, resourceValue, issueDateTime, maturityDateTime) {
        return new BookResource({ issuer, resourceID, resourceTitle,resourceDescription, resourceValue, issueDateTime, maturityDateTime});
    }

    static getClass() {
        return 'org.ensimag.bibblockbook';
    }
}

module.exports = BookResource;
