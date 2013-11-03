if (Meteor.isClient) {
    console.log(Session.get("startGame"));
    Session.setDefault("startGame",false);
  Template.page.play = function () {
    return "Play the game";
  };

  Template.page.events({
    'click input' : function () {
      //on play game pressed, load main frame and details
      console.log(Session.get("startGame"));
      Session.set("startGame",true);
    }
  });

  Template.page.showGame = function(){
    console.log(Session.get("startGame"));
    return Session.get("startGame");
  };

  Template.score.player_score = function(){
    //score calculating logic
    return "0";
  };

  Template.question_template.question = function(){
    //initialize question from given data
    return "0";
  };

  Template.questionData_template.questionData = function() {
    //grab question and display it
    return "0";
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
