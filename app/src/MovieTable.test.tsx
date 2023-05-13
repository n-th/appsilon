import { fireEvent, render, screen } from '@testing-library/react';
import MovieTable from './MovieTable';

import fetchMock from 'jest-fetch-mock';

global.fetch = fetchMock as any;

describe('MovieTable', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('renders a table with movie data', async () => {
        const mockData = {
            movies: [
                {
                    imdb_id: '1',
                    title: 'Movie 1',
                    release_date: '2023-05-01T00:00:00Z',
                },
                {
                    imdb_id: '2',
                    title: 'Movie 2',
                    release_date: '2023-05-02T00:00:00Z',
                },
            ],
            total_pages: 1,
        };

        fetch.mockResponseOnce(JSON.stringify(mockData));

        render(<MovieTable />);


        const movieTitle1 = await screen.findByText('Movie 1');
        const movieTitle2 = await screen.findByText('Movie 2');

        expect(movieTitle1).toBeInTheDocument();
        expect(movieTitle2).toBeInTheDocument();
    });


    it('renders a disabled Previous button on the first page', async () => {
        const mockData = {
            movies: [
                {
                    imdb_id: '1',
                    title: 'Movie 1',
                    release_date: '2023-05-01T00:00:00Z',
                },
            ],
            total_pages: 2,
        };

        fetch.mockResponseOnce(JSON.stringify(mockData));

        render(<MovieTable />);

        const previousButton = await screen.findByText('Prev');

        expect(previousButton).toHaveAttribute('disabled');
    });

    it('renders a disabled Next button on the last page', async () => {
        const mockData = {
            movies: [
                {
                    imdb_id: '1',
                    title: 'Movie 1',
                    release_date: '2023-05-01T00:00:00Z',
                },
            ],
            total_pages: 1,
        };

        fetch.mockResponseOnce(JSON.stringify(mockData));

        render(<MovieTable />);

        const nextButton = await screen.findByText('Next');

        expect(nextButton).toHaveAttribute('disabled');
    });

    it('updates the table when Next button is clicked', async () => {
        const mockData1 = {
            movies: [
                {
                    imdb_id: '1',
                    title: 'Movie 1',
                    release_date: '2023-05-01T00:00:00Z',
                },
            ],
            total_pages: 2,
        };

        const mockData2 = {
            movies: [
                {
                    imdb_id: '2',
                    title: 'Movie 2',
                    release_date: '2023-05-02T00:00:00Z',
                },
            ],
            total_pages: 2,
        };

        fetch.mockResponseOnce(JSON.stringify(mockData1)).mockResponseOnce(
            JSON.stringify(mockData2)
        );

        render(<MovieTable />);

        const movieTitle1 = await screen.findByText('Movie 1');

        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        const movieTitle2 = await screen.findByText('Movie 2');

        expect(movieTitle1).not.toBeInTheDocument();
        expect(movieTitle2).toBeInTheDocument();
    });
});
