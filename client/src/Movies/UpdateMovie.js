import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateMovie = props => {
    const [movieToUpdate, setMovieToUpdate] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    console.log(movieToUpdate)

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => setMovieToUpdate(res.data))
            .catch(err => console.log(err.response));

    }, [props.match.params.id])

    const handleChanges = e => {
        setMovieToUpdate({
            ...movieToUpdate,
            [e.target.name]: e.target.type === 'number' ? +e.target.value : e.target.value
        })
    }

    const handleStars = index => e => {
        setMovieToUpdate({
            ...movieToUpdate,
            stars: movieToUpdate.stars.map((star, starIndex) => {
                return starIndex === index ? e.target.value : star;
            })
        });
    };

    const updateMovie = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movieToUpdate.id}`, movieToUpdate)
            .then(res => {
                // setMovieToUpdate({})
                props.history.push(`/`)
            })
            .catch(err => console.log(err.response))
    }

    return (

        <div className="movie-card">
            <form onSubmit={updateMovie}>
                <h2><label>Title: </label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChanges}
                        value={movieToUpdate.title}
                    /></h2>
                <div className="movie-director">
                    <label>Director:</label> <em>
                        <input
                            type="text"
                            name="director"
                            onChange={handleChanges}
                            value={movieToUpdate.director}
                        />
                    </em>
                </div>
                <div className="movie-metascore">
                    Metascore: <strong>
                        <input
                            type="number"
                            name="metascore"
                            onChange={handleChanges}
                            value={movieToUpdate.metascore}
                        />
                    </strong>
                </div>

                <h3>Actors</h3>
                {movieToUpdate.stars.map((i, index) => (
                    <input
                        type="text"
                        name="stars"
                        onChange={handleStars(index)}
                        value={i}
                        placeholder="stars"
                        key={index}
                    />
                ))}
                <button> Update</button>

            </form>
        </div >
    );
};

export default UpdateMovie;
