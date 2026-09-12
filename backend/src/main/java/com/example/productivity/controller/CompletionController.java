package com.example.productivity.controller;

import com.example.productivity.models.Completion;
import com.example.productivity.service.CompletionService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
public class CompletionController {
    private CompletionService completionService;

    public CompletionController(CompletionService completionService) {
        this.completionService = completionService;
    }

    @PostMapping("/api/tasks/{id}/complete")
    public Completion completeTask(
            @PathVariable int id,
            @RequestParam String dayOfWeek) {
        Completion completion = new Completion(null, id, dayOfWeek);
        return completionService.completeTask(completion);
    }

    @DeleteMapping("/api/tasks/{id}/complete")
    public void uncompleteTask(
            @PathVariable int id,
            @RequestParam String dayOfWeek) {
        completionService.uncompleteTask(id, dayOfWeek);
    }

}
