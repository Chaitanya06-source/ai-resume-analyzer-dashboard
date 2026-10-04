# 📊 Power BI AI Resume Analyzer - Complete Setup Guide

This guide provides step-by-step instructions to load the project's CSV datasets into Power BI Desktop, build the Star Schema data model, apply DAX measures, configure AI features, and design a high-impact dashboard.

---

## 📁 1. Data Connection & Import

1. Open **Power BI Desktop**.
2. Click **Get Data** -> **Text/CSV**.
3. Navigate to the `data/` folder in your project workspace:
   - Select and import each of the 7 CSV files:
     - `Candidates.csv`
     - `Skills.csv`
     - `JobRoles.csv`
     - `RequiredSkills.csv`
     - `CandidateSkills.csv`
     - `AI_Recommendations.csv`
     - `ResumeText.csv`
4. Click **Transform Data** to open Power Query Editor.

---

## 🧹 2. Power Query Data Cleansing (ETL)

1. **Verify Data Types**:
   - `Candidates`: `YearsExperience`, `ProjectCount`, `CertificationCount` set to **Whole Number**.
   - `AI_Recommendations`: `SkillMatchPct`, `ResumeStrengthScore`, `OverallFitScore` set to **Decimal Number**.
   - `ResumeText`: `SentimentScore` set to **Decimal Number**.
2. **Standardize Skill Names**:
   - Open **Advanced Editor** on `ResumeText` or `CandidateSkills` and apply the M code from `powerbi/power_query_transforms.m` to clean messy skill names (`python3` -> `Python`).
3. Click **Close & Apply**.

---

## 🕸️ 3. Data Model & Star Schema Relationships

In the **Model View**, establish the following 1-to-Many ($1:*$) relationships (single direction filtering unless noted):

```
       [JobRoles] (RoleID)
           │
           ├── (1:*) ──► [Candidates] (TargetRoleID)
           │                 │
           │                 ├── (1:1) ──► [AI_Recommendations] (CandidateID)
           │                 ├── (1:1) ──► [ResumeText] (CandidateID)
           │                 └── (1:*) ──► [CandidateSkills] (CandidateID)
           │                                    │
           └── (1:*) ──► [RequiredSkills]       │ (*:1)
                              │                 ▼
                              └── (1:*) ──► [Skills] (SkillID)
```

- `JobRoles[RoleID]` $\rightarrow$ `Candidates[TargetRoleID]` ($1:*$)
- `Candidates[CandidateID]` $\rightarrow$ `AI_Recommendations[CandidateID]` ($1:1$)
- `Candidates[CandidateID]` $\rightarrow$ `ResumeText[CandidateID]` ($1:1$)
- `Candidates[CandidateID]` $\rightarrow$ `CandidateSkills[CandidateID]` ($1:*$)
- `Skills[SkillID]` $\rightarrow$ `CandidateSkills[SkillID]` ($1:*$)
- `Skills[SkillID]` $\rightarrow$ `RequiredSkills[SkillID]` ($1:*$)

---

## 🧮 4. Adding DAX Measures

1. In the **Report View**, click **New Table** under Modeling tab, named `_Measures`.
2. Copy and paste the DAX measures from `powerbi/dax_measures.dax`:
   - `Overall Fit Score`
   - `Skill Match %`
   - `Missing Skills Count`
   - `Resume Strength Score`
   - `Candidate Rank`
   - `AI Recommendation Text`

---

## 🎨 5. Building Dashboard Pages

### Page 1: Executive Overview
- **Cards / KPI Tiles**: `Total Candidates`, `Average Overall Fit Score`, `Average Skill Match %`.
- **Bar Chart**: Candidates by Target Role (`JobRoles[RoleTitle]` vs `Candidates[CandidateID]`).
- **Scatter Plot**: `YearsExperience` (X-axis) vs `Overall Fit Score` (Y-axis), colored by `JobRoles[RoleTitle]`.
- **Leaderboard Table**: Candidate Name, Target Role, Overall Fit Score, Skill Match %, Rank.

### Page 2: Candidate Deep-Dive
- **Slicer**: Candidate Name selector (`Candidates[CandidateName]`).
- **Gauge Visual**: `Overall Fit Score` (Target = 85).
- **Bar Chart**: Candidate Skill Proficiency vs Role Required Proficiency.
- **AI Recommendation Box**: Card visual displaying `[AI Recommendation Text]` and `[Missing Skills Summary]`.

### Page 3: AI Insights & Key Influencers
- **Key Influencers Visual**:
  - Target: **Overall Fit Score** (Analyze).
  - Explain By: `YearsExperience`, `ProjectCount`, `CertificationCount`, `SentimentScore`, `SkillMatchPct`.
- **Copilot / Q&A Box**: Enable Natural Language querying:
  - Example: *"What is the average fit score for Data Science candidates?"*
  - Example: *"Which candidates have more than 5 years experience and skill match > 80%?"*

---

## 🌟 Resume Highlights
Mention these key details in your resume/portfolio:
- *Engineered an end-to-end AI Resume Analytics solution in Power BI connected to a Python data pipeline.*
- *Implemented dynamic DAX measures for weighted multi-criteria scoring (`Overall Fit Score`, `Candidate Rank`).*
- *Configured Key Influencers AI visual to detect critical drivers behind candidate hiring readiness.*
