package com.drink.app.service;

import com.drink.app.dto.UserDto;
import com.drink.app.model.User;
import com.drink.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final UserRepository userRepository;

    @Transactional
    public UserDto.Response signup(UserDto.SignUpRequest request) {
        if (userRepository.existsById(request.getId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        User user = User.builder()
                .id(request.getId())
                .nickname(request.getNickname())
                .password(request.getPassword())
                .favorites(new ArrayList<>())
                .role(request.getId().equalsIgnoreCase("admin") ? "ADMIN" : "USER")
                .build();

        userRepository.save(user);

        return UserDto.Response.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .role(user.getRole())
                .build();
    }

    public UserDto.Response login(UserDto.LoginRequest request) {
        User user = userRepository.findById(request.getId())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다."));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        return UserDto.Response.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .role(user.getRole())
                .build();
    }
}
