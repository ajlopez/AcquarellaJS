
var classifier = require('./classifier');
var Char = classifier.Char;

function toHtml(text) {
    var types = classifier.classify(text);
    var result = '';
    var l = text.length;
    var type = null;
    
    for (k = 0; k < l; k++) {
        if (types[k] != type) {
            if (type != null && type != Char.Space)
                result += '</span>';
                
            type = types[k];
            
            if (type != Char.Space) {
                result += '<span ';
                
                if (type == Char.Letter)
                    result += "class='acqname'";
                else if (type == Char.Digit)
                    result += "class='acqnumber'";
                    
                result += ">";
            }
        }
        
        result += text[k];
    }
        
    if (type != null)
        result += '</span>';
        
    return result;
}

module.exports = {
    toHtml: toHtml,
    Char: classifier.Char
}