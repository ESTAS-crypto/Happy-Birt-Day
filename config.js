// ==========================================
// KONFIGURASI WEBSITE UCAPAN ULTAH ROMANTIS
// ==========================================
// Kamu bisa mengganti semua tulisan, tanggal, foto, dan lagu di bawah ini sesuai keinginanmu.
// Cukup edit teks di dalam tanda kutip (e.g. "nama" menjadi "nama_pacarmu").

const CONFIG = {
  // 1. Panggilan Sayang / Nama Panggilan (Akan muncul di beberapa sapaan hangat)
  nickname: "Melinda",

  // 2. Nama Lengkap Pacar Kamu (Akan muncul di judul ucapan selamat ulang tahun)
  fullName: "Melinda Putri Anggraeni",

  // 3. Pesan Ucapan Selamat Ulang Tahun Utama (Bisa paragraf panjang)
  birthdayMessage: "Happy birthday Melinda! 🎂💖 Hari ini hari spesial kamu, dan aku cuma mau bilang makasih banyak ya udah lahir ke dunia ini. Makasih udah jadi bagian terpenting di hidup aku. Semoga kamu selalu bahagia, sehat terus, dan semua hal baik dateng ke kamu. Apapun yang terjadi nanti, inget ya kalau aku bakal selalu ada di samping kamu buat nemenin dan support kamu terus. Love you so much! 🥰✨",

  // 4. Surat Cinta Pendek / Romantis (Muncul di bagian amplop surat interaktif)
  loveLetter: "Hai cantiknya aku, Melinda... 🌸\n\nSelamat ulang tahun ya! Di hari spesial kamu ini, aku cuma mau ngomong makasih banyak udah selalu sabar ngadepin aku, makasih udah nemenin aku terus, dan makasih udah jadi alasan aku buat semangat setiap hari. Aku beneran se-bahagia itu bisa punya kamu. Semoga hari-hari kamu ke depan selalu dipenuhin tawa dan kebahagiaan ya. Enjoy your day, sayang! 🥰❤️",

  // 5. Tanggal Ulang Tahun Pacar (Format: YYYY-MM-DD)
  // Digunakan untuk menampilkan hitungan mundur menuju hari ultahnya, atau menyalakan efek kembang api jika hari ini adalah hari ultahnya!
  birthdayDate: "2026-06-25", 

  // 6. Tanggal Hubungan / Jadian Dimulai (Format: YYYY-MM-DD)
  // Digunakan untuk menghitung sudah berapa lama kalian bersama secara detail (Tahun, Hari, Jam, Menit, Detik)
  relationStartDate: "2024-05-15", 

  // 7. Link Audio/Musik Latar Belakang (.mp3)
  // Kamu bisa mengganti link ini dengan lagu favorit kalian. 
  // Jika ingin menggunakan file lokal, simpan lagu berformat .mp3 di folder yang sama, lalu ganti link menjadi "lagu.mp3"
  musicUrl: "LANY - Soft (Official Music Video).mp3", 

  // 8. Foto-foto Polaroid (Maksimal 6 foto agar tampilan rapi)
  // Gantilah link URL di bawah dengan file foto kamu sendiri (misalnya: "foto1.jpg", "foto2.png")
  // Pastikan file foto diletakkan di dalam folder yang sama dengan file index.html
  photos: [
    {
      url: "WhatsApp Image 2026-06-25 at 21.58.34.jpeg", 
      caption: "Senyum manismu yang selalu menerangi hariku 🥰",
      rotate: 0
    },
    {
      url: "WhatsApp Image 2026-06-25 at 21.58.32.jpeg",
      caption: "Saat-saat sederhana tapi berkesan sama kamu 🚗❤️",
      rotate: 90,
      scale: 1.45,
      x: 35, // Geser ke kanan agar wajah cowok tidak terpotong
      y: 0
    },
    {
      url: "WhatsApp Image 2026-06-25 at 21.58.32 (1).jpeg",
      caption: "Candid ter-favorit aku, cantiknya ga ada obat! ✨",
      rotate: 90,
      scale: 1.45,
      x: 45, // Geser ke kanan agar wajah cowok tidak terpotong
      y: 15 // Geser sedikit ke bawah agar wajah cowok tidak terpotong (tapi tidak sampai berlubang di atas)
    }
  ],

  // 9. Alasan Kenapa Aku Sayang Kamu (Bisa ditambahkan sebanyak yang kamu mau)
  // Akan muncul di bagian kartu interaktif yang bisa diklik / digeser
  reasons: [
    "Kamu selalu bisa bikin aku ketawa dan mood aku balik lagi, sesibuk apa pun hari aku.",
    "Cara kamu natap aku tuh selalu berhasil bikin aku ngerasa tenang dan disayang banget.",
    "Kamu pendengar terbaik. Makasih ya udah selalu sabar dengerin semua cerita random aku.",
    "Perhatian-perhatian kecil dari kamu yang kadang gak terduga selalu bikin aku senyum sendiri.",
    "Kamu mau nerima aku apa adanya, lengkap dengan segala sifat nyebelin atau kurangnya aku.",
    "Karena pas lagi bareng kamu, aku ngerasa bener-bener nyaman dan bisa jadi diri sendiri."
  ]
};
