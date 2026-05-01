const addBtn = document.getElementById("addBtn");
const taskContainer = document.querySelector(".row.p-2.gap-3");
let Tugas = [];

addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const addTugas = document.createElement("form");
    addTugas.id = "addTugas";
    addTugas.innerHTML = `        <div class="position-fixed form-tugas">
            <div class="row shadow-sm rounded-4 p-0 bg-light position-relative">
                <div class="col-12 position-absolute top-0 end-0 d-flex justify-content-end p-1">
                    <a href="#" class="btn bg-primary text-white rounded-4 fs-5" id="backBtn" role="button">Back <i
                            class="bi bi-box-arrow-right"></i></a>
                </div>
                <div class="col-12 pt-5 mt-3">
                    <label for="namaTugas">Masukan Tugas</label>
                    <input type="text" class="form-control" id="namaTugas" placeholder="Masukan Nama Tugas">
                    <br>
                    <label for="deadlineTugas">Masukan Deadline</label>
                    <input type="date" class="form-control" id="deadlineTugas" placeholder="Masukan Deadline Tugas">
                </div>
                <div class="col-12 my-3">
                    <button type="submit" class="btn btn-primary m-0" id="submitTugas">Tambah Tugas</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(addTugas);

    // Input Tugas Listener
    const namaTugasInput = document.getElementById("namaTugas");
    const deadlineTugasInput = document.getElementById("deadlineTugas");

    addTugas.addEventListener("submit", function (event) {
        event.preventDefault();


        const dataTugas = {
            id: Date.now(),
            namaTugas: namaTugasInput.value,
            deadlineTugas: deadlineTugasInput.value,
            tugasSelesai: false
        };

        Tugas.push(dataTugas);

        addTugas.remove();

        renderTask();

    });

    // BackButton Listener
    const backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", function (event) {
        event.preventDefault();
        addTugas.remove();
    });


});

function renderTask() {
    taskContainer.innerHTML = "";

    Tugas.forEach(function (tugas) {
        const newTugas = document.createElement("div");
        newTugas.className = "kotakTugas col-12 shadow-sm rounded-4 m-0 p-3";
        newTugas.style.transition = "all 0.3s ease";


        if (tugas.tugasSelesai) {
            newTugas.classList.add("bg-secondary", "opacity-50");
        } else {
            newTugas.classList.add("bg-light");
        }

        newTugas.innerHTML = `
                    <div class="d-flex align-items-center justify-content-evenly">
                        <div class="d-flex align-items-center flex-grow-1">
                            <i class="bi bi-check-lg fs-1 text-center text-success completeIcon ${tugas.tugasSelesai ? 'text-white' : 'text-success'}" style="cursor: pointer;"></i>
                            <div class="mx-3 w-100">
                                <p class="mb-0 fs-4 fw-bold headerTugas ${tugas.tugasSelesai ? 'text-decoration-line-through' : ''}">${tugas.namaTugas}</p>
                                <div class="deadlineTugas">
                                    <p class="mb-0 fs-6 text-muted deadlineTugas" >${tugas.deadlineTugas}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button class="btn btn-danger btn-sm tombolHapus">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>`;

        // Complete Task Listener
        const completeTaskBtns = newTugas.querySelector(".completeIcon");
        completeTaskBtns.addEventListener("click", function (event) {
            tugas.tugasSelesai = !tugas.tugasSelesai;
            renderTask();
        });

        const deleteTaskBtns = newTugas.querySelector(".tombolHapus");
        deleteTaskBtns.addEventListener("click", function (event) {
            Tugas = Tugas.filter(function (t) {
                return t.id !== tugas.id;
            });
            renderTask();
        });

        taskContainer.appendChild(newTugas);
    });

};
