package com.example.productivity.repository;

import com.example.productivity.models.Completion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CompletionRepository extends MongoRepository<Completion, String> {
    Optional<Completion> findByTaskIdAndDayOfWeek(int taskId, String dayOfWeek);
}

