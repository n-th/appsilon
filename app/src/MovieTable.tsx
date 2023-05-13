import { format } from 'date-fns';
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

const MovieTable: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const page = Number(params.get('page')) || 1;
    //     setPage(page);
    // }, [location.search]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${API_URL}?page=${currentPage}&limit=${PAGE_LIMIT}`);
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
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            // navigate(`/?page=${newPage}`);
            setPage(newPage);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            // navigate(`/?page=${newPage}`);
            setPage(newPage);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.imdb_id}>
                            <td>{movie.title}</td>
                            <td>{format(new Date(movie.release_date), 'MMMM d, yyyy')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Prev
                </button>
            </div>
        </div>
    );
};

export default MovieTable;
