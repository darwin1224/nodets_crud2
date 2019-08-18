import { Schema } from 'mongoose'

export const Guru = new Schema({
  nama_guru: {
    type: String,
    required: true
  },
  jenis_kelamin_guru: {
    type: String,
    required: true
  },
  umur_guru: {
    type: Number,
    required: true
  },
  alamat_guru: {
    type: String,
    required: true
  }
})