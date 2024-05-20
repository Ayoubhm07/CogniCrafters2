package com.cognicrafters.productservice.Controller;


import com.cognicrafters.productservice.Entity.Category;
import com.cognicrafters.productservice.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;
    @PostMapping(value = "/save")
    public String saveCategory(@RequestBody Category category)
    {
        categoryService.save(category);
        return category.get_id();
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
