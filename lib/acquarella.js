
var classifier = require('./classifier');
var Char = classifier.Char;

function charTypeToClass(chartype)
{
    if (chartype == Char.Letter)
        return 'acqname';
    if (chartype == Char.Digit)
        return 'acqnumber';
    if (chartype == Char.Delimiter)
        return 'acqdelimiter';
    if (chartype == Char.Operator)
        return 'acqoperator';
    if (chartype == Char.String)
        return 'acqstring';
    if (chartype == Char.Reserved)
        return 'acqreserved';
    if (chartype == Char.Comment)
        return 'acqcomment';
        
    return null;
}

function toHtml(text, options) {
    var types = classifier.classify(text, options);
    var result = '';
    var l = text.length;
    var type = null;
    
    for (k = 0; k < l; k++) {
        if (types[k] != type && !(types[k] == Char.Digit && type == Char.Letter) && !(types[k] == Char.Other && type == Char.Letter)) {
            if (type != null && type != Char.Space)
                result += '</span>';
                
            type = types[k];
            
            if (type == Char.Other && types[k + 1] == Char.Letter)
                type = Char.Letter;
            
            if (type != Char.Space) {
                var cls = charTypeToClass(type);
                
                result += '<span ';
                
                if (cls)
                    result += "class='" + cls + "'";
                    
                result += '>';
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

