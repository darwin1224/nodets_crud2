import { Schema } from 'mongoose'

export const Kelas = new Schema({
  nama_kelas: {
    type: String,
    required: true
  }
})