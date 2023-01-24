package com.controller;

import com.dto.Queued;
import com.listeners.StateMachineDebugger;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyController {

    private final StateMachineDebugger debugger;


    public MyController(StateMachineDebugger debugger) {
        this.debugger = debugger;
    }


    @RequestMapping(value = "/getLast")
    public List<Queued> getLast() {
        return debugger.getLast();
    }

    @RequestMapping(value = "/event/{eventId}")
    public List<Queued> getByEvent(@PathVariable Integer eventId) {
        return debugger.getByEventId(eventId.toString());
    }
}
