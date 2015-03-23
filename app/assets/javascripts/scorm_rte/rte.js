function LMSAPI(){
  this.cache = {};
  this.SCOInstanceID = 123456789;

  // 1.2
  this.LMSInitialize=LMSInitialize;
  this.LMSGetValue=LMSGetValue;
  this.LMSSetValue=LMSSetValue;
  this.LMSCommit=LMSCommit;
  this.LMSFinish=LMSFinish;
  this.LMSGetLastError=LMSGetLastError;
  this.LMSGetDiagnostic=LMSGetDiagnostic;
  this.LMSGetErrorString=LMSGetErrorString;

  // 2004
  this.Initialize=LMSInitialize;
  this.GetValue=LMSGetValue;
  this.SetValue=LMSSetValue;
  this.Commit=LMSCommit;
  this.Treminate=LMSFinish;
  this.GetLastError=LMSGetLastError;
  this.GetDiagnostic=LMSGetDiagnostic;
  this.GetErrorString=LMSGetErrorString;

  // ------------------------------------------
  //   Status Flags
  // ------------------------------------------
  var flagFinished = false;

  // ------------------------------------------
  //   SCO Data Cache - Initialization
  // ------------------------------------------

  // ------------------------------------------
  //   SCORM RTE Functions - Initialization
  // ------------------------------------------
  function LMSInitialize(dummyString) {
    console.log('***');
    console.log('initialized');
    console.log(this.cache);

    var url = 'http://localhost:3000/scorm_rte/stores/fetch?sco_instance_id='+this.SCOInstanceID;
    var tempCache = {};

    $.ajax({
      url: url,
      dataType: 'json',
      async: false
    }).done(function( data ) {
      tempCache = data;
    });

    // this.cache = JSON.parse(localStorage.getItem('k')) || {}
    this.cache = tempCache;
    console.log(this.cache);
    console.log('***');
    return "true";
  }

  // ------------------------------------------
  //   SCORM RTE Functions - Getting and Setting Values
  // ------------------------------------------
  function LMSGetValue(varname) {
      //alert(this.cache[varname]);
      var v = this.cache[varname];
      if(v == undefined){
          v = ""
      }
      return v
  }

  function LMSSetValue(varname,varvalue) {
    this.cache[varname] = varvalue;
    return "true";
  }

  // ------------------------------------------
  //   SCORM RTE Functions - Saving the Cache to the Database
  // ------------------------------------------
  function LMSCommit(dummyString) {
    // code to prevent caching
    var d = new Date();


    // create a POST-formatted list of cached data elements
    // include only SCO-writeable data elements
    var params = 'scorm_rte_store[sco_instance_id]='+this.SCOInstanceID+'&code='+d.getTime();
    params += "&scorm_rte_store[data][cmi.core.lesson_location]="+urlencode(this.cache['cmi.core.lesson_location']);
    params += "&scorm_rte_store[data][cmi.core.lesson_status]="+urlencode(this.cache['cmi.core.lesson_status']);
    params += "&scorm_rte_store[data][cmi.core.exit]="+urlencode(this.cache['cmi.core.exit']);
    params += "&scorm_rte_store[data][cmi.core.session_time]="+urlencode(this.cache['cmi.core.session_time']);
    params += "&scorm_rte_store[data][cmi.core.score.raw]="+urlencode(this.cache['cmi.core.score.raw']);
    params += "&scorm_rte_store[data][cmi.suspend_data]="+urlencode(this.cache['cmi.suspend_data']);

    // submit to the server for processing
    var url = "http://localhost:3000/scorm_rte/stores"
    $.ajax({
      type: "POST",
      headers: {
          'Content-type' : 'application/x-www-form-urlencoded',
          'Content-length' : params.length,
          'Connection' : 'close'
      },
      url: url,
      data: params
    });

    // process returned data - error condition
    // if (req.status != 200) {
    //   alert('Problem with AJAX Request in LMSCommit()');
    //   return "false";
    // }

    // process returned data - OK
    // else {
    //   return "true";
    // }
    return "true";
  }

  // ------------------------------------------
  //   SCORM RTE Functions - Closing The Session
  // ------------------------------------------
  function LMSFinish(dummyString) {

    // already finished - prevent repeat call
    if (flagFinished) {
      return "true";
    }

    // commit cached values to the database
      console.log('!! finish')

      // console.log('***')
      // console.log(localStorage.getItem('k'))
      // localStorage.setItem('k', JSON.stringify(this.cache))
      console.log(this.cache)
      // console.log(JSON.parse(localStorage.getItem('k')))
      // console.log('###')

      LMSCommit('');
      console.log('!! finish !!')
      /*
    // create request object
    var req = createRequest();

    // code to prevent caching
    var d = new Date();

    // set up request parameters - uses GET method
    req.open('GET','finish.php?SCOInstanceID=<?php print $SCOInstanceID; ?>&code='+d.getTime(),false);

    // submit to the server for processing
    req.send(null);

    // process returned data - error condition
    if (req.status != 200) {
      alert('Problem with AJAX Request in LMSFinish()');
      return "";
    }

      */
    // set finish flag
    flagFinished = true;
    // return to calling program
    return "true";

  }

  // ------------------------------------------
  //   SCORM RTE Functions - Error Handling
  // ------------------------------------------
  function LMSGetLastError() {
    return 0;
  }

  function LMSGetDiagnostic(errorCode) {
    return "diagnostic string";
  }

  function LMSGetErrorString(errorCode) {
    return "error string";
  }

  // ------------------------------------------
  //   URL Encoding
  // ------------------------------------------
  function urlencode( str ) {
    //
    // Ref: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_urlencode/
    //
      // http://kevin.vanzonneveld.net
      // +   original by: Philip Peterson
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +      input by: AJ
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
      // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +      input by: travc
      // +      input by: Brett Zamir (http://brettz9.blogspot.com)
      // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   improved by: Lars Fischer
      // %          note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
      // *     example 1: urlencode('Kevin van Zonneveld!');
      // *     returns 1: 'Kevin+van+Zonneveld%21'
      // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
      // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
      // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
      // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'

      var histogram = {}, unicodeStr='', hexEscStr='';
      var ret = (str+'').toString();

      var replacer = function(search, replace, str) {
          var tmp_arr = [];
          tmp_arr = str.split(search);
          return tmp_arr.join(replace);
      };

      // The histogram is identical to the one in urldecode.
      histogram["'"]   = '%27';
      histogram['(']   = '%28';
      histogram[')']   = '%29';
      histogram['*']   = '%2A';
      histogram['~']   = '%7E';
      histogram['!']   = '%21';
      histogram['%20'] = '+';
      histogram['\u00DC'] = '%DC';
      histogram['\u00FC'] = '%FC';
      histogram['\u00C4'] = '%D4';
      histogram['\u00E4'] = '%E4';
      histogram['\u00D6'] = '%D6';
      histogram['\u00F6'] = '%F6';
      histogram['\u00DF'] = '%DF';
      histogram['\u20AC'] = '%80';
      histogram['\u0081'] = '%81';
      histogram['\u201A'] = '%82';
      histogram['\u0192'] = '%83';
      histogram['\u201E'] = '%84';
      histogram['\u2026'] = '%85';
      histogram['\u2020'] = '%86';
      histogram['\u2021'] = '%87';
      histogram['\u02C6'] = '%88';
      histogram['\u2030'] = '%89';
      histogram['\u0160'] = '%8A';
      histogram['\u2039'] = '%8B';
      histogram['\u0152'] = '%8C';
      histogram['\u008D'] = '%8D';
      histogram['\u017D'] = '%8E';
      histogram['\u008F'] = '%8F';
      histogram['\u0090'] = '%90';
      histogram['\u2018'] = '%91';
      histogram['\u2019'] = '%92';
      histogram['\u201C'] = '%93';
      histogram['\u201D'] = '%94';
      histogram['\u2022'] = '%95';
      histogram['\u2013'] = '%96';
      histogram['\u2014'] = '%97';
      histogram['\u02DC'] = '%98';
      histogram['\u2122'] = '%99';
      histogram['\u0161'] = '%9A';
      histogram['\u203A'] = '%9B';
      histogram['\u0153'] = '%9C';
      histogram['\u009D'] = '%9D';
      histogram['\u017E'] = '%9E';
      histogram['\u0178'] = '%9F';

      // Begin with encodeURIComponent, which most resembles PHP's encoding functions
      ret = encodeURIComponent(ret);

      for (unicodeStr in histogram) {
          hexEscStr = histogram[unicodeStr];
          ret = replacer(unicodeStr, hexEscStr, ret); // Custom replace. No regexing
      }

      // Uppercase for full PHP compatibility
      return ret.replace(/(\%([a-z0-9]{2}))/g, function(full, m1, m2) {
          return "%"+m2.toUpperCase();
      });
  }

}

window.API = new LMSAPI();
window.API_1484_11 = new LMSAPI();