import { Schema } from 'mongoose'

export const Siswa = new Schema({
  nama_siswa: {
    type: String,
    required: true
  },
  jenis_kelamin_siswa: {
    type: String,
    required: true
  },
  alamat_siswa: {
    type: String,
    required: true
  }
})