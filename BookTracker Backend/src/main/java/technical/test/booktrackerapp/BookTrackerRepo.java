package technical.test.booktrackerapp;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookTrackerRepo extends JpaRepository<BookTracker, Long> {
}
