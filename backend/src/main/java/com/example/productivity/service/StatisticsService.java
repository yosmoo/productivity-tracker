package com.example.productivity.service;

import com.example.productivity.models.Completion;
import com.example.productivity.models.Task;
import org.springframework.stereotype.Service;
import com.example.productivity.repository.TaskRepository;
import com.example.productivity.repository.CompletionRepository;

import java.util.List;

@Service
public class StatisticsService {
    private TaskRepository taskRepository;
    private CompletionRepository completionRepository;

    public StatisticsService(TaskRepository taskRepository, CompletionRepository completionRepository) {
        this.taskRepository = taskRepository;
        this.completionRepository = completionRepository;
    }

    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    public List<Completion> getCompletions() {
        return completionRepository.findAll();
    }

    public int getCompletesCount() {
        List<Completion> completions = getCompletions();
        return completions.size();
    }

    public int getPossibleCount() {
        List<Task> tasks = getTasks();
        return tasks.size() * 7;
    }

    public double getPercentage() {
        int completed = getCompletesCount();
        int possible = getPossibleCount();
        return (int) Math.round((double) completed / possible * 100);
    }
}
