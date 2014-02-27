this["JST"] = this["JST"] || {};

this["JST"]["app/templates/editProfile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="bbm-modal__topbar">\n  <h3 class="bbm-modal__title"></h3>\n</div>\n<div class="bbm-modal__section">\n  <div class="profile">\n  </div>\n</div>\n<div class="bbm-modal__bottombar">\n  <a href="#" class="bbm-button cancel">Cancel</a>\n  <a href="#" class="bbm-button save">Save</a>\n</div>';

}
return __p
};

this["JST"]["app/templates/header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<nav class="navbar navbar-default" role="navigation">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      <a class="navbar-brand" href="#">3 Day Startup</a>\n    </div>\n    <div class="collapse navbar-collapse">\n      <ul class="nav navbar-nav">\n        <li class="active"><a href="#userboard">User Board</a></li>\n        <li><a href="#info">Info</a></li>\n        <li><a href="#successkit">Success Kit</a></li>\n        <li><a href="#meta3ds">Meta 3DS</a></li>\n      </ul>\n      <form class="navbar-form navbar-left" role="search">\n        <div class="form-group">\n          <input type="text" class="form-control" placeholder="Search">\n        </div>\n      </form>\n      <ul class="nav navbar-nav navbar-right">\n        ';
 if (model) { ;
__p += '\n        <li><a>Hi, ' +
((__t = ( model.get('name') )) == null ? '' : __t) +
' | <i class="fa fa-' +
((__t = ( model.get('provider') )) == null ? '' : __t) +
'"></i></a></li>\n        <li><a href="#" class="editProfile">Edit Profile</a></li>\n        <li><a href="#logout">Logout</a></li>\n        ';
 } else { ;
__p += '\n        <li><a href="#loginFacebook"><i class="fa fa-facebook"></i> | Facebook Login</a></li>\n        <li><a href="#loginGithub"><i class="fa fa-github"></i> | Github Login</a></li>\n        ';
 } ;
__p += '\n      </ul>\n    </div>\n  </div>\n</nav>';

}
return __p
};

this["JST"]["app/templates/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\n\t<div id="header"></div>\n\t<div id="userBoard"></div>\n\t<div id="modalContent"></div>\n</div>';

}
return __p
};

this["JST"]["app/templates/userBoard.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div>\n\t';
 if (!model) { ;
__p += '\n\t<div class="alert alert-info">You must login in order to view content.</div>\n\t';
 } else if (!model.get('program')) { ;
__p += '\n\t<div class="alert alert-warning">You need to be part of a program. Click on Edit Profile to join a program.</div>\n\t';
 } else if (models) { ;
__p += '\n\t<div class="container">\n\t';
 for (var i = 0; i < models.length; i = i + 4) { ;
__p += '\n\t\t<div class="row">\n\n\t\t\t';
 if (models[i]) { ;
__p += '\n\t\t  <div class="col-xs-6 col-md-3">\n\t\t    <div class="thumbnail">\n\t\t      <img class="img-circle" src=\'' +
((__t = ( models[i].get('profilePicture') )) == null ? '' : __t) +
'\'/>\n\t\t      <div class="caption">\n\t\t        <h4>' +
((__t = ( models[i].get('name') )) == null ? '' : __t) +
'</h4>\n\t\t        <h5>' +
((__t = ( models[i].get('participantRole') || "No role selected" )) == null ? '' : __t) +
'</h5>\n\t\t        <h5>' +
((__t = ( models[i].get('program') || "No program selected" )) == null ? '' : __t) +
'</h5>\n\t\t      </div>\n\t\t    </div>\n\t\t  </div>\n\t\t  ';
 } ;
__p += '\n\n\t\t  ';
 if (models[i + 1]) { ;
__p += '\n\t\t  <div class="col-xs-6 col-md-3">\n\t\t    <div class="thumbnail">\n\t\t      <img class="img-circle" src=\'' +
((__t = ( models[i + 1].get('profilePicture') )) == null ? '' : __t) +
'\'/>\n\t\t      <div class="caption">\n\t\t        <h4>' +
((__t = ( models[i + 1].get('name') )) == null ? '' : __t) +
'</h4>\n\t\t        <h5>' +
((__t = ( models[i + 1].get('participantRole') || "No role selected" )) == null ? '' : __t) +
'</h5>\n\t\t        <h5>' +
((__t = ( models[i + 1].get('program') || "No program selected" )) == null ? '' : __t) +
'</h5>\n\t\t      </div>\n\t\t    </div>\n\t\t  </div>\n\t\t  ';
 } ;
__p += '\n\n\t\t  ';
 if (models[i + 2]) { ;
__p += '\n\t\t  <div class="col-xs-6 col-md-3">\n\t\t    <div class="thumbnail">\n\t\t      <img class="img-circle" src=\'' +
((__t = ( models[i + 2].get('profilePicture') )) == null ? '' : __t) +
'\'/>\n\t\t      <div class="caption">\n\t\t        <h4>' +
((__t = ( models[i + 2].get('name') )) == null ? '' : __t) +
'</h4>\n\t\t        <h5>' +
((__t = ( models[i + 2].get('participantRole') || "No role selected" )) == null ? '' : __t) +
'</h5>\n\t\t        <h5>' +
((__t = ( models[i + 2].get('program') || "No program selected" )) == null ? '' : __t) +
'</h5>\n\t\t      </div>\n\t\t    </div>\n\t\t  </div>\n\t\t  ';
 } ;
__p += '\n\n\t\t  ';
 if (models[i + 3]) { ;
__p += '\n\t\t  <div class="col-xs-6 col-md-3">\n\t\t    <div class="thumbnail">\n\t\t      <img class="img-circle" src=\'' +
((__t = ( models[i + 3].get('profilePicture') )) == null ? '' : __t) +
'\'/>\n\t\t      <div class="caption">\n\t\t        <h4>' +
((__t = ( models[i + 3].get('name') )) == null ? '' : __t) +
'</h4>\n\t\t        <h5>' +
((__t = ( models[i + 3].get('participantRole') || "No role selected" )) == null ? '' : __t) +
'</h5>\n\t\t        <h5>' +
((__t = ( models[i + 3].get('program') || "No program selected" )) == null ? '' : __t) +
'</h5>\n\t\t      </div>\n\t\t    </div>\n\t\t  </div>\n\t\t  ';
 } ;
__p += '\n\n\t\t</div>\n\t';
 } ;
__p += '\n\t</div>\n\t';
 }  ;
__p += '\n</div>';

}
return __p
};