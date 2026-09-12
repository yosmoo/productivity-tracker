package com.example.productivity.controller;

import com.example.productivity.models.Task;
import com.example.productivity.service.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {
    private TaskService taskService;
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }
    @GetMapping("/api/tasks")
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }
}
