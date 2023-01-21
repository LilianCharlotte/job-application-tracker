package com.github.liliancharlotte.service;

import com.github.liliancharlotte.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
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
        User testDummy = new User("2", "Dummy", new ArrayList<>());
        assertThrows(NoSuchElementException.class, () -> userService.updateUser("1234", testDummy));
    }
}
