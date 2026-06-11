package com.drink.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping(value = {
        "/",
        "/login",
        "/signup",
        "/favorites",
        "/drink/{id}",
        "/recommend",
        "/search",
        "/add-drink",
        "/drinks"
    })
    public String redirect() {
        return "forward:/index.html";
    }
}
