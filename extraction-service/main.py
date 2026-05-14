from fastapi import FastAPI, UploadFile, File
import uvicorn

app = FastAPI()

@app.post("/extract-data")
async def extract_lab_data(file: UploadFile = File(...)):
    print(f"PYTHON WORKER RECEIVED FILE: {file.filename}")
    
    # Expanded dataset with 10 biomarkers
    dummy_extracted_data = [
        # Hematology
        {"biomarkerName": "Hemoglobin", "value": 14.5, "unit": "g/dL", "referenceLow": 13.8, "referenceHigh": 17.2},
        # Nutrients
        {"biomarkerName": "Vitamin D, 25-Hydroxy", "value": 42.0, "unit": "ng/mL", "referenceLow": 30.0, "referenceHigh": 100.0},
        {"biomarkerName": "Ferritin", "value": 12.5, "unit": "ng/mL", "referenceLow": 30.0, "referenceHigh": 400.0},
        # Metabolic & Heart
        {"biomarkerName": "Fasting Glucose", "value": 108.0, "unit": "mg/dL", "referenceLow": 65.0, "referenceHigh": 99.0},
        {"biomarkerName": "Total Cholesterol", "value": 240.0, "unit": "mg/dL", "referenceLow": 100.0, "referenceHigh": 199.0},
        {"biomarkerName": "HDL Cholesterol", "value": 38.0, "unit": "mg/dL", "referenceLow": 40.0, "referenceHigh": 100.0},
        # Thyroid
        {"biomarkerName": "TSH (Thyroid)", "value": 2.1, "unit": "mIU/L", "referenceLow": 0.4, "referenceHigh": 4.5},
        # Liver
        {"biomarkerName": "ALT (Liver Enzyme)", "value": 22.0, "unit": "U/L", "referenceLow": 0.0, "referenceHigh": 44.0},
        # Electrolytes
        {"biomarkerName": "Magnesium", "value": 2.0, "unit": "mg/dL", "referenceLow": 1.7, "referenceHigh": 2.2},
        # Inflammation
        {"biomarkerName": "hs-CRP (Inflammation)", "value": 4.5, "unit": "mg/L", "referenceLow": 0.0, "referenceHigh": 3.0}
    ]
    
    return dummy_extracted_data

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)