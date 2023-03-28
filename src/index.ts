import * as service from './fileHandler';

    try {

        const word_counter = new service.FileHandler();
        const parm = process.argv[2];
        word_counter.wordCount(parm);

    } catch (e) {

        console.log("Failed with error: " + e);
    }