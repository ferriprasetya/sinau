<?php

return [
    'store' => [
        'success' => 'Berhasil mengirim pertanyaan',
        'failed' => 'Gagal mengirim pertanyaan',
    ],
    'show' => [
        'failed' => 'Pertanyaan tidak ditemukan',
    ],
    'answer' => [
        'store' => [
            'success' => 'Berhasil mengirim jawaban',
            'failed' => 'Gagal mengirim jawaban',
        ],
        'show' => [
            'success' => 'Berhasil mendapatkan data jawaban',
            'failed' => 'Jawaban tidak ditemukan',
        ],
        'correct' => [
            'add' => [
                'success' => 'Berhasil menandai jawaban sebagai benar',
                'failed' => 'Gagal menandai jawaban sebagai benar',
            ],
            'remove' => [
                'success' => 'Berhasil menghapus jawaban sebagai benar',
                'failed' => 'Gagal menghapus jawaban sebagai benar',
            ],
        ],
        'list' => [
            'failed' => 'Gagal mengambil data jawaban',
        ]
    ]
];
