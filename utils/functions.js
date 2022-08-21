const db = require("./db");

exports.dateIndo = () => {
  const date = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });
  return format(date);
};

const format = (date) => {
  const regexTime =
    /^\d{4}[-\/\:_.]\d{1,}[-\/\:_.]\d{2}\s\d{2}[-\/\:_.]\d{2}[-\/\:_.]\d{2}$/;
  const regex = /^\d{4}[-\/\:_.]\d{2}[-\/\:_.]\d{2}/;
  let str;
  const pisah = date.split(" ");
  const tanggal = pisah[0]
    .toString()
    .split(/[\/\-_.]/)
    .join("-");

  if (!pisah[1]) {
    const cekTanggal = regex.test(date);
    if (cekTanggal) {
      return tanggal;
    } else {
      const regexReplace = /(\d+)-(\d+)-(\d+)/;
      const baru = tanggal.replace(regexReplace, "$3-$2-$1");
      return baru;
    }
  } else {
    const cek = regexTime.test(date);
    const cekTime = /^\d{2}[-\/\:_.]\d{2}[-\/\:_.]\d{2}$/;
    if (cekTime.test(pisah[1])) {
      const waktu = pisah[1]
        .toString()
        .split(/[-\/:_.]/)
        .join(":");
      if (cek) {
        return tanggal + " " + waktu;
      } else {
        const regexReplace = /(\d+)-(\d+)-(\d+)/;
        const baru = tanggal.replace(regexReplace, "$3-$2-$1");
        return baru + " " + waktu;
      }
    } else {
      return false;
    }
  }
};
