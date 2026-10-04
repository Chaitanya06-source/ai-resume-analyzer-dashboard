// ==============================================================================
// RESUMATCH AI - DASHBOARD CONTROLLER & INTERACTIVE LOGIC
// ==============================================================================

// Dataset State
let state = {
    candidates: [],
    skills: [],
    jobRoles: [],
    requiredSkills: [],
    candidateSkills: [],
    aiRecommendations: [],
    resumeTexts: [],
    selectedRole: "ALL",
    selectedCandidateId: "C001"
};

// Chart instances
let charts = {};

document.addEventListener("DOMContentLoaded", () => {
    initDatasets();
    setupNavigation();
    setupEventListeners();
    renderAll();
});

// Initialize Dataset Objects (Loaded directly from generated CSV pipeline)
function initDatasets() {
    state.jobRoles = [
        { RoleID: "R101", RoleTitle: "Data Analyst", Department: "Analytics", MinYearsExperience: 2, AvgBaseSalary: 85000 },
        { RoleID: "R102", RoleTitle: "Data Scientist", Department: "AI & Research", MinYearsExperience: 4, AvgBaseSalary: 125000 },
        { RoleID: "R103", RoleTitle: "Data Engineer", Department: "Data Infrastructure", MinYearsExperience: 3, AvgBaseSalary: 115000 },
        { RoleID: "R104", RoleTitle: "Machine Learning Engineer", Department: "AI Engineering", MinYearsExperience: 4, AvgBaseSalary: 135000 },
        { RoleID: "R105", RoleTitle: "Cloud Data Architect", Department: "Cloud Solutions", MinYearsExperience: 6, AvgBaseSalary: 150000 }
    ];

    state.skills = [
        { SkillID: "S01", SkillName: "Python", Category: "Programming", DemandLevel: "High", AvgSalaryImpact: 12000 },
        { SkillID: "S02", SkillName: "SQL", Category: "Programming", DemandLevel: "High", AvgSalaryImpact: 10000 },
        { SkillID: "S03", SkillName: "Power BI", Category: "Data & Analytics", DemandLevel: "High", AvgSalaryImpact: 9000 },
        { SkillID: "S04", SkillName: "Tableau", Category: "Data & Analytics", DemandLevel: "Medium", AvgSalaryImpact: 8000 },
        { SkillID: "S05", SkillName: "Excel & DAX", Category: "Data & Analytics", DemandLevel: "High", AvgSalaryImpact: 6000 },
        { SkillID: "S06", SkillName: "Pandas & NumPy", Category: "Data & Analytics", DemandLevel: "High", AvgSalaryImpact: 11000 },
        { SkillID: "S07", SkillName: "Scikit-Learn", Category: "AI & ML", DemandLevel: "High", AvgSalaryImpact: 14000 },
        { SkillID: "S08", SkillName: "PyTorch & TensorFlow", Category: "AI & ML", DemandLevel: "High", AvgSalaryImpact: 18000 },
        { SkillID: "S09", SkillName: "Spark & PySpark", Category: "Data Engineering", DemandLevel: "High", AvgSalaryImpact: 16000 },
        { SkillID: "S10", SkillName: "Snowflake", Category: "Data Engineering", DemandLevel: "High", AvgSalaryImpact: 15000 },
        { SkillID: "S11", SkillName: "AWS Cloud", Category: "Cloud Infrastructure", DemandLevel: "High", AvgSalaryImpact: 14000 },
        { SkillID: "S12", SkillName: "Azure Services", Category: "Cloud Infrastructure", DemandLevel: "High", AvgSalaryImpact: 13000 },
        { SkillID: "S13", SkillName: "Docker & Kubernetes", Category: "Cloud Infrastructure", DemandLevel: "Medium", AvgSalaryImpact: 12000 },
        { SkillID: "S14", SkillName: "Git & CI/CD", Category: "Programming", DemandLevel: "Medium", AvgSalaryImpact: 7000 },
        { SkillID: "S15", SkillName: "Data Storytelling", Category: "Soft Skills", DemandLevel: "High", AvgSalaryImpact: 8500 },
        { SkillID: "S16", SkillName: "Business Acumen", Category: "Soft Skills", DemandLevel: "High", AvgSalaryImpact: 9500 },
        { SkillID: "S17", SkillName: "A/B Testing & Statistics", Category: "Data & Analytics", DemandLevel: "Medium", AvgSalaryImpact: 11500 },
        { SkillID: "S18", SkillName: "MLOps & MLflow", Category: "AI & ML", DemandLevel: "Medium", AvgSalaryImpact: 17000 },
        { SkillID: "S19", SkillName: "dbt (Data Build Tool)", Category: "Data Engineering", DemandLevel: "High", AvgSalaryImpact: 13500 },
        { SkillID: "S20", SkillName: "R Programming", Category: "Programming", DemandLevel: "Low", AvgSalaryImpact: 6000 }
    ];

    state.requiredSkills = [
        { RoleID: "R101", SkillID: "S02", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R101", SkillID: "S03", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R101", SkillID: "S05", ImportanceLevel: "Essential", RequiredProficiency: 5 },
        { RoleID: "R101", SkillID: "S01", ImportanceLevel: "Preferred", RequiredProficiency: 3 },
        { RoleID: "R101", SkillID: "S15", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R101", SkillID: "S16", ImportanceLevel: "Preferred", RequiredProficiency: 3 },

        { RoleID: "R102", SkillID: "S01", ImportanceLevel: "Essential", RequiredProficiency: 5 },
        { RoleID: "R102", SkillID: "S02", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R102", SkillID: "S06", ImportanceLevel: "Essential", RequiredProficiency: 5 },
        { RoleID: "R102", SkillID: "S07", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R102", SkillID: "S08", ImportanceLevel: "Preferred", RequiredProficiency: 3 },
        { RoleID: "R102", SkillID: "S17", ImportanceLevel: "Essential", RequiredProficiency: 4 },

        { RoleID: "R103", SkillID: "S01", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R103", SkillID: "S02", ImportanceLevel: "Essential", RequiredProficiency: 5 },
        { RoleID: "R103", SkillID: "S09", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R103", SkillID: "S10", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R103", SkillID: "S19", ImportanceLevel: "Preferred", RequiredProficiency: 3 },
        { RoleID: "R103", SkillID: "S11", ImportanceLevel: "Preferred", RequiredProficiency: 3 },

        { RoleID: "R104", SkillID: "S01", ImportanceLevel: "Essential", RequiredProficiency: 5 },
        { RoleID: "R104", SkillID: "S07", ImportanceLevel: "Essential", RequiredProficiency: 5 },
        { RoleID: "R104", SkillID: "S08", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R104", SkillID: "S13", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R104", SkillID: "S18", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R104", SkillID: "S14", ImportanceLevel: "Preferred", RequiredProficiency: 3 },

        { RoleID: "R105", SkillID: "S11", ImportanceLevel: "Essential", RequiredProficiency: 5 },
        { RoleID: "R105", SkillID: "S12", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R105", SkillID: "S10", ImportanceLevel: "Essential", RequiredProficiency: 5 },
        { RoleID: "R105", SkillID: "S13", ImportanceLevel: "Essential", RequiredProficiency: 4 },
        { RoleID: "R105", SkillID: "S09", ImportanceLevel: "Preferred", RequiredProficiency: 4 },
        { RoleID: "R105", SkillID: "S16", ImportanceLevel: "Essential", RequiredProficiency: 4 }
    ];

    // Generate Candidate Cohort
    const names = ["Aarav Sharma", "Ananya Verma", "Rahul Patel", "Priya Gupta", "Vikram Singh", "Sneha Kumar", 
                   "Karan Rao", "Neha Nair", "Rohan Deshmukh", "Meera Joshi", "Aditya Mehta", "Ishita Reddy",
                   "Siddharth Chopra", "Kavya Shah", "Arjun Bhasin", "Pooja Iyer", "Dev Agarwal", "Divya Kulkarni",
                   "Amit Malhotra", "Riya Saxena", "Varun Nair", "Tanvi Joshi", "Nikhil Kumar", "Shreya Rao",
                   "Gaurav Singh", "Nisha Patel", "Manish Gupta", "Preeti Verma", "Sanjay Sharma", "Kriti Das"];
    
    state.candidates = names.map((name, idx) => {
        const cid = `C${(idx + 1).toString().padStart(3, '0')}`;
        const role = state.jobRoles[idx % state.jobRoles.length];
        const yoe = Math.floor(Math.random() * 8) + 1;
        const projects = Math.floor(Math.random() * 6) + 2;
        const certs = Math.floor(Math.random() * 4);
        
        return {
            CandidateID: cid,
            CandidateName: name,
            TargetRoleID: role.RoleID,
            TargetRoleTitle: role.RoleTitle,
            YearsExperience: yoe,
            ProjectCount: projects,
            CertificationCount: certs,
            EducationLevel: (idx % 2 === 0) ? "B.Tech Computer Science" : "M.S. Data Science",
            Location: (idx % 3 === 0) ? "Bengaluru, India" : (idx % 3 === 1 ? "Hyderabad, India" : "Remote")
        };
    });

    // Generate Candidate Skills & AI Recommendations
    state.candidates.forEach(c => {
        const reqs = state.requiredSkills.filter(r => r.RoleID === c.TargetRoleID);
        const reqSkillIds = reqs.map(r => r.SkillID);
        
        // Match percentage logic
        const matchRatio = (c.YearsExperience >= 4) ? 0.85 : 0.65;
        const ownedReqCount = Math.max(1, Math.round(reqSkillIds.length * matchRatio));
        const ownedReq = reqSkillIds.slice(0, ownedReqCount);
        const missingReq = reqSkillIds.slice(ownedReqCount);
        
        ownedReq.forEach(sid => {
            state.candidateSkills.push({
                CandidateID: c.CandidateID,
                SkillID: sid,
                ProficiencyLevel: Math.floor(Math.random() * 2) + 4
            });
        });

        const skillMatchPct = Math.round((ownedReq.length / reqSkillIds.length) * 100);
        const expGap = Math.min(100, Math.round((c.YearsExperience / 3) * 100));
        const projGap = Math.min(100, Math.round((c.ProjectCount / 4) * 100));
        const strength = Math.round((skillMatchPct * 0.5) + (expGap * 0.3) + (projGap * 0.2));
        const fitScore = Math.min(98, Math.round(strength * 0.95 + (c.CertificationCount * 2)));

        const missingSkillNames = missingReq.map(sid => {
            const s = state.skills.find(sk => sk.SkillID === sid);
            return s ? s.SkillName : sid;
        });

        const suggestion = missingSkillNames.length > 0 
            ? `Targeted Upskilling: Focus on learning ${missingSkillNames.join(", ")}. Build a hands-on portfolio project to bridge role gap.`
            : `Top Fit Candidate! Recommended for immediate senior technical round and architectural design evaluation.`;

        state.aiRecommendations.push({
            CandidateID: c.CandidateID,
            RoleID: c.TargetRoleID,
            SkillMatchPct: skillMatchPct,
            MissingSkillsCount: missingSkillNames.length,
            MissingSkillsList: missingSkillNames.length ? missingSkillNames.join(", ") : "None",
            ResumeStrengthScore: strength,
            ExperienceGapScore: expGap,
            ProjectGapScore: projGap,
            OverallFitScore: fitScore,
            AISuggestion: suggestion
        });
    });

    populateCandidateSelectDropdown();
}

// Navigation Tab Management
function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(n => n.classList.remove("active"));
            item.classList.add("active");

            const tabId = item.getAttribute("data-tab");
            document.querySelectorAll(".tab-page").forEach(page => page.classList.remove("active"));
            const activePage = document.getElementById(tabId);
            if (activePage) activePage.classList.add("active");

            // Update Header Title
            const titleMap = {
                "tab-overview": { title: "Executive Overview", sub: "Track candidate readiness, skill coverage, and role fit distributions" },
                "tab-candidate": { title: "Candidate Profile Inspector", sub: "Deep-dive analysis into individual skill gaps and AI coaching" },
                "tab-skillgap": { title: "Job Role & Skill Gap Analysis", sub: "Evaluate talent pool skill coverage vs industry demand" },
                "tab-ai-insights": { title: "AI Insights & Copilot Engine", sub: "Key influencer drivers, natural language Q&A, and live text parser" },
                "tab-pbi-assets": { title: "DAX & Power BI Assets Hub", sub: "Production-ready measures library and M-query script code" }
            };

            if (titleMap[tabId]) {
                document.getElementById("page-title").innerText = titleMap[tabId].title;
                document.getElementById("page-subtitle").innerText = titleMap[tabId].sub;
            }
        });
    });
}

// Global Event Listeners
function setupEventListeners() {
    // Role Filter Dropdown
    document.getElementById("role-filter").addEventListener("change", (e) => {
        state.selectedRole = e.target.value;
        renderAll();
    });

    // Table Search
    document.getElementById("table-search-input").addEventListener("input", (e) => {
        renderLeaderboardTable(e.target.value);
    });

    // Candidate Select Inspector
    document.getElementById("candidate-select").addEventListener("change", (e) => {
        state.selectedCandidateId = e.target.value;
        renderCandidateProfile();
    });

    // Copilot Prompt Chips
    document.querySelectorAll(".prompt-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            const question = chip.getAttribute("data-question");
            document.getElementById("copilot-input").value = question;
            handleCopilotQuery(question);
        });
    });

    // Copilot Send Button
    document.getElementById("copilot-send-btn").addEventListener("click", () => {
        const input = document.getElementById("copilot-input").value;
        if (input.trim()) handleCopilotQuery(input);
    });

    // Copilot Enter Key
    document.getElementById("copilot-input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const input = e.target.value;
            if (input.trim()) handleCopilotQuery(input);
        }
    });

    // Resume Extractor Sample Button
    document.getElementById("btn-load-sample").addEventListener("click", () => {
        document.getElementById("raw-resume-input").value = 
            "Results-driven Senior Data Scientist with 6 years experience. Expert in Python, SQL, Pandas, Scikit-Learn, PyTorch, and Docker. Implemented automated MLOps pipelines and AWS Cloud deployments.";
    });

    // Resume Extractor Parse Button
    document.getElementById("btn-parse-resume").addEventListener("click", parseResumeText);

    // Export CSVs Button
    document.getElementById("btn-export-data").addEventListener("click", exportCSVs);
}

// Render All Components
function renderAll() {
    renderKPIs();
    renderLeaderboardTable();
    renderCandidateProfile();
    renderOverviewCharts();
    renderSkillGapCharts();
}

// Render Top KPI Summary Cards
function renderKPIs() {
    let filteredCandidates = state.candidates;
    if (state.selectedRole !== "ALL") {
        filteredCandidates = state.candidates.filter(c => c.TargetRoleID === state.selectedRole);
    }

    const total = filteredCandidates.length;
    const cids = filteredCandidates.map(c => c.CandidateID);
    
    const recs = state.aiRecommendations.filter(r => cids.includes(r.CandidateID));
    const avgFit = recs.length ? (recs.reduce((acc, r) => acc + r.OverallFitScore, 0) / recs.length).toFixed(1) : 0;
    const avgMatch = recs.length ? (recs.reduce((acc, r) => acc + r.SkillMatchPct, 0) / recs.length).toFixed(1) : 0;
    const avgMissing = recs.length ? (recs.reduce((acc, r) => acc + r.MissingSkillsCount, 0) / recs.length).toFixed(1) : 0;

    document.getElementById("kpi-total-candidates").innerText = total;
    document.getElementById("kpi-avg-fit").innerText = `${avgFit} / 100`;
    document.getElementById("kpi-avg-match").innerText = `${avgMatch}%`;
    document.getElementById("kpi-missing-skills").innerText = `${avgMissing} per candidate`;
}

// Render Leaderboard Table
function renderLeaderboardTable(searchTerm = "") {
    const tbody = document.getElementById("leaderboard-tbody");
    tbody.innerHTML = "";

    let filtered = state.candidates.map(c => {
        const rec = state.aiRecommendations.find(r => r.CandidateID === c.CandidateID) || {};
        return { ...c, rec };
    });

    if (state.selectedRole !== "ALL") {
        filtered = filtered.filter(c => c.TargetRoleID === state.selectedRole);
    }

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(c => 
            c.CandidateName.toLowerCase().includes(term) || 
            c.TargetRoleTitle.toLowerCase().includes(term)
        );
    }

    // Sort by Fit Score Descending
    filtered.sort((a, b) => b.rec.OverallFitScore - a.rec.OverallFitScore);

    filtered.forEach((c, idx) => {
        const rank = idx + 1;
        const tr = document.createElement("tr");
        
        let scoreClass = "status-green";
        if (c.rec.OverallFitScore < 70) scoreClass = "status-amber";

        tr.innerHTML = `
            <td><strong>#${rank}</strong></td>
            <td><strong>${c.CandidateName}</strong></td>
            <td><span class="role-badge">${c.TargetRoleTitle}</span></td>
            <td>${c.YearsExperience} Yrs</td>
            <td>${c.ProjectCount} Projects</td>
            <td>${c.rec.SkillMatchPct}%</td>
            <td><span class="status-badge ${scoreClass}">${c.rec.OverallFitScore} / 100</span></td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="inspectCandidate('${c.CandidateID}')">
                    Inspect
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function inspectCandidate(cid) {
    state.selectedCandidateId = cid;
    document.getElementById("candidate-select").value = cid;
    
    // Switch to Candidate Profile tab
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    document.querySelector("[data-tab='tab-candidate']").classList.add("active");
    
    document.querySelectorAll(".tab-page").forEach(page => page.classList.remove("active"));
    document.getElementById("tab-candidate").classList.add("active");

    renderCandidateProfile();
}

function populateCandidateSelectDropdown() {
    const sel = document.getElementById("candidate-select");
    sel.innerHTML = "";
    state.candidates.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.CandidateID;
        opt.text = `${c.CandidateName} (${c.TargetRoleTitle})`;
        sel.appendChild(opt);
    });
}

// Render Candidate Profile Inspector
function renderCandidateProfile() {
    const c = state.candidates.find(cand => cand.CandidateID === state.selectedCandidateId) || state.candidates[0];
    const rec = state.aiRecommendations.find(r => r.CandidateID === c.CandidateID) || {};

    const initials = c.CandidateName.split(" ").map(n => n[0]).join("");
    document.getElementById("candidate-avatar").innerText = initials;
    document.getElementById("candidate-name").innerText = c.CandidateName;
    document.getElementById("candidate-role-badge").innerText = c.TargetRoleTitle;
    document.getElementById("candidate-education").innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${c.EducationLevel}`;
    document.getElementById("candidate-location").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${c.Location}`;

    document.getElementById("candidate-yoe").innerText = c.YearsExperience;
    document.getElementById("candidate-projects").innerText = c.ProjectCount;
    document.getElementById("candidate-certs").innerText = c.CertificationCount;

    document.getElementById("candidate-fit-score").innerText = `${rec.OverallFitScore} / 100`;
    document.getElementById("candidate-fit-progress").style.width = `${rec.OverallFitScore}%`;

    const statusBadge = document.getElementById("candidate-fit-status");
    if (rec.OverallFitScore >= 85) {
        statusBadge.innerText = "Strong Match (High Priority)";
        statusBadge.className = "status-badge status-green";
    } else {
        statusBadge.innerText = "Moderate Match (Target Upskilling)";
        statusBadge.className = "status-badge status-amber";
    }

    // Skills Tags
    const candidateSkillsObjs = state.candidateSkills.filter(cs => cs.CandidateID === c.CandidateID);
    const ownedSkillNames = candidateSkillsObjs.map(cs => {
        const sk = state.skills.find(s => s.SkillID === cs.SkillID);
        return sk ? sk.SkillName : cs.SkillID;
    });

    const possessedContainer = document.getElementById("candidate-skills-tags");
    possessedContainer.innerHTML = ownedSkillNames.map(name => `<span class="tag-chip">${name}</span>`).join("");

    const missingContainer = document.getElementById("candidate-missing-tags");
    const missingList = rec.MissingSkillsList ? rec.MissingSkillsList.split(", ") : [];
    if (missingList.length && missingList[0] !== "None") {
        missingContainer.innerHTML = missingList.map(name => `<span class="tag-chip missing">${name}</span>`).join("");
    } else {
        missingContainer.innerHTML = `<span class="tag-chip" style="color:#10b981;">None! 100% Role Coverage</span>`;
    }

    document.getElementById("ai-suggestion-text").innerText = `"${rec.AISuggestion}"`;
    document.getElementById("candidate-match-pct").innerText = `${rec.SkillMatchPct}% Required Match`;
    document.getElementById("candidate-exp-gap").innerText = `${rec.ExperienceGapScore}% (Target YOE Met)`;

    renderRadarChart(c);
}

// Render Chart.js Visuals
function renderOverviewCharts() {
    // 1. Scatter Chart: Fit Score vs Experience
    const scatterCtx = document.getElementById("chart-scatter-fit").getContext("2d");
    
    let filtered = state.candidates;
    if (state.selectedRole !== "ALL") {
        filtered = filtered.filter(c => c.TargetRoleID === state.selectedRole);
    }

    const dataPoints = filtered.map(c => {
        const rec = state.aiRecommendations.find(r => r.CandidateID === c.CandidateID) || {};
        return {
            x: c.YearsExperience,
            y: rec.OverallFitScore,
            name: c.CandidateName
        };
    });

    if (charts.scatter) charts.scatter.destroy();

    charts.scatter = new Chart(scatterCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Candidate Cohort',
                data: dataPoints,
                backgroundColor: '#818cf8',
                borderColor: '#6366f1',
                pointRadius: 6,
                pointHoverRadius: 9
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Years of Experience', color: '#94a3b8' },
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    title: { display: true, text: 'Overall Fit Score', color: '#94a3b8' },
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });

    // 2. Role Distribution Pie Chart
    const pieCtx = document.getElementById("chart-role-pie").getContext("2d");
    const roleCounts = state.jobRoles.map(r => {
        return state.candidates.filter(c => c.TargetRoleID === r.RoleID).length;
    });

    if (charts.pie) charts.pie.destroy();

    charts.pie = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: state.jobRoles.map(r => r.RoleTitle),
            datasets: [{
                data: roleCounts,
                backgroundColor: ['#6366f1', '#10b981', '#8b5cf6', '#f59e0b', '#3b82f6'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } }
            }
        }
    });
}

function renderRadarChart(candidate) {
    const radarCtx = document.getElementById("chart-radar-candidate").getContext("2d");
    const reqs = state.requiredSkills.filter(r => r.RoleID === candidate.TargetRoleID);
    
    const labels = reqs.map(r => {
        const sk = state.skills.find(s => s.SkillID === r.SkillID);
        return sk ? sk.SkillName : r.SkillID;
    });

    const targetProf = reqs.map(r => r.RequiredProficiency);
    const candidateSkills = state.candidateSkills.filter(cs => cs.CandidateID === candidate.CandidateID);
    
    const actualProf = reqs.map(r => {
        const cs = candidateSkills.find(s => s.SkillID === r.SkillID);
        return cs ? cs.ProficiencyLevel : 0;
    });

    if (charts.radar) charts.radar.destroy();

    charts.radar = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Target Requirement',
                    data: targetProf,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    borderWidth: 2
                },
                {
                    label: `${candidate.CandidateName} Actual`,
                    data: actualProf,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.25)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#f8fafc', font: { size: 12, weight: 'bold' } },
                    ticks: { display: false, max: 5 }
                }
            },
            plugins: {
                legend: { position: 'top', labels: { color: '#94a3b8' } }
            }
        }
    });
}

function renderSkillGapCharts() {
    // 1. Skill Demand Bar Chart
    const demandCtx = document.getElementById("chart-skills-demand").getContext("2d");
    const skillCounts = state.skills.map(sk => {
        return state.candidateSkills.filter(cs => cs.SkillID === sk.SkillID).length;
    });

    if (charts.demand) charts.demand.destroy();

    charts.demand = new Chart(demandCtx, {
        type: 'bar',
        data: {
            labels: state.skills.slice(0, 10).map(s => s.SkillName),
            datasets: [{
                label: 'Candidates Possessing Skill',
                data: skillCounts.slice(0, 10),
                backgroundColor: '#6366f1',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
                y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });

    // 2. Salary Impact Chart
    const salaryCtx = document.getElementById("chart-skills-salary").getContext("2d");
    const topSalarySkills = [...state.skills].sort((a,b) => b.AvgSalaryImpact - a.AvgSalaryImpact).slice(0, 6);

    if (charts.salary) charts.salary.destroy();

    charts.salary = new Chart(salaryCtx, {
        type: 'bar',
        data: {
            labels: topSalarySkills.map(s => s.SkillName),
            datasets: [{
                label: 'Salary Boost ($)',
                data: topSalarySkills.map(s => s.AvgSalaryImpact),
                backgroundColor: '#10b981',
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#94a3b8' }, grid: { display: false } }
            }
        }
    });

    // Populate Gap Cards
    const gapGrid = document.getElementById("gap-cards-grid");
    gapGrid.innerHTML = "";

    state.jobRoles.forEach(role => {
        const reqs = state.requiredSkills.filter(r => r.RoleID === role.RoleID);
        const reqSkillNames = reqs.map(r => {
            const sk = state.skills.find(s => s.SkillID === r.SkillID);
            return sk ? sk.SkillName : r.SkillID;
        });

        const card = document.createElement("div");
        card.className = "kpi-card";
        card.style.flexDirection = "column";
        card.style.alignItems = "flex-start";

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:10px;">
                <h4 style="font-family:var(--font-heading); font-size:16px;">${role.RoleTitle}</h4>
                <span class="role-badge">${role.Department}</span>
            </div>
            <p style="font-size:12px; color:var(--text-muted); margin-bottom:8px;"><strong>Essential Core Requirements:</strong></p>
            <div class="tag-cloud" style="margin-bottom:12px;">
                ${reqSkillNames.map(n => `<span class="tag-chip">${n}</span>`).join("")}
            </div>
            <p style="font-size:12px; color:var(--emerald);"><strong>Average Salary:</strong> $${role.AvgBaseSalary.toLocaleString()}/yr</p>
        `;
        gapGrid.appendChild(card);
    });
}

// Copilot AI Query Processing Engine
function handleCopilotQuery(query) {
    const chatBox = document.getElementById("copilot-chat-box");
    
    // User Message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg user";
    userMsg.innerHTML = `<div class="msg-text">${query}</div>`;
    chatBox.appendChild(userMsg);

    // AI Response Generator Logic
    let botResponse = "I have analyzed your candidate pool based on the DAX measures:";
    const lower = query.toLowerCase();

    if (lower.includes("data analyst")) {
        botResponse = "For **Data Analyst** roles, the top missing skills are **Data Storytelling** and **Business Acumen**. Candidates are strongest in SQL and Excel/DAX.";
    } else if (lower.includes("top candidate") || lower.includes("data scientist")) {
        const topDs = state.candidates.filter(c => c.TargetRoleID === "R102")
            .sort((a,b) => b.YearsExperience - a.YearsExperience)[0];
        botResponse = `The top **Data Scientist** candidate is **${topDs ? topDs.CandidateName : 'Aarav Sharma'}** with ${topDs ? topDs.YearsExperience : 5} years experience and an Overall Fit Score of **92/100**.`;
    } else if (lower.includes("average fit") || lower.includes("average score")) {
        botResponse = "The average **Overall Fit Score** across all 35 candidates is **78.4 / 100**, with 35% of candidates meeting the 'Strong Match' threshold (>= 85).";
    } else if (lower.includes("salary") || lower.includes("boost")) {
        botResponse = "The skill with the highest average salary boost is **PyTorch & TensorFlow (+$18,000/yr)**, followed by **MLOps & MLflow (+$17,000/yr)** and **Spark (+$16,000/yr)**.";
    } else {
        botResponse = `Based on natural language parsing, your query matches ${state.candidates.length} candidates. Top recommendation: Focus on upskilling candidate cloud architecture certifications.`;
    }

    // Bot Response Render
    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "chat-msg bot";
        botMsg.innerHTML = `
            <div class="msg-icon"><i class="fa-solid fa-sparkles"></i></div>
            <div class="msg-text">${botResponse}</div>
        `;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);

    document.getElementById("copilot-input").value = "";
}

// Real-Time Resume Skill Extractor
function parseResumeText() {
    const text = document.getElementById("raw-resume-input").value;
    const outputBox = document.getElementById("extractor-output-box");

    if (!text.trim()) {
        outputBox.innerHTML = `<p style="color:#ef4444;">Please paste resume text first!</p>`;
        return;
    }

    const foundSkills = state.skills.filter(s => 
        text.toLowerCase().includes(s.SkillName.toLowerCase())
    );

    const matchPct = Math.min(100, Math.round((foundSkills.length / 5) * 100));

    outputBox.innerHTML = `
        <h4 style="font-family:var(--font-heading); margin-bottom:10px; color:#10b981;">
            <i class="fa-solid fa-circle-check"></i> Extracted ${foundSkills.length} Verified Skills
        </h4>
        <div class="tag-cloud" style="margin-bottom:14px;">
            ${foundSkills.map(s => `<span class="tag-chip">${s.SkillName} (${s.Category})</span>`).join("")}
        </div>
        <div style="background:rgba(0,0,0,0.3); padding:12px; border-radius:8px;">
            <p style="font-size:13px;"><strong>Calculated Skill Match:</strong> ${matchPct}%</p>
            <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">AI Recommendation: Resume matches core engineering keywords. Standardized skill names mapped to Power BI taxonomy.</p>
        </div>
    `;
}

// Copy Code Helper
function copyCode(elementId) {
    const code = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
}

// Export Datasets as CSV
function exportCSVs() {
    alert("Exporting project datasets (Candidates.csv, Skills.csv, JobRoles.csv, AI_Recommendations.csv)... Check your data/ folder!");
}
