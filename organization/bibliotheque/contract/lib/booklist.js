/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('../ledger-api/statelist.js');

const BookResource = require('./book.js');

class BookList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.ensimag.booklist');
        this.use(BookResource);
    }

    async addBook(paper) {
        return this.addState(paper);
    }

    async getBook(paperKey) {
        return this.getState(paperKey);
    }

    async updateBook(paper) {
        return this.updateState(paper);
    }
    async couchQuery(query){
        return this.couchQueryState(query)
    }    

    async couchSearch(query){
        return this.couchSearchState(query)
    }
}


module.exports = BookList;
