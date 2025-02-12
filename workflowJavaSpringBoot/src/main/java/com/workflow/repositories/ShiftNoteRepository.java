package com.workflow.repositories;

import com.workflow.models.ShiftNote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftNoteRepository extends CrudRepository<ShiftNote, Long> {
}
