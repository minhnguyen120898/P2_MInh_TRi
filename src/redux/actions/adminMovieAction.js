import { getMovies } from "../../api/adminApi";

export const fetchMovies =   () => {
    return async (dispatch) => {
        try {
            const res = await getMovies();
            dispatch(getMoviesAction(res.data));
        } catch (error) {
            getMoviesFailed(error);
        }
        
    };
}

export const getMoviesAction = (movies) => {
    return {
        type: "GET_MOVIES_ACTION",
        movies,
    }
}

export const removeMovieAction = (movieId) => {
    return {
        type: "REMOVE_MOVIE_ACTION",
        movieId,
    }
}

export const editMovieAction = (movieId) => {
    return {
        type: "EDIT_MOVIE_ACTION",
        movieId,
    }
}

export const getAll = (data) => {
    return {
        type: "GET_ALL",
        data,
    }
}

export const getMoviesFailed = (error) => {
    return {
        type: "GET_MOVIES_FAILED",
        error,
    }
}

export const getName = (name) => {
    return {
        type: "GET_NAME",
        name,
    }
}

export const getType = (data) => {
    return {
        type: "GET_TYPE",
        data
    }
}

export const getImage = (image) => {
    return {
        type: "GET_IMAGE",
        image
    }
}

export const getActor = (actor) => {
    return {
        type: "GET_ACTOR",
        actor
    }
}

export const getRatings = (ratings) => {
    return {
        type: "GET_RATINGS",
        ratings,
    }
}

export const getTime = (time) => {
    return {
        type: "GET_TIME",
        time
    }
}

export const getReleaseDate = (releaseDate) => {
    return {
        type: "GET_RELEASE_DATE",
        releaseDate
    }
}

export const getProducer = (producer) => {
    return {
        type: "GET_PRODUCER",
        producer
    }
}