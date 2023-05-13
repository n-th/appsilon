import React, { useEffect, useState } from "react";

type Movie = {
    imdb_id: string;
    title: string;
    release_date: string;
};

type MovieRespose = {
    movies: Movie[];
    total_pages: number;
}

const API_URL = 'http://localhost:5555/movies';

const PAGE_LIMIT = 10;

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${API_URL}?page=${page}&limit=${PAGE_LIMIT}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch movies.");
                }

                const data: MovieRespose = await response.json();
                setMovies(data.movies);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [page]);

    const handlePreviousPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <ul>
                {movies && movies.map((movie) => (
                    <li key={movie.imdb_id}>
                        <div>{movie.title}</div>
                        <div>{movie.release_date}</div>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MovieList;
