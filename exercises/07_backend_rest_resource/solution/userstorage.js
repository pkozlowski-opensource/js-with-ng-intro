angular.module('userstorageNgResource', ['ngResource'])

  .factory('User', function ($resource, MONGOLAB_CONFIG) {

    //ex:start
    //slide:start:creating;
    var User = $resource('https://api.mongolab.com/api/1/databases/' + MONGOLAB_CONFIG.DB_NAME + '/collections/users/:id',
      {
        apiKey: MONGOLAB_CONFIG.API_KEY,
        id: '@_id.$oid'
      }, {
        update: {
          method: 'PUT',
          transformRequest: function (data) {
            return JSON.stringify(angular.extend({}, data, {_id: undefined}));
          }
        }
      });
    //slide:end:creating;

    User.prototype.getId = function () {
      if (this._id && this._id.$oid) {
        return this._id.$oid;
      } else if (this._id) {
        return this._id;
      }
    };

    return User;
    //ex:end
  });