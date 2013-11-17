import scrape
import pymongo
from pymongo import MongoClient

client = MongoClient()
db = client.gtsdb
sreddits = db.submissions

def printsubs():
  slist = scrape.read_submissions()
  sreddits.insert(slist)
  #print slist


printsubs()
