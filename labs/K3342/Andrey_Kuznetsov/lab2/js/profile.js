import { API_BASE_URL } from './config.js';

document.addEventListener("DOMContentLoaded", async function () {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
        window.location.href = '../html/auth.html';
        return;
    }

    const currentUser = getCurrentUser();
    if (currentUser) {
        displayUserProfile(currentUser);
        await fetchRentalHistory(currentUser.id);
    }
});

function getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}

function displayUserProfile(user) {
    const profileHeaderInfo = document.querySelector('.profile-header-info');
    const profileHeaderImg = document.querySelector('.profile-header-img img');

    profileHeaderInfo.querySelector('h4').innerText = user.name;
    profileHeaderInfo.querySelector('p').innerText = user.status;

    profileHeaderImg.src = user.profilePicture;
}


async function fetchRentalHistory(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/rentalHistory?userId=${userId}`);
        const data = await response.json();
        const currentUser = getCurrentUser();

        const dataWithUser = data.map(item => ({
            ...item,
            userName: currentUser.name
        }));

        const container = document.querySelector('.timeline');
        const noDataMessage = document.getElementById('noDataMessage');
        
        if (data.length === 0) {
            noDataMessage.style.display = 'block';
        } else {
            displayRentalHistory(dataWithUser, container);
        }
    } catch (error) {
        console.error('Error fetching rental history:', error);
    }
}

function displayRentalHistory(data, container) {
    data.forEach(item => {
        const living = calculateLivingDuration(item.startDate, item.endDate);
        const rentalItemElement = createRentalHistoryElement(item, living);
        container.appendChild(rentalItemElement);
    });
}

function calculateLivingDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate === 'current' ? new Date() : new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (days < 0) {
        months--;
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0); 
        days += prevMonth.getDate();
    }

    let result = "";
    if (years > 0) result += `${years} year${years > 1 ? 's' : ''} `;
    if (months > 0) result += `${months} month${months > 1 ? 's' : ''} `;
    if (days > 0) result += `${days} day${days > 1 ? 's' : ''}`;

    return result.trim() || "0 days"; 
}

function createRentalHistoryElement(item, living) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="timeline-time">
            <span class="start-time">From: ${item.startDate}</span>
            <span class="end-time">To: ${item.endDate}</span>
        </div>
        <div class="timeline-body">
            <div class="timeline-header">
                <span class="userimage"><img src="${item.profilePicture}" alt="Profile picture"></span>
                <span class="username">${item.userName}</span>
                <span class="text-muted pull-right">${living}</span>
            </div>
            <div class="timeline-content">
                <p>${item.shortDescription}</p>
                <p style="font-style: italic; margin-top: 10px;"><a href="${item.propertyLink}">see advertisement...</a></p>
            </div>
        </div>
    `;
    return li;
}
