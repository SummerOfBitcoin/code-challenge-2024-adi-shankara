import {readFileSync, writeFileSync} from 'fs';
import {validateHeader} from "./validate-header.js";
import {validateBlock} from "./validate-block.js";

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export const run = async () => {
    console.log('Running the tests')
    try {
        const data = readFileSync('../output.txt', 'utf8').trim().split('\n');
        const header = data[0];
        const coinbase = data[1];
        const txids = data.slice(2);

        // Validate the block header
        await validateHeader(header, txids);

        // Validate the block
        const result = validateBlock(coinbase, txids);

        // Write the result to a file
        writeFileSync('../result.json', JSON.stringify(result, null, 2));
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
