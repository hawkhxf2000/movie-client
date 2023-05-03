import './App.css';
import api from './api/axiosConfig'
import {useState, useEffect} from "react";
import Layout from "./components/Layout";
import Home from "./components/home/Home"
import {Routes, Route} from "react-router-dom";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notfound/NotFound";

function App() {
    //此处如果赋初值为null，在一开始传递到Hero组件时会导致null值无法进行map的错误,
    // 因此需要先设定一个空数组，等数据从异步获得后再传递数据到Hero组件
    const [movies, setMovies] = useState([]);
    const[movie, setMovie] = useState();
    const[reviews, setReviews] = useState([]);

    const getMovies = async () => {
        try {
            const response = await api.get("api/v1/movies");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    const getMovieData = async(imdbId) =>{
        try{
            const response = await api.get(`api/v1/movies/imdb/${imdbId}`);
            const singleMovie = response.data;
            setMovie(singleMovie);
        }catch (err){
            console.log(err);
        }
    }
    useEffect(() => {
        getMovies().then(data => setMovies(data));
    }, [])
    // console.log(movies);
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home movies={movies}/>}></Route>
                    <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
                    <Route path="/reviews/:movieId" element={<Reviews getMovieData = {getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
                    <Route path="/404" element={<NotFound />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
