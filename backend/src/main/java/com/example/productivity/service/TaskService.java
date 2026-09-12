package com.example.productivity.service;

import com.example.productivity.models.Task;
import com.example.productivity.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class TaskService {
    private TaskRepository taskRepositury;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepositury = taskRepository;
    }
    public List<Task> getAllTasks(){
        return taskRepositury.findAll();
    }
}
