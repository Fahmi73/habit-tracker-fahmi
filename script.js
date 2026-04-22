const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const addTugas = document.createElement("form");
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

    // Submit Tugas Listener
    const submitBtn = document.getElementById("submitTugas");
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();


        const valueNamaTugas = namaTugasInput.value;
        const valueDeadlineTugas = deadlineTugasInput.value;

        const newTugas = document.createElement("div");
        newTugas.className = "kotakTugas col-12 bg-light shadow-sm rounded-4 m-0 p-3";
        newTugas.innerHTML = `
                           <div class="d-flex">
                        <i class="bi bi-check-lg fs-1 text-center text-success"></i>
                        <div class="mx-3">
                            <p class="mb-0 fs-4 fw-bold" id="headerTugas">${valueNamaTugas}</p>
                            <div class="deadlineTugas">
                                <p class="mb-0 fs-6 text-muted" id="deadlineTugas">${valueDeadlineTugas}</p>
                            </div>
                        </div>
                    </div>
        `;
        document.querySelector(".row.p-2.gap-3").appendChild(newTugas);
    });

    // BackButton Listener
    const backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", function (event) {
        event.preventDefault();
        addTugas.remove();
    });
});