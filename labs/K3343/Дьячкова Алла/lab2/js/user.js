document.addEventListener('DOMContentLoaded', function () {
    fillUserInfo();
    const editModal = document.getElementById('editUserInfoModal');
    editModal.addEventListener('show.bs.modal', function () {
        populateEditForm();
    });
});

function fillUserInfo() {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {
        fetch(`http://localhost:3000/users/${loggedInUserId}`)
            .then(response => response.json())
            .then(userData => {
                document.getElementById('firstName').textContent = userData.firstName || 'Не указано';
                document.getElementById('lastName').textContent = userData.lastName || 'Не указано';
                document.getElementById('dob').textContent = userData.dob || 'Не указано';
                document.getElementById('phone').textContent = userData.phone || 'Не указано';
                document.getElementById('email').textContent = userData.email || 'Не указано';
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('An error occurred while fetching your data.');
            });
    } else {
        alert('No user logged in.');
    }
}

function populateEditForm() {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {
        fetch(`http://localhost:3000/users/${loggedInUserId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('editFirstName').value = data.firstName || '';
                document.getElementById('editLastName').value = data.lastName || '';
                document.getElementById('editDob').value = data.dob || '';
                document.getElementById('editPhone').value = data.phone || '';
                document.getElementById('editEmail').value = data.email || '';
            })
            .catch(error => {
                console.error('Error fetching user data for edit:', error);
            });
    }
}
document.getElementById('changePasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    validatePassword();
});

function validateUserInfo() {
    const phone = document.getElementById('editPhone').value;
    const phonePattern = /^\+?[0-9\s\-\(\)]{10,15}$/;
    if (!phonePattern.test(phone)) {
        alert('Некорректный номер телефона');
        return false;
    }

    const email = document.getElementById('editEmail').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Некорректный формат email');
        return false;
    }

    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {
        fetch(`http://localhost:3000/users/${loggedInUserId}`)
            .then(response => response.json())
            .then(currentUser => {
                const userData = {
                    firstName: document.getElementById('editFirstName').value,
                    lastName: document.getElementById('editLastName').value,
                    dob: document.getElementById('editDob').value,
                    phone: phone,
                    email: email,
                    password: currentUser.password, // Preserve
                    id: loggedInUserId // Preserve
                };

                return fetch(`http://localhost:3000/users/${loggedInUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                });
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Ошибка на сервере');
                }
            })
            .then(data => {
                fillUserInfo();
                const editModal = document.getElementById('editUserInfoModal');
                bootstrap.Modal.getInstance(editModal).hide();
                alert('Информация успешно обновлена');
            })
            .catch(error => {
                alert(`Ошибка обновления информации: ${error.message}`);
            });
    }

    return false;
}

function validatePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const oldPassword = document.getElementById('oldPassword').value;

    if (newPassword.length < 8) {
        alert('Пароль должен быть не менее 8 символов');
        return false;
    }

    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {
        fetch(`http://localhost:3000/users/${loggedInUserId}/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid old password');
            }
            return response.json();
        })
        .then(data => {
            if (!response.ok) {
                throw new Error('Invalid old password');
            }
            else{
                alert('Пароль успешно обновлен');
                const passwordModal = new bootstrap.Modal(document.getElementById('changePasswordModal'));
                passwordModal.hide();
                document.getElementById('oldPassword').value = '';
                document.getElementById('newPassword').value = '';
            }

        })
        .catch(error => {
            console.error('Ошибка при обновлении пароля:', error);
            alert('Ошибка обновления пароля: ' + error.message);
        });
    }

    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    fillUserInfo();

    const editInfoForm = document.getElementById('editInfoForm');
    if (editInfoForm) {
        editInfoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            validateUserInfo();
        });
    }

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function (e) {
            e.preventDefault();
            validatePassword();
        });
    }
});
document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem('loggedInUserId');

    if (userId) {
        try {
            const [messagesResponse, propertiesResponse] = await Promise.all([
                fetch('http://localhost:3000/all_messages'),
                fetch('http://localhost:3000/properties')
            ]);

            if (!messagesResponse.ok || !propertiesResponse.ok) {
                throw new Error("Failed to fetch data.");
            }

            const messages = await messagesResponse.json();
            const properties = await propertiesResponse.json();

            const userDialogs = document.getElementById("userDialogs");

            const userMessages = messages.filter(msg => msg.userId === userId);

            if (userMessages.length === 0) {
                userDialogs.innerHTML = "<p>У вас пока нет диалогов.</p>";
                return;
            }

            const uniqueProperties = [...new Set(userMessages.map(msg => msg.propertyId))];

            uniqueProperties.forEach(propertyId => {
                const property = properties.find(prop => prop.id === propertyId);
                if (property) {
                    const button = document.createElement("button");
                    button.className = "btn btn-primary new";
                    button.textContent = `Чат: ${property.title}`;
                    button.onclick = () => location.href = `messages.html?property_id=${propertyId}`;
                    userDialogs.appendChild(button);
                }
            });
        } catch (error) {
            console.error("Error loading:", error);
            document.getElementById("userDialogs").innerHTML = "<p>Ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>";
        }
    } else {
        document.getElementById("userDialogs").innerHTML = "<p>Вы не авторизованы.</p>";
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("loggedInUserId");
    const today = new Date();
    const maxDate = today.toISOString().split("T")[0];
    document.getElementById("editDob").setAttribute("max", maxDate);

    if (!userId) return;

    try {
        const rentalHistoryResponse = await fetch(`http://localhost:3000/rental_history?userId=${userId}`);
        if (rentalHistoryResponse.status === 400) {
            throw new Error("Failed to fetch rental history")
        }
        const responseData = await rentalHistoryResponse.json();

        const userRentalHistory = responseData.rentalHistories;
        const rentalContainer = document.getElementById("rentalHistory");

        if (!Array.isArray(userRentalHistory) || userRentalHistory.length === 0) {
            rentalContainer.innerHTML = "<p>У вас пока нет аренды.</p>";
            return;
        }
        rentalContainer.style.display = "flex";
        rentalContainer.style.overflowX = "auto";
        rentalContainer.style.gap = "1rem";
        userRentalHistory.sort((a, b) => new Date(a.startOfRent) - new Date(b.startOfRent));

        const propertyIds = userRentalHistory.map(rental => rental.propertyId).join(",");

        const propertiesResponse = await fetch(`http://localhost:3000/properties?ids=${propertyIds}`);
        if (!propertiesResponse.ok) {
            throw new Error("Failed to fetch property details");
        }
        rentalContainer.innerHTML = "";

        for (const rental of userRentalHistory) {
            const response = await fetch(`http://localhost:3000/properties/${rental.propertyId}`);
            const property = await response.json();
            if (property) {
                const rentalCard = document.createElement("div");
                rentalCard.className = "card mb-3";
                rentalCard.style.minWidth = "300px"; // Ensure cards have a consistent width
                rentalCard.style.flex = "0 0 auto";
                rentalCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title"><a href="property.html?id=${property.id}">${property.title}</a></h5>
                        <p class="card-text" style="color: ${rental.isApproved ? 'green' : 'red'};">
                        Статус: ${rental.isApproved ? "Одобрено" : "В ожидании"}</p>
                        <p class="card-text">Дата начала аренды: ${rental.startOfRent}</p>
                        <p class="card-text">Дата окончания аренды: ${rental.endOfRent}</p>
                        <button class="btn btn-primary" onclick="location.href='messages.html?property_id=${property.id}'">Перейти к чату</button>
                        <button class="btn btn-danger delete-booking" data-id="${rental.id}">Удалить бронь</button>
                    </div>
                `;
                rentalContainer.appendChild(rentalCard);

                rentalCard.querySelector(".delete-booking").addEventListener("click", async (e) => {
                const bookingId = e.target.dataset.id;
                try {
                    const deleteResponse = await fetch(`http://localhost:3000/rental_history/${bookingId}`, {
                        method: "DELETE",
                    });
                    console.log(deleteResponse)
                    if (!deleteResponse.ok) {
                        throw new Error("Failed to delete booking");
                    }
                    alert("Бронирование успешно удалено.");
                    rentalCard.remove();
                } catch (error) {
                    console.error("Error deleting booking:", error);
                    alert("Ошибка при удалении бронирования.");
                }
            });
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Произошла ошибка при загрузке данных.");
    }
});
