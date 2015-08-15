package services;

import model.entity.UserEntity;
import model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;


@Service
public class LoginService implements ApplicationListener<InteractiveAuthenticationSuccessEvent> {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public void onApplicationEvent(InteractiveAuthenticationSuccessEvent event) {
        String userName = ((UserDetails) event.getAuthentication().
                getPrincipal()).getUsername();
        UserEntity user = userRepository.findOneByUsernameEquals(userName);
        user.setLastLogin(new Timestamp(System.currentTimeMillis()));
        userRepository.save(user);
    }

    @Override
    public String toString() {
        return "LoginService{" + "userRepository=" + userRepository + '}';
    }
}