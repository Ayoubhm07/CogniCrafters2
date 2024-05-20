package com.cognicrafters.productservice.Controller;


import com.cognicrafters.productservice.Entity.CartItem;
import com.cognicrafters.productservice.Entity.Category;
import com.cognicrafters.productservice.Entity.Product;
import com.cognicrafters.productservice.Entity.Review;
import com.cognicrafters.productservice.Repo.ProductRepo;
import com.cognicrafters.productservice.Service.CategoryService;
import com.cognicrafters.productservice.Service.ProductServices;
import com.cognicrafters.productservice.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/product")
public class ProductController {
    @Autowired
    private ProductServices productServices;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ProductRepo repo;
    @Autowired
    ReviewService reviewService;
    @PostMapping(value = "/save")
    public Product addProduct(
            @RequestParam("price") float price,
            @RequestParam("quantity") int quantity,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam("etat") boolean etat,
            @RequestParam("currency") String currency,
            @RequestParam("SKU") String SKU,
            @RequestParam("discount") double discount,
            @RequestParam("categoryName") String categoryName, // Nouveau paramètre pour le nom de la catégorie
            @RequestParam("rating") int rating // Ajoutez le paramètre rating à la méthode

    ) {
        String imageUrl = "images/";
        double newPrice = price - (price * discount);

        // Recherchez la catégorie par son nom
        Category category = categoryService.findByName(categoryName);

        // Vérifiez si la catégorie a été trouvée
        if (category == null) {
            System.err.println("La catégorie '" + categoryName + "' n'a pas été trouvée.");
            return null;
        }

        // Créez un nouvel objet Product avec les données du formulaire
        Product newProduct = new Product();
        newProduct.setPrice(newPrice);
        newProduct.setQuantity(quantity);
        newProduct.setName(name);
        newProduct.setDescription(description);
        newProduct.setEtat(etat);
        newProduct.setCurrency(currency);
        newProduct.setSKU(SKU);
        newProduct.setCategory(category);
        newProduct.setRating(0);

        if (!image.isEmpty()) {
            try {
                imageUrl += image.getOriginalFilename();
                File uploadDirectory = new File("C:\\Users\\HP\\Desktop\\AutismeIntegration\\product-service\\src\\main\\resources\\static\\images");
                image.transferTo(new File(uploadDirectory, image.getOriginalFilename()));
                newProduct.setImage(imageUrl);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // Enregistrez le produit dans la base de données
        Product savedProduct = productServices.save(newProduct);

        // Retournez le produit enregistré
        return savedProduct;
    }


    @GetMapping("/checkUniqueness")
    public ResponseEntity<Object> checkUniqueness(@RequestParam String sku, @RequestParam String name) {
        System.out.println("Executing checkUniqueness() for SKU: " + sku + " and name: " + name);

        boolean isUnique = productServices.checkUniqueness(sku, name);

        if (isUnique) {
            System.out.println("Product is unique.");
            return ResponseEntity.ok(true); // Product is unique
        } else {
            System.out.println("Product is not unique.");
            return ResponseEntity.ok(false); // Product is not unique
        }
    }


    @GetMapping(value = "/getAll")
    public Iterable<Product>getProducts()    {

        return productServices.listAll();
    }
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam String categoryId) {
        List<Product> products = productServices.getProductsByCategory(categoryId);
        if(products.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retourne une réponse 204 No Content
        } else {
            return ResponseEntity.ok(products); // Retourne la liste des produits
        }
    }
    // Endpoint pour mettre à jour la notation d'un produit
    @PostMapping(value = "/rating", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> submitRating(@RequestBody Map<String, Object> requestData) {
        String productId = (String) requestData.get("_id");
        Integer rating = (Integer) requestData.get("rating");

        // Vérifiez si les paramètres requis sont présents dans le corps de la requête
        if (productId == null || rating == null) {
            return ResponseEntity.badRequest().build(); // Retournez une réponse 400 Bad Request si les paramètres sont manquants
        }

        // Récupérez le produit associé à l'ID du produit depuis la base de données
        Optional<Product> optionalProduct = productServices.getProductById(productId);
        if (!optionalProduct.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Mettez à jour la notation du produit avec la nouvelle notation
        Product product = optionalProduct.get();
        product.setRating(rating);

        // Enregistrez le produit mis à jour dans la base de données
        Product updatedProduct = productServices.save(product);

        return ResponseEntity.ok(updatedProduct);
    }


    @GetMapping("/countByCategory")
    public void countProductsByCategory() {
        productServices.countProductsByCategory();
    }
    @PutMapping(value = "/edit/{id}")
    public Product update(@RequestBody Product product,@PathVariable(name = "id")String _id)
    {
        product.set_id(_id);
        productServices.saveorUpdate(product);
        return product;

    }
    @DeleteMapping("/delete/{id}")
    private void deleteProduct(@PathVariable("id")String _id)
    {
        productServices.deleteProduct(_id);

    }
    @RequestMapping("/product/{id}")
    private Product getProducts(@PathVariable(name = "id")String productid){
        return productServices.getProductByID(productid);
    }
    @GetMapping("/chercher")
    private Product getProductsByName(@RequestParam(name = "name") String productName) {
        return productServices.getProductByName(productName);
    }
    @GetMapping(value = "/getProductDetail/{productId}")
    public ResponseEntity<Product> getProductDetail(@PathVariable String productId) {
        Optional<Product> productOptional = productServices.getProductById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            return ResponseEntity.ok().body(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/latest-products")
    public List<Product> getLatestProducts() {
        // Définir la taille de la page pour récupérer les derniers produits
        int pageSize = 3;
        // Créer une requête pageable pour obtenir les produits les plus récents
        Pageable pageable = PageRequest.of(0, pageSize);
        // Récupérer les produits triés par identifiant (le plus récent en premier)
        return repo.findAll(pageable).getContent();
    }


    @PostMapping("/products/{productId}/reviews")
    public Review addReviewToProduct(@PathVariable String productId,
                                     @RequestParam String userId,
                                     @RequestBody Review review) {
        String comment = review.getComment();
        int rating = review.getRating();
        // Appelez la méthode addReview du service ReviewService
        return reviewService.addReview(productId, userId, comment, rating);
    }

    @GetMapping("/products/{productId}/reviews")
    public List<Review> getProductReviews(@PathVariable String productId) {
        // Appelez la méthode getProductReviews du service ReviewService
        return reviewService.getProductReviews(productId);
    }


    private String openaiApiKey = "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";

    @PostMapping("/detect_product_name")
    public ResponseEntity<Object> detectProductName(@RequestBody String productName) {
        boolean isProductNameAutisticFriendly = isProductNameAutisticFriendly(productName);
        return ResponseEntity.ok(isProductNameAutisticFriendly);
    }

    public boolean isProductNameAutisticFriendly(String productName) {
        String requestBody = "{\"prompt\": \"" + productName + "\", \"temperature\": 0.5, \"model\": \"gpt-3.5-turbo\"}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + openaiApiKey);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = null;

        try {
            response = restTemplate.exchange("https://api.openai.com/v1/completions", HttpMethod.POST, entity, String.class);

            // Afficher la requête envoyée à l'API OpenAI
            System.out.println("Requête envoyée à l'API OpenAI : " + requestBody);

            if (response.getStatusCode() == HttpStatus.OK) {
                String responseBody = response.getBody();
                // Votre logique d'analyse de la réponse
                // Par exemple, si la réponse contient un terme spécifique, considérez que le nom de produit est adapté aux personnes autistes
                if (responseBody.contains("autistic")) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (Exception e) {
            // Afficher les erreurs survenues lors de l'appel à l'API OpenAI
            System.out.println("Erreur lors de l'appel à l'API OpenAI : " + e.getMessage());
            return false;
        }
    }

    @GetMapping("/{productId}/related")
    public ResponseEntity<Set<Product>> getRelatedProducts(@PathVariable String productId) {
        Set<Product> relatedProducts = productServices.getRelatedProducts(productId);
        if (relatedProducts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(relatedProducts);
    }




    //review max rating pour un produit
    @GetMapping("/{productId}/max-rating")
    public ResponseEntity<?> getMaxRating(@PathVariable String productId) {
        Optional<Integer> maxRating = reviewService.getMaxRatingForProduct(productId);
        return maxRating.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/filter-products-by-price")
    public List<Product> filterProductsByPrice(@RequestParam("minPrice") double minPrice,
                                               @RequestParam("maxPrice") double maxPrice) {
        // Récupérer tous les produits
        List<Product> allProducts = productServices.getAllProducts();

        // Filtrer les produits en fonction du curseur de prix
        List<Product> filteredProducts = allProducts.stream()
                .filter(product -> product.getPrice() >= minPrice && product.getPrice() <= maxPrice)
                .collect(Collectors.toList());

        return filteredProducts;
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Product>> getProductsByPriceRange(@RequestParam double minPrice, @RequestParam double maxPrice) {
        List<Product> products = productServices.getProductsByPriceRange(minPrice, maxPrice);
        System.out.println(products);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/categ/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> productOpt = repo.findById(id);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            // Logique supplémentaire pour manipuler product
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
