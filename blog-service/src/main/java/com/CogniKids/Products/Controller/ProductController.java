package com.CogniKids.Products.Controller;

import com.CogniKids.Products.Entity.Product;
import com.CogniKids.Products.ProductsApplication;
import com.CogniKids.Products.Service.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/product")
public class ProductController {
    @Autowired
    private ProductServices productServices;

    @PostMapping(value = "/save")
    public String saveProduct(@RequestBody Product product)
    {
        productServices.saveorUpdate(product);
        return product.get_id();
    }

    @GetMapping(value = "/getAll")
public Iterable<Product>getProducts()    {

        return productServices.listAll();
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

}
