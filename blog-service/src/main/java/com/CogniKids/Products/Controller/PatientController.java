package com.CogniKids.Products.Controller;

import com.CogniKids.Products.Entity.Patient;
import com.CogniKids.Products.Service.PatientServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin("*")

public class PatientController {
    @Autowired
    private PatientServices patientService;

    @GetMapping(value = "/get")
    public List<Patient> getAllPatients() {
        return patientService.getAllPatient();
    }

    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable String id) {
        Optional<Patient> patient = patientService.getPatientById(id);
        return patient.orElse(null);
    }

    @PostMapping(value = "/add")
    public Patient addPatient(@RequestBody Patient patient) {
        return patientService.addPatient(patient);
    }

    @DeleteMapping("/{id}")
    public void deletePatient(@PathVariable String id) {
        patientService.deletePatient(id);
    }
}
