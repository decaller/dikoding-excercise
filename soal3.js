/**
 * Buatlah logika if untuk mengevaluasi nilai score dengan ketentuan:
 *  1. Jika nilai score lebih atau sama dengan 90
 *      - Isi variabel result dengan nilai: 'Selamat! Anda mendapatkan nilai A.'
 *  2. Jika nilai score ada di antara 80 hingga 89
 *      - Isi variabel result dengan nilai: 'Anda mendapatkan nilai B.'
 *  3. Jika nilai score ada di antara 70 hingga 79
 *      - Isi variabel result dengan nilai: 'Anda mendapatkan nilai C.'
 *  4. Jika nilai score ada di antara 60 hingga 69:
 *      - Isi variabel result dengan nilai: 'Anda mendapatkan nilai D.'
 *  5. Jika nilai score di bawah 60:
 *      - Isi variabel result dengan nilai: 'Anda mendapatkan nilai E.'
 *
 *
 *  Note: - Mohon untuk tidak menghapus kode yang sudah ada sebelumnya.
 *        - Anda tidak perlu membuat variabel result dan score secara manual.
 *          Gunakan variabel yang sudah disediakan.
 *
 */

// function scoreChecker(score) {
//     let result;

//     // TODO



//     // Jangan hapus kode ini
//     return result;
// }

const scoreChecker = x => 
    x >= 90 ?  'Selamat! Anda mendapatkan nilai A.' 
    : x >= 80 ? 'Anda mendapatkan nilai B.' 
    : x >= 70 ? 'Anda mendapatkan nilai C.'
    : x >= 60 ? 'Anda mendapatkan nilai D.'
    : 'Anda mendapatkan nilai E.'

/**
 * Jangan hapus kode di bawah ini
 */
module.exports = scoreChecker;