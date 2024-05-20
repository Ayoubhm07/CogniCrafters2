package com.CogniKids.Products.Service;

import com.CogniKids.Products.Entity.Patient;
import com.CogniKids.Products.Repo.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class PatientServices {
    @Autowired

    private PatientRepo patientRepo;
        public Patient addPatient(Patient patient) {

        return patientRepo.save(patient);
    }
    public Optional<Patient> getPatientById(String id) {
        return patientRepo.findById(id);
    }
    public List<Patient> getAllPatient() {
        return patientRepo.findAll();
    }
    public void deletePatient(String id) {
        patientRepo.deleteById(id);
    }


}
