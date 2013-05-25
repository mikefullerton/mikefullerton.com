

function ResumeLoader() {

    _resume = {};
    _successCallback = {};
    _failureCallback = {};
    
    handleCoverPageLoaded = function handleCoverPageLoaded(results) {
    
        if(results.length == 1) {
            _resume.coverpage = results[0];
            _successCallback(_resume);
        }
        else {
            _failureCallback("cover page not loaded");
        }
    }

    handlePersonLoaded = function handlePersonLoaded(results) {
        _resume.person = results;
   
        ParseMgr().getInstance().findObjectsOfType("FLResumeCoverPage", 
            handleCoverPageLoaded,
            _failureCallback
        );
    }

    handleResumeLoaded = function handleResumeLoaded(results) {
        if(results.length == 1) {
            _resume = results[0];
            
            ParseMgr().getInstance().findObjectWithKey(_resume.person, 
                handlePersonLoaded,
                _failureCallback);
            
        }
        else {
            _failureCallback("wrong results loading resume");
        }
    }
   
    this.beginLoading = function beginLoading(success, failure) {
        _successCallback = success;
        _failureCallback = failure;
    
        ParseMgr().getInstance().findObjectsOfType("FLResume", 
            handleResumeLoaded,
            _failureCallback);
        
    }

}

