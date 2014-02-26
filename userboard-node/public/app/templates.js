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
__p += '<nav class="navbar navbar-default" role="navigation">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      <a class="navbar-brand" href="#">3 Day Startup</a>\n    </div>\n    <div class="collapse navbar-collapse">\n      <ul class="nav navbar-nav">\n        <li class="active"><a href="#userboard">User Board</a></li>\n        <li><a href="#info">Info</a></li>\n        <li><a href="#successkit">Success Kit</a></li>\n        <li><a href="#meta3ds">Meta 3DS</a></li>\n      </ul>\n      <ul class="nav navbar-nav navbar-right">\n        ';
 if (model) { ;
__p += '\n        <li><a>Hi, ' +
((__t = ( model.get('name') )) == null ? '' : __t) +
' | <i class="fa fa-' +
((__t = ( model.get('provider') )) == null ? '' : __t) +
'"></i></a></li>\n        <li><a href="#" class="editProfile">Edit Profile</a></li>\n        <li><a href="#logout">Logout</a></li>\n        ';
 } else { ;
__p += '\n        <li><a href="#loginFacebook"><i class="fa fa-facebook"></i> | Facebook Login</a></li>\n        <li><a href="#loginTwitter"><i class="fa fa-twitter"></i> | Twitter Login</a></li>\n        <li><a href="#loginGithub"><i class="fa fa-github"></i> | Github Login</a></li>\n        ';
 } ;
__p += '\n      </ul>\n    </div>\n  </div>\n</nav>';

}
return __p
};

this["JST"]["app/templates/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\n\t<div id="header"></div>\n\t<div id="content"></div>\n\t<div id="modalContent"></div>\n</div>';

}
return __p
};