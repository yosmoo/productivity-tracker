package com.example.productivity.service;

import com.example.productivity.models.Completion;
import com.example.productivity.models.Task;
import com.example.productivity.repository.CompletionRepository;
import org.springframework.stereotype.Service;
import com.example.productivity.repository.TaskRepository;

import java.util.Optional;

@Service
public class CompletionService {
    private CompletionRepository completionRepository;
    private TaskRepository taskRepository;

    public CompletionService(CompletionRepository completionRepository, TaskRepository taskRepository) {
        this.completionRepository = completionRepository;
        this.taskRepository = taskRepository;
    }

    public Completion completeTask(Completion completion) {
        Optional<Task> task =
                taskRepository.findById(completion.getTaskId());
        if (task.isPresent()) {
            return completionRepository.save(completion);
        }
        return null;
    }

    public void uncompleteTask(int taskId, String dayOfweek) {
        Optional<Completion> completion = completionRepository.findByTaskIdAndDayOfWeek(taskId, dayOfweek);

        if (completion.isPresent()) {
            completionRepository.delete(completion.get());
        }

    }

}
