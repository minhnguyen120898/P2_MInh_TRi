const initialState = {
    movies : [],
    error: false,
    loading: false,
    name : "",
    image: "",
    time: "",
    ratings : "",
    producer : "",
    type : "",
    actor : "",
    releaseDate : "",
}

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_MOVIES_ACTION" : {
            return {
                ...state,
                movies : action.movies
            }
        }
        case "GET_MOVIES_FAILED" : {
            return {
                ...state,
                error : action.error
            }
        }
        case "REMOVE_MOVIE_ACTION" : {
            return {
                ...state,
                movies : state.movies.filter(movie => movie.id !== action.movieId)
            }
        }
        case "EDIT_MOVIE_ACTION" : {
            return {
                ...state,
                users : action.userId
            }
        }
        case "GET_ALL" : {
            return {
                ...state,
                name : action.data.name,
                image: action.data.image,
                time: action.data.time,
                ratings : action.data.ratings,
                producer : action.data.producer,
                type : action.data.type,
                actor : action.data.actor,
                releaseDate : action.data.releaseDate,
            }
        }
        
        default: 
            return state;
    }
}

export default moviesReducer;