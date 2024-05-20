package com.cognicrafters.productservice.Config;

import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@ServletComponentScan
@RestController
@CrossOrigin("*")
public class ApiController {
    private HttpServletRequest request;

    @GetMapping("/getIpAddress")
    public String getIpAddress() {
        String ipAddress = request.getRemoteAddr();
        return ipAddress;
    }
}
