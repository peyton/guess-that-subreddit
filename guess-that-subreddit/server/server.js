var Subreddits;
var Submissions;
var updateDbWithIndex = function(){
  var i = 0;
  Submissions.find().forEach(function(myDoc){
    console.log(myDoc);
    Submissions.update({_id:myDoc._id},{$set:{"num":i}});
    i++;
  });
  i=0;
  Subreddits.find().forEach(function(myDoc){
    console.log(myDoc);
    Subreddits.update({_id:myDoc._id},{$set:{"num":i}});
    i++;
  });
};

  Meteor.startup(function () {
    // code to run on server at startup
    Subreddits = new Meteor.Collection("subreddits");
    Submissions = new Meteor.Collection("submissions");

    //UNCOMMENT IF THIS IS THE FIRST TIME RUNNING THE SERVER AFTER YOU
    //HAVE JUST MADE THE BASIC DB
    //updateDbWithIndex();
    //RECOMMENT AFTER CONSOLE STOPS LOGGING 


    Meteor.publish("subreddits", function(){
      var x= Subreddits.find();
      return x;
    });
  


    Meteor.publish("submissions", function(){
      //return Submissions.find();
    });

  });

  Meteor.methods({
    getNextThread: function (){
       return Submissions.find({"num": Math.floor(Math.random()*10000)}).fetch();
    },

    getThreeSubreddits: function(){
      var arr=[];
      arr.push(Subreddits.find({"num": Math.floor(Math.random()*100)}).fetch());
      arr.push(Subreddits.find({"num": Math.floor(Math.random()*100)}).fetch());
      arr.push(Subreddits.find({"num": Math.floor(Math.random()*100)}).fetch());
      return arr;
    },

    getSubredditById: function(sid){
      var y = Subreddits.findOne({"name": sid});
      return y;
    }
  });

