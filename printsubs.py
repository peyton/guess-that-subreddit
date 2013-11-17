import scrape
import pymongo
from pymongo import MongoClient

client = MongoClient()
db = client.meteor
sreddits = db.subreddits
smissions = db.submissions

def printsubs():
  slist = scrape.read_subreddits()
  sreddits.insert(slist)

def printsubm():
  slist = scrape.read_submissions()
  smissions.insert(slist)


printsubs()
printsubm()
