package com.vitaday.backend.catalog.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class CatalogApiTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getGoalsReturnsExpandedGoalList() throws Exception {
        mockMvc.perform(get("/api/goals"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("sleep"))
                .andExpect(jsonPath("$[1].id").value("fatigue"));
    }

    @Test
    void getGoalIngredientsReturnsSleepIngredientCards() throws Exception {
        mockMvc.perform(get("/api/goals/sleep/ingredients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(6))
                .andExpect(jsonPath("$[0].id").value("magnesium"))
                .andExpect(jsonPath("$[1].id").value("theanine"));
    }

    @Test
    void searchProductsSupportsIngredientAndScopeFilters() throws Exception {
        mockMvc.perform(get("/api/products/search")
                        .param("ingredientId", "omega3")
                        .param("scope", "global"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.products.length()").value(2))
                .andExpect(jsonPath("$.products[0].scope").value("global"));
    }

    @Test
    void compareProductsReturnsMetrics() throws Exception {
        mockMvc.perform(post("/api/compare")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "productIds": ["jong-rtg", "sports-research-omega", "now-ultra-omega"]
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.products.length()").value(3))
                .andExpect(jsonPath("$.metrics.length()").value(5));
    }
}
