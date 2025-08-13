package technical.test.booktrackerapp;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookTrackerService {
    private final BookTrackerRepo repo;

    public BookTrackerService(BookTrackerRepo repo) {
        this.repo = repo;
    }

    public List<BookTracker>getAll(){
        return repo.findAll();
    }

    public Optional<BookTracker>findById(Long id){
        return repo.findById(id);
    }

    public BookTracker save(BookTracker book){
        return repo.save(book);
    }

    public BookTracker update(Long id, BookTracker bookDetails){
        BookTracker book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));

        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPublishedDate(bookDetails.getPublishedDate());
        book.setGenre(bookDetails.getGenre());

        return repo.save(book);
    }

    public void delete(Long id){
        BookTracker book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        repo.delete(book);
    }
}
