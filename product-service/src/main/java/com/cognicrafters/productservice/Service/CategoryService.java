package com.cognicrafters.productservice.Service;

import com.cognicrafters.productservice.Entity.Category;
import com.cognicrafters.productservice.Repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepo repo;

    public Category save(Category category) {
        return repo.save(category);
    }


    public List<Category> getAllCategories() {
        return repo.findAll();
    }

    public Category findById(String categoryId) {
        try {
            // Utilisez le repository de catégorie pour rechercher la catégorie dans la base de données par son identifiant
            Optional<Category> categoryOptional = repo.findById(categoryId);

            // Vérifiez si la catégorie est présente dans la base de données
            if (categoryOptional.isPresent()) {
                // Si la catégorie est trouvée, retournez-la
                return categoryOptional.get();
            } else {
                // Si aucune catégorie correspondante n'est trouvée, retournez null
                return null;
            }
        } catch (Exception e) {
            // En cas d'erreur lors de la recherche de la catégorie, affichez l'erreur (pour le débogage) et retournez null
            e.printStackTrace();
            return null;
        }
    }

    public Category findByName(String categoryName) {
        return repo.findByCategoryName(categoryName);
    }

}
