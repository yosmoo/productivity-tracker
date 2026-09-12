package com.example.productivity.controller;

import com.example.productivity.models.Completion;
import com.example.productivity.service.CompletionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CompletionController {
    private CompletionService completionService;

    public CompletionController(CompletionService completionService) {
        this.completionService = completionService;
    }

    @GetMapping("/api/complete")
    public List<Completion> getAllCompletion() {
        return completionService.getAllCompletions();
    }

    @PostMapping("/api/tasks/{id}/complete")
    public Completion completeTask(
            @PathVariable String id,
            @RequestParam String dayOfWeek) {
        Completion completion = new Completion(null, id, dayOfWeek);
        return completionService.completeTask(completion);
    }

    @DeleteMapping("/api/tasks/{id}/complete")
    public void uncompleteTask(
            @PathVariable String id,
            @RequestParam String dayOfWeek) {
        completionService.uncompleteTask(id, dayOfWeek);
    }

    @DeleteMapping("/api/statistics/reset")
    public void resetWeek() {
        completionService.resetWeek();
    }
}
