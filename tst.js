// Complete Task Listener
// ==========================================
// 1. STATE (Gudang Data)
// ==========================================
// Di sinilah semua tugas lu disimpan dalam bentuk Array of Objects.
// Ini sangat penting buat fitur ke depannya (seperti nyimpen ke LocalStorage).
let tasks = [];

// ==========================================
// 2. TANGKAP ELEMEN HTML UTAMA
// ==========================================
const addBtn = document.getElementById("addBtn");
const taskContainer = document.querySelector(".row.p-2.gap-3"); // Wadah tempat tugas akan dimunculkan

// ==========================================
// 3. FITUR: BUKA FORM POP-UP
// ==========================================
addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const addTugas = document.createElement("form");

    // Memberikan ID agar pop-up ini mudah dicari nanti
    addTugas.id = "formPopUp";

    addTugas.innerHTML = `
        <div class="position-fixed form-tugas">
            <div class="row shadow-sm rounded-4 p-0 bg-light position-relative">
                <div class="col-12 position-absolute top-0 end-0 d-flex justify-content-end p-1">
                    <button type="button" class="btn bg-primary text-white rounded-4 fs-5" id="backBtn">
                        Back <i class="bi bi-box-arrow-right"></i>
                    </button>
                </div>
                <div class="col-12 pt-5 mt-3">
                    <label for="namaTugas">Masukan Tugas</label>
                    <input type="text" class="form-control" id="namaTugas" placeholder="Masukan Nama Tugas" required>
                    <br>
                    <label for="deadlineTugas">Masukan Deadline</label>
                    <input type="date" class="form-control" id="deadlineTugas" required>
                </div>
                <div class="col-12 my-3">
                    <button type="submit" class="btn btn-primary m-0" id="submitTugas">Tambah Tugas</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(addTugas);

    const namaTugasInput = document.getElementById("namaTugas");
    const deadlineTugasInput = document.getElementById("deadlineTugas");

    // --- FITUR: SUBMIT FORM ---
    addTugas.addEventListener("submit", function (event) {
        event.preventDefault(); // Mencegah reload halaman

        // 1. Siapkan Data
        const taskData = {
            id: Date.now(), // Bikin ID unik untuk setiap tugas pakai waktu
            nama: namaTugasInput.value,
            deadline: deadlineTugasInput.value,
            selesai: false
        };

        // 2. Masukkan ke dalam Array
        tasks.push(taskData);

        // 3. Tutup Pop-up
        addTugas.remove();

        // 4. Gambar Ulang Layar
        renderTasks();
    });

    // --- FITUR: TUTUP FORM (Back Button) ---
    const backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", function (event) {
        event.preventDefault();
        addTugas.remove();
    });
});

// ==========================================
// 4. FITUR: RENDER (Tukang Gambar Layar)
// ==========================================
// Fungsi ini bertugas membaca Array 'tasks', lalu membuatkan HTML-nya
function renderTasks() {
    // Bersihkan dulu layarnya biar nggak dobel
    taskContainer.innerHTML = '';

    // Ulangi untuk setiap tugas yang ada di dalam Array
    tasks.forEach(function (task) {
        const newTugas = document.createElement("div");
        newTugas.className = "kotakTugas col-12 shadow-sm rounded-4 m-0 p-3 mb-2";
        newTugas.style.transition = "all 0.3s ease";

        // Cek status: kalau selesai, atur tampilannya
        if (task.selesai) {
            newTugas.classList.add('bg-secondary', 'opacity-50');
        } else {
            newTugas.classList.add('bg-light');
        }

        // Tampilan HTML untuk setiap tugas
        newTugas.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center flex-grow-1">
                    <i class="bi bi-check-lg fs-1 text-center tombol-selesai ${task.selesai ? 'text-white' : 'text-success'}" style="cursor: pointer;"></i>
                    <div class="mx-3 w-100">
                        <p class="mb-0 fs-4 fw-bold nama-tugas ${task.selesai ? 'text-decoration-line-through' : ''}">${task.nama}</p>
                        <div class="deadlineTugas">
                            <p class="mb-0 fs-6 text-muted">${task.deadline}</p>
                        </div>
                    </div>
                </div>
                <!-- Tombol Hapus (Tong Sampah) -->
                <div>
                    <button class="btn btn-danger btn-sm tombol-hapus">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        `;

        // -- LOGIKA TOMBOL SELESAI (Toggle) --
        const btnSelesai = newTugas.querySelector('.tombol-selesai');
        btnSelesai.addEventListener("click", function () {
            // Ubah status selesai di dalam data Array
            task.selesai = !task.selesai; // Membalikkan status (true jadi false, false jadi true)
            // Gambar ulang layarnya biar perubahannya kelihatan
            renderTasks();
        });

        // -- LOGIKA TOMBOL HAPUS --
        const btnHapus = newTugas.querySelector('.tombol-hapus');
        btnHapus.addEventListener("click", function () {
            // Hapus data tugas ini dari Array menggunakan method .filter()
            tasks = tasks.filter(function (t) {
                return t.id !== task.id; // Simpan semua tugas kecuali yang id-nya sama dengan tugas yang diklik
            });
            // Gambar ulang layarnya
            renderTasks();
        });

        // Tempel tugas ini ke layar
        taskContainer.appendChild(newTugas);
    });
}