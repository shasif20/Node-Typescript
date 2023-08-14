'use strict';
const fs = require('fs').promises;
module.exports = async function parseFileData(fileName): Promise<Transaction[] | StockItem[]> {
    try {
        const data = await fs.readFile(`${__dirname}/../data/${fileName}`);
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
}