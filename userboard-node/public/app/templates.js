this["JST"] = this["JST"] || {};

this["JST"]["app/templates/header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<nav class="navbar navbar-default" role="navigation">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      <a class="navbar-brand" href="#">3 Day Startup</a>\n    </div>\n    <div class="collapse navbar-collapse">\n      <ul class="nav navbar-nav">\n        <li class="active"><a href="#userboard">User Board</a></li>\n        <li><a href="#info">Info</a></li>\n        <li><a href="#successkit">Success Kit</a></li>\n        <li><a href="#meta3ds">Meta 3DS</a></li>\n      </ul>\n      <ul class="nav navbar-nav navbar-right">\n        ';
 if (user) { ;
__p += '\n        <li><a>Hi, ' +
((__t = ( user.name )) == null ? '' : __t) +
' | <i class="fa fa-' +
((__t = ( user.provider )) == null ? '' : __t) +
'"></i></a></li>\n        <li><a href="#editprofile">Edit Profile</a></li>\n        <li><a href="#logout">Logout</a></li>\n        ';
 } else { ;
__p += '\n        <li><a href="#loginfacebook"><i class="fa fa-facebook"></i> | Facebook Login</a></li>\n        <li><a href="#logintwitter"><i class="fa fa-twitter"></i> | Twitter Login</a></li>\n        <li><a href="#logingithub"><i class="fa fa-github"></i> | Github Login</a></li>\n        ';
 } ;
__p += '\n      </ul>\n    </div>\n  </div>\n</nav>';

}
return __p
};

this["JST"]["app/templates/profile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal fade">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <h4 class="modal-title">' +
((__t = ( model.get('name') )) == null ? '' : __t) +
'</h4>\n      </div>\n      <div class="modal-body">\n        <!-- form renders here-->\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        ';
 if (model.isCurrent) { ;
__p += '\n        <button type="button" class="btn btn-primary">Save changes</button>\n        ';
 } ;
__p += '\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->';

}
return __p
};