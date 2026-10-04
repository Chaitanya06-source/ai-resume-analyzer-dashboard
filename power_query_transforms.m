// ==============================================================================
// POWER QUERY (M CODE) - SKILL STANDARDIZATION & DATA TRANSFORMATIONS
// Author: Antigravity AI
// Description: Standardizes variations of skill names (e.g. 'python3', 'PYTHON', 'Py')
//              Splits raw skill strings into rows, and removes trailing spaces.
// ==============================================================================

// ------------------------------------------------------------------------------
// 1. Standardize Skill Names Function (fnStandardizeSkill)
// ------------------------------------------------------------------------------
let
    fnStandardizeSkill = (rawText as text) as text =>
    let
        cleanText = Text.Trim(Text.Lower(rawText)),
        standardized = 
            if cleanText = "python3" or cleanText = "python" or cleanText = "py" then "Python"
            else if cleanText = "pbi" or cleanText = "powerbi" or cleanText = "power bi desktop" then "Power BI"
            else if cleanText = "sql server" or cleanText = "tsql" or cleanText = "postgres" or cleanText = "sql" then "SQL"
            else if cleanText = "aws" or cleanText = "amazon web services" then "AWS Cloud"
            else if cleanText = "azure" or cleanText = "microsoft azure" then "Azure Services"
            else if cleanText = "tbl" or cleanText = "tableau desktop" then "Tableau"
            else if cleanText = "dax" or cleanText = "excel & dax" or cleanText = "ms excel" then "Excel & DAX"
            else if cleanText = "pyspark" or cleanText = "spark" then "Spark & PySpark"
            else if cleanText = "docker" or cleanText = "k8s" or cleanText = "kubernetes" then "Docker & Kubernetes"
            else Text.Proper(rawText)
    in
        standardized
in
    fnStandardizeSkill

// ------------------------------------------------------------------------------
// 2. Raw Resume Text Skill Extraction & Unpivot M Query
// ------------------------------------------------------------------------------
/*
let
    Source = Csv.Document(File.Contents("C:\Users\sanam\Downloads\power bi project\data\ResumeText.csv"),[Delimiter=",", Columns=5, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"CandidateID", type text}, {"SummaryText", type text}, {"RawSkillsText", type text}, {"SentimentScore", type number}, {"KeywordDensityScore", type number}}),
    #"Split Skill Column" = Table.SplitColumn(#"Changed Type", "RawSkillsText", Splitter.SplitTextByDelimiter(",", QuoteStyle.Csv), {"Skill.1", "Skill.2", "Skill.3", "Skill.4", "Skill.5", "Skill.6"}),
    #"Unpivoted Columns" = Table.UnpivotOtherColumns(#"Split Skill Column", {"CandidateID", "SummaryText", "SentimentScore", "KeywordDensityScore"}, "Attribute", "RawSkill"),
    #"Trimmed Skill" = Table.TransformColumns(#"Unpivoted Columns", {{"RawSkill", Text.Trim, type text}}),
    #"Standardized Skill" = Table.AddColumn(#"Trimmed Skill", "CleanSkillName", each fnStandardizeSkill([RawSkill]))
in
    #"Standardized Skill"
*/
