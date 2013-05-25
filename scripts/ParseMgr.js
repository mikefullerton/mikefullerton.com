

var ParseMgr = (function() {

    var instance;
    
    function parseMgr() {
        Parse.initialize("2r6tx5l1gZZCbDXMgBXaNU4AaZF9fn111npxGO5m", "PY2d7c2R5LvPKzf7EPvjfD4sKHgSc8ut2xAvt8dg");
        
        this.classIdFromKey = function classIdFromKey(key) {
          var split = key.split(":");
          return split[1];    
        }
    
        this.classFromKey = function classFromKey(key) {
          var split = key.split(":");
          return split[0].substr("fl_".length, split[0].length - "fl_".length);
        }
    
        this.stringIsKey = function stringIsKey(str) {
          return str.search("fl_") == 0;
        }
    
        this.findObjectWithKey = function findObjectWithKey(key, success, failure) {
          
          var className = this.classFromKey(key);
          var classId = this.classIdFromKey(key);
    
          var query = new Parse.Query(className);
          query.get(classId, {
            success: function(results) {
                success(instance.makeObjectWithParseObject(results));
            },
            error: function(error) {
                failure(error);
            }
            });
        }
        
        this.findObjectsOfType = function findObjectsOfType(type, success, failure) {
    
            var query = new Parse.Query(type);
            query.find( {
                success: function(results) {
                    var newArray = new Array()
                    for(var i = 0; i < results.length; i++) {
                        newArray.push(instance.makeObjectWithParseObject(results[i]));
                    }
                    success(newArray);
                },
                error: function(error) {
                    failure(error);
                }
            });
            
        }
        
        this.makeObjectWithParseObject = function makeObjectWithParseObject(parseObject) {
            var newObject = new Object();
    
            for(var prop in parseObject.attributes) {
    //            console.log(prop);
                newObject[prop] = parseObject.get(prop);          
            }      
      
            return newObject;
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
