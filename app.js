// Função de login simples (sem backend)
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "patients.html";  // Redireciona para a lista de pacientes
    } else {
        document.getElementById("error-message").innerText = "Usuário ou senha incorretos!";
    }
});

// Função para carregar a lista de pacientes
function loadPatients() {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const tableBody = document.getElementById('patientsTable')?.getElementsByTagName('tbody')[0];
    if (tableBody) {
        tableBody.innerHTML = '';  // Limpa a tabela

        patients.forEach((patient, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td><a href="patient-profile.html?patientIndex=${index}" class="btn">Ver</a></td>
            `;
        });
    }
}

// Função para salvar pacientes no Local Storage
document.getElementById("addPatientForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const familyHistory = document.getElementById("familyHistory").value;
    const medications = document.getElementById("medications").value;
    const allergies = document.getElementById("allergies").value;

    const newPatient = {
        id: Date.now(),
        name,
        age,
        familyHistory,
        medications,
        allergies
    };

    // Salvar paciente no LocalStorage
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));

    alert('Paciente cadastrado com sucesso!');
    window.location.href = "patients.html";  // Redireciona para a lista de pacientes
});

// Função para visualizar detalhes do paciente
function viewPatient(id) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients.find(p => p.id === id);
    
    if (patient) {
        alert(`Nome: ${patient.name}\nIdade: ${patient.age}\nHistórico Familiar: ${patient.familyHistory}\nMedicamentos: ${patient.medications}\nAlergias: ${patient.allergies}`);
    }
}

// Carregar a lista de pacientes quando a página for carregada
window.onload = function () {
    if (document.getElementById("patientsTable")) {
        loadPatients();
    }

    // Carregar o perfil do paciente
    if (document.getElementById("patientDetails")) {
        const urlParams = new URLSearchParams(window.location.search);
        const patientIndex = urlParams.get("patientIndex");

        if (patientIndex !== null) {
            const patients = JSON.parse(localStorage.getItem("patients")) || [];
            const patient = patients[patientIndex];

            const patientDetails = document.getElementById("patientDetails");
            if (patient) {
                patientDetails.innerHTML = `
                    <h3>Nome: ${patient.name}</h3>
                    <p><strong>Idade:</strong> ${patient.age}</p>
                    <p><strong>Histórico Familiar:</strong> ${patient.familyHistory}</p>
                    <p><strong>Medicamentos em Uso:</strong> ${patient.medications}</p>
                    <p><strong>Alergias:</strong> ${patient.allergies}</p>
                `;
            }
        }
    }
};
