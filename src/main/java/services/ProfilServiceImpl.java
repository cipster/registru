package services;import model.ProfilEntity;import model.ProfilViewEntity;import model.UserEntity;import model.repository.ProfilRepository;import model.repository.ProfilViewRepository;import model.repository.UserRepository;import model.response.JSONResponse;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.security.crypto.password.PasswordEncoder;import org.springframework.stereotype.Service;import org.springframework.transaction.annotation.Transactional;import java.sql.Timestamp;@Servicepublic class ProfilServiceImpl implements ProfilService {    @Autowired    private ProfilViewRepository profilViewRepository;    @Autowired    private ProfilRepository profilRepository;    @Autowired    private UserRepository userRepository;    @Autowired    private PasswordEncoder passwordEncoder;    @Override    public ProfilViewEntity getProfil() {        return profilViewRepository.findOneByUsernameEquals(UserUtils.getLoggedInUsername());    }    @Override    @Transactional    public JSONResponse save(ProfilEntity profil) {        long idUser = profilRepository.findOne(profil.getIdProfil()).getIdUser();        profil.setIdUser(idUser);         profilRepository.save(profil);        return new JSONResponse("Profil actualizat cu success");    }    @Override    @Transactional    public JSONResponse changePassword(String newPassword) {        UserEntity user = userRepository.findOneByUsernameEquals(UserUtils.getLoggedInUsername());        user.setLastPassChange(new Timestamp(System.currentTimeMillis()));        newPassword = passwordEncoder.encode(newPassword);        user.setPassword(newPassword);        userRepository.save(user);        return new JSONResponse("Parola a fost schimbat&#259; cu success");    }}