import { access } from 'fs/promises';
import { constants } from 'fs';
import { promises as fs } from 'fs';
import assert from 'node:assert/strict';
import path from "node:path";

export class FileHandler {
    private _data: Map<string, number>;

    constructor() {
        // initialise data store for words as a private
        this._data = new Map<string, number>();
        return this; // return a reference to this instance for builder pattern.
    }

    private processContents(contents:string) {
        contents.split(/\r?\n/).forEach(line => {
            const key = line.replace(/\s/g, "").toLowerCase();
            if (this._data.has(key)) {
                // If the key exists, increment its value by 1 else initalise as 0
                const current_value = this._data.get(key) ?? 0;
                //assumption: hello hello will be treated as hellohello and not 2 hello
                this._data.set(key, current_value + 1);
            } else {
                // If the key does not exist, add it to the map with a value of 1
                this._data.set(key, 1);
            }
        });
    }

    private async saveTableToFile(filepath: string) {
        try {
            await access(filepath, constants.R_OK | constants.W_OK);

            let output: string = "";
            const sorted_map = new Map([...this._data].sort((a, b) => String(a[0]).localeCompare(b[0])));
            sorted_map.forEach((value, key) => {
                output += key + " = " + value + "\n";
            })
            console.table(sorted_map);
            const uri = path.resolve(filepath);
            await fs.writeFile(uri + ".result", output, "utf8");
            return sorted_map
        } catch(error) {
            throw new Error("failed to save file");
        }
    }

   private async readFile(path:string): Promise<string> {
         try {
            await access(path, constants.R_OK | constants.W_OK);
            const data = await fs.readFile(path, 'utf8');
            this.processContents(data)
            return data;
         } catch (error) {
             throw new Error("failed to read file " + path);
         }
    }

    public async wordCount(filepath: string): Promise<string> {
        try {
            assert(filepath);
            const uri = path.resolve(filepath);
            await access(filepath, constants.R_OK | constants.W_OK);
            return this.readFile(uri)
                .then((contents) => { return contents })
                .finally(() => this.saveTableToFile(uri))
                .catch((error) => { return error.message })
        } catch (error) {
            throw new Error(`failed to process file ${filepath}`);
        }
    }
}