package com.workflow.controllers;

import com.workflow.dtos.ShiftNoteResponse;
import com.workflow.models.ShiftNote;
import com.workflow.services.ShiftNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ShiftNoteController {
    @Autowired
    private ShiftNoteService shiftNoteService;

    @PostMapping("/shift-note/create/{id}")
    public ResponseEntity<?> createShiftNote(@RequestBody ShiftNote shiftNote, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(shiftNoteService.createShiftNote(shiftNote, id));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Could not create shift note.");
        }
    }

    @GetMapping("/shift-note/list")
    public ResponseEntity<?> listShiftNotes() {
        try {
            return ResponseEntity.ok(shiftNoteService.listShiftNotes());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Could not list shift notes.");
        }
    }

    @GetMapping("/shift-note/list/{id}")
    public ResponseEntity<?> listShiftNotesByCreatorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(shiftNoteService.listShiftNotesByCreatorId(id));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Could not list shift notes.");
        }
    }

    @GetMapping("/shift-note/{id}")
    public ResponseEntity<?> getShiftNote(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(shiftNoteService.getShiftNote(id));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Could not get shift note.");
        }
    }

    @PutMapping("/shift-note/{id}")
    public ResponseEntity<?> updateShiftNote(@PathVariable Long id, @RequestBody ShiftNote shiftNote) {
        try {
            return ResponseEntity.ok(shiftNoteService.updateShiftNote(id, shiftNote));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Could not update shift note.");
        }
    }

    @DeleteMapping("shift-note/delete/{id}")
    public ResponseEntity<?> deleteShiftNote(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(shiftNoteService.deleteShiftNote(id));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(("Could not delete shift note."));
        }
    }
}
