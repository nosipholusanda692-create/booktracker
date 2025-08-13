import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import BookForm from "./components/BookForm";
import { createBook } from "./services/api";
import HomePage from "./pages/HomePage";
import EditBookPage from "./pages/EditBookPage";
import './index.css';

const AddBookPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (newBook) => {
        try{
            await createBook(newBook);
            navigate('/');
        }catch (error){
        console.error('Error creating book:', error);
        }
    };


    return (
        <div className="add-page">
            <h2>Add New Book</h2>
            <BookForm onSubmit={handleSubmit} isEditing={false}/>
        </div>
    );
};

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/add" element ={<AddBookPage/>}/>
                <Route path="/edit/:id" element= {<EditBookPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;