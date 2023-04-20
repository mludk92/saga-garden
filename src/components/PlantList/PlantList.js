import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

     const plants = useSelector(store => store.plantList);

    const getPlants = () => {
        dispatch({ type: 'FETCH_PLANTS'})
    }
    useEffect(() => {
        getPlants()
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            <div>{plants.map(plant =>(
                <p key={plant.id}>
                    {plant.name}
                </p>
            ))}</div>
        </div>
    );
}

export default PlantList;
