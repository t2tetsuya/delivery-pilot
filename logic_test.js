
const rows=[{"file": "IMG_1325", "date": "2026-09-15", "net": 4334, "promo": 700, "tip": 0, "delivery": 4334, "total": 5034, "trips": 9, "minutes": 159}, {"file": "IMG_1326", "date": "2026-09-16", "net": 7960, "promo": 2700, "tip": 0, "delivery": 7960, "total": 10660, "trips": 15, "minutes": 269}, {"file": "IMG_1327", "date": "2026-09-17", "net": 8640, "promo": 700, "tip": 50, "delivery": 8690, "total": 9390, "trips": 21, "minutes": 345}, {"file": "IMG_1328", "date": "2026-09-18", "net": 7509, "promo": 350, "tip": 67, "delivery": 7576, "total": 7926, "trips": 16, "minutes": 343}, {"file": "IMG_1329", "date": "2026-09-19", "net": 10237, "promo": 3550, "tip": 0, "delivery": 10237, "total": 13787, "trips": 18, "minutes": 400}, {"file": "IMG_1330", "date": "2026-09-20", "net": 12998, "promo": 5300, "tip": 0, "delivery": 12998, "total": 18298, "trips": 29, "minutes": 416}, {"file": "IMG_1332", "date": "2026-09-08", "net": 2044, "promo": 0, "tip": 0, "delivery": 2044, "total": 2044, "trips": 4, "minutes": 67}, {"file": "IMG_1333", "date": "2026-09-09", "net": 1858, "promo": 400, "tip": 0, "delivery": 1858, "total": 2258, "trips": 4, "minutes": 75}, {"file": "IMG_1334", "date": "2026-09-10", "net": 4088, "promo": 1450, "tip": 0, "delivery": 4088, "total": 5538, "trips": 9, "minutes": 142}, {"file": "IMG_1335", "date": "2026-09-11", "net": 3801, "promo": 2850, "tip": 154, "delivery": 3955, "total": 6805, "trips": 8, "minutes": 150}];
let ok=true;
for(const r of rows){
  const delivery=r.total-r.promo;
  const incentive=r.promo;
  if(delivery!==r.delivery || incentive!==r.promo || delivery+incentive!==r.total){
    console.error('FAIL',r.file,{delivery,incentive,total:r.total});
    ok=false;
  }
}
const totals=rows.reduce((a,r)=>({
  sales:a.sales+r.total,
  delivery:a.delivery+r.delivery,
  incentive:a.incentive+r.promo,
  tips:a.tips+r.tip,
  trips:a.trips+r.trips,
  minutes:a.minutes+r.minutes
}),{sales:0,delivery:0,incentive:0,tips:0,trips:0,minutes:0});
console.log(JSON.stringify(totals));
if(totals.sales!==81740) ok=false;
if(totals.delivery!==63740) ok=false;
if(totals.incentive!==18000) ok=false;
if(totals.tips!==271) ok=false;
if(totals.trips!==133) ok=false;
if(!ok) process.exit(1);
console.log('PASS');
