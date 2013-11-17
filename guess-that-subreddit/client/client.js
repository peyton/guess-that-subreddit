if (Meteor.isClient) {
  Session.setDefault("score",0);
  Session.setDefault("totalQuestions",0);
  Session.setDefault("sub_url","http://www.reddit.com/r/animalsbeingjerks");
  var answersArr=[];
  var correctAnswer="";


  var generateAnswersArr = function () {
    //generate Answers array based on given question
    answersArr=["A","B","C","D"];
    correctAnswer = '#option'+(Math.floor(Math.random()*4)+1);
  };
  
  var evaluateQuestion = function(userAnswer){
    //evaluates whether user got question correct based
    //on their given answer
    return $(correctAnswer).text().trim()==userAnswer;
  };

  var indicateCorrect = function(correct, userAnswer){
    console.log(correctAnswer);
    $(".answers").children().addClass("disabled");
    if(correct){
      $(correctAnswer).removeClass("btn-default");
      $(correctAnswer).addClass("btn-success");
    } else {
      $(correctAnswer).removeClass("btn-default");
      $(correctAnswer).addClass("btn-success");
      $(userAnswer).removeClass("btn-default");
      $(userAnswer).addClass("btn-danger");
    }
  };

  var loadNextQuestion = function(){
    //get next question and replace questoin data with it
    //reset buttons with new data
    setTimeout(function(){
        $(".answers").children().removeClass("btn-success btn-danger disabled");
        $(".answers").children().addClass("btn-default");
      },500);
    //get new question

    //generate new answers
    generateAnswersArr();
    Session.set("sub_url","http://www.reddit.com/r/funny");
  };

  var handleClick = function(i){
    //check whether the question is right or not
    //add to score if correct and get next question
    //render the next question
    //grab user answer
    var userAnswer = answersArr[i];
    console.log(userAnswer);
    //evaluate question
    var correct = evaluateQuestion(userAnswer);
    //give points based on correct or incorrect answer
    Session.set("totalQuestions",Session.get("totalQuestions")+1);
    if(correct){
      Session.set("score",Session.get("score")+1);
    }
    indicateCorrect(correct,"#option"+(i+1));
    //then load next question
    loadNextQuestion();
    //set go-to button to new href
  };

  generateAnswersArr();

  /*------Template handlers------*/

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

  Template.question_template.events({
    'click #option1' : function () {
      handleClick(0);
    },
    'click #option2' : function () {
      handleClick(1);
    },
    'click #option3' : function () {
      handleClick(2);
    },
    'click #option4' : function () {
      handleClick(3);
    }
  });

  Template.score.player_score = function(){
    //score calculating logic
    return Session.get("score");
  };

  Template.score.total_questions = function(){
    return Session.get("totalQuestions");
  }

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
    return "The cat was hot in the sun";
  };

  Template.navigators.sub_url = function(){
    return Session.get("sub_url");
  };


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

  });
}
