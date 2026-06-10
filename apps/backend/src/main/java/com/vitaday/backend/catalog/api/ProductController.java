package com.vitaday.backend.catalog.api;

import com.vitaday.backend.catalog.application.CatalogService;
import com.vitaday.backend.catalog.application.CatalogService.ProductDetailView;
import com.vitaday.backend.catalog.application.CatalogService.SearchResultsView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final CatalogService catalogService;

    public ProductController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/search")
    public SearchResultsView searchProducts(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String goalId,
            @RequestParam(required = false) String ingredientId,
            @RequestParam(defaultValue = "all") String scope) {
        return catalogService.searchProducts(query, goalId, ingredientId, scope);
    }

    @GetMapping("/{productId}")
    public ProductDetailView getProduct(@PathVariable String productId) {
        return catalogService.getProduct(productId);
    }
}
