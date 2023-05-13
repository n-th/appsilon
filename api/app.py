import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

TABLE = 'movies.db'

@app.route('/movies', methods=['GET', 'POST', 'PUT'])
def movies():
    if request.method == 'GET':
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        offset = (page - 1) * limit

        conn = sqlite3.connect(TABLE)

        cursor = conn.cursor()
        cursor.execute('''
            SELECT imdb_id, title, release_date FROM movies 
            ORDER BY release_date DESC LIMIT ? OFFSET ?''',
            (limit, offset))
        rows = cursor.fetchall()

        cursor.execute('SELECT COUNT(*) FROM movies')
        total_count = cursor.fetchone()[0]
        total_pages = (total_count + offset) // limit

        movies = []
        for row in rows:
            movie = {
                'imdb_id': row[0],
                'title': row[1],
                'release_date': row[2],
            }
            movies.append(movie)

        conn.close()

        return jsonify({'movies': movies, 'total_pages': total_pages})

    if request.method == 'POST':
        conn = sqlite3.connect(TABLE)

        movie = request.get_json()

        conn.execute('INSERT INTO movies (imdb_id, title, release_date) VALUES (?, ?, ?)',
                     (movie['imdb_id'], movie['title'], movie['release_date']))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Movie added successfully'})

    if request.method == 'PUT':
        conn = sqlite3.connect(TABLE)

        movie = request.get_json()

        conn.execute('UPDATE movies SET title = ?, release_date = ? WHERE imdb_id = ?',
                     (movie['title'], movie['release_date'], movie['imdb_id']))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Movie updated successfully'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
