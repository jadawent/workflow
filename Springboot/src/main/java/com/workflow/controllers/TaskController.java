package com.workflow.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.models.Task;
import com.workflow.services.TaskService;

@RestController
@RequestMapping("/api")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping("/task")
    public ResponseEntity<?> createTask(@RequestBody Task task){
        try{
            Task newTask = taskService.createTask(task);
            return ResponseEntity.ok(newTask);
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body("Could not create task.");
        }
    }

    @GetMapping("/task/list")
    public ResponseEntity<?> listTasks(){
        try{
            return ResponseEntity.ok(taskService.listTasks());
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body("Could not list tasks.");
        }
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<?> getTask(@PathVariable Long id){
        try{
            return ResponseEntity.ok(taskService.getTask(id));
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body("Could not get task.");
        }
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task task){
        try{
            Task updatedTask = taskService.updateTask(id, task);
            return ResponseEntity.ok(updatedTask);
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body("Could not update task.");
        }
    }
}
