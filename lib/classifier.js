
var Char = { Space: 0, Letter: 1, Digit: 2, Other: 3, Delimiter: 4, Operator: 5, String: 6 };

function classify(text, options) {
    options = options || { };
    
    var result = [];
    var l = text.length;
    var instring = false;
    
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
    }
    
    return result;
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