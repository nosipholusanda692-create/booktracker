import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom"
import { getBookById, updateBook } from "../services/api";
import BookForm from "../components/BookForm";

const EditBookPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookById(id);
                setBook(response.data);
            }catch(error){
                console.error('Error fetching book:', error);
                navigate('/');
            }
        };
        fetchBook();
    }, [id, navigate]);

    const handleSubmit = async (updatedBookData) => {
        try{
            await updateBook(id, updatedBookData);
            navigate('/');
        }catch(error) {
            console.error('Error updating book:', error);
        }
    };

    if (!book) return <div className="loading">Loading book details...</div>;

    return(
        <div className="edit-page">
            <h2>Edit Book</h2>
            <BookForm
            initialData={book}
            onSubmit={handleSubmit}
            isEditing={true}
            />
        </div>
    );
    
};

export default EditBookPage;