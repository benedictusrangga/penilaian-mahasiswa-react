import { useState } from "react";

const JUMLAH_MAHASISWA = 10;
const JUMLAH_ASPEK = 4;

export default function App() {
  const [nilai, setNilai] = useState(() => {
    const initial = {};
    for (let m = 1; m <= JUMLAH_MAHASISWA; m++) {
      initial[`mahasiswa_${m}`] = {};
      for (let a = 1; a <= JUMLAH_ASPEK; a++) {
        initial[`mahasiswa_${m}`][`aspek_${a}`] = 1;
      }
    }
    return initial;
  });

  const handleChange = (mahasiswa, aspek, value) => {
    setNilai((prev) => ({
      ...prev,
      [mahasiswa]: {
        ...prev[mahasiswa],
        [aspek]: Number(value),
      },
    }));
  };

  const handleSimpan = () => {
    const output = {};

    for (let a = 1; a <= JUMLAH_ASPEK; a++) {
      output[`aspek_penilaian_${a}`] = {};
      for (let m = 1; m <= JUMLAH_MAHASISWA; m++) {
        output[`aspek_penilaian_${a}`][`mahasiswa_${m}`] =
          nilai[`mahasiswa_${m}`][`aspek_${a}`];
      }
    }

    console.log(output);
    alert("Cek console untuk hasil JSON");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Aplikasi Penilaian Mahasiswa</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Mahasiswa</th>
            {[...Array(JUMLAH_ASPEK)].map((_, i) => (
              <th key={i}>Aspek {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(JUMLAH_MAHASISWA)].map((_, m) => {
            const mahasiswaKey = `mahasiswa_${m + 1}`;
            return (
              <tr key={m}>
                <td>Mahasiswa {m + 1}</td>
                {[...Array(JUMLAH_ASPEK)].map((_, a) => {
                  const aspekKey = `aspek_${a + 1}`;
                  return (
                    <td key={a}>
                      <select
                        value={nilai[mahasiswaKey][aspekKey]}
                        onChange={(e) =>
                          handleChange(mahasiswaKey, aspekKey, e.target.value)
                        }
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <br />
      <button onClick={handleSimpan}>Simpan</button>
    </div>
  );
}
