package tn.esprit.filemangement.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.filemangement.service.MinioService;

import java.io.InputStream;

@RestController
@RequestMapping("/minio")
@CrossOrigin(origins = "*")
public class MinioController {
    @Autowired
    private MinioService minioService;

    @PostMapping("/bucket/{bucketName}")
    public ResponseEntity<?> createBucket(@PathVariable String bucketName) {
        minioService.createBucket(bucketName);
        return ResponseEntity.ok("Bucket created successfully.");
    }

    @GetMapping("/buckets")
    public ResponseEntity<?> listBuckets() {
        return ResponseEntity.ok(minioService.listBuckets());
    }

    @DeleteMapping("/bucket/{bucketName}")
    public ResponseEntity<?> deleteBucket(@PathVariable String bucketName) {
        minioService.deleteBucket(bucketName);
        return ResponseEntity.ok("Bucket deleted successfully.");
    }

    @PostMapping("/upload/{bucketName}")
    public ResponseEntity<?> uploadFile(@PathVariable String bucketName, @RequestParam("file") MultipartFile file) {
        minioService.uploadFile(bucketName, file);
        return ResponseEntity.ok("File uploaded successfully.");
    }

    @GetMapping("/download/{bucketName}/{fileName}")
    public ResponseEntity<?> downloadFile(@PathVariable String bucketName, @PathVariable String fileName) {
        try {
            InputStream resource = minioService.downloadFile(bucketName, fileName);

            String contentType = "application/pdf";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(new InputStreamResource(resource));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error downloading file: " + fileName);
        }
    }

    @GetMapping("/files/{bucketName}")
    public ResponseEntity<?> listFiles(@PathVariable String bucketName) {
        return ResponseEntity.ok(minioService.listFiles(bucketName));
    }

    @DeleteMapping("/file/{bucketName}/{fileName}")
    public ResponseEntity<?> deleteFile(@PathVariable String bucketName, @PathVariable String fileName) {
        minioService.deleteFile(bucketName, fileName);
        return ResponseEntity.ok("File deleted successfully.");
    }
}
