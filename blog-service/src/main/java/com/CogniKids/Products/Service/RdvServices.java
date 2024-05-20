package com.CogniKids.Products.Service;

import com.CogniKids.Products.Entity.Horairepsy;
import com.CogniKids.Products.Entity.Patient;
import com.CogniKids.Products.Entity.Rdv;
import com.CogniKids.Products.Repo.HoraireRepo;
import com.CogniKids.Products.Repo.PatientRepo;
import com.CogniKids.Products.Repo.RdvRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Service
public class RdvServices {
    @Autowired

    private RdvRepo rdvRepo;

    @Autowired
    private PatientServices patientServices;
    @Autowired

    private PatientRepo patientRepo;
    @Autowired
private HoraireService horaireService;
    @Autowired
    private HoraireRepo horaireRepo;
/*
    public Rdv addRdv(Rdv rdv ,String idpsy,String idh, LocalDate date) {
        Psychiatre p =psyRepo.findById(idpsy).get();
        Horairepsy h = horaireRepo.findById(idh).get();
        rdv.setPsychiatre(p);
        rdv.setHorairepsy(h);
        Patient patient =new Patient();
        rdv.setPatient(patient);
        rdv.setDate(date);
        return rdvRepo.save(rdv);
    }

 */
public Rdv addRdv(Rdv rdv, String idPsy, String idHoraire, LocalDate date, Patient patient,String mail,String nom) {
    Horairepsy horairepsy = horaireRepo.findById(idHoraire).orElseThrow(() -> new IllegalArgumentException("Horaire non trouvé avec l'ID : " + idHoraire));

    if (!horairepsy.isDispo()) {
        throw new IllegalArgumentException("L'horaire sélectionné n'est pas disponible.");
    }

    if (patient == null) {
        throw new IllegalArgumentException("Patient invalide.");
    }


    rdv.setIdpsychiatre(idPsy);

    rdv.setHorairepsy(horairepsy);
    rdv.setPatient(patient);
    patientRepo.save(patient);
    rdv.setDate(date);

    // Réduisez le nombre de places disponibles pour cet horaire
    horairepsy.setDispo(false);
    horairepsy.setIdpsychiatre(idPsy);
    horairepsy.setNbplace(horairepsy.getNbplace() - 1);

    horaireRepo.save(horairepsy);

    rdvRepo.save(rdv);

    // Envoyer un e-mail au psychiatre
    sendEmailToPsychiatrist(idPsy, rdv, patient,mail,nom);

    return rdv;

}

    private void sendEmailToPsychiatrist(String idPsy, Rdv rdv, Patient patient, String mail,String nom) {
        final String username = "chaimaeljed1@gmail.com"; // Remplacez par votre adresse e-mail
        final String password = "tnvry irop ywqi wuwt"; // Remplacez par votre mot de passe

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(mail));
            message.setSubject("Nouveau rendez-vous ajouté pour le patient " + patient.getNom());

            String content = "Bonjour Dr. " + nom + ",\n\n";
            content += "Un nouveau rendez-vous a été ajouté pour le patient " + patient.getNom() + ".\n";
            content += "Voici les détails du rendez-vous :\n\n";
            content += "Date : " + rdv.getDate() + "\n";
            content += "Heure : " + rdv.getHorairepsy().getHeureDebut() + "\n";
            content += "Patient : " + patient.getNom() + " " + patient.getPrenom() + "\n";
            // Ajoutez d'autres détails au besoin

            message.setText(content);

            Transport.send(message);

            System.out.println("E-mail envoyé avec succès au psychiatre.");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }


    public List<Rdv> getRdvForPsychiatre(String psychiatreId) {
       return rdvRepo.findRdvByIdpsychiatre(psychiatreId);
   }
    public List<Rdv> getAllrdv() {
        return rdvRepo.findAll();
    }
    public Optional<Rdv> getrdvById(String id) {
        return rdvRepo.findById(id);
    }

    public void deleterdv(String id) {
        rdvRepo.deleteById(id);
    }
}
