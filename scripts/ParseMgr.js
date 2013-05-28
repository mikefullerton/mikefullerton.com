
var ObjectPropertyLoader = function(obj, success, failure) {
    this._object = obj;
    this._success = success;
    this._failure = failure;
    this._loadingKey = "";
    
    this.didLoadObject = function(result) {
        this._object[this._loadingKey] = result;
        this._loadingKey = "";
        
        this.loadNextProperty(this._object);
    }
    
    this.loadNextProperty = function(object) {
        for(var theProp in object) {
            var theValue = object[theProp];

            if( theValue != undefined) {
            
                if( ParseMgr().getInstance().varIsKey(theValue)) {
                    this._loadingKey = theProp;
                    ParseMgr().getInstance().findObjectWithKey(theValue, this.didLoadObject, this._failure)
                    
                    return;
                }
                else if(typeof theValue == 'array') {
                
                }
            }
        }
        
        this._success(this._object);
    }
    
    this.beginLoading = function() {
        this.loadNextProperty(this._object);
    }
}

var BatchObjectPropertyLoader = function(array, success, failure) {

    _array = array;
    _newArray = new Array();
    _success = success;
    _failure = failure;
    
    didLoadObject = function(object) {
        _newArray.push(object);
        
        loadNextObject();
    }
    
    loadNextObject = function() {
        if(_array.length) {
            var propLoader = new ObjectPropertyLoader(_array.pop(), _success, _failure);
            propLoader.beginLoading();
            return;
        }
        
        success(_newArray)
    }
    
    this.beginLoading = function() {
        loadNextObject();   
    }
}


var ParseMgr = (function() {

    var instance;
    
    function parseMgr() {
        Parse.initialize("2r6tx5l1gZZCbDXMgBXaNU4AaZF9fn111npxGO5m", "PY2d7c2R5LvPKzf7EPvjfD4sKHgSc8ut2xAvt8dg");

        makeObjectWithParseObject = function(parseObject) {
            var newObject = new Object();
    
            for(var prop in parseObject.attributes) {
    //            console.log(prop);
                newObject[prop] = parseObject.get(prop);          
            }      
      
            return newObject;
        }

        
        this.classIdFromKey = function classIdFromKey(key) {
            var split = key.split(":");
            return split[1];    
        }
    
        this.classFromKey = function classFromKey(key) {
            var split = key.split(":");
            return split[0].substr("fl_".length, split[0].length - "fl_".length);
        }
    
        this.varIsKey = function varIsKey(str) {
            return (typeof str == 'string') && str.search("fl_") == 0;
        }
    
        didLoadObject = function(object, success, fail) {
            var newObject = makeObjectWithParseObject(object);
            var propLoader = new ObjectPropertyLoader(newObject, success, fail);
            propLoader.beginLoading();
        }
        
        didLoadArrayOfObjects = function(objects, success, fail) {
            var newArray = new Array()
            for(var i = 0; i < objects.length; i++) {
                newArray.push(makeObjectWithParseObject(objects[i]));
            }

            var batchLoader = new BatchObjectPropertyLoader(newArray, success, fail);
            batchLoader.beginLoading();
        }
    
        this.findObjectWithKey = function findObjectWithKey(key, success, failure) {
          
          var className = this.classFromKey(key);
          var classId = this.classIdFromKey(key);
    
          var query = new Parse.Query(className);
          query.get(classId, {
                success: function(results) {
                    didLoadObject(results, success, failure);
                },
            error:failure
            });
        }
        
        this.findObjectsOfType = function findObjectsOfType(type, success, failure) {
    
            var query = new Parse.Query(type);
            query.find( {
                success: function(results) {
                    didLoadArrayOfObjects(results, success, failure);
                },
                error: failure
            });
            
        }
        
    }    
    
    return {
        getInstance: function() {
            if(instance == undefined) {
                instance = new parseMgr();
            }
            return instance;
        }
    };
    
});


    // // this should fail
//   function testParse() {
//       var TestObject = Parse.Object.extend("TestObject");
//       var testObject = new TestObject();
//         testObject.save({foo: "bar"}, {
//           success: function(object) {
//             // var theDiv = document.getElementById("success");
//             // theDiv.style.display="";

//             alert("ok");
//             // $(".success").show();
//           },
//           error: function(model, error) {
//             // var theDiv = document.getElementById("error");
//             // theDiv.style.display="";
//             // $(".error").show();
//             alert("fail (it's supposed to fail)");
//           }
//         });
//   }
