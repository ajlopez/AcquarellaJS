
var classifier = require('./classifier');
var Char = classifier.Char;

function toHtml(text, options) {
    var types = classifier.classify(text, options);
    var result = '';
    var l = text.length;
    var type = null;
    
    for (k = 0; k < l; k++) {
        if (types[k] != type && !(types[k] == Char.Digit && type == Char.Letter)) {
            if (type != null && type != Char.Space)
                result += '</span>';
                
            type = types[k];
            
            if (type != Char.Space) {
                result += '<span ';
                
                if (type == Char.Letter)
                    result += "class='acqname'";
                else if (type == Char.Digit)
                    result += "class='acqnumber'";
                else if (type == Char.Delimiter)
                    result += "class='acqdelimiter'";
                else if (type == Char.Operator)
                    result += "class='acqoperator'";
                else if (type == Char.String)
                    result += "class='acqstring'";
                    
                result += ">";
            }
        }
        
        result += text[k];
    }
        
    if (type != null && type != Char.Space)
        result += '</span>';
        
    return result;
}

module.exports = {
    toHtml: toHtml,
    Char: classifier.Char
}