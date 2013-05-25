
// function signup() {
//     var user = new Parse.User();
//     user.set("username", "guest");
//     user.set("password", "guest");
//     user.set("email", "");
     
//     // other fields can be set just like with Parse.Object
     
//     user.signUp(null, {
//       success: function(user) {
//         // Hooray! Let them use the app now.
//       },
//       error: function(user, error) {
//         // Show the error message somewhere and let the user try again.
//         alert("Error: " + error.code + " " + error.message);
//       }
//     });
// }

// var Resume = function() {


function Resume() {

  this.resume = {};
  this.person = {};

  var _successCallback = {};
  var _failureCallback = {};

  Parse.initialize("2r6tx5l1gZZCbDXMgBXaNU4AaZF9fn111npxGO5m", "PY2d7c2R5LvPKzf7EPvjfD4sKHgSc8ut2xAvt8dg");
  
  function classIdFromKey(key) {
      var split = key.split(":");
      return split[1];    
  }

  function classFromKey(key) {
      var split = key.split(":");
      return split[0].substr("fl_".length, split[0].length - "fl_".length);
  }

  function stringIsKey(str) {
      return str.search("fl_") == 0;
  }

  function findObject(key) {
        
  }

  this.hi = function hi() {
      alert("hi");
  }

  function findObjectWithKey(key, cb) {
      
      var className = classFromKey(key);
      var classId = classIdFromKey(key);

      var query = new Parse.Query(className);
      query.get(classId, cb);
  }

  function handleError(error) {
    _failureCallback(error);
  }

  function handleFinishedLoading() {
    _successCallback(this);
  }

  function handlePersonLoaded(person) {
      this.person = person;

      handleFinishedLoading();
  }

  function handleResumeLoaded(resume) {
      this.resume = resume;

      var personKey = resume.get("person");
      findObjectWithKey(personKey, {
        success: function(results) {
          handlePersonLoaded(results)
        },
        error:function(error) {
          handleError(error);
        }
        });
  }

  this.beginLoading = function beginLoading(success, failure) {
      _successCallback = success;
      _failureCallback = failure;

      var query = new Parse.Query("FLResume");
      query.find({
          success: function(results) {
            if(results.length == 1) {
              handleResumeLoaded(results[0]);
            }
          },
          error:function(error) {
            handleError(error);
          }
        });
  }

// this should fail
  function testParse() {
      var TestObject = Parse.Object.extend("TestObject");
      var testObject = new TestObject();
        testObject.save({foo: "bar"}, {
          success: function(object) {
            // var theDiv = document.getElementById("success");
            // theDiv.style.display="";

            alert("ok");
            // $(".success").show();
          },
          error: function(model, error) {
            // var theDiv = document.getElementById("error");
            // theDiv.style.display="";
            // $(".error").show();
            alert("fail (it's supposed to fail)");
          }
        });
  }

}

