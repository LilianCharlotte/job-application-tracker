package com.github.liliancharlotte.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.liliancharlotte.model.JobPosting;
import com.github.liliancharlotte.model.User;
import com.github.liliancharlotte.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@AutoConfigureMockMvc
@SpringBootTest
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ObjectMapper objectMapper;

    String userEndPoint = "/api/user";


    @Test
    void addUser_expectStatusToBeOkAndCompareNameAndJobPostings() throws Exception {
        String response = mockMvc.perform(post(userEndPoint)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "name": "test",
                                        "jobPostings": [{
                                        "id": "12345",
                                        "companyName": "testCompany",
                                        "isUnsolicited": true,
                                        "jobTitle": "",
                                        "jobDescription": "",
                                        "jobPostingLink": "testCompany.com",
                                        "isRemote": false,
                                        "locatedAt": "Berlin"
                                        }]
                                        }
                                                """
                        ))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        User resultUser = objectMapper.readValue(response, User.class);
        assertEquals("test", resultUser.name());
        JobPosting expectedJobPosting = new JobPosting("12345", "testCompany", true, "", "", "testCompany.com", false, "Berlin");
        assertEquals(expectedJobPosting, resultUser.jobPostings().get(0));
    }


}