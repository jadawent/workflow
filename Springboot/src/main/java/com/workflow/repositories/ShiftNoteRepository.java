package com.workflow.repositories;

import com.workflow.models.ShiftNote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShiftNoteRepository extends CrudRepository<ShiftNote, Long> {

    List<ShiftNote> findAllByCreatorId(Long creator);
}
