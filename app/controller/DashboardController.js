const db = require("../../utils/db");
const { ObjectId } = require("mongodb");
const { dateIndo } = require("../../utils/functions");

// Require library
const xl = require("excel4node");

// Create a new instance of a Workbook class
const wb = new xl.Workbook();

const tanggal = dateIndo();
const bulanNoww = tanggal.split("-")[1];

exports.index = async (req, res) => {
  const data = await db.bulan.findOne(
    { bulan: parseInt(bulanNoww) },
    { bulan: parseInt(bulanNoww), nama: 1, informasi: 1 }
  );
  // await db.bulan.insertOne({
  //   nama: "januari",
  //   bulan: 1,
  //   informasi: data,
  // });
  res.render("index", {
    layout: "layout/template",
    data,
  });
};

exports.bayar = async (req, res) => {
  const nam = "informasi.$." + req.body.minggu;
  let obj = {};
  obj[nam] = 1;
  const update = await db.bulan
    .updateOne(
      {
        bulan: parseInt(bulanNoww),
        "informasi._id": ObjectId(req.body.id),
      },
      {
        $set: obj,
      }
    )
    .then(async (e) => {
      const data = await db.bulan.findOne({ bulan: parseInt(bulanNoww) });
      let pertama = 0;
      let kedua = 0;
      let ketiga = 0;
      let keempat = 0;
      for (let i = 0; i < data.informasi.length; i++) {
        if (data.informasi[i].minggu_pertama == 1) {
          pertama += 1;
        }
        if (data.informasi[i].minggu_kedua == 1) {
          kedua += 1;
        }
        if (data.informasi[i].minggu_ketiga == 1) {
          ketiga += 1;
        }
        if (data.informasi[i].minggu_keempat == 1) {
          keempat += 1;
        }
      }
      const hasil = pertama + kedua + ketiga + keempat;
      const jumlah = hasil * 2000; // ini pemasukan
      const total = jumlah - data.pengeluaran;
      db.bulan
        .updateOne(
          { bulan: parseInt(bulanNoww) },
          { $set: { pemasukan: jumlah, pengeluaran: data.pengeluaran, total } }
        )
        .then((e) => {
          res.status(201).json({ msg: "Success" });
        });
    });
};

exports.ko = async (req, res) => {
  const ws = wb.addWorksheet("Sheet 1");
  ws.cell(2, 1).string("No");
  ws.cell(2, 2).string("Nama");
  ws.cell(2, 3).string("Minggu Pertama");
  ws.cell(2, 4).string("Minggu Kedua");
  ws.cell(2, 5).string("Minggu Ketiga");
  ws.cell(2, 6).string("Minggu Keempat");
  const data = await db.bulan.findOne({ bulan: parseInt(bulanNoww) });
  let roww = 3;
  let index = 1;
  for (let i = 0; i < data.informasi.length; i++) {
    ws.cell(roww, 1).number(index);
    ws.cell(roww, 2).string(data.informasi[i].nama);
    ws.cell(roww, 3).string(
      data.informasi[i].minggu_pertama == 1 ? "Sudah Bayar" : "Belum Bayar"
    );
    ws.cell(roww, 3).style({
      font: {
        bold: data.informasi[i].minggu_pertama == 1 ? true : false,
      },
    });
    ws.cell(roww, 4).string(
      data.informasi[i].minggu_kedua == 1 ? "Sudah Bayar" : "Belum Bayar"
    );
    ws.cell(roww, 4).style({
      font: {
        bold: data.informasi[i].minggu_kedua == 1 ? true : false,
      },
    });
    ws.cell(roww, 5).string(
      data.informasi[i].minggu_ketiga == 1 ? "Sudah Bayar" : "Belum Bayar"
    );
    ws.cell(roww, 5).style({
      font: {
        bold: data.informasi[i].minggu_ketiga == 1 ? true : false,
      },
    });
    ws.cell(roww, 6).string(
      data.informasi[i].minggu_keempat == 1 ? "Sudah Bayar" : "Belum Bayar"
    );
    ws.cell(roww, 6).style({
      font: {
        bold: data.informasi[i].minggu_keempat == 1 ? true : false,
      },
    });
    index += 1;
    roww += 1;
  }
  ws.cell(2, 1, 2, 6).style({
    font: {
      bold: true,
    },
  });

  ws.cell(2, 1, 40, 6).style({
    alignment: { horizontal: ["center"] },
  });
  // ws.cell(2, 2).style({
  //   alignment: { horizontal: ["center"] },
  // });
  // ws.cell(2, 3).style({
  //   alignment: { horizontal: ["center"] },
  // });
  // ws.cell(2, 4).style({
  //   alignment: { horizontal: ["center"] },
  // });
  // ws.cell(2, 5).style({
  //   alignment: { horizontal: ["center"] },
  // });
  // ws.cell(2, 6).style({
  //   alignment: { horizontal: ["center"] },
  // });
  // ws.cell(2, 6).style({
  //   alignment: { horizontal: ["center"] },
  // });

  ws.cell(2, 1, 40, 6).style({
    border: {
      // §18.8.4 border (Border)
      left: {
        style: "thin", //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        color: "black", // HTML style hex value
      },
      right: {
        style: "thin",
        color: "black",
      },
      top: {
        style: "thin",
        color: "black",
      },
      bottom: {
        style: "thin",
        color: "black",
      },
    },
  });

  ws.column(4).setWidth(20);
  ws.column(5).setWidth(20);
  ws.column(6).setWidth(20);
  ws.column(3).setWidth(20);
  ws.column(2).setWidth(27);

  ws.cell(1, 1, 1, 6, true)
    .string("Uang Kas XI PPLG 2")
    .style({
      font: { size: 20, bold: true },
      alignment: { horizontal: ["center"] },
    });
  ws.row(1).setHeight(26); // ws.cell(3, 1, 3, 6).number(1); // All 6 cells set to number 1
  wb.write(`kas_${bulanNoww}.xlsx`);
  res.download(`./kas_${bulanNoww}.xlsx`);
  // res.redirect("/");
};
// Add Worksheets to the workbook
