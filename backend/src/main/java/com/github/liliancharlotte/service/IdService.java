package com.github.liliancharlotte.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {

    String generateId() {
        return UUID.randomUUID().toString();
    }
}
