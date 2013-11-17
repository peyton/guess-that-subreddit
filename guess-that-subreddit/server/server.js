var Subreddits;
var Submissions;

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Subreddits = new Meteor.Collection("subreddits");
    Submissions = new Meteor.Collection("submissions");
    Meteor.publish("subreddits", function(){
      return Subreddits.find();
    });

    Meteor.publish("submissions", function(){
      return Submissions.find();
    });

    console.log(Submissions.find().fetch());


  });
}

