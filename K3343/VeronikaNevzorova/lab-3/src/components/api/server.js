import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5020;

const jobsFilePath = path.resolve('jobs.json');
const applicationsFilePath = path.resolve('applications.json');

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Загружаем вакансии из файла
function loadJobs() {
    if (fs.existsSync(jobsFilePath)) {
        const data = fs.readFileSync(jobsFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

// Сохраняем вакансии в файл
function saveJobs(jobs) {
    fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2));
}

// Загружаем отклики из файла
function loadApplications() {
    if (fs.existsSync(applicationsFilePath)) {
        const data = fs.readFileSync(applicationsFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

// Сохраняем отклики в файл
function saveApplications(applications) {
    fs.writeFileSync(applicationsFilePath, JSON.stringify(applications, null, 2));
}

// Получение всех активных вакансий
app.get('/api/jobs', (req, res) => {
    const jobs = loadJobs();
    const activeJobs = jobs.filter(job => !job.isDeleted);
    res.json(activeJobs);
});

// Добавление вакансии
app.post('/api/jobs', (req, res) => {
    const jobs = loadJobs();
    const newJob = { id: Date.now(), ...req.body, isDeleted: false };
    jobs.push(newJob);
    saveJobs(jobs);
    res.status(201).json(newJob);
});

// Удаление вакансии
app.delete('/api/jobs/:id', (req, res) => {
    const jobId = parseInt(req.params.id, 10);
    const jobs = loadJobs();
    const jobIndex = jobs.findIndex(job => job.id === jobId);

    if (jobIndex !== -1) {
        jobs[jobIndex].isDeleted = true;
        saveJobs(jobs);
        res.json({ message: 'Вакансия удалена', jobId });
    } else {
        res.status(404).json({ message: 'Вакансия не найдена' });
    }
});

// Получение всех вакансий (включая удалённые)
app.get('/api/jobs/all', (req, res) => {
    const jobs = loadJobs();
    res.json(jobs);
});

// Отклик на вакансию
app.post('/api/applications', (req, res) => {
    const { userId, jobId } = req.body;
    const applications = loadApplications();

    if (applications.some(app => app.userId === userId && app.jobId === jobId)) {
        return res.status(400).json({ message: 'Вы уже откликнулись на эту вакансию' });
    }

    applications.push({ userId, jobId, date: new Date().toISOString() });
    saveApplications(applications);
    res.status(201).json({ message: 'Отклик успешно отправлен' });
});

// Получение откликов пользователя
app.get('/api/applications/:userId', (req, res) => {
    const userId = req.params.userId;
    const applications = loadApplications();
    const jobs = loadJobs();

    const userApplications = applications
        .filter(app => app.userId === userId)
        .map(app => {
            const job = jobs.find(job => job.id === app.jobId);
            return job ? { ...job, isDeleted: job.isDeleted } : { id: app.jobId, title: 'Вакансия удалена', isDeleted: true };
        });

    res.json(userApplications);
});

// Старт сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
