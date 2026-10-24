package com.demo.api;

import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Component
public class UserLoginTrackingListener {

    private final UserRepository userRepository;

    public UserLoginTrackingListener(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @EventListener
    @Transactional
    public void onAuthenticationSuccess(AuthenticationSuccessEvent event) {
        if (!(event.getAuthentication() instanceof JwtAuthenticationToken jwtAuthenticationToken)) {
            return;
        }

        String username = jwtAuthenticationToken.getToken().getClaimAsString("preferred_username");
        if (username == null || username.isBlank()) {
            return;
        }

        String email = jwtAuthenticationToken.getToken().getClaimAsString("email");

        User user = userRepository.findByUsername(username)
            .orElseGet(() -> {
                User newUser = new User();
                newUser.setUsername(username);
                return newUser;
            });

        if (email != null && !email.isBlank()) {
            user.setEmail(email);
        }

        user.setLastLoginDatetime(OffsetDateTime.now(ZoneOffset.UTC));
        userRepository.save(user);
    }
}
