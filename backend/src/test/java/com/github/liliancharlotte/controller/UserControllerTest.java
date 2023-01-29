package com.github.liliancharlotte.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.liliancharlotte.model.*;
import com.github.liliancharlotte.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@AutoConfigureMockMvc
@SpringBootTest
class UserControllerTest {
    private static final String USER_ENDPOINT = "/api/user";

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void addUser_expectStatusToBeOkAndCompareNameAndJobPostings() throws Exception {
        String response = mockMvc.perform(post(USER_ENDPOINT)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                            "name": "test",
                                            "jobPostings": [
                                                {
                                                    "id": "12345",
                                                    "companyName": "testCompany",
                                                    "isUnsolicited": true,
                                                    "jobTitle": "",
                                                    "jobDescription": "",
                                                    "jobPostingLink": "testCompany.com",
                                                    "remote": "IN_OFFICE",
                                                    "locatedAt": "Berlin",
                                                    "status": "INTERESTED_IN",
                                                    "applicationSubmissionDate": "",
                                                    "notes": "",
                                                    "fileURL": ""
                                                }
                                            ]
                                        }
                                                    """
                        ))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        User actualUser = objectMapper.readValue(response, User.class);
        assertEquals("test", actualUser.name());
        JobPosting expectedJobPosting = new JobPosting("12345", "testCompany", true, "", "", "testCompany.com", WorkModel.IN_OFFICE, "Berlin", ColumnStatus.INTERESTED_IN, "", "", "");
        assertEquals(expectedJobPosting, actualUser.jobPostings().get(0));
    }

    @Test
    @DirtiesContext
    void getUserByIdAndExpectStatusToBeOk() throws Exception {
        User expectedUser = new User("13", "test", new ArrayList<>());
        userRepo.save(expectedUser);

        String response = mockMvc.perform(get(USER_ENDPOINT + "/13"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        User actualUser = objectMapper.readValue(response, User.class);
        assertEquals(expectedUser, actualUser);
    }

    @Test
    @DirtiesContext
    void updateUserAndExpectUpdatedUserWithSameId() throws Exception {
        JobPosting jobPosting = new JobPosting("903", "testCompanyName", true, "", "", "", WorkModel.IN_OFFICE, "Hamburg", ColumnStatus.INTERESTED_IN, "", "","");
        List<JobPosting> jobPostings = new ArrayList<>();
        jobPostings.add(jobPosting);

        User user = new User("13", "test", jobPostings);
        userRepo.save(user);

        String response = mockMvc.perform(put(USER_ENDPOINT + "/13")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                            {
                                                "id": "13",
                                                "name": "test",
                                                "jobPostings": [
                                                    {
                                                         "id": "12345",
                                                         "companyName": "testCompany",
                                                         "isUnsolicited": true,
                                                         "jobTitle": "",
                                                         "jobDescription": "",
                                                         "jobPostingLink": "testCompany.com",
                                                         "remote": "IN_OFFICE",
                                                         "locatedAt": "Berlin",
                                                         "status": "INTERESTED_IN",
                                                         "applicationSubmissionDate": "",
                                                         "notes": "",
                                                         "fileURL": ""
                                                                }
                                                         ]
                                                    }
                                        """
                        ))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        User updatedUser = objectMapper.readValue(response, User.class);
        List<JobPosting> expectedJobPostings = new ArrayList<>();
        expectedJobPostings.add(new JobPosting("12345", "testCompany", true, "", "", "testCompany.com", WorkModel.IN_OFFICE, "Berlin", ColumnStatus.INTERESTED_IN, "", "",""));
        User expectedUser = new User("13", "test", expectedJobPostings);

        assertNotEquals(user, updatedUser);
        assertEquals(updatedUser, expectedUser);
    }

    @Test
    @DirtiesContext
    void addJobPostingToUser_expectStatusToBeOkAndCompareJobPosting() throws Exception {
        User user = new User("13", "test", new ArrayList<>());
        userRepo.save(user);

        JobPostingRequest jobPostingRequest = new JobPostingRequest("testCompany", true, "", "", "testCompany.com", WorkModel.IN_OFFICE, "Berlin", ColumnStatus.INTERESTED_IN, "", "","");
        String response = mockMvc.perform(put(USER_ENDPOINT + "/13/jobPosting")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(jobPostingRequest)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        User actualUser = objectMapper.readValue(response, User.class);
        JobPosting actualJobPosting = actualUser.jobPostings().get(0);
        assertAll(
                () -> assertEquals("testCompany", actualJobPosting.companyName()),
                () -> assertTrue(actualJobPosting.isUnsolicited()),
                () -> assertEquals("", actualJobPosting.jobTitle()),
                () -> assertEquals("", actualJobPosting.jobDescription()),
                () -> assertEquals("testCompany.com", actualJobPosting.jobPostingLink()),
                () -> assertEquals(WorkModel.IN_OFFICE, actualJobPosting.remote()),
                () -> assertEquals("Berlin", actualJobPosting.locatedAt()),
                () -> assertEquals(ColumnStatus.INTERESTED_IN, actualJobPosting.status())
        );
    }

    @Test
    @DirtiesContext
    void editJobPosting_expectStatusToBeOKAndCompareJobPosting() throws Exception {
        JobPosting jobPosting = new JobPosting("903", "testCompanyName", true, "", "", "testCompany.com", WorkModel.IN_OFFICE, "Hamburg", ColumnStatus.INTERESTED_IN, "", "","");
        List<JobPosting> jobPostings = new ArrayList<>();
        jobPostings.add(jobPosting);

        User user = new User("13", "test", jobPostings);
        userRepo.save(user);

        JobPostingRequest jobPostingRequest = new JobPostingRequest("editedTestCompanyName", true, "", "", "editedLinkTestCompany.com", WorkModel.IN_OFFICE, "Hamburg", ColumnStatus.INTERESTED_IN, "", "","");

        String response = mockMvc.perform(put(USER_ENDPOINT + "/13/jobPosting/903")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(jobPostingRequest)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        User actualUser = objectMapper.readValue(response, User.class);
        JobPosting actualJobPosting = actualUser.jobPostings().get(0);
        assertAll(
                () -> assertEquals("editedTestCompanyName", actualJobPosting.companyName()),
                () -> assertTrue(actualJobPosting.isUnsolicited()),
                () -> assertEquals("", actualJobPosting.jobTitle()),
                () -> assertEquals("", actualJobPosting.jobDescription()),
                () -> assertEquals("editedLinkTestCompany.com", actualJobPosting.jobPostingLink()),
                () -> assertEquals(WorkModel.IN_OFFICE, actualJobPosting.remote()),
                () -> assertEquals("Hamburg", actualJobPosting.locatedAt()),
                () -> assertEquals(ColumnStatus.INTERESTED_IN, actualJobPosting.status()),
                () -> assertEquals("", actualJobPosting.notes()),
                () -> assertEquals("", actualJobPosting.fileURL())
        );


    }
}



