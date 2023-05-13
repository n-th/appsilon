import json
import sqlite3
import unittest

from app import app


class AppTest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.conn = sqlite3.connect(':memory:')
        self.conn.execute('CREATE TABLE movies (imdb_id TEXT, title TEXT, release_date TEXT)')
        self.conn.execute('''INSERT INTO movies (imdb_id, title, release_date)
            VALUES ('tt0111161', 'The Shawshank Redemption', '1994-09-22')''')

    def tearDown(self):
        self.conn.close()

    def test_get_movies(self):
        response = self.app.get('/movies')
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data['movies']), 1)
        self.assertEqual(data['movies'][0]['imdb_id'], 'tt0111161')
        self.assertEqual(data['movies'][0]['title'], 'The Shawshank Redemption')
        self.assertEqual(data['movies'][0]['release_date'], '1994-09-22')

    def test_add_movie(self):
        new_movie = {
            'imdb_id': 'tt0071562',
            'title': 'The Godfather',
            'release_date': '1972-03-24',
        }
        response = self.app.post('/movies', json=new_movie)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Movie added successfully')

    def test_update_movie(self):
        updated_movie = {
            'imdb_id': 'tt0111161',
            'title': 'The Shawshank Redemption - Updated',
            'release_date': '1994-09-23',
        }
        response = self.app.put('/movies', json=updated_movie)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Movie updated successfully')
