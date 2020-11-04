import React, { useEffect } from 'react';
import HeaderTopbar from '../partials/headerTopBar.coponent';
import Footer from '../partials/footer.component';
import SideBar from '../partials/sideBar.coponent';
import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../admin/AdminAction';
import { Redirect, useHistory } from 'react-router';
import { fetchMovies } from '../../redux/actions/adminMovieAction';

function MovieManagement(props) {

    const { movies, loading , error } = useSelector(state => state.adminMovie);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const action = fetchMovies();
        dispatch(action);
    },[dispatch])
    
    if(!localStorage.getItem("token")) {
        return <Redirect to="/login" />
    }else {
        const localstorage = JSON.parse(localStorage.getItem("token"));
        console.log(localstorage.email);
        if(localstorage.email !== "minhnguyen120898@gmail.com"){
            return <Redirect to="/" />
        }
    }

    const handleAddMovie = () => {
        history.push("/admin/movies/add")
    }
    return (
        <>
            <HeaderTopbar />
            <div className="admin container">
                <div className="admin__left">
                    <SideBar />
                </div>
                <div className="admin__right">
                    <div className="admin__right__top mt-2">
                        <p className="admin__title">Users Management</p>
                        <button className="btn btn-success" onClick={handleAddMovie}>Add Movie</button>
                    </div>
                    <hr/>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Ratings</th>
                                <th>Time</th>
                                <th>Producer</th>
                                <th>Type</th>
                                <th>Action</th>
                                <th>ReleaseDate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <p>Loading...</p>
                                ) : error ? (
                                    <p>{error.message}</p>
                                ): (
                                    movies.map((e, i) => (
                                        <tr key={i}>
                                            <td>{e.id}</td>
                                            <td><img src={e.image} alt=""/></td>
                                            <td>{e.name}</td>
                                            <td>{e.ratings}</td>
                                            <td>{e.producer}</td>
                                            <td>{e.type}</td>
                                            <td>{e.actor}</td>
                                            <td>{e.releaseDate}</td>
                                            <td>
                                                <AdminAction movieId={e.id} />
                                            </td>
                                        </tr>
                                    )) 
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MovieManagement;