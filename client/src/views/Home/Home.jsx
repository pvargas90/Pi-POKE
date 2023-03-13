import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    return (
        <div>
            <h1>Esta es la vista de Home</h1>
            <CardsContainer />
        </div>
    )
}

export default Home;
