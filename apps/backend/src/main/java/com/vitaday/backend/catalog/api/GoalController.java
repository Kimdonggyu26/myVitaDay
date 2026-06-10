package com.vitaday.backend.catalog.api;

import com.vitaday.backend.catalog.application.CatalogService;
import com.vitaday.backend.catalog.application.CatalogService.GoalDetailView;
import com.vitaday.backend.catalog.application.CatalogService.GoalSummaryView;
import com.vitaday.backend.catalog.application.CatalogService.IngredientCardView;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final CatalogService catalogService;

    public GoalController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping
    public List<GoalSummaryView> getGoals() {
        return catalogService.getGoals();
    }

    @GetMapping("/{goalId}")
    public GoalDetailView getGoal(@PathVariable String goalId) {
        return catalogService.getGoal(goalId);
    }

    @GetMapping("/{goalId}/ingredients")
    public List<IngredientCardView> getGoalIngredients(@PathVariable String goalId) {
        return catalogService.getGoalIngredients(goalId);
    }
}
