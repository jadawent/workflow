package com.workflow.dtos;

public class ShiftNoteResponse {

    private Long id;
    private String title;
    private String body;
    private Long creator;

    public ShiftNoteResponse() {
    }

    public ShiftNoteResponse(Long id, String title, String body, Long creator) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.creator = creator;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getCreator() {
        return creator;
    }

    public void setCreator(Long creator) {
        this.creator = creator;
    }
}
