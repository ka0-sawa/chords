"use strict"

const Key = require("./key")

$(document).ready(function() {
    $("li").click(function(){
        let li = $(this);
        const isRemove = li.parent().hasClass("sharpFlat") && li.hasClass("selected");
        li.siblings("li").removeClass("selected");
        if(isRemove){
            li.removeClass("selected")    
        }else{
            li.addClass("selected")
        }
        let selected = "";
        $("li.selected").each(function(){
            selected += $(this).text()
        });
        let key = new Key();
        let tds = $(".result td");
        const result = key.setKeyDegree(selected.replace("♭","b"), $("input").val());
        $(".result th").each(function(idx){
            const result = key.setKeyDegree(selected.replace("♭","b"), idx + 1);
            tds.eq(idx).text(result.key.replace("b","♭"));
        })
    });
    $("#calcButton").click(function(){
        let selected = "";
        $("li.selected").each(function(){
            selected += $(this).text()
        });
        let key = new Key();
        const result = key.setKeyDegree(selected.replace("♭","b"), $("input").val());
        let va = "";
        if(1 <= result.octaves){
            va = 8 * result.octaves + "va";
        } else if(result.octaves <= -1){
            va = 8 * result.octaves + "va bassa";
        }
        $(".resultKey").text(
            result.key.replace("b","♭") + va
        )
        
    });
})
