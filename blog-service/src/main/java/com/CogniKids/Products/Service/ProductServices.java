package com.CogniKids.Products.Service;

import com.CogniKids.Products.Entity.Product;
import com.CogniKids.Products.Repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServices {
    @Autowired
    private ProductRepo repo;
public void saveorUpdate(Product product){
repo.save(product);
}

    public Iterable<Product> listAll() {
    return this.repo.findAll();
    }


    public void deleteProduct(String id) {
    repo.deleteById(id);
    }

    public Product getProductByID(String productid) {
    return repo.findById(productid).get();

}
}
