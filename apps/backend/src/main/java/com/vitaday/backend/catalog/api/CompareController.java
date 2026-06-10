package com.vitaday.backend.catalog.api;

import com.vitaday.backend.catalog.application.CatalogService;
import com.vitaday.backend.catalog.application.CatalogService.CompareRequest;
import com.vitaday.backend.catalog.application.CatalogService.CompareView;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/compare")
public class CompareController {

    private final CatalogService catalogService;

    public CompareController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @PostMapping
    public CompareView compareProducts(@Valid @RequestBody CompareRequest request) {
        return catalogService.compareProducts(request);
    }
}
