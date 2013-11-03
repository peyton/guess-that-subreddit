#!/usr/bin/env python

import collections
import csv
import itertools
import praw

# unicodify
import sys
reload(sys)
sys.setdefaultencoding("utf-8")

submission_keypaths = [['author', 'name'], 'created_utc', 'domain',
                   'downs', 'is_self', 'name',
                   'num_comments', 'over_18', 'permalink',
                   'score', 'subreddit_id', 'thumbnail',
                   'title', 'ups', 'url']
subreddit_keypaths =  ['created_utc', 'description', 'display_name',
                   'header_img', 'header_size',
                   'header_title', 'id', 'name', 'over18',
                   'public_description', 'title', 'url']

def val_from_keypath(d, keypath):
    if not isinstance(keypath, collections.Iterable) or isinstance(keypath, str):
        keypath = [keypath]
    return reduce(lambda d, k: (d[k] if isinstance(d, dict) else getattr(d, k)) if d else None, keypath, d)

def top_subreddits(reddit, num_subreddits = 100):
    return reddit.get_popular_subreddits(limit=num_subreddits)

def top_submissions(subreddit, num_submissions = 1000):
    return subreddit.get_top_from_all(limit=num_submissions)

def keypath_to_key(keypath):
    return ''.join(keypath)

def keypaths_to_keys(keypaths):
    return [keypath_to_key(keypath) for keypath in keypaths]

def process_value(val):
    if isinstance(val, str):
        return val.encode('utf-8')
    return val

def format_generator(subs, keypaths):
    for sub in subs:
        d = sub.__dict__
        yield {keypath_to_key(keypath): process_value(val_from_keypath(d, keypath)) for keypath in keypaths}

def write_dicts(filename, dicts, keys):
    with open(filename, 'wb') as f:
        writer = csv.DictWriter(f, delimiter='\t', fieldnames=keys)
        writer.writeheader()
        writer.writerows(dicts)

if __name__ == '__main__':
    r = praw.Reddit(user_agent='420blazeit')

    subreddits = list(top_subreddits(r))

    submission_generators = []
    for s in subreddits:
        submission_generators.append(top_submissions(s))

    submissions = format_generator(itertools.chain(*submission_generators), submission_keypaths)
    subreddits = format_generator(iter(subreddits), subreddit_keypaths)

    write_dicts('submissions.csv', submissions, keypaths_to_keys(submission_keypaths))
    write_dicts('subreddits.csv', subreddits, keypaths_to_keys(subreddit_keypaths))

