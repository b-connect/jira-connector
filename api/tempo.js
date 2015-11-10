"use strict";

var url = require('url');

module.exports = TempoAccountClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/avatar'
 * @param {JiraClient} jiraClient
 * @constructor AvatarClient
 */
function TempoAccountClient(jiraClient) {
   this.jiraClient = jiraClient;
   this.jiraClient.tempo = this ;

   this.jiraClient.buildTempoURL = function (path) {
       var apiBasePath = 'rest/tempo-accounts/';
       var version = 1;
       var requestUrl = url.format({
           protocol: this.protocol,
           hostname: this.host,
           port: this.port,
           pathname: apiBasePath + version + path
       });
       return decodeURIComponent(requestUrl);
   };
    /**
     * Returns all system avatars of the given type.
     *
     * @method getAvatars
     * @memberOf AvatarClient#
     * @param opts The options to be used in the API request.
     * @param opts.avatarType The avatar type.  May be 'project' or 'user'.
     * @param callback Called when the avatars are retrieved.
     */
    this.getAccounts = function (projectId, callback) {
        var options = {
            method: 'GET',
            json: true,
            followAllRedirects: true,
            uri: this.jiraClient.buildTempoURL('/account/project/' + projectId )
        };
        this.jiraClient.makeRequest(options, callback);
    };

    this.getAccountField = function (callback) {
        var options = {
            method: 'GET',
            json: true,
            followAllRedirects: true,
            uri: this.jiraClient.buildTempoURL('/field')
        };
        this.jiraClient.makeRequest(options, callback);
    };
}
