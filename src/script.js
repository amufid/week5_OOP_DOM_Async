class Registrasi {
  constructor() {
    this.data_register = []
    this.tableBody = document.getElementById('tableBody')
    this.rowCount = 1
  }

  addRegister(nama, umur, uang_saku) {
    this.data_register.push({ count: this.rowCount, nama, umur, uang_saku })
    this.rowCount++
  }

  printData() {
    this.tableBody.innerHTML = ''

    this.data_register.forEach(item => {
      let row = document.createElement('tr')
      let cellCount = document.createElement('td')
      let cell1 = document.createElement('td')
      let cell2 = document.createElement('td')
      let cell3 = document.createElement('td')

      cellCount.innerHTML = item.count
      cell1.innerHTML = item.nama
      cell2.innerHTML = item.umur
      cell3.innerHTML = item.uang_saku

      row.appendChild(cellCount)
      row.appendChild(cell1)
      row.appendChild(cell2)
      row.appendChild(cell3)
      this.tableBody.appendChild(row)
    })
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const dataRegister = new Registrasi()

  const form = document.getElementById('formInput')
  const nama = document.getElementById('nama')
  const umur = document.getElementById('umur')
  const uang_saku = document.getElementById('uang_saku')
  const alert = document.getElementById('alert1')
  const alert2 = document.getElementById('alert2')
  const resume = document.getElementById('resume')

  const data_umur = []

  form.addEventListener('submit', async function(event) {
    event.preventDefault()

    const input_nama = nama.value.trim()
    const input_umur = umur.value.trim()
    const input_uang_saku = uang_saku.value.trim()
    const umur_avg = parseInt(umur.value)
    const uang_saku_avg = parseInt(uang_saku.value)

    if (input_nama.length >= 10 && input_umur >= 25 && input_uang_saku >= 100000 &&
      input_uang_saku <= 1000000) {

      dataRegister.addRegister(input_nama, input_umur, input_uang_saku)
      dataRegister.printData()

      nama.value = ''
      umur.value = ''
      uang_saku.value = ''
      alert.innerHTML = ''
      alert2.innerHTML = 'Registrasi berhasil!'

      data_umur.push({umur_avg : umur_avg, uang_saku_avg : uang_saku_avg})

      let total_umur = 0
      let total_uang_saku = 0

      data_umur.forEach(function(countUmur) {
        total_umur += countUmur.umur_avg
      })

      let average_umur = total_umur / data_umur.length
      let rata_umur = parseInt(average_umur)

      data_umur.forEach(function(countUangSaku) {
        total_uang_saku += countUangSaku.uang_saku_avg
      })

      let average_uang_saku = total_uang_saku / data_umur.length
      let rata_uang_saku = parseInt(average_uang_saku)

      try {
        await dataAsync(input_nama, input_umur, input_uang_saku)
        resume.innerHTML = `Rata-rata pendaftar memiliki uang saku sebesar ${rata_uang_saku} dengan rata-rata umur ${rata_umur}`
        console.log('Data berhasil diinputkan.')
      } catch (error) {
        console.error('Error :', error)
      }

    } else if (input_nama.length > 0 && input_nama.length < 10) {
      alert.innerHTML = "Nama kurang dari 10 karakter!";
      alert2.innerHTML = ''

    } else if (input_umur > 0 && input_umur < 25) {
      alert.innerHTML = "Umur minimal 25 tahun!";
      alert2.innerHTML = ''

    } else if (input_uang_saku > 0 && input_uang_saku < 100000) {
      alert.innerHTML = "Uang saku minimal 100 ribu!";
      alert2.innerHTML = ''

    } else if (input_uang_saku > 1000000) {
      alert.innerHTML = 'Uang saku maksimal 1 juta!'
      alert2.innerHTML = ''

    } else {
      alert.innerHTML = 'Data tidak boleh kosong!'
      alert2.innerHTML = ''
    }
  })
})

function dataAsync(input_nama, input_umur, input_uang_saku) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Nama : ${input_nama}, Umur : ${input_umur}, Uang saku : ${input_uang_saku}`)
      resolve()
    }, 3000)
  })
}
