package com.workflow.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workflow.models.Task;
import com.workflow.repositories.TaskRepository;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    
    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Iterable<Task> listTasks(){
        return taskRepository.findAll();
    }

    public Task getTask(Long id){
        return taskRepository.findById(id).get();
    }

    public Task updateTask(Long id, Task task){
        Task taskToUpdate = taskRepository.findById(id).get();
        taskToUpdate.setTaskName(task.getTaskName());
        taskToUpdate.setTaskBody(task.getTaskBody());
        taskToUpdate.setAssignedTo(task.getAssignedTo());
        taskToUpdate.setStatus(task.getStatus());
        return taskRepository.save(taskToUpdate);
    }

}
