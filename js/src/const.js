"use strict"

const Const = {    
}

Const.WHITE_KEYS = ["C","D","E","F","G","A","B"]
Const.BLACK_KEYS_SHARP = ["C#","D#","F#","G#","A#"]
Const.BLACK_KEYS_FLAT = ["Db","Eb","Gb","Ab","Bb"]


Const.KEYBORDS = [
    Const.WHITE_KEYS[0],
    Const.BLACK_KEYS_SHARP[0],
    Const.WHITE_KEYS[1],
    Const.BLACK_KEYS_SHARP[1],
    Const.WHITE_KEYS[2],
    Const.WHITE_KEYS[3],
    Const.BLACK_KEYS_SHARP[2],
    Const.WHITE_KEYS[4],
    Const.BLACK_KEYS_SHARP[3],
    Const.WHITE_KEYS[5],
    Const.BLACK_KEYS_SHARP[4],
    Const.WHITE_KEYS[6]
]

Const.DEGREE_HALFTONE_COUNT = {
    1:0,
    2:2,
    3:4,
    4:5,
    5:7,
    6:9,
    7:11
}

Const.CHORD_OPTIONS = [
        "MINOR",
        "SUS2",
        "SUS4",
        "OMIT",
        "FLAT5",
        "AUGMENT",
        "7th",
        "MAJOR7",
        "ADD"
]

module.exports = Const;