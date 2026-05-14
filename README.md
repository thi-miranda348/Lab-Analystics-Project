# Lab Analytics Portal

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

Lab Analytics is a full-stack, microservices-oriented healthtech application. It allows clinical providers to securely upload unstructured medical PDFs (like blood test results), extract the biomarker data into a strictly typed relational database, and generate AI-driven clinical context for the results.

## Key Features

* **Role-Based Architecture:** Designed with a clinical provider-first approach for secure data entry.
* **Microservices Integration:** A robust Spring Boot orchestrator communicates seamlessly with a lightweight Python/FastAPI data extraction service.
* **Unstructured Data Processing:** Capable of ingesting raw PDF reports and normalizing messy text into structured JSON.
* **Intelligent UI/UX:** A responsive, Behance-inspired MedTech React dashboard that automatically flags out-of-range metrics and provides instant AI clinical analysis.

## Application Interface
<img width="1872" height="1096" alt="image" src="https://github.com/user-attachments/assets/5978dedd-3bf4-4d34-836f-86194b64d2d9" />


## System Architecture

1. **Frontend (React.js):** Provides a clean, responsive upload portal and data visualization dashboard.
2. **Orchestrator (Java / Spring Boot):** Handles REST API routing, file processing, and PostgreSQL database transactions using Spring Data JPA.
3. **Extraction Service (Python / FastAPI):** A dedicated worker service designed to parse PDF text and return structured biomarker JSON.
4. **Database (PostgreSQL):** Stores normalized patient data, linked lab reports, and longitudinal biomarker results.

## 💻 Getting Started

To run this application locally, you will need to start all three services.

### 1. Database Setup
Create a PostgreSQL database named `lab_analytics_db`. Ensure your credentials in the Spring Boot `application.properties` match your local environment.

### 2. Start the Python Extraction Service
```bash
cd extraction-service
pip install fastapi uvicorn python-multipart
python main.py
```
The Python worker will run on http://localhost:8000

### Start the Java Spring Boot Backend

Open the backend folder in your preferred Java IDE (IntelliJ/Eclipse) and run the BackendApplication.java main method.

The Spring Boot server will run on http://localhost:8080

### 4. Start the React Frontend
  ```bash
  cd frontend
  npm install
  npm start
  ```
The user interface will run on http://localhost:3000


### 5. Test the Application
A sample lab report is provided to quickly test the extraction pipeline. 
1. Navigate to `http://localhost:3000` in your browser.
2. Upload the `Report.pdf` located in the `/test-data` directory of this repository.
3. Click a generated table row to trigger the AI Clinical Assistant.


## Future Enhancements

* Integration of LangChain/OpenAI API into the Python worker for true NLP extraction of highly irregular lab reports.
* Implementation of Spring Security with JWT for strict Provider vs. Patient login sessions.
* Longitudinal line charts utilizing recharts for the patient-facing view.


