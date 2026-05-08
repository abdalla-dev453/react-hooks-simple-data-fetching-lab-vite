// create your App component here
import { useEffect, useState } from "react";
import "./App.css";

function App () {
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = "https://dog.ceo/api/breeds/image/random";

async function fetchDataImage () {
    setIsLoading(true);
    setError(null);
    try {
        const res =await fetch (API_URL);

        if (!res.ok) throw new Error ("Failed to fetch data")

            const data = await res.json ();
            setImage(data.message);

    }
    catch (error) {
        setError(error.message);
    }
    finally {
        setIsLoading(false);
    }
}
useEffect (() => {
fetchDataImage();
}, [])


    return (
        <div className="container">
            <h1>Random Dog Generator</h1>
            {/**loading */}
            {isLoading  && <p>Loading ...</p>}
            {/**error */}
            {error && <p>Something went wrong, try again!</p>}

            {/**image */}        
            {image && (
                <div className="card">
                    <img src={image} alt="Random dog" className="dog-image" />
                </div>
            )}

            <button type="submit" onClick={fetchDataImage} className="btn">Fetch Dog</button>
        </div>
    )
}

export default App;