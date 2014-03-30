angular.module('mongolab', [])

  .factory('$mongolabResource', function (MONGOLAB_CONFIG, $http) {

    /**
     * This is a factory to be used by applications
     * @param collectionName MongoLab collection name
     * @returns {Resource}
     * @constructor
     */
    function MongoLabResourceFactory(collectionName) {

      var config = angular.extend({
        BASE_URL: 'https://api.mongolab.com/api/1/databases/'
      }, MONGOLAB_CONFIG);

      var dbUrl = config.BASE_URL + config.DB_NAME;
      var collectionUrl = dbUrl + '/collections/' + collectionName;
      var defaultParams = {apiKey: config.API_KEY};

      /**
       * This is a Resource "class" that will have all the CRUD methods
       * @param instanceData
       * @constructor
       */
      var Resource = function (instanceData) {
        angular.extend(this, instanceData || {});
      };

      function preparyQueryParam(queryJson) {
        return angular.isObject(queryJson) && !angular.equals(queryJson, {}) ? {q: JSON.stringify(queryJson)} : {};
      };

      function getId(instance) {
        if (instance._id && instance._id.$oid) {
          return instance._id.$oid;
        } else if (instance._id) {
          return instance._id;
        }
      };

      function createSingleResourceFromHttpResponse(response) {
        return new Resource(response.data);
      }


      //"class" methods

      Resource.query = function (query) {
        return $http.get(collectionUrl, {
          params: angular.extend({}, defaultParams, preparyQueryParam(query))
        }).then(function (response) {
          return response.data.map(function (instanceData) {
            return new Resource(instanceData);
          })
        });
      };

      Resource.getAll = function () {
        return Resource.query({});
      };

      Resource.getById = function (id) {
        return $http.get(collectionUrl + '/' + id, {params:defaultParams}).then(function(response){
          return new Resource(response.data);
        });
      };

      Resource.save = function (instanceData) {

        if (getId(instanceData)) {
          //update
          return $http.put(collectionUrl + '/' + getId(instanceData), angular.extend({}, instanceData, {_id: undefined}), {
            params: defaultParams
          }).then(createSingleResourceFromHttpResponse);

        } else {
          //save for the first time
          return $http.post(collectionUrl, instanceData, {
            params: defaultParams
          }).then(createSingleResourceFromHttpResponse);
        }
      };

      Resource.remove = function (id) {
        return $http.delete(collectionUrl + '/' + id, {
          params:defaultParams
        }).then(createSingleResourceFromHttpResponse);
      };

      //"instance" methods

      Resource.prototype.getId = function() {
        return getId(this);
      };

      Resource.prototype.$save = function() {
        return Resource.save(this);
      };

      Resource.prototype.$remove = function() {
        return Resource.remove(getId(this));
      };

      return Resource;
    }

    return MongoLabResourceFactory;
  });