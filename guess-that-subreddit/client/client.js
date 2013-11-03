if (Meteor.isClient) {
  var score = 0;
  var answersArr=[];


  var generateAnswersArr = function () {
    //generate Answers array based on given question
    answersArr=["A","B","C","D"];
  }

  generateAnswersArr();

  Template.page.play = function () {
    return "Play the game";
  };

  Template.page.events({
    'click input' : function () {
      //on play game pressed, load main frame and details
      //not in view now
      //console.log(Session.get("startGame"));
      //Session.set("startGame",true);
    }
  });

  Template.page.showGame = function(){
    //console.log(Session.get("startGame"));
    return Session.get("startGame");
  };

  Template.details.events({
    'click #next-button' : function () {
      //check whether the question is right or not
      //add to score if correct and get next question
      //render the next question

    }
  });

  Template.score.player_score = function(){
    //score calculating logic
    return score;
  };

  Template.question_template.question = function(){
    //initialize question from given data
    return "Which subreddit did this thread come from:";
  };

  Template.question_template.option1 = function(){
    return answersArr[0];
  }
  
  Template.question_template.option2 = function(){
    return answersArr[1];
  }

  Template.question_template.option3 = function(){
    return answersArr[2];
  }

  Template.question_template.option4 = function(){
    return answersArr[3];
  }

  Template.questionData_template.questionData = function() {
    //grab question and display it
    return "0";
  };

  var evaluateQuestion = function(userAnswer){
    //evaluates whether user got question correct based
    //on their given answer
    return true;
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
