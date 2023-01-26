package com.github.liliancharlotte.service;

import com.github.liliancharlotte.model.*;
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

    @Test
    void whenEditJobPostingInUserWithJobPostingIdThatDoesNotExistThenThrowException() {
        UserRequest userRequest = new UserRequest("dummy", new ArrayList<>());
        User testDummy = userService.addUser(userRequest);
        JobPostingRequest jobPostingRequest = new JobPostingRequest("editedTestCompanyName", true, "", "", "editedLinkTestCompany.com", WorkModel.IN_OFFICE, "Hamburg", ColumnStatus.INTERESTED_IN, "", "");

        String userId = testDummy.id();
        assertThrows(NoSuchElementException.class, () -> userService.editJobPostingInUser(userId, "904", jobPostingRequest));
    }
}
