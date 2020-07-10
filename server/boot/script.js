module.exports = function(app) {
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var User = app.models.User;
  // var Team = app.models.Team;
  User.findOne({ where: { username: 'goldy' }}, (err, user) => {
    if(!err && user) {
      findRole(Role, RoleMapping, user);
    } else {
      User.create([
        {username: 'goldy', email: 'goldy@gmail.com', password: 'password'}
      ], function(err, users) {
          if (err) console.log(err);
          // find Role
          findRole(Role, RoleMapping, users);
        });
    }
  });
}

function findRole(Role, RoleMapping, user) {
  Role.findOne({ where: { name: 'admin'}}, (err, role) => {
    if(!err && role) {
      console.log(role, err);
      return;
    } else {
      createRole(Role, RoleMapping, [user]);
    }
  })
}

function createRole(Role, RoleMapping, users) {
  Role.create({
    name: 'admin'
  }, function(err, role) {
    if (err) console.log(err);

    role.principals.create({
      principalType: RoleMapping.USER,
      principalId: users[0].id
    }, function(err, principal) {
      if (err) throw err;
      console.log(principal, 'created')
    });
  });
}