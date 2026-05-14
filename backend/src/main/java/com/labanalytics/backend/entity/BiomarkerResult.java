package com.labanalytics.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "biomarker_results")
public class BiomarkerResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private LabReport labReport;

    private String biomarkerName;
    private Double value;
    private String unit;
    private Double referenceLow;
    private Double referenceHigh;

    public BiomarkerResult() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LabReport getLabReport() {
        return labReport;
    }

    public void setLabReport(LabReport labReport) {
        this.labReport = labReport;
    }

    public String getBiomarkerName() {
        return biomarkerName;
    }

    public void setBiomarkerName(String biomarkerName) {
        this.biomarkerName = biomarkerName;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getReferenceLow() {
        return referenceLow;
    }

    public void setReferenceLow(Double referenceLow) {
        this.referenceLow = referenceLow;
    }

    public Double getReferenceHigh() {
        return referenceHigh;
    }

    public void setReferenceHigh(Double referenceHigh) {
        this.referenceHigh = referenceHigh;
    }
}