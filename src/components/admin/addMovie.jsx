import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../../api/adminApi';
import { getActor, getAll, getImage, getName, getProducer, getRatings, getReleaseDate, getTime, getType } from '../../redux/actions/adminMovieAction';
import Footer from '../partials/footer.component';
import HeaderTopbar from '../partials/headerTopBar.coponent';
import _uniqueId from 'lodash/uniqueId';

function AddMovie() {

    const dispatch = useDispatch();
    const [uniqueId] = useState(_uniqueId('prefix-'));
    const {
        image,
        name,
        producer,
        time,
        ratings,
        actor,
        releaseDate,
        type 
    } = useSelector(state => state.adminMovie);

    useEffect(() => {
        const emptyMovie = {
            name : "",
            image: "",
            time: "",
            ratings : "",
            producer : "",
            type : "",
            actor : "",
            releaseDate : "",
        }
        dispatch(getAll(emptyMovie));
    },[dispatch]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const newMovie = {
            id : uniqueId,
            name ,
            image,
            time,
            ratings ,
            producer ,
            type ,
            actor ,
            releaseDate ,
        }

        const res = await addMovie(newMovie);
        if(res.data) {
            alert("Thêm thành công!")
        }else {
            alert("Failled!")
        }
    }

    return (
        <>
            <HeaderTopbar />
            <div className="admin-movie-add">
                <p className="admin-movie-add__title">Thêm mới</p>
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label>Image</label>
                            <input
                                type="text"
                                value={ image }
                                onChange={(e) => dispatch(getImage(e.target.value))}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => dispatch(getName(e.target.value))}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Ratings</label>
                            <input
                                type="text"
                                value={ratings}
                                onChange={(e) => dispatch(getRatings(e.target.value))}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Time</label>
                            <input
                                type="text"
                                value={time}
                                onChange={(e) => dispatch(getTime(e.target.value))}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Producer</label>
                            <input
                                type="text"
                                value={producer}
                                onChange={(e) => dispatch(getProducer(e.target.value))}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Type</label>
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => dispatch(getType(e.target.value))}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Actor</label>
                            <input
                                type="text"
                                value={actor}
                                onChange={(e) => dispatch(getActor(e.target.value))}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Date</label>
                            <input
                                type="date"
                                value={releaseDate}
                                onChange={(e) => dispatch(getReleaseDate(e.target.value))}
                            />   
                        </div>
                    </div>     
                    <button className="submit" type="submit">
                            Add 
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default AddMovie;