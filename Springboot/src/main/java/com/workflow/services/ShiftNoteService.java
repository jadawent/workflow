package com.workflow.services;

import com.workflow.dtos.ShiftNoteResponse;
import com.workflow.models.ShiftNote;
import com.workflow.repositories.ShiftNoteRepository;
import com.workflow.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ShiftNoteService {

    @Autowired
    ShiftNoteRepository shiftNoteRepository;

    @Autowired
    UserRepository userRepository;

    public ShiftNoteResponse createShiftNote(ShiftNote shiftNote, Long id) {
        shiftNote.setCreator(userRepository.findById(id).orElseThrow());
        shiftNoteRepository.save(shiftNote);
        return generateShiftNoteResponse(shiftNote);
    }

    private ShiftNoteResponse generateShiftNoteResponse(ShiftNote shiftNote) {
        return new ShiftNoteResponse(shiftNote.getId(), shiftNote.getTitle(), shiftNote.getBody(), shiftNote.getCreator() != null ? shiftNote.getCreator().getId() : null);
    }

    public Iterable<ShiftNoteResponse> listShiftNotes() {
      return generateShiftNoteResponseList(shiftNoteRepository.findAll());
    }

    public Iterable<ShiftNoteResponse> listShiftNotesByCreatorId(long creatorId) {
        return generateShiftNoteResponseList(shiftNoteRepository.findAllByCreatorId(creatorId));
    }

    private Iterable<ShiftNoteResponse> generateShiftNoteResponseList(Iterable<ShiftNote> notes) {
        ArrayList<ShiftNoteResponse> response = new ArrayList<>();
        for(ShiftNote note : notes) {
            response.add(generateShiftNoteResponse(note));
        }
        return response;
    }

    public ShiftNoteResponse getShiftNote(Long id) {
        return generateShiftNoteResponse(shiftNoteRepository.findById(id).orElseThrow());
    }

    public ShiftNoteResponse updateShiftNote(Long id, ShiftNote shiftNote) {
        ShiftNote shiftNoteToUpdate = shiftNoteRepository.findById(id).orElseThrow();
        shiftNoteToUpdate.setTitle(shiftNote.getTitle());
        shiftNoteToUpdate.setBody(shiftNote.getBody());
        return generateShiftNoteResponse(shiftNoteRepository.save(shiftNoteToUpdate));
    }

    public ShiftNoteResponse deleteShiftNote(Long id) {
        ShiftNote shiftNoteToDelete = shiftNoteRepository.findById(id).orElseThrow();
        ShiftNoteResponse response = generateShiftNoteResponse(shiftNoteToDelete);
        shiftNoteToDelete.setCreator(null);
        shiftNoteRepository.delete(shiftNoteToDelete);
        return response;
    }
}
