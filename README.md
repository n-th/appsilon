# Fullstack Python/React Developer - Home Assignment
We propose a data ingestion mini project, which aims to evaluate the essential
technical skills, namely: Python, SQL Syntax, Database, Python Libraries.
The candidate should:
1. Firstly, to recover some raw data from https://query.wikidata.org/. This data should be movies that had been released after 2013 and have imdb-id.
2. Then, as the information (or data) recovered might be in a JSON format (or other, if you
want to scrap the web-site),
it should be ingested in a database, by using Python Programming Language for parsing
and saving (insert or update) the data,
and by using a conception of entity-relation chosen/created by yourself (which must
respect some normalizations).
3. Finally, but not mandatory, display some tables of the data stored in the database in a
simple interface. For instance, by using Flask-AppBuilder.

## Requirements:

Python 3.11.3 (+ virtualenv)
SQLite version 3.37.0
NodeJS v19.9.0

## How to run:

```bash
python3 -m venv env
pip install -r requirements.txt
```

First, let start by extracting the data from step 1.

Go to the extractor and run

```bash
cd extractor
python3 main.py
```

This is going to extract the data from movies and save it locally in the sqlite db, I added the movies.db content in the repo, just in case.

Go to the api folder for the step 2:

```bash
cd ../api
python3 app.py
```

You will have a simple Flask application so you can list, create and update movies that you have extracted.

```bash
cd ../api
python3 app.py
```

Go to the app folder for the web application so you can visualize the step 3:
```bash
cd ../app
npm run start
```


## Testing

For testing the API, you can run the following command in the api folder:

```bash
coverage run app_test.py
```

For testing the APP, you can run the following command in the app folder:

```bash
npm run test
```

