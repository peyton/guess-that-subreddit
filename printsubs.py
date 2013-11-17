import scrape
import pymongo
from pymongo import MongoClient

client = MongoClient()
db = client.meteor
sreddits = db.subreddits

def printsubs():
  slist = scrape.read_subreddits()
  sreddits.insert(slist)
  #print slist


printsubs()
