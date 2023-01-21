package com.github.liliancharlotte.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void whenGetUserWithIdThatDoesNotExistThenThrowException() {
        assertThrows(NoSuchElementException.class, () -> userService.getUser("1234"));
    }

    @Test
    void whenUpdateUserWithIdThatDoesNotExistThenThrowException() {
        assertThrows(NoSuchElementException.class, () -> userService.updateUser("1234", null));
    }
}
