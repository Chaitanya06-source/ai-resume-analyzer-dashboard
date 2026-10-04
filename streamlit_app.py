import streamlit as st
import pandas as pd
import numpy as np
import os

# Page configuration
st.set_page_config(
    page_title="AI Resume Analyzer & Decision Dashboard",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load Datasets
@st.cache_data
def load_data():
    base_dir = "data"
    candidates = pd.read_csv(os.path.join(base_dir, "Candidates.csv"))
    skills = pd.read_csv(os.path.join(base_dir, "Skills.csv"))
    roles = pd.read_csv(os.path.join(base_dir, "JobRoles.csv"))
    req_skills = pd.read_csv(os.path.join(base_dir, "RequiredSkills.csv"))
    cand_skills = pd.read_csv(os.path.join(base_dir, "CandidateSkills.csv"))
    ai_recs = pd.read_csv(os.path.join(base_dir, "AI_Recommendations.csv"))
    resume_texts = pd.read_csv(os.path.join(base_dir, "ResumeText.csv"))
    return candidates, skills, roles, req_skills, cand_skills, ai_recs, resume_texts

try:
    candidates, skills, roles, req_skills, cand_skills, ai_recs, resume_texts = load_data()
except Exception as e:
    st.error(f"Error loading CSV datasets from data/ folder: {e}")
    st.stop()

# Sidebar Navigation & Filters
st.sidebar.image("https://img.icons8.com/color/96/brain--v1.png", width=64)
st.sidebar.title("ResuMatch AI Engine")
st.sidebar.markdown("**Power BI & AI Decision Dashboard**")

nav = st.sidebar.radio(
    "Navigation",
    ["Executive Overview", "Candidate Profile Inspector", "Skill Gap & Salary Impact", "AI Resume Skill Extractor", "Power BI & DAX Assets"]
)

# Role Filter
role_list = ["ALL"] + list(roles["RoleTitle"].unique())
selected_role = st.sidebar.selectbox("Filter by Target Role", role_list)

# Data Filtering
df_merged = candidates.merge(ai_recs, on="CandidateID").merge(roles, left_on="TargetRoleID", right_on="RoleID")
if selected_role != "ALL":
    df_merged = df_merged[df_merged["RoleTitle"] == selected_role]

# ------------------------------------------------------------------------------
# PAGE 1: EXECUTIVE OVERVIEW
# ------------------------------------------------------------------------------
if nav == "Executive Overview":
    st.title("📊 Executive Decision Dashboard")
    st.caption("AI-powered resume match, skill gap analysis, and candidate scoring model")

    # KPI Metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Candidates", len(df_merged))
    with col2:
        avg_fit = df_merged["OverallFitScore"].mean()
        st.metric("Avg Overall Fit Score", f"{avg_fit:.1f} / 100", delta="+4.2 vs benchmark")
    with col3:
        avg_match = df_merged["SkillMatchPct"].mean()
        st.metric("Avg Skill Match %", f"{avg_match:.1f}%")
    with col4:
        avg_missing = df_merged["MissingSkillsCount"].mean()
        st.metric("Avg Missing Skills", f"{avg_missing:.1f} per candidate", delta="-0.4 this cohort")

    st.markdown("---")

    # Visualizations
    col_left, col_right = st.columns([2, 1])

    with col_left:
        st.subheader("Candidate Fit Score vs. Experience (Scatter Plot)")
        st.scatter_chart(
            df_merged,
            x="YearsExperience",
            y="OverallFitScore",
            color="RoleTitle",
            size="ProjectCount"
        )

    with col_right:
        st.subheader("Target Role Breakdown")
        role_counts = df_merged["RoleTitle"].value_counts()
        st.bar_chart(role_counts)

    st.markdown("---")

    # Leaderboard Table
    st.subheader("🏆 Candidate Ranking Leaderboard")
    search_term = st.text_input("Search Candidate Name or Role:")
    
    display_df = df_merged[["CandidateID", "CandidateName", "RoleTitle", "YearsExperience", "ProjectCount", "SkillMatchPct", "OverallFitScore", "AISuggestion"]].copy()
    display_df.sort_values(by="OverallFitScore", ascending=False, inplace=True)

    if search_term:
        display_df = display_df[
            display_df["CandidateName"].str.contains(search_term, case=False) |
            display_df["RoleTitle"].str.contains(search_term, case=False)
        ]

    st.dataframe(display_df, use_container_width=True, height=400)

# ------------------------------------------------------------------------------
# PAGE 2: CANDIDATE PROFILE INSPECTOR
# ------------------------------------------------------------------------------
elif nav == "Candidate Profile Inspector":
    st.title("👤 Candidate Profile Inspector")

    cand_list = df_merged["CandidateName"].tolist()
    selected_cand_name = st.selectbox("Select Candidate to Inspect:", cand_list)
    cand_info = df_merged[df_merged["CandidateName"] == selected_cand_name].iloc[0]

    c1, c2 = st.columns([1, 2])

    with c1:
        st.markdown(f"### {cand_info['CandidateName']}")
        st.badge(cand_info["RoleTitle"])
        st.write(f"🎓 **Education:** {cand_info['EducationLevel']}")
        st.write(f"📍 **Location:** {cand_info['Location']}")
        st.write(f"💼 **Experience:** {cand_info['YearsExperience']} Years")
        st.write(f"📁 **Projects:** {cand_info['ProjectCount']} Projects")
        st.write(f"📜 **Certifications:** {cand_info['CertificationCount']}")

        st.markdown("---")
        st.subheader("Overall Fit Score")
        score = int(cand_info["OverallFitScore"])
        st.progress(score / 100)
        st.markdown(f"**Score:** `{score} / 100`")

        if score >= 85:
            st.success("Strong Match (High Priority Candidate)")
        else:
            st.warning("Moderate Match (Target Upskilling Recommended)")

    with c2:
        st.subheader("🤖 AI Coaching & Skill Gap Suggestion")
        st.info(cand_info["AISuggestion"])

        st.markdown("#### Skills Analysis")
        c_skills = cand_skills[cand_skills["CandidateID"] == cand_info["CandidateID"]].merge(skills, on="SkillID")
        
        st.write("**Possessed Skills:**")
        possessed_names = c_skills["SkillName"].tolist()
        st.write(", ".join([f"`{s}`" for s in possessed_names]))

        st.write("**Missing Role Skills:**")
        missing_str = cand_info["MissingSkillsList"]
        if missing_str != "None":
            st.write(", ".join([f"`{s}`" for s in missing_str.split(", ")]))
        else:
            st.success("None! 100% Core Skill Coverage.")

# ------------------------------------------------------------------------------
# PAGE 3: SKILL GAP & SALARY IMPACT
# ------------------------------------------------------------------------------
elif nav == "Skill Gap & Salary Impact":
    st.title("📈 Skill Demand & Salary Impact Analysis")

    c1, c2 = st.columns(2)

    with c1:
        st.subheader("Top In-Demand Skills Across Cohort")
        merged_cs = cand_skills.merge(skills, on="SkillID")
        skill_counts = merged_cs["SkillName"].value_counts().head(10)
        st.bar_chart(skill_counts)

    with c2:
        st.subheader("Skill Average Salary Impact ($ / Year)")
        salary_df = skills.sort_values(by="AvgSalaryImpact", ascending=False).head(10)
        st.bar_chart(salary_df.set_index("SkillName")["AvgSalaryImpact"])

# ------------------------------------------------------------------------------
# PAGE 4: AI RESUME SKILL EXTRACTOR
# ------------------------------------------------------------------------------
elif nav == "AI Resume Skill Extractor":
    st.title("📝 Real-Time AI Resume Skill Extractor")
    st.caption("Paste raw resume text below to extract skills against taxonomy dictionary")

    sample_text = "Senior Data Engineer with 5 years experience skilled in Python, SQL, Spark, Docker, AWS Cloud, and Snowflake. Built automated data pipelines and dbt models."
    raw_input = st.text_area("Resume Text Input:", value=sample_text, height=150)

    if st.button("Extract Skills & Score Match"):
        extracted = []
        for idx, row in skills.iterrows():
            if row["SkillName"].lower() in raw_input.lower():
                extracted.append(row["SkillName"])
        
        st.success(f"Extracted {len(extracted)} skills from text:")
        st.write(", ".join([f"`{s}`" for s in extracted]))
        
        match_score = min(100, len(extracted) * 18)
        st.metric("Estimated Role Match Score", f"{match_score}%")

# ------------------------------------------------------------------------------
# PAGE 5: POWER BI & DAX ASSETS
# ------------------------------------------------------------------------------
elif nav == "Power BI & DAX Assets":
    st.title("🛠️ Power BI DAX & M Code Explorer")

    st.subheader("1. DAX Measures Library (`powerbi/dax_measures.dax`)")
    with open("powerbi/dax_measures.dax", "r", encoding="utf-8") as f:
        dax_code = f.read()
    st.code(dax_code, language="sql")

    st.subheader("2. Power Query M Script (`powerbi/power_query_transforms.m`)")
    with open("powerbi/power_query_transforms.m", "r", encoding="utf-8") as f:
        m_code = f.read()
    st.code(m_code, language="powerquery")
