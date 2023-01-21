package com.github.liliancharlotte;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void testMain() {
        BackendApplication.main(new String[]{});
        assertTrue(true);
    }

}
