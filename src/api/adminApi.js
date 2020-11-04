import instanceAxios from "./instanceAxios";

export const getUsers = () => {
    const url = `/users`;

    return instanceAxios.get(url);
}

export const modifyUser = (user) => {
    const url = `/users/${user.id}`;

    return instanceAxios.put(url,user);
}

export const deleteUser = (id) => {
    const url = `/users/${id}`;
    
    return instanceAxios.delete(url);
}

export const getMovies = () => {
    const url = `/products`;

    return instanceAxios.get(url);
}

export const modifyMovie = (movie) => {
    const url = `/products/${movie.id}`;

    return instanceAxios.put(url,movie);
}

export const deleteMovie = (id) => {
    const url = `/products/${id}`;
    
    return instanceAxios.delete(url);
}

export const addMovie = (movie) => {
    const url = `/products`;
    return instanceAxios.post(url,movie);
}