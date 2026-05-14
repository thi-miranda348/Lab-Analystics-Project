package com.labanalytics.backend.service;

import com.labanalytics.backend.entity.BiomarkerResult;
import com.labanalytics.backend.entity.LabReport;
import com.labanalytics.backend.repository.BiomarkerResultRepository;
import com.labanalytics.backend.repository.LabReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private LabReportRepository reportRepository;

    @Autowired
    private BiomarkerResultRepository biomarkerRepository;

    public void saveExtractedData(List<Map<String, Object>> dataList) {
        // Create a new Lab Report record
        LabReport report = new LabReport();
        report.setStatus("PROCESSED");
        report = reportRepository.save(report);

        // Loop through the data Python sent and save each biomarker
        for (Map<String, Object> item : dataList) {
            BiomarkerResult result = new BiomarkerResult();
            result.setLabReport(report);
            result.setBiomarkerName((String) item.get("biomarkerName"));
            result.setValue(Double.valueOf(item.get("value").toString()));
            result.setUnit((String) item.get("unit"));
            result.setReferenceLow(Double.valueOf(item.get("referenceLow").toString()));
            result.setReferenceHigh(Double.valueOf(item.get("referenceHigh").toString()));

            biomarkerRepository.save(result);
        }
    }
}