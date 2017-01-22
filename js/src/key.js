"use strict"

const Const = require("./const");

class Key {
    constructor(key, octaves) {
        this.key = key || Const.WHITE_KEYS.C;
        this.octaves = octaves || 0;
    }

    convertFlatToSharp(flatKey){
        const index = Const.BLACK_KEYS_FLAT.indexOf(flatKey);
        if(index == -1){
            return null;
        }
        return Const.BLACK_KEYS_SHARP[index];
    }

    setKeyDegree(rootKey, degree, sharp =false, flat = false){
        var sharpkey = this.convertFlatToSharp(rootKey);
        rootKey = sharpkey || rootKey;

        let octaves = 0;
        const octaveDegree = 8;
        if(flat === true && sharp === true){
            flat = false;
            sharp = false;
        }
        if(flat === true){
            degree--;
            sharp = true;
            flat = false;
        }
        while ( octaveDegree <= degree){
            octaves++;
            degree = degree - (octaveDegree - 1);
        }
        const distance = Const.DEGREE_HALFTONE_COUNT[degree.toString()];

        let keybords = Const.KEYBORDS;
        let rootIdx = keybords.indexOf(rootKey);
        if(sharp){
            rootIdx = rootIdx + 1;
        } else if(flat){
            rootIdx = rootIdx - 1;
        }
        if(1 <= rootIdx){
            keybords = keybords.slice(rootIdx).concat(keybords.slice(0, rootIdx));
        }

        return {
            "octaves" : octaves,
            "key" : keybords[distance],
            "distance":distance
        }
    }

}

module.exports = Key;

