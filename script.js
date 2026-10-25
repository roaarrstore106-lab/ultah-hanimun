
"use strict";

// ========================================
// WEBSITE ULANG TAHUN HANI KURNIATI
// Kado -> Teka-teki -> Sandi -> Surat
// ========================================

const ambil = (id) => document.getElementById(id);

let kadoDibuka = false;
let jawabanDiproses = false;
let sandiDiproses = false;

// ---------- PINDAH HALAMAN ----------

function bukaHalaman(id) {
  const tujuan = ambil(id);

  if (!tujuan) {
    console.error(`Halaman "${id}" tidak ditemukan.`);
    return;
  }

  document.querySelectorAll(".scene").forEach((halaman) => {
    halaman.classList.remove("active");
  });

  tujuan.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function tampilkanPesan(id, teks) {
  const elemen = ambil(id);

  if (elemen) {
    elemen.textContent = teks;
  }
}

// ---------- ANIMASI BUNGA ----------

function keluarkanBunga() {
  const daftarBunga = [
    "🌹", "🌸", "🌷", "🌼", "💐", "🌺", "🌻"
  ];

  for (let i = 0; i < 55; i++) {
    const bunga = document.createElement("span");

    bunga.className = "flower";
    bunga.textContent =
      daftarBunga[
        Math.floor(Math.random() * daftarBunga.length)
      ];

    bunga.style.setProperty(
      "--x",
      `${Math.random() * 700 - 350}px`
    );

    bunga.style.setProperty(
      "--y",
      `${Math.random() * -650 - 80}px`
    );

    bunga.style.setProperty(
      "--rot",
      `${Math.random() * 720 - 360}deg`
    );

    bunga.style.setProperty(
      "--delay",
      `${Math.random() * 0.4}s`
    );

    document.body.appendChild(bunga);

    setTimeout(() => {
      bunga.remove();
    }, 2600);
  }
}

// ---------- BUKA KADO ----------

function bukaKado() {
  const kado = ambil("gift");

  if (!kado || kadoDibuka) return;

  kadoDibuka = true;
  kado.classList.add("open");

  keluarkanBunga();

  setTimeout(() => {
    bukaHalaman("halamanTeka");
  }, 1600);
}

ambil("btnKado")?.addEventListener("click", bukaKado);

ambil("gift")?.addEventListener("click", bukaKado);

ambil("gift")?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    bukaKado();
  }
});

// ---------- TEKA-TEKI ----------

function periksaJawaban() {
  if (jawabanDiproses) return;

  const input = ambil("jawaban");

  if (!input) return;

  const jawaban = input.value.trim().toLowerCase();

  const jawabanBenar = [
    "bayangan",
    "bayang",
    "bayanganku"
  ];

  if (jawabanBenar.includes(jawaban)) {
    jawabanDiproses = true;

    tampilkanPesan(
      "pesanTeka",
      "Waduh, benar! 😭 Sekarang coba buka kotak rahasianya..."
    );

    setTimeout(() => {
      bukaHalaman("halamanSandi");
      jawabanDiproses = false;
    }, 1200);

  } else {
    tampilkanPesan(
      "pesanTeka",
      "SALAH! Wkwkwk 😂 Ayo coba lagi, jangan menyerah!"
    );

    input.select();
  }
}

ambil("btnJawab")?.addEventListener("click", periksaJawaban);

ambil("jawaban")?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    periksaJawaban();
  }
});

// ---------- PETUNJUK TEKA-TEKI ----------

ambil("btnPetunjuk")?.addEventListener("click", () => {
  tampilkanPesan(
    "pesanTeka",
    "Petunjuk: dia selalu mengikutimu saat ada cahaya, tetapi menghilang saat gelap. 🤭"
  );
});

// ---------- KOTAK SANDI ----------

function periksaSandi() {
  if (sandiDiproses) return;

  const input = ambil("sandi");

  if (!input) return;

  const sandi = input.value.trim();

  if (sandi === "2510") {
    sandiDiproses = true;

    tampilkanPesan(
      "pesanSandi",
      "Sandi benar! 💛 Membuka pesan spesial dari abang..."
    );

    // Tidak ada galeri foto.
    // Langsung pindah ke halaman surat.
    setTimeout(() => {
      bukaHalaman("halamanSurat");
      sandiDiproses = false;
    }, 1200);

  } else {
    tampilkanPesan(
      "pesanSandi",
      "Sandi salah, Dik! 🤭 Ingat tanggal 25 Oktober, ya."
    );

    input.select();
  }
}

ambil("btnBukaSandi")?.addEventListener("click", periksaSandi);

ambil("sandi")?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    periksaSandi();
  }
});

// ---------- ULANGI WEBSITE ----------

function ulangWebsite() {
  // Kembali ke halaman pertama.
  bukaHalaman("halamanKado");

  // Reset kotak kado.
  const kado = ambil("gift");

  if (kado) {
    kado.classList.remove("open");
  }

  // Reset status.
  kadoDibuka = false;
  jawabanDiproses = false;
  sandiDiproses = false;

  // Kosongkan input.
  if (ambil("jawaban")) {
    ambil("jawaban").value = "";
  }

  if (ambil("sandi")) {
    ambil("sandi").value = "";
  }

  // Hapus pesan sebelumnya.
  tampilkanPesan("pesanTeka", "");
  tampilkanPesan("pesanSandi", "");

  // Bersihkan bunga yang mungkin masih ada.
  document.querySelectorAll(".flower").forEach((bunga) => {
    bunga.remove();
  });
}

ambil("btnUlang")?.addEventListener("click", ulangWebsite);
