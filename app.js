(function() {
  var $comment, playing;

  return {
    requests: {
      privateComment: function(data, ticket_id) {
        return {
          url: helpers.fmt('/api/v2/tickets/%@.json', ticket_id),
          dataType: 'JSON',
          type: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(data)
        };
      }
    },

    events: {
      'app.activated': 'init',
      'click button.submit': 'savePrivateComment',
      'click img.play': 'play',
      'click button.rate': 'rate'
    },

    init: function() {
      this.switchTo('form');
      $comment = this.$('.private-comment');
    },

    savePrivateComment: function() {
      var comment = $comment[0].value;
      if(comment.length === 0){
        services.notify(this.I18n.t('comment_error_empty'), 'error');
      } else {
        var ticket_id = this.ticket().id();
        var data = { "ticket": { "comment": { "body": comment, "public": false } } };
        this._handleRequests([this.ajax('privateComment', data, ticket_id)]);
      }
    },

    rate: function(){

    },

    play: function(){
      var audio = this.$(".eye")[0];
      if(playing){
        audio.pause();
      } else {
        audio.load(); // rewind
        audio.play();
      }
      playing = !playing;
    },

    _handleRequests: function(requests) {
      this.when.apply(this, requests).done(_.bind(function(){
          this.notifySuccess();
        }, this))
        .fail(_.bind(function(){
          this.notifyFail();
        }, this));
    },

    notifySuccess: function() {
      services.notify(this.I18n.t('comment_success'));
      $comment.val("");
    },

    notifyFail: function() {
      services.notify(this.I18n.t('comment_error_request'), 'error');
    }
  };
}());
