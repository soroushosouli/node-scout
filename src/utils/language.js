const LANGUAGES = {
    // JavaScript / TypeScript
    ".js": "JavaScript",
    ".jsx": "JavaScript",
    ".mjs": "JavaScript",
    ".cjs": "JavaScript",
    ".ts": "TypeScript",
    ".tsx": "TypeScript",

    // Python
    ".py": "Python",

    // C / C++
    ".c": "C",
    ".h": "C/C++ Header",
    ".cpp": "C++",
    ".cc": "C++",
    ".cxx": "C++",
    ".hpp": "C++ Header",

    // JVM
    ".java": "Java",
    ".kt": "Kotlin",
    ".kts": "Kotlin",
    ".scala": "Scala",

    // Other compiled languages
    ".cs": "C#",
    ".go": "Go",
    ".rs": "Rust",
    ".swift": "Swift",
    ".dart": "Dart",

    // Web
    ".html": "HTML",
    ".htm": "HTML",
    ".css": "CSS",
    ".scss": "SCSS",
    ".sass": "Sass",
    ".less": "Less",

    // Backend / scripting
    ".php": "PHP",
    ".rb": "Ruby",
    ".lua": "Lua",
    ".pl": "Perl",
    ".r": "R",

    // Shell
    ".sh": "Shell",
    ".bash": "Bash",
    ".zsh": "Zsh",
    ".fish": "Fish",
    ".ps1": "PowerShell",
    ".bat": "Batch",
    ".cmd": "Batch",

    // Data / config
    ".json": "JSON",
    ".xml": "XML",
    ".yaml": "YAML",
    ".yml": "YAML",
    ".toml": "TOML",
    ".ini": "INI",

    // Database
    ".sql": "SQL",

    // Other
    ".md": "Markdown",
    ".tex": "LaTeX",
    ".vue": "Vue",
    ".svelte": "Svelte"
};

export function detect(extension) {
    return LANGUAGES[extension.toLowerCase()] ?? "Other";
}