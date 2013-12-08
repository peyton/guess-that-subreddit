guess-that-subreddit
====================

To run this app make sure you have created the database using printsubs.py
then after starting up a mongo instance with mongod
type 
 $ MONGO_URL="mongodb://localhost:27017/meteor" meteor
 To set up initial mongo db uncomment the lines in server.js and run the server. after the
 db has been updated, recomment those lines


To shutdown mongod, inside a mongo shell type
  use admin
  db.shutdownServer()


