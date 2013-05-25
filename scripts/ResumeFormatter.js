
function HtmlBuilder() {
    this.string = {};
    this.attributes = new Array();
    this.stack = new Array()

    this.addHeader = function addHeader() {
        this.string = "<!DOCTYPE html><html lang=\"en\">";
    }
    this.openElement = function openElement(element) {
        this.stack.push(element);

        this.string += "<" + element;

        if(this.attributes.length) {
            for(var i = 0; i < this.attributes.length; i++) {
                this.string += this.attributes[i];
            }
            this.attributes = new Array();
        }

        this.string += ">";
    }
    this.closeElement = function closeElement() {
        var element = this.stack.pop();

        this.string += "</" + element + ">";
    }
    this.addElement = function addElement(element, value) {
        this.openElement(element)
        this.string += value;
        this.closeElement();
    }
    this.pushAttribute = function addAttribute(attr, value) {
        var str = " " + attr + "=\"" + value + "\"";
        this.attributes.push(str);
    }
}


function ResumeFormatter() {
    
    this.showResume = function showResume(resume) {
        this.resume = resume;

        var title = resume.person.firstName + " " + resume.person.lastName + "\'s Resume";
        var newWindow = window.open("", title,"", true);

        var html = new HtmlBuilder();
        html.addHeader();
        html.openElement("html");
        html.openElement("head");
        html.pushAttribute("rel", "stylesheet");
        html.pushAttribute("href", "plaintext.css");
        html.openElement("link");
        html.stack.pop(); // link doesn't close
        html.addElement("title", title);

        html.closeElement();
        html.openElement("body");
        html.addElement("p", resume.person.firstName + " " + resume.person.lastName);
        html.addElement("p", resume.person.email);

        html.closeElement()
        html.closeElement();

        // var html = "<!DOCTYPE html><html lang=\"en\"><html><head>";
        // html += "<title>" + title + "</title>"
        // html += "<link rel=\"stylesheet\" href=\"plaintext.css\">";
        // html += "</head><body>";
        // html += "<p>" + resume.person.firstName + " " + resume.person.lastName + "</p>";
        // html += "<p>" + resume.person.email + "</p>"
        // html += "</body></html>"

        newWindow .document.open()
        newWindow .document.write(html.string);
        newWindow .document.close()
    }
}