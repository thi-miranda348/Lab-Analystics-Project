package com.labanalytics.backend.repository;

import com.labanalytics.backend.entity.BiomarkerResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BiomarkerResultRepository extends JpaRepository<BiomarkerResult, Long> {
    List<BiomarkerResult> findByLabReportId(Long reportId);
}