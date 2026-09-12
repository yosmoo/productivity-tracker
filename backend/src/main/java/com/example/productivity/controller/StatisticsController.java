package com.example.productivity.controller;

import com.example.productivity.service.StatisticsService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class StatisticsController {
    private StatisticsService statisticsService;

    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/api/statistics/week")
    public double detWeeklyStatisstics() {
        return statisticsService.getPercentage();
    }
}
