package technical.test.booktrackerapp;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/books")

public class BookTrackerController {
    private final BookTrackerService bookTrackerService;

    public BookTrackerController(BookTrackerService bookTrackerService) {
        this.bookTrackerService = bookTrackerService;
    }

    @GetMapping
    public List<BookTracker> all(){
        return bookTrackerService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookTracker> get(@PathVariable Long id){
        return bookTrackerService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BookTracker> add(@RequestBody BookTracker book){
        BookTracker saved = bookTrackerService.save(book);
        return ResponseEntity.created(URI.create("/api/books/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookTracker> update(@PathVariable Long id, @RequestBody BookTracker book){
        return bookTrackerService.findById(id).map(existing -> {
            existing.setTitle(book.getTitle());
            existing.setAuthor(book.getAuthor());
            existing.setPublishedDate(book.getPublishedDate());
            existing.setGenre(book.getGenre());
            BookTracker updated = bookTrackerService.save(existing);

            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        bookTrackerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
