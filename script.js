// =========================================================
// 1. NOTION-STYLE ACADEMIC PLANNER (With Property Filters & Weeks)
// =========================================================

const defaultTasks = [
    {
        text: "Finalize & host COS 106 Web Technologies Portfolio",
        category: "Miva Coursework",
        week: "Week 1",
        priority: "High",
        dueDate: "2026-11-05",
        completed: false
    },
    {
        text: "Second-semester revision session with SP-SOQ study group",
        category: "Study Group",
        week: "Week 1",
        priority: "High",
        dueDate: "2026-11-02",
        completed: true
    },
    {
        text: "Practice Python data cleaning & PostgreSQL queries",
        category: "Data & Code",
        week: "Week 2",
        priority: "Medium",
        dueDate: "2026-11-10",
        completed: false
    },
    {
        text: "Complete ServiceNow CSA training module",
        category: "Certifications",
        week: "Week 3",
        priority: "Medium",
        dueDate: "2026-11-18",
        completed: false
    }
];

let tasks = JSON.parse(localStorage.getItem("queeneth_notion_v3")) || defaultTasks;

const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const taskWeek = document.getElementById("taskWeek");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("queeneth_notion_v3", JSON.stringify(tasks));
}

function updateStats() {
    const totalEl = document.getElementById("totalCount");
    const pendingEl = document.getElementById("pendingCount");
    const completedEl = document.getElementById("completedCount");
    if (!totalEl) return;

    const completedCount = tasks.filter(t => t.completed).length;
    totalEl.textContent = tasks.length;
    pendingEl.textContent = tasks.length - completedCount;
    completedEl.textContent = completedCount;
}

function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = "";

    // Grab current filter values
    const fCategory = document.getElementById("filterCategory") ? document.getElementById("filterCategory").value : "all";
    const fWeek = document.getElementById("filterWeek") ? document.getElementById("filterWeek").value : "all";
    const fPriority = document.getElementById("filterPriority") ? document.getElementById("filterPriority").value : "all";
    const fStatus = document.getElementById("filterStatus") ? document.getElementById("filterStatus").value : "all";
    const fDate = document.getElementById("filterDate") ? document.getElementById("filterDate").value : "";

    let visibleCount = 0;

    tasks.forEach(function(task, index) {
        const taskCat = task.category || "Miva Coursework";
        const taskWk = task.week || "Week 1";
        const taskPrio = task.priority || "Medium";
        const taskDt = task.dueDate || "Upcoming";

        // Apply Notion Column Filters
        if (fCategory !== "all" && taskCat !== fCategory) return;
        if (fWeek !== "all" && taskWk !== fWeek) return;
        if (fPriority !== "all" && taskPrio !== fPriority) return;
        if (fStatus === "pending" && task.completed) return;
        if (fStatus === "completed" && !task.completed) return;
        if (fDate !== "" && taskDt !== fDate) return;

        visibleCount++;

        const tr = document.createElement("tr");
        tr.className = task.completed ? "notion-row completed" : "notion-row";

        const priorityClass =
            taskPrio === "High" ? "pill-high" :
            taskPrio === "Medium" ? "pill-medium" : "pill-low";

        const statusBadge = task.completed
            ? `<span class="pill status-done">✓ Done</span>`
            : `<span class="pill status-todo">● In Progress</span>`;

        tr.innerHTML = `
            <td>
                <input type="checkbox" class="notion-checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">
            </td>
            <td>
                <strong class="task-title-text">${task.text}</strong>
            </td>
            <td>
                <span class="pill pill-category">${taskCat}</span>
            </td>
            <td>
                <span class="pill pill-week">${taskWk}</span>
            </td>
            <td>
                <span class="pill ${priorityClass}">${taskPrio}</span>
            </td>
            <td>
                <span class="date-text">📅 ${taskDt}</span>
            </td>
            <td>
                ${statusBadge}
            </td>
            <td style="text-align: right;">
                <button class="notion-delete-btn" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;

        taskList.appendChild(tr);
    });

    // If no tasks match the selected filters, show a friendly message
    if (visibleCount === 0) {
        taskList.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 25px; color: #64748b;">
                    No tasks match your current filters. Click <strong>Reset Filters</strong> to see all tasks.
                </td>
            </tr>
        `;
    }

    updateStats();
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Please enter a task title before adding to your workspace!");
        return;
    }

    tasks.unshift({
        text: text,
        category: taskCategory ? taskCategory.value : "Miva Coursework",
        week: taskWeek ? taskWeek.value : "Week 1",
        priority: taskPriority ? taskPriority.value : "Medium",
        dueDate: taskDate && taskDate.value ? taskDate.value : "Upcoming",
        completed: false
    });

    taskInput.value = "";
    if (taskDate) taskDate.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function applyNotionFilters() {
    renderTasks();
}

function resetNotionFilters() {
    if (document.getElementById("filterCategory")) document.getElementById("filterCategory").value = "all";
    if (document.getElementById("filterWeek")) document.getElementById("filterWeek").value = "all";
    if (document.getElementById("filterPriority")) document.getElementById("filterPriority").value = "all";
    if (document.getElementById("filterStatus")) document.getElementById("filterStatus").value = "all";
    if (document.getElementById("filterDate")) document.getElementById("filterDate").value = "";
    renderTasks();
}

if (addTaskBtn) {
    addTaskBtn.addEventListener("click", addTask);
}

if (taskInput) {
    taskInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") addTask();
    });
}

renderTasks();


// =========================================================
// 2. CONTACT FORM VALIDATION LOGIC
// =========================================================

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        if (fullName === "" || email === "" || phone === "" || message === "") {
            showFeedback("⚠️ Please fill in all fields. No box can be left empty!", "error");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showFeedback("⚠️ Please enter a valid email address (e.g., name@example.com).", "error");
            return;
        }

        const digitsOnlyPattern = /^[0-9]+$/;
        if (!digitsOnlyPattern.test(phone)) {
            showFeedback("⚠️ Phone number must contain ONLY numbers (no letters, spaces, or symbols).", "error");
            return;
        }

        showFeedback("✅ Thank you, " + fullName + "! Your message has been sent successfully.", "success");
        contactForm.reset();
    });
}

function showFeedback(text, type) {
    formFeedback.textContent = text;
    formFeedback.className = "feedback-msg " + type;
}


// =========================================================
// 3. PROJECT CASE STUDY MODAL (POPUP)
// =========================================================
const projectDetails = [
    {
        org: "Lingawa • EdTech Development",
        title: "Gamified Educational Resources",
        desc: "Collaborated with product and curriculum teams to build interactive web-based language games for children. Used prompt engineering with Claude, ChatGPT, and OpenAI to generate, adapt, and debug HTML5, CSS, and JavaScript game mechanics.",
        impact: "Accelerated interactive content production and made learning indigenous Igbo vocabulary fun and engaging for young diaspora learners."
    },
    {
        org: "Lingawa • Product & UI Design",
        title: "Product Design & Educational Content",
        desc: "Managed the digital product backlog using Agile/Scrum workflows and designed user-friendly wireframes, interactive lesson slide decks, and landing pages in Figma and Canva.",
        impact: "Developed a structured sentence-construction visual technique across 2,000+ lessons that increased student speaking proficiency by 70% and translation productivity by 60%."
    },
    {
        org: "Women Techsters BootCamp (Tech4Dev)",
        title: "Data Analysis & Visualization Group Project",
        desc: "Worked in a cross-functional data team to gather raw datasets, perform data cleaning and transformation in Power Query and Excel, and design interactive Power BI dashboards.",
        impact: "Delivered a comprehensive visual report highlighting key trends and actionable recommendations for decision-makers."
    },
    {
        org: "Cybersafe Foundation DigiGirls",
        title: "Data Analysis Training Project (SQL & Excel)",
        desc: "Applied SQL queries in PostgreSQL alongside Microsoft Excel pivot tables and statistical functions to explore, clean, and analyze structured datasets.",
        impact: "Translated complex database outputs into clear, easy-to-understand business insights for non-technical stakeholders."
    }
];

function openProjectModal(index) {
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    document.getElementById("modalOrg").textContent = projectDetails[index].org;
    document.getElementById("modalTitle").textContent = projectDetails[index].title;
    document.getElementById("modalDesc").textContent = projectDetails[index].desc;
    document.getElementById("modalImpact").textContent = projectDetails[index].impact;
    modal.style.display = "flex";
}

function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    if (modal) modal.style.display = "none";
}ssss