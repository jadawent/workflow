package com.workflow.models;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tasks")
public class Task {

    // Enum for Task Status
    public enum Status {
        TO_DO,
        IN_PROGRESS,
        COMPLETE
    }

    // Generic Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;

    // Unique Attributes
    @NotBlank
    private String taskName;

    @NotNull
    private String taskBody;

    @NotNull
    private Status status;

    // Relationship Attributes
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "assigned_id")
    private User assignedTo;

    // Empty Constructor (BEAN)
    public Task() {}

    // Set date on creation and update
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = Status.TO_DO;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    //Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskBody() {
        return taskBody;
    }

    public void setTaskBody(String taskBody) {
        this.taskBody = taskBody;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        if (isValidStatus(status)) {
            this.status = status;
        }
        else {
            throw new IllegalArgumentException("Invalid status");
        }
    }

    private boolean isValidStatus(Status status) {
        for (Status s : Status.values()) {
            if (s.equals(status)) {
                return true;
            }
        }
        return false;
    }
}
