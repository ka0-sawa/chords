"use strict"

const Const = require("./const")

class Chord {
    constructor(name, options) {
        this.name = name;
        this.constituentSound = [];

        this.option3rd = null;
        this.option5th = null;
        this.option7th = null;

        this.minor = false;
        this.sus4 = false;
        this.sus2 = false;
        this.omit3 = false;

        this.flat5 = false;
        this.augment = false;
        this.omit5 = false;
        
        this["7th"] = false;
        this.major7th = false;
        this.omit7 = true;

        this.add = 1;

        this.diminish = false;

    }

    get ConstituentSound(){
        return constituentSound;
    }

    get Name(){
        return name;
    }

    setOptions(options){
        if(options[Const.CHORD_OPTIONS["MINOR"]]){

        }
    }

    
    get3rdSound(){

    }

    _calchello() {
        console.log('My name is ' + this.name);
    }
}