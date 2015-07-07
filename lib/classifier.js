
var Char = { Space: 0, Letter: 1, Digit: 2, Other: 3, Delimiter: 4, Operator: 5, String: 6, Reserved: 7, Comment: 8 };

function isText(text, k, subtext) {
    var l = subtext.length;
    
    for (var n = 0; n < l; n++)
        if (text[k + n] != subtext[n])
            return false;
            
    return true;
}

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
        
        if (options.comments && options.comments.line && isText(text, k, options.comments.line)) {
            result[k] = Char.Comment;
            
            while (text[k + 1] && text[k + 1] != '\n')
                result[++k] = Char.Comment;
                
            continue;
        }

        if (options.comments && options.comments.start && isText(text, k, options.comments.start)) {
            for (var n = 0; n < options.comments.start.length; n++)
                result[k++] = Char.Comment;
            
            while (text[k] && !isText(text, k, options.comments.end))
                result[k++] = Char.Comment;
                
            if (text[k])
                for (var n = 0; n < options.comments.end.length; n++)
                    result[k++] = Char.Comment;
                    
            k--;
                
            continue;
        }
        
        if (isWhitespace(ch))
            result[k] = Char.Space;
        else if (isDigit(ch)) {
            result[k] = Char.Digit;
            if (isPoint(text[k + 1]) && isDigit(text[k + 2])) {
                result[k + 1] = Char.Digit;
                result[k + 2] = Char.Digit;
                k += 2;
            }
        }
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

function isPoint(ch) {
    return ch == '.';
}

function isLetter(ch) {
    return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
}

module.exports = {
    classify: classify,
    Char: Char
};

