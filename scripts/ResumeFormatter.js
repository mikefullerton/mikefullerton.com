
function HtmlBuilder() {
    _string = "";
    _attributes = new Array();
    _stack = new Array()

    this.addHeader = function addHeader() {
        _string = "<!DOCTYPE html><html lang=\"en\">";
    }
    this.openElement = function openElement(element) {
        _stack.push(element);

        _string += "<" + element;

        if(_attributes.length) {
            for(var i = 0; i < _attributes.length; i++) {
                _string += _attributes[i];
            }
            _attributes = new Array();
        }

        _string += ">";
    }
    this.closeElement = function closeElement() {
        var element = _stack.pop();

        _string += "</" + element + ">";
    }
    this.addElement = function addElement(element, value) {
        this.openElement(element)
        _string += value;
        this.closeElement();
    }
    this.pushAttribute = function addAttribute(attr, value) {
        var str = " " + attr + "=\"" + value + "\"";
        _attributes.push(str);
    }
    this.toString = function() {
        return _string;
    }
    this.forgetOpenElement = function() {
        _stack.pop();
    }
    this.appendString = function(string) {
        _string += string;
    }
}


function ResumeFormatter() {
    
    this.formatResumeContent = function(resume) {
        var html = new HtmlBuilder();
        html.addElement("p", resume.person.firstName + " " + resume.person.lastName);
        html.addElement("p", resume.person.email);
        
        return html.toString();
    }
    
    this.openResumeInNewWindow = function(resume) {

        var title = resume.person.firstName + " " + resume.person.lastName + "\'s Resume";
        var newWindow = window.open("", title,"", true);

        var html = new HtmlBuilder();
        html.addHeader();
        html.openElement("html");
        html.openElement("head");
        html.pushAttribute("rel", "stylesheet");
        html.pushAttribute("href", "plaintext.css");
        html.openElement("link");
        html.forgetOpenElement(); // link doesn't close
        html.addElement("title", title);

        html.closeElement();
        html.openElement("body");

        html.appendString(this.formatResumeContent(resume));

        html.closeElement()
        html.closeElement();

        newWindow .document.open()
        newWindow .document.write(html.toString());
        newWindow .document.close()
    }
}