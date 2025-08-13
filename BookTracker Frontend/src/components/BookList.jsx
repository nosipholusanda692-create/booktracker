import {useState, useEffect}from "react";
import { getBooks, deleteBook } from "../services/api";
import { useNavigate } from "react-router-dom";


const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage =5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        const results = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(results);
        setCurrentPage(1);
    }, [searchTerm, books]);

    const fetchBooks = async() => {
        try {
            
            const response = await getBooks();
           
            setBooks(response.data);
            setFilteredBooks(response.data);
            setLoading(false);
        } catch(error) {
            console.error('Error fetching books:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try{
                await deleteBook(id);
                fetchBooks();
            }catch(error){
                console.error('Error deleting book:', error);
            }
        }
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading)
        return <div className="loading">Loading books ...</div>;

    return(
        <div className="book-list">
            <h2>Books</h2>

            <div className="search-container">
                <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                />
                <span className="material-icons search-icon">search</span>
                {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="clear-search"> 
                    <span className="material-icons">clear</span>

                    </button>
                )}
                 </div>
            <button className="add-button" onClick={() => navigate('/add')}>
                Add New book
            </button>
            

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published date</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBooks.map((book) =>(
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
                            <td>{book.genre}</td>
                            <td className="actions">
                                <button className="edit-button" 
                                onClick={() => navigate(`/edit/${book.id}`)}
                                aria-label="Edit"
                                >
                                   <span className="material-icons">edit</span> 
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(book.id)}
                                    aria-label="Delete"
                                    >
                                        <span className="material-icons">delete</span>
                                    
                                </button>
                            </td>
                        </tr>
                   ) )}
                </tbody>
            </table>

            {filteredBooks.length === 0 && !loading && (
                <div className="no-results">No books found matching your search.</div>
            )}

             {totalPages > 1 && (
                <div className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

        </div>

    );
 };

 export default BookList;
