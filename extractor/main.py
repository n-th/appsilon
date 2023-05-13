import sqlite3

import requests

QUERY = """
SELECT ?movie ?imdb_id ?title ?release_date
WHERE {
  ?movie wdt:P31 wd:Q11424. # select only instances of 'film'
  ?movie wdt:P345 ?imdb_id. # select only movies with IMDb IDs
  ?movie wdt:P577 ?release_date. # select release dates
  ?movie rdfs:label ?title. # select movie titles
  FILTER(lang(?title)='en') # filter only English titles
  FILTER(year(?release_date) > 2013) # filter only movies released after 2013
}
"""

URL = 'https://query.wikidata.org/sparql'
TABLE = 'movies.db'

headers = {
    'Accept': 'application/sparql-results+json'
}
params = {
    'query': QUERY
}
response = requests.get(URL, headers=headers, params=params)

if response.status_code == requests.codes.ok:
    data = response.json()

    conn = sqlite3.connect('movies.db')

    conn.execute('''CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        imdb_id TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        release_date DATE NOT NULL
    )''')

    # insert or update the movie data ino the movies table
    for result in data['results']['bindings']:
        imdb_id = result['imdb_id']['value']
        title = result['title']['value']
        release_date = result['release_date']['value']

        conn.execute("""INSERT OR REPLACE INTO movies
            (imdb_id, title, release_date) 
            VALUES (?, ?, ?)""", (imdb_id, title, release_date))

    conn.commit()
    conn.close()

else:
    response.raise_for_status()
