
var Char = { Space: 0, Letter: 1, Digit: 2, Other: 3, Delimiter: 4, Operator: 5, String: 6, Reserved: 7 };

function classify(text, options) {
    options = options || { };
    
    var result = [];
    var l = text.length;
    var instring = false;
        
    var letterfrom = null;
    var letterto = null;
    
    for (var k = 0; k < l; k++) {
        var ch = text[k];
        
        if (options.strings) {
            if (instring && ch == options.strings.escape) {
                result[k] = Char.String;
                
                if (k < l - 1)
                    result[++k] = Char.String;
                    
                continue;
            }
            
            if (ch == options.strings.delimiter) {
                result[k] = Char.String;
                if (instring)
                    instring = false;
                else
                    instring = true;
                checkname();
                continue;
            }
        }
        
        if (instring) {
            result[k] = Char.String;
            continue;
        }
        
        if (isWhitespace(ch))
            result[k] = Char.Space;
        else if (isDigit(ch))
            result[k] = Char.Digit;
        else if (isLetter(ch))
            result[k] = Char.Letter;
        else if (options.delimiters && options.delimiters.indexOf(ch) >= 0)
            result[k] = Char.Delimiter;
        else if (options.operators && options.operators.indexOf(ch) >= 0)
            result[k] = Char.Operator;
        else
            result[k] = Char.Other;
            
        checkname();
    }
    
    checkname();
    
    return result;
    
    function checkname() {
        if (!options.reserved)
            return;
            
        if (result[k] == Char.Letter) {
            if (k == 0 || result[k - 1] != Char.Letter)
                letterfrom = k;
            letterto = k;
        }
        else if (k > 0 && result[k - 1] == Char.Letter) {
            checkreserved();
            letterfrom = null;
            letterto = null;
        }
    }
    
    function checkreserved() {
        if (!options.reserved)
            return;
            
        var name = text.slice(letterfrom, letterto + 1);
        
        if (options.reserved.indexOf(name) >= 0)
            for (var k = letterfrom; k <= letterto; k++)
                result[k] = Char.Reserved;
    }
}

function isWhitespace(ch) {
    return ch.charCodeAt(0) <= 32;
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

function isLetter(ch) {
    return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
}

module.exports = {
    classify: classify,
    Char: Char
};