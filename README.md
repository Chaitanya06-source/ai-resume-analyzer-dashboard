# ai-resume-analyzer-dashboard
AI-powered decision dashboard built with Power BI, Python, DAX, and Streamlit to evaluate resume strength, analyze skill coverage vs. job requirements, and generate candidate fit scores.
This portfolio project provides:
1. **Data Pipeline & Relational Datasets (`data/`)**: Normalized CSV datasets for candidates, skill taxonomies, job role requirements, candidate skills, and AI recommendation vectors.
2. **Power BI Engineering Package (`powerbi/`)**: Production-ready DAX measures (`Overall Fit Score`, `Skill Match %`, `Missing Skills Count`, `Candidate Rank`), Power Query M scripts for skill standardization, and step-by-step PBIX report setup guide.
3. **Interactive Web Dashboard (`index.html`, `app.js`)**: Modern glassmorphic web application with Chart.js radar skill coverage, scatter plots, candidate leaderboard, and AI Copilot assistant.
4. **Streamlit Python Application (`streamlit_app.py`)**: Standalone interactive Python web app for real-time candidate inspection, skill demand heatmaps, and resume skill extraction.
---
## 🏗️ Repository Structure
├── data/ │ ├── Candidates.csv # Candidate profiles, experience, projects, certs │ ├── Skills.csv # Skill taxonomy with demand level & salary impact │ ├── JobRoles.csv # Target role definitions & base salaries │ ├── RequiredSkills.csv # Essential vs preferred role skills matrix │ ├── CandidateSkills.csv # Proficiency scores (1-5 scale) │ ├── AI_Recommendations.csv # Match %, strength score, missing skills & AI coaching │ └── ResumeText.csv # Raw text summaries & sentiment scores ├── powerbi/ │ ├── dax_measures.dax # Full DAX formula library │ ├── power_query_transforms.m # M code for text cleansing & skill name standardization │ └── POWERBI_SETUP_GUIDE.md # Step-by-step PBIX setup guide ├── scripts/ │ └── generate_datasets.py # Data generation & AI scoring engine script ├── index.html # Glassmorphic Web App HTML ├── styles.css # Dark mode styling & animations ├── app.js # Web App controller & Chart.js logic ├── streamlit_app.py # Interactive Streamlit Python Dashboard └── README.md # Project documentation



---
## ⚡ Quick Start
### 1. Launch Streamlit Python App
```bash
pip install streamlit pandas numpy
streamlit run streamlit_app.py
Open http://localhost:8501 in your browser.

2. Launch Web App (HTML/CSS/JS)
bash


python -m http.server 8080
Open http://localhost:8080 in your browser.

3. Load into Power BI Desktop
Open Power BI Desktop -> Get Data -> Text/CSV.
Import all 7 files from the data/ folder.
Follow the instructions in powerbi/POWERBI_SETUP_GUIDE.md to connect relationships and apply DAX measures from powerbi/dax_measures.dax.
📊 Deployment Options
GitHub Pages (Static Web App)
Push this repository to GitHub: git push -u origin main
Go to Settings -> Pages.
Select Source: Deploy from a branch -> main branch -> / (root).
Click Save. Your web app will be live at https://<your-username>.github.io/<repo-name>/.
Streamlit Community Cloud (Free Python Hosting)
Push this repository to GitHub.
Visit share.streamlit.io.
Connect your GitHub repository and set Main file path to streamlit_app.py.
Click Deploy!
🛠️ Key DAX Measures Included
Overall Fit Score: Weighted multi-criteria evaluation score.
Skill Match %: Percentage of target role required skills possessed.
Missing Skills Count: Count of missing essential skills.
Candidate Rank: Dynamic rank within target role pool.
AI Recommendation Text: Text lookup for AI upskilling action plan
c:\Users\sanam\Downloads\power bi project/
│
├── 📁 data/                          # Normalized CSV Datasets for Power BI & Web Apps
│   ├── Candidates.csv                # Candidate profiles, experience, projects, certs & location
│   ├── Skills.csv                    # 20 standardized skills with demand levels & salary impact
│   ├── JobRoles.csv                  # 5 target job roles & base salary benchmarks
│   ├── RequiredSkills.csv            # Role requirement matrix (essential vs preferred skills)
│   ├── CandidateSkills.csv           # Skill proficiency scores (1-5 scale) per candidate
│   ├── AI_Recommendations.csv        # Skill match %, missing skills vector, & AI coaching text
│   └── ResumeText.csv                # Raw text summaries, sentiment, & keyword density scores
│
├── 📁 powerbi/                       # Power BI Engineering Package & DAX Assets
│   ├── dax_measures.dax              # Full DAX formula library (Overall Fit, Match %, Rank)
│   ├── power_query_transforms.m      # Power Query M code for text cleaning & skill mapping
│   └── POWERBI_SETUP_GUIDE.md        # Step-by-step setup guide for building the PBIX report
│
├── 📁 scripts/                        # Data Pipeline & AI Scoring Scripts
│   └── generate_datasets.py          # Python script that generates & validates CSV datasets
│
├── 🌐 Web Application (HTML/CSS/JS)   # Interactive Web Dashboard
│   ├── index.html                    # Glassmorphic UI layout with multi-tab navigation
│   ├── styles.css                    # Dark mode styling, glowing badges, & animations
│   └── app.js                        # Controller, Chart.js visualizations, & Copilot AI logic
│
├── 🐍 Streamlit App (Python)          # Standalone Interactive Python App
│   └── streamlit_app.py              # Streamlit dashboard app (Runs on http://localhost:8501)
│
├── ⚙️ Repository Config & Docs
│   ├── .gitignore                    # Git ignore file for temporary & environment files
│   └── README.md                     # Comprehensive project documentation & guide
