import os
import csv
import random

# Set random seed for reproducibility
random.seed(42)

# Ensure directories exist
os.makedirs("../data", exist_ok=True)
os.makedirs("data", exist_ok=True)

# Define Job Roles
JOB_ROLES = [
    {"RoleID": "R101", "RoleTitle": "Data Analyst", "Department": "Analytics", "MinYearsExperience": 2, "AvgBaseSalary": 85000},
    {"RoleID": "R102", "RoleTitle": "Data Scientist", "Department": "AI & Research", "MinYearsExperience": 4, "AvgBaseSalary": 125000},
    {"RoleID": "R103", "RoleTitle": "Data Engineer", "Department": "Data Infrastructure", "MinYearsExperience": 3, "AvgBaseSalary": 115000},
    {"RoleID": "R104", "RoleTitle": "Machine Learning Engineer", "Department": "AI Engineering", "MinYearsExperience": 4, "AvgBaseSalary": 135000},
    {"RoleID": "R105", "RoleTitle": "Cloud Data Architect", "Department": "Cloud Solutions", "MinYearsExperience": 6, "AvgBaseSalary": 150000},
]

# Define Skills Database
SKILLS = [
    {"SkillID": "S01", "SkillName": "Python", "Category": "Programming", "DemandLevel": "High", "AvgSalaryImpact": 12000},
    {"SkillID": "S02", "SkillName": "SQL", "Category": "Programming", "DemandLevel": "High", "AvgSalaryImpact": 10000},
    {"SkillID": "S03", "SkillName": "Power BI", "Category": "Data & Analytics", "DemandLevel": "High", "AvgSalaryImpact": 9000},
    {"SkillID": "S04", "SkillName": "Tableau", "Category": "Data & Analytics", "DemandLevel": "Medium", "AvgSalaryImpact": 8000},
    {"SkillID": "S05", "SkillName": "Excel & DAX", "Category": "Data & Analytics", "DemandLevel": "High", "AvgSalaryImpact": 6000},
    {"SkillID": "S06", "SkillName": "Pandas & NumPy", "Category": "Data & Analytics", "DemandLevel": "High", "AvgSalaryImpact": 11000},
    {"SkillID": "S07", "SkillName": "Scikit-Learn", "Category": "AI & ML", "DemandLevel": "High", "AvgSalaryImpact": 14000},
    {"SkillID": "S08", "SkillName": "PyTorch & TensorFlow", "Category": "AI & ML", "DemandLevel": "High", "AvgSalaryImpact": 18000},
    {"SkillID": "S09", "SkillName": "Spark & PySpark", "Category": "Data Engineering", "DemandLevel": "High", "AvgSalaryImpact": 16000},
    {"SkillID": "S10", "SkillName": "Snowflake", "Category": "Data Engineering", "DemandLevel": "High", "AvgSalaryImpact": 15000},
    {"SkillID": "S11", "SkillName": "AWS Cloud", "Category": "Cloud Infrastructure", "DemandLevel": "High", "AvgSalaryImpact": 14000},
    {"SkillID": "S12", "SkillName": "Azure Services", "Category": "Cloud Infrastructure", "DemandLevel": "High", "AvgSalaryImpact": 13000},
    {"SkillID": "S13", "SkillName": "Docker & Kubernetes", "Category": "Cloud Infrastructure", "DemandLevel": "Medium", "AvgSalaryImpact": 12000},
    {"SkillID": "S14", "SkillName": "Git & CI/CD", "Category": "Programming", "DemandLevel": "Medium", "AvgSalaryImpact": 7000},
    {"SkillID": "S15", "SkillName": "Data Storytelling", "Category": "Soft Skills", "DemandLevel": "High", "AvgSalaryImpact": 8500},
    {"SkillID": "S16", "SkillName": "Business Acumen", "Category": "Soft Skills", "DemandLevel": "High", "AvgSalaryImpact": 9500},
    {"SkillID": "S17", "SkillName": "A/B Testing & Statistics", "Category": "Data & Analytics", "DemandLevel": "Medium", "AvgSalaryImpact": 11500},
    {"SkillID": "S18", "SkillName": "MLOps & MLflow", "Category": "AI & ML", "DemandLevel": "Medium", "AvgSalaryImpact": 17000},
    {"SkillID": "S19", "SkillName": "dbt (Data Build Tool)", "Category": "Data Engineering", "DemandLevel": "High", "AvgSalaryImpact": 13500},
    {"SkillID": "S20", "SkillName": "R Programming", "Category": "Programming", "DemandLevel": "Low", "AvgSalaryImpact": 6000},
]

# Mapping Role Requirements
ROLE_SKILLS = [
    # Data Analyst
    {"RoleID": "R101", "SkillID": "S02", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R101", "SkillID": "S03", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R101", "SkillID": "S05", "ImportanceLevel": "Essential", "RequiredProficiency": 5},
    {"RoleID": "R101", "SkillID": "S01", "ImportanceLevel": "Preferred", "RequiredProficiency": 3},
    {"RoleID": "R101", "SkillID": "S15", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R101", "SkillID": "S16", "ImportanceLevel": "Preferred", "RequiredProficiency": 3},
    
    # Data Scientist
    {"RoleID": "R102", "SkillID": "S01", "ImportanceLevel": "Essential", "RequiredProficiency": 5},
    {"RoleID": "R102", "SkillID": "S02", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R102", "SkillID": "S06", "ImportanceLevel": "Essential", "RequiredProficiency": 5},
    {"RoleID": "R102", "SkillID": "S07", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R102", "SkillID": "S08", "ImportanceLevel": "Preferred", "RequiredProficiency": 3},
    {"RoleID": "R102", "SkillID": "S17", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    
    # Data Engineer
    {"RoleID": "R103", "SkillID": "S01", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R103", "SkillID": "S02", "ImportanceLevel": "Essential", "RequiredProficiency": 5},
    {"RoleID": "R103", "SkillID": "S09", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R103", "SkillID": "S10", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R103", "SkillID": "S19", "ImportanceLevel": "Preferred", "RequiredProficiency": 3},
    {"RoleID": "R103", "SkillID": "S11", "ImportanceLevel": "Preferred", "RequiredProficiency": 3},

    # Machine Learning Engineer
    {"RoleID": "R104", "SkillID": "S01", "ImportanceLevel": "Essential", "RequiredProficiency": 5},
    {"RoleID": "R104", "SkillID": "S07", "ImportanceLevel": "Essential", "RequiredProficiency": 5},
    {"RoleID": "R104", "SkillID": "S08", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R104", "SkillID": "S13", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R104", "SkillID": "S18", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R104", "SkillID": "S14", "ImportanceLevel": "Preferred", "RequiredProficiency": 3},

    # Cloud Data Architect
    {"RoleID": "R105", "SkillID": "S11", "ImportanceLevel": "Essential", "RequiredProficiency": 5},
    {"RoleID": "R105", "SkillID": "S12", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R105", "SkillID": "S10", "ImportanceLevel": "Essential", "RequiredProficiency": 5},
    {"RoleID": "R105", "SkillID": "S13", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
    {"RoleID": "R105", "SkillID": "S09", "ImportanceLevel": "Preferred", "RequiredProficiency": 4},
    {"RoleID": "R105", "SkillID": "S16", "ImportanceLevel": "Essential", "RequiredProficiency": 4},
]

FIRST_NAMES = ["Aarav", "Ananya", "Rahul", "Priya", "Vikram", "Sneha", "Karan", "Neha", "Rohan", "Meera",
               "Aditya", "Ishita", "Siddharth", "Kavya", "Arjun", "Pooja", "Dev", "Divya", "Amit", "Riya",
               "Varun", "Tanvi", "Nikhil", "Shreya", "Gaurav", "Nisha", "Manish", "Swati", "Sanjay", "Preeti"]
LAST_NAMES = ["Sharma", "Verma", "Patel", "Gupta", "Singh", "Kumar", "Rao", "Nair", "Deshmukh", "Joshi",
              "Mehta", "Reddy", "Chopra", "Shah", "Bhasin", "Iyer", "Agarwal", "Kulkarni", "Malhotra", "Saxena"]

LOCATIONS = ["Bengaluru, India", "Hyderabad, India", "Pune, India", "Mumbai, India", "Gurugram, India", "Remote"]
DEGREES = ["B.Tech Computer Science", "M.S. Data Science", "B.S. Statistics", "B.E. Information Technology", "M.Tech AI"]

CANDIDATES = []
CANDIDATE_SKILLS = []
RESUME_TEXTS = []
AI_RECOMMENDATIONS = []

skill_dict = {s["SkillID"]: s["SkillName"] for s in SKILLS}
role_dict = {r["RoleID"]: r for r in JOB_ROLES}

for i in range(1, 36):
    cid = f"C{i:03d}"
    name = f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"
    role_obj = random.choice(JOB_ROLES)
    target_role_id = role_obj["RoleID"]
    
    yoe = random.randint(1, 9)
    project_cnt = random.randint(2, 8)
    cert_cnt = random.randint(0, 5)
    location = random.choice(LOCATIONS)
    degree = random.choice(DEGREES)
    
    CANDIDATES.append({
        "CandidateID": cid,
        "CandidateName": name,
        "TargetRoleID": target_role_id,
        "YearsExperience": yoe,
        "ProjectCount": project_cnt,
        "EducationLevel": degree,
        "Location": location,
        "CertificationCount": cert_cnt
    })
    
    # Required skills for candidate's target role
    req_skill_ids = [r["SkillID"] for r in ROLE_SKILLS if r["RoleID"] == target_role_id]
    
    # Assign candidate skills: some required skills + some random skills
    # High performing candidates match 80-100%, lower match 40-70%
    match_tier = random.choices(["high", "mid", "low"], weights=[0.35, 0.45, 0.20])[0]
    
    if match_tier == "high":
        owned_req_skills = req_skill_ids
    elif match_tier == "mid":
        owned_req_skills = random.sample(req_skill_ids, max(1, len(req_skill_ids) - 1))
    else:
        owned_req_skills = random.sample(req_skill_ids, max(1, len(req_skill_ids) // 2))
        
    other_skills = [s["SkillID"] for s in SKILLS if s["SkillID"] not in req_skill_ids]
    owned_other_skills = random.sample(other_skills, random.randint(1, 3))
    
    all_owned_skills = list(set(owned_req_skills + owned_other_skills))
    
    for sid in all_owned_skills:
        prof = random.randint(3, 5) if match_tier == "high" else random.randint(2, 4)
        CANDIDATE_SKILLS.append({
            "CandidateID": cid,
            "SkillID": sid,
            "ProficiencyLevel": prof,
            "YearsUsed": random.randint(1, yoe)
        })
        
    # AI Analysis Calculations
    missing_skills = [sid for sid in req_skill_ids if sid not in owned_req_skills]
    skill_match_pct = round((len(owned_req_skills) / len(req_skill_ids)) * 100, 1) if req_skill_ids else 0
    
    exp_gap_score = min(100, round((yoe / role_obj["MinYearsExperience"]) * 100, 1))
    proj_gap_score = min(100, round((project_cnt / 4) * 100, 1))
    
    resume_strength_score = round((skill_match_pct * 0.5) + (exp_gap_score * 0.3) + (proj_gap_score * 0.2), 1)
    overall_fit_score = min(99, round(resume_strength_score * 0.95 + (cert_cnt * 1.5)))
    
    missing_names = [skill_dict[s] for s in missing_skills]
    missing_str = ", ".join(missing_names) if missing_names else "None! Excellent coverage."
    
    owned_names = [skill_dict[s] for s in all_owned_skills]
    
    if missing_skills:
        ai_suggestion = f"Priority Action: Acquire hands-on experience in {missing_names[0]}. Build a portfolio project showcasing DAX measures, cloud deployment, and business insights."
    else:
        ai_suggestion = f"Strong candidate fit! Recommended to highlight advanced leadership, architecture design, and end-to-end system deployment in interviews."

    AI_RECOMMENDATIONS.append({
        "CandidateID": cid,
        "RoleID": target_role_id,
        "SkillMatchPct": skill_match_pct,
        "MissingSkillsCount": len(missing_skills),
        "MissingSkillsList": missing_str,
        "ResumeStrengthScore": resume_strength_score,
        "ExperienceGapScore": exp_gap_score,
        "ProjectGapScore": proj_gap_score,
        "OverallFitScore": overall_fit_score,
        "AISuggestion": ai_suggestion
    })
    
    # Resume text simulation
    summary = f"Results-driven professional with {yoe} years of hands-on experience specializing in {role_obj['RoleTitle']}. Proven track record across {project_cnt} end-to-end projects."
    raw_skills = ", ".join(owned_names)
    sentiment_score = round(random.uniform(0.72, 0.96), 2)
    keyword_density = round(random.uniform(0.65, 0.92), 2)
    
    RESUME_TEXTS.append({
        "CandidateID": cid,
        "SummaryText": summary,
        "RawSkillsText": raw_skills,
        "SentimentScore": sentiment_score,
        "KeywordDensityScore": keyword_density
    })

def write_csv(path, data, fieldnames):
    with open(path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)

# Save to data/ and ../data/
for target_dir in ["data", "../data"]:
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
        
    write_csv(f"{target_dir}/Candidates.csv", CANDIDATES, CANDIDATES[0].keys())
    write_csv(f"{target_dir}/Skills.csv", SKILLS, SKILLS[0].keys())
    write_csv(f"{target_dir}/JobRoles.csv", JOB_ROLES, JOB_ROLES[0].keys())
    write_csv(f"{target_dir}/RequiredSkills.csv", ROLE_SKILLS, ROLE_SKILLS[0].keys())
    write_csv(f"{target_dir}/CandidateSkills.csv", CANDIDATE_SKILLS, CANDIDATE_SKILLS[0].keys())
    write_csv(f"{target_dir}/AI_Recommendations.csv", AI_RECOMMENDATIONS, AI_RECOMMENDATIONS[0].keys())
    write_csv(f"{target_dir}/ResumeText.csv", RESUME_TEXTS, RESUME_TEXTS[0].keys())

print(f"[SUCCESS] Generated datasets for {len(CANDIDATES)} candidates, {len(SKILLS)} skills, and {len(JOB_ROLES)} roles!")
