import BookList from "../components/BookList"


const HomePage = () => {
    return(
        <div className="home-page">
            <h1>Book Tracker</h1>
            <BookList/>
        </div>
    );
};

export default HomePage;