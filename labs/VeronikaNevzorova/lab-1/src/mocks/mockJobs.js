// src/mocks/mockJobs.js
export const jobsData = [
    {
        id: 1,
        title: 'Программист',
        description: 'Классная вакансия. Требуется опыт работы с Vue.js',
        salary: 80000,
        experience: 'mid',
        requirements: ['Опыт работы с Vue.js', 'знание JS', 'познание мира']
    },
    {
        id: 2,
        title: 'Дизайнер',
        description: 'Ищем креативного дизайнера',
        salary: 60000,
        experience: 'junior',
        requirements: ['Опыт работы с Vue.js', 'знание JS', 'познание мира']
    },
];

export const fetchJobs = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(jobsData); // Возвращаем моковые данные
        }, 1000); // Имитируем задержку
    });
};
