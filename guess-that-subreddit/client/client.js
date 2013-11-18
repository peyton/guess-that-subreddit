var Subreddits;
var Submissions;
function shuffle(o){ //v1.0
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};
if(Meteor.isClient){

  Session.setDefault("score",0);
  Session.setDefault("totalQuestions",0);
  Session.setDefault("sub_url","http://www.reddit.com/r/animalsbeingjerks");
  Session.setDefault("option1","Loading");
  Session.setDefault("option2","Loading");
  Session.setDefault("option3","Loading");
  Session.setDefault("option4","Loading");
  Session.setDefault("question",{});
  Session.setDefault("correctAnswer", "null");
  var answersArr=[];
  var flag=false;


  
  var generateAnswersArr = function () {
    Meteor.call('getThreeSubreddits', function(err,result){
      var tmp =[];
      for(var i = 0;i<3;i++){
        tmp.push(result[i][0].display_name);
      }
      answersArr=tmp;
      Meteor.call('getSubredditById',Session.get("question").subreddit_id ,function(err, result){
        console.log(result);
        answersArr.push(result.display_name);
        Session.set("correctAnswer",result.display_name);
        Session.set("sub_url", "http://reddit.com"+result.url);
        shuffle(answersArr);
        Session.set("option1",answersArr[0]);
        Session.set("option2",answersArr[1]);
        Session.set("option3",answersArr[2]);
        Session.set("option4",answersArr[3]);
      console.log(answersArr);
      });

    });
    console.log(answersArr);
  };
  

  var generateQuestion = function(){
    Meteor.call('getNextThread', function(err,result){
      var tmp = result;
      console.log(result);
      Session.set("question",result[0]);
      console.log();
    });
  }


  var evaluateQuestion = function(userAnswer){
    //evaluates whether user got question correct based
    //on their given answer
    console.log(userAnswer);
    return Session.get("correctAnswer")===userAnswer;
  };

  var indicateCorrect = function(correct, userAnswer){
    var cA = ".btn:contains('"+Session.get("correctAnswer")+"')";
    console.log(cA);
    $(".answers").children().addClass("disabled");
    if(correct){
      $(cA).removeClass("btn-default");
      $(cA).addClass("btn-success");
    } else {
      $(cA).removeClass("btn-default");
      $(cA).addClass("btn-success");
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
      //get new question
      generateQuestion();

      //generate new answers
      generateAnswersArr();
    },1000);

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
    console.log("correct:"+ correct);
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
    return Session.get("option1"); 
  }
  
  Template.question_template.option2 = function(){
    return Session.get("option2"); 
  }

  Template.question_template.option3 = function(){
    return Session.get("option3"); 
  }

  Template.question_template.option4 = function(){
    return Session.get("option4"); 
  }

  Template.questionData_template.questionData = function() {
    //grab question and display it
    //console.log(Subreddits.find().fetch());
    console.log(Session.get("question").thumbnail);
    //if(Session.get("question").thumbnail !== "" ||
      // Session.get("question").thumbnail !== "self"){
     $("<img src='"+Session.get("question").thumbnail+"' width='70' height='52' alt>").load(function(){
        $(this).appendTo("#thumb");
     });
  //}
    return Session.get("question").title;
  };
  

  Template.navigators.sub_url = function(){
    return Session.get("sub_url");
  };
  
  Meteor.startup(function(){
    generateQuestion();
    generateAnswersArr();
    Meteor.subscribe("submissions");
    Meteor.subscribe("subreddits");
    Subreddits = new Meteor.Collection("subreddits");
    Submissions = new Meteor.Collection("submissions");
  });

}

