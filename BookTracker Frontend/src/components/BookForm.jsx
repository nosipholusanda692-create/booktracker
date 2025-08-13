import { useState } from "react"
import { useNavigate } from "react-router-dom";

const BookForm =({initialData = {}, onSubmit, isEditing}) => {
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: initialData.title || '',
        author: initialData.author || '',
        publishedDate: initialData.publishedDate || '',
        genre: initialData.genre || ''
    });

    const [errors, setErrors] = useState({
        title: '',
        author: '',
        publishedDate:'',
        genre:''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBook(prev => ({ ...prev, [name]: value}));
        setErrors(prev => ({...prev, [name]: ''}));
    };

    const ValidateForm = () => {
        let isValid = true;
        const newErrors = {
        title: '',
        author: '',
        publishedDate:'',
        genre:''

        };

        if (!book.title.trim()){
            newErrors.title = "Titlle is required";
            isValid= false;
        }

        if (!book.author.trim()){
            newErrors.author = "Author is required";
            isValid= false;
        }

        if (!book.publishedDate.trim()){
            newErrors.publishedDate = "PublishedDate is required";
            isValid= false;
        }

        if (!book.genre.trim()){
            newErrors.genre = "Genre is required";
            isValid= false;
        }

        setErrors(newErrors);
        return isValid;


};

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ValidateForm()){
        onSubmit(book);
        }
    };

    return(
        <form className="book-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title:</label>
                <input
                type = "text"
                name="title"
                value={book.title}
                onChange={handleChange}
                className={errors.title ? 'error' : ''}
                
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
                <label>Author:</label>
                <input
                type = "text"
                name="author"
                value={book.author}
                onChange={handleChange}
                className={errors.author ? 'error' : ''}
                />
                {errors.author && <span className="error-message">{errors.author}</span>}

             </div>

             <div className="form-group">
                <label>Published date:</label>
                <input
                type = "date"
                name="publishedDate"
                value={book.publishedDate}
                onChange={handleChange}
                className={errors.publishedDate ? 'error' : ''}
                />
                {errors.publishedDate && <span className="error-message">{errors.publishedDate}</span>}

                </div>
            <div className="form-group">
                <label>Genre:</label>
                <input
                type = "text"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                className={errors.genre ? 'error' : ''}
                />

                {errors.genre && <span className="error-message">{errors.genre}</span>}



            </div>
        <button type= "submit" className="submit-button">
            {isEditing ? 'Update Book' : 'Add Book'}
        </button>
        <button type ="button" className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
        </button>
        </form>
    );
};

export default BookForm;