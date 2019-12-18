import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateMovie = props => {
    const [movieToUpdate, setMovieToUpdate] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: ['joe bob', 'frank']
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
            [e.target.name]: e.target.value
        })
    }

    const updateMovie = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movieToUpdate.id}`, movieToUpdate)
            .then(res => {
                setMovieToUpdate([{}])
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
                            type="text"
                            name="metascore"
                            onChange={handleChanges}
                            value={movieToUpdate.metascore}
                        />
                    </strong>
                </div>

                {/* <h3>Actors</h3> */}

                {movieToUpdate.stars.map(i => (
                    <input
                        type="text"
                        name="stars"
                        onChange={handleChanges}
                        value={i.index}
                        placeholder="stars"
                    />
                ))}

                <button> Update</button>

            </form>
        </div >


        // <div className="movie-card">
        //   <h2>{title}</h2>
        //   <div className="movie-director">
        //     Director: <em>{director}</em>
        //   </div>
        //   <div className="movie-metascore">
        //     Metascore: <strong>{metascore}</strong>
        //   </div>
        //   <h3>Actors</h3>

        //   {stars.map(star => (
        //     <div key={star} className="movie-star">
        //       {star}
        //     </div>
        //   ))}
        // </div>
    );
};

export default UpdateMovie;
