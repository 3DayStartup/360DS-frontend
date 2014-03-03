this["JST"] = this["JST"] || {};

this["JST"]["app/templates/editProfile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="bbm-modal__topbar">\n  <h3 class="bbm-modal__title"></h3>\n</div>\n<div class="bbm-modal__section">\n  <div class="profile">\n  </div>\n</div>\n<div class="bbm-modal__bottombar">\n  <a href="#" class="bbm-button cancel">Cancel</a>\n  <a href="#" class="bbm-button save">Save</a>\n</div>';

}
return __p
};

this["JST"]["app/templates/index.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="container">\n\t<!-- HEADER -->\n\t<nav class="navbar navbar-default" role="navigation">\n\t  <div class="container-fluid">\n\t    <div class="navbar-header">\n\t      <a class="navbar-brand" href="#">3 Day Startup</a>\n\t    </div>\n\t    <div class="collapse navbar-collapse">\n\t      <ul class="nav navbar-nav">\n\t        <li class="active"><a href="#userboard">User Board</a></li>\n\t        <li><a href="#info">Info</a></li>\n\t        <li><a href="#successkit">Success Kit</a></li>\n\t        <li><a href="#meta3ds">Meta 3DS</a></li>\n\t      </ul>\n\t      <form class="navbar-form navbar-left" role="search">\n\t        <div class="form-group">\n\t          <input type="text" class="form-control" placeholder="Search">\n\t        </div>\n\t      </form>\n\t      <ul class="nav navbar-nav navbar-right">\n\t        ';
 if (user) { ;
__p += '\n\t        <li><a>Hi, ' +
((__t = ( user.name )) == null ? '' : __t) +
' | <i class="fa fa-' +
((__t = ( user.provider )) == null ? '' : __t) +
'"></i></a></li>\n\t        <li><a href="#" class="editProfile">Edit Profile</a></li>\n\t        <li><a href="#" class="logout">Logout</a></li>\n\t        ';
 } else { ;
__p += '\n\t        <li><a href="#" class="loginFacebook"><i class="fa fa-facebook"></i> | Facebook Login</a></li>\n\t        <li><a href="#" class="loginGithub"><i class="fa fa-github"></i> | Github Login</a></li>\n\t        ';
 } ;
__p += '\n\t      </ul>\n\t    </div>\n\t  </div>\n\t</nav>\n\t<!-- BOARD -->\n\t<div id="alertContent"></div>\n\t<!-- BOARD -->\n\t<div id="userBoard"></div>\n\t<!-- MODAL -->\n\t<div id="modalContent"></div>\n</div>';

}
return __p
};

this["JST"]["app/templates/userBoard.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="container">\n';
 for (var i = 0; i < models.length; i = i + 4) { ;
__p += '\n\t<div class="row">\n\n\t\t';
 if (models[i]) { ;
__p += '\n\t  <div class="col-xs-6 col-md-3">\n\t    <div class="thumbnail">\n\t      <img class="img-circle" src=\'' +
((__t = ( models[i].get('profilePicture') )) == null ? '' : __t) +
'\'/>\n\t      <div class="caption">\n\t        <h4>' +
((__t = ( models[i].get('name') )) == null ? '' : __t) +
'</h4>\n\t        <h5>' +
((__t = ( models[i].get('participantRole') || "No role selected" )) == null ? '' : __t) +
'</h5>\n\t        <h5>' +
((__t = ( models[i].get('program') || "No program selected" )) == null ? '' : __t) +
'</h5>\n\t      </div>\n\t    </div>\n\t  </div>\n\t  ';
 } ;
__p += '\n\n\t  ';
 if (models[i + 1]) { ;
__p += '\n\t  <div class="col-xs-6 col-md-3">\n\t    <div class="thumbnail">\n\t      <img class="img-circle" src=\'' +
((__t = ( models[i + 1].get('profilePicture') )) == null ? '' : __t) +
'\'/>\n\t      <div class="caption">\n\t        <h4>' +
((__t = ( models[i + 1].get('name') )) == null ? '' : __t) +
'</h4>\n\t        <h5>' +
((__t = ( models[i + 1].get('participantRole') || "No role selected" )) == null ? '' : __t) +
'</h5>\n\t        <h5>' +
((__t = ( models[i + 1].get('program') || "No program selected" )) == null ? '' : __t) +
'</h5>\n\t      </div>\n\t    </div>\n\t  </div>\n\t  ';
 } ;
__p += '\n\n\t  ';
 if (models[i + 2]) { ;
__p += '\n\t  <div class="col-xs-6 col-md-3">\n\t    <div class="thumbnail">\n\t      <img class="img-circle" src=\'' +
((__t = ( models[i + 2].get('profilePicture') )) == null ? '' : __t) +
'\'/>\n\t      <div class="caption">\n\t        <h4>' +
((__t = ( models[i + 2].get('name') )) == null ? '' : __t) +
'</h4>\n\t        <h5>' +
((__t = ( models[i + 2].get('participantRole') || "No role selected" )) == null ? '' : __t) +
'</h5>\n\t        <h5>' +
((__t = ( models[i + 2].get('program') || "No program selected" )) == null ? '' : __t) +
'</h5>\n\t      </div>\n\t    </div>\n\t  </div>\n\t  ';
 } ;
__p += '\n\n\t  ';
 if (models[i + 3]) { ;
__p += '\n\t  <div class="col-xs-6 col-md-3">\n\t    <div class="thumbnail">\n\t      <img class="img-circle" src=\'' +
((__t = ( models[i + 3].get('profilePicture') )) == null ? '' : __t) +
'\'/>\n\t      <div class="caption">\n\t        <h4>' +
((__t = ( models[i + 3].get('name') )) == null ? '' : __t) +
'</h4>\n\t        <h5>' +
((__t = ( models[i + 3].get('participantRole') || "No role selected" )) == null ? '' : __t) +
'</h5>\n\t        <h5>' +
((__t = ( models[i + 3].get('program') || "No program selected" )) == null ? '' : __t) +
'</h5>\n\t      </div>\n\t    </div>\n\t  </div>\n\t  ';
 } ;
__p += '\n\n\t</div>\n';
 } ;
__p += '\n</div>';

}
return __p
};