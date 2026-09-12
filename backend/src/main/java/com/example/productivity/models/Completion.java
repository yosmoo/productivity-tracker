package com.example.productivity.models;

import org.springframework.data.annotation.Id;

public class Completion {
    @Id
    private String id;
    private int taskId;
    private String dayOfWeek;

    public Completion(String id, int taskId, String dayOfWeek) {
        this.id = id;
        this.taskId = taskId;
        this.dayOfWeek = dayOfWeek;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
}