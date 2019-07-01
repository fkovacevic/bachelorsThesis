//inicijalizacija
var express = require('express');
var socket = require('socket.io');
const fs = require('fs');





global.window = {
  screen: {
    devicePixelRatio: 1
  }
};
global.document = {
  documentElement: {
    style: {}
  },
  getElementsByTagName: function() { return []; },
  createElement: function() { return {}; }
};
global.navigator = {
  userAgent: 'nodejs',
  platform: 'nodejs'
};
global.L = require('leaflet');

//app setup
var app = express();

app.set('view engine','ejs');

var server = app.listen(4000, function(){
  console.log('listening on port 4000');
});

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gepard120",
  database: "zavrsnidb"
});


//dohvat vremena polazaka četvorke za smjer savski most - dubec

VremenaPolazaka = {
  "cetiri1" : [],
  "cetiri2" : [],
  "osam1" : [],
  "osam2" : []
}
BrzinaRuta = {
  "cetiri1" : 0,
  "cetiri2" : 0,
  "osam1" : 0,
  "osam2" : 0
}
NesortiraneKoordinateRuta = {
  "cetiri1" : [],
  "cetiri2" : [],
  "osam1" : [],
  "osam2" : []
}
 con.connect(function(err) {
  if (err) throw err;
});

app.get('/raspored/:brojRute', function (req, res) {
  var broj = req.params.brojRute;
  var broj2 = parseInt(broj) + 17;//za 17 se u bazi razlikuju različiti smjerovi
  broj2 = broj2.toString();
  var vremenapolazaka = [];
  var query = "select * from vrijemepolaska natural join vrijemepolaskarute natural join Ruta where IdRute =";
  con.query(query  + broj + ";", function (err, result, fields) {
    if (err) throw err;
    var string=JSON.stringify(result);
    var podaci =  JSON.parse(string);
    vremenapolazaka.push(podaci);
    con.query(query  + broj2 + ";", function (err, result, fields) {
      var string=JSON.stringify(result);
      var podaci =  JSON.parse(string);
      vremenapolazaka.push(podaci);
      res.render('rasporedRute', {podaci:vremenapolazaka});
        });
  });
})


app.get('/raspored', function (req, res) {
  res.sendFile('./public/rasporedi.html',{root: __dirname });
})

/*
app.get('/', function (req, res) {
  res.send('yo');
})*/


con.query("select * from vrijemepolaska natural join vrijemepolaskarute where IdRute = 4", function (err, result, fields) {
  if (err) throw err;
  for (i = 0;i<result.length;i++)
    VremenaPolazaka.cetiri1.push(result[i].Vrijeme);
    dohvatVremenaCetiri2(VremenaPolazaka);
});

function dohvatVremenaCetiri2(){
  con.query("select * from vrijemepolaska natural join vrijemepolaskarute where IdRute = 21 ;", function (err, result, fields) {
    if (err) throw err;
    for (i = 0;i<result.length;i++)
      VremenaPolazaka.cetiri2.push(result[i].Vrijeme);
      dohvatVremenaOsam1(VremenaPolazaka);
  });
}

function dohvatVremenaOsam1(VremenaPolazaka){
  con.query("select * from vrijemepolaska natural join vrijemepolaskarute where IdRute = 8 ;", function (err, result, fields) {
    if (err) throw err;
    for (i = 0;i<result.length;i++)
      VremenaPolazaka.osam1.push(result[i].Vrijeme);
      dohvatVremenaOsam2(VremenaPolazaka);
});
}

function dohvatVremenaOsam2(VremenaPolazaka) {
  con.query("select * from vrijemepolaska natural join vrijemepolaskarute where IdRute = 25 ;", function (err, result, fields) {
    if (err) throw err;
    for (i = 0;i<result.length;i++)
      VremenaPolazaka.osam2.push(result[i].Vrijeme);
      dohvatBrzina(VremenaPolazaka);
});
}

function dohvatBrzina(VremenaPolazaka) {
  con.query("select * from ruta;", function (err, result, fields) {
    if (err) throw err;
    i = 0;
    for (var key in BrzinaRuta) {
        if (BrzinaRuta.hasOwnProperty(key)) {
        BrzinaRuta[key] = result[i].BrzinaRute;
        i++;
      }
    }
    dohvatKoordinataCetiri1(VremenaPolazaka,BrzinaRuta)
  });
}

function dohvatKoordinataCetiri1(VremenaPolazaka,BrzinaRuta){
  con.query("select GeografskaSirina,GeografskaDuljina from koordinaterute natural join koordinata where IdRute = 4", function (err, result, fields) {
    if (err) throw err;
    for (i = 0;i<result.length;i++)
      NesortiraneKoordinateRuta.cetiri1.push([result[i].GeografskaSirina,result[i].GeografskaDuljina]);
    dohvatKoordinataCetiri2(VremenaPolazaka,NesortiraneKoordinateRuta,BrzinaRuta);
  });
}
function dohvatKoordinataCetiri2(VremenaPolazaka,NesortiraneKoordinateRuta,BrzinaRuta) {
  con.query("select GeografskaSirina,GeografskaDuljina from koordinaterute natural join koordinata where IdRute = 21", function (err, result, fields) {
    if (err) throw err;
    for (i = 0;i<result.length;i++)
      NesortiraneKoordinateRuta.cetiri2.push([result[i].GeografskaSirina,result[i].GeografskaDuljina]);
    dohvatKoordinataOsam1(VremenaPolazaka,NesortiraneKoordinateRuta,BrzinaRuta);
  });

}

function dohvatKoordinataOsam1(VremenaPolazaka,NesortiraneKoordinateRuta,BrzinaRuta) {
  con.query("select GeografskaSirina,GeografskaDuljina from koordinaterute natural join koordinata where IdRute = 8", function (err, result, fields) {
    if (err) throw err;
    for (i = 0;i<result.length;i++)
      NesortiraneKoordinateRuta.osam1.push([result[i].GeografskaSirina,result[i].GeografskaDuljina]);
    dohvatKoordinataOsam2(VremenaPolazaka,NesortiraneKoordinateRuta,BrzinaRuta);
  });
}

function dohvatKoordinataOsam2(VremenaPolazaka,NesortiraneKoordinateRuta,BrzinaRuta) {
  con.query("select GeografskaSirina,GeografskaDuljina from koordinaterute natural join koordinata where IdRute = 25", function (err, result, fields) {
    if (err) throw err;
    for (i = 0;i<result.length;i++)
      NesortiraneKoordinateRuta.osam2.push([result[i].GeografskaSirina,result[i].GeografskaDuljina]);
    glavnaFunkcija(VremenaPolazaka,NesortiraneKoordinateRuta,BrzinaRuta);
  });
}


function glavnaFunkcija(VremenaPolazaka,NesortiraneKoordinateRuta,BrzinaRuta){
  //static fileovi
  app.use(express.static('public'));

  //socket setup
  var io = socket(server); // zelimo da socket.io radi na ovom server
  SortiraniPodaci = {
    "cetiri1" : [],
    "cetiri2" : [],
    "osam1" : [],
    "osam2" : []
  }





  for (var key in NesortiraneKoordinateRuta) {
  if (NesortiraneKoordinateRuta.hasOwnProperty(key)) {
    var val = NesortiraneKoordinateRuta[key];
    SortiraniPodaci[key] = sortirajPoKoordinatama(val);
    console.log("podaci od " + key + " imaju clanova : "+ SortiraniPodaci[key].length);
  }
}

SortiraniPodaci.cetiri2.splice(SortiraniPodaci.cetiri2.length-1,1);
for (var key in SortiraniPodaci) {
  if (SortiraniPodaci.hasOwnProperty(key)) {
  SortiraniPodaci[key] = umetniKoordinate(SortiraniPodaci[key]);
  console.log("nakon umetanja polje sadrzi : " + SortiraniPodaci[key].length);
}
}


console.dir(SortiraniPodaci.osam2, {'maxArrayLength': null});

  VremenaPolazakaUDateu = {
    "cetiri1" :[],
    "cetiri2" :[],
    "osam1" : [],
    "osam2" : []
  };

VremenaPolazakaUDateu.cetiri1 = pretvoriUDate(VremenaPolazaka.cetiri1);
VremenaPolazakaUDateu.cetiri2 = pretvoriUDate(VremenaPolazaka.cetiri2);
VremenaPolazakaUDateu.osam1 = pretvoriUDate(VremenaPolazaka.osam1);
VremenaPolazakaUDateu.osam2 = pretvoriUDate(VremenaPolazaka.osam2);



  var sveLinije ={
    "cetiri1" : [],
    "cetiri2" : [],
    "osam1" : [],
    "osam2" : []
  }

  var podaciZaSlati = {
    "cetiri1" : [],
    "cetiri2" : [],
    "osam1" : [],
    "osam2" : []
  }
  var socketi = [];
  //na konekciji, dodaj socket u listu socketa

  io.on('connection', (socket) => {
    console.log('spojeno');
    socketi.push(socket);
    socket.emit('pocetak', podaciZaSlati);
  });

  //rad servera, svake dvije sekunde šalji podatke spojenim klijentima
  setInterval(() => {
      console.time('someFunction');
      var today = new Date();

      //provjeravaj trenutno vrijeme sa svim vremenima polazaka tramvajskih ruta
      for(var key in VremenaPolazakaUDateu) {
        if(VremenaPolazakaUDateu.hasOwnProperty(key)) {
          var val = VremenaPolazakaUDateu[key];
          for (i=0;i<val.length;i++) {
            if ((today - val[i])< 2000 && (today - val[i])>0){
                noviTramvaj = [0,0,false];
                sveLinije[key].push(noviTramvaj);
                break;
            }
          }
        }
    }


    for (var key in podaciZaSlati) {
      if (podaciZaSlati.hasOwnProperty(key)) {
        podaciZaSlati[key] = [];
      }
    }

    ruteSKrajnjimTramvajima = [];
      for (var key in sveLinije) {
        if (sveLinije.hasOwnProperty(key)) {
          var val = sveLinije[key];

          for (i = 0;i<val.length;i++) {
            sveLinije[key][i] = racunajPolozajTramvaja(sveLinije[key][i],BrzinaRuta[key],SortiraniPodaci[key]);
            koordinata = [SortiraniPodaci[key][sveLinije[key][i][1]][0],SortiraniPodaci[key][sveLinije[key][i][1]][1],sveLinije[key][i][2]];
            //console.log(koordinata);
            podaciZaSlati[key].push(koordinata);
            console.log("podaci za slati iznose : "+podaciZaSlati[key]);
            if (koordinata[2]==true) {
            //  sveLinije[key].splice(0,1);
              ruteSKrajnjimTramvajima.push(key);
              }
          }
        }
      }

      for(var key in sveLinije) {
        if(sveLinije.hasOwnProperty(key)) {
          for(i = 0;i<ruteSKrajnjimTramvajima.length;i++) {
            if(key == ruteSKrajnjimTramvajima[i]) {
              sveLinije[key].splice(0,1);
            }
          }
        }
      }

      for (i = 0;i<socketi.length;i++)
        socketi[i].emit('myData', podaciZaSlati);
        console.timeEnd('someFunction');
      data = [];
    }
  , 2000);

}
function sortirajPoKoordinatama(poljeZaSortirati){
  sortiraniPodaci =[];
  sljedecaTocka = poljeZaSortirati[0];
  najmanjaUdaljenost = 0;
  indexIzbacivanja = 0;

  duljinaPodataka = poljeZaSortirati.length;
  for (i = 0;i<duljinaPodataka;i++) {
      poljeZaSortirati.splice(indexIzbacivanja,1);
      sortiraniPodaci.push(sljedecaTocka);
      latlngPom1 = L.latLng(sljedecaTocka[1],sljedecaTocka[0]);
      najmanjaUdaljenost = 0;
      for (j = 0;j<poljeZaSortirati.length;j++) {
        latlngPom2 = L.latLng(poljeZaSortirati[j][1],poljeZaSortirati[j][0]);
        if (j == 0){
            najmanjaUdaljenost = latlngPom2.distanceTo(latlngPom1);
            sljedecaTocka = poljeZaSortirati[j];
            indexIzbacivanja = j;
          }
        if (latlngPom2.distanceTo(latlngPom1) < najmanjaUdaljenost){
          najmanjaUdaljenost = latlngPom1.distanceTo(latlngPom2);
          indexIzbacivanja = j;
          sljedecaTocka = poljeZaSortirati[j];
        }
      }
  }
  return sortiraniPodaci;
}


function izvuciKoordinate(poljeZaIzvuci){
  izvuceniPodaci = [];
  for (index = 0; index < poljeZaIzvuci['features'][0]['geometry']['coordinates'].length; ++index) {
      for (j = 0;j <poljeZaIzvuci['features'][0]['geometry']['coordinates'][index].length; j++){
          izvuceniPodaci.push(poljeZaIzvuci['features'][0]['geometry']['coordinates'][index][j]);
      }
  }
  return izvuceniPodaci;
}

function racunajPolozajTramvaja(pozicijaTramvajIIndexKoordinate, brzinaTramvaja, koordinateRute) {
  pozicijaTramvajIIndexKoordinate[0] += brzinaTramvaja*2;
  var tocka1 = L.latLng(koordinateRute[pozicijaTramvajIIndexKoordinate[1]][1], koordinateRute[pozicijaTramvajIIndexKoordinate[1]][0]);
  var tocka2 = L.latLng(koordinateRute[pozicijaTramvajIIndexKoordinate[1]+1][1], koordinateRute[pozicijaTramvajIIndexKoordinate[1]+1][0]);

  if (pozicijaTramvajIIndexKoordinate[0] >= tocka1.distanceTo(tocka2)){
      pozicijaTramvajIIndexKoordinate[0] = pozicijaTramvajIIndexKoordinate[0] - tocka1.distanceTo(tocka2);
      pozicijaTramvajIIndexKoordinate[1]++;
    }
    if (pozicijaTramvajIIndexKoordinate[1] == (koordinateRute.length -1))
      pozicijaTramvajIIndexKoordinate[2] = true;
    return pozicijaTramvajIIndexKoordinate;
}

function pretvoriUDate(poljeVremena) {
  poljeVremenaUDateu = [];
  for (i = 0;i<poljeVremena.length;i++){
    vrijeme = poljeVremena[i].split(":");
    poljeVremenaUDateu.push(new Date());
    poljeVremenaUDateu[i].setHours(parseInt(vrijeme[0], 10));
    poljeVremenaUDateu[i].setMinutes(parseInt(vrijeme[1], 10));
    poljeVremenaUDateu[i].setSeconds(parseInt(vrijeme[2], 10));
  }
  return poljeVremenaUDateu;
}

function umetniKoordinate(poljeKoordinata) {
  granica = 20;//20 metara
  novoPolje = [];
  for(i = 0;i<poljeKoordinata.length;i++) {
    if (i +1 >= poljeKoordinata.length)
      break;
    latlng1 = L.latLng(poljeKoordinata[i]);
    latlng2 = L.latLng(poljeKoordinata[i+1]);
    novoPolje.push(poljeKoordinata[i]);
    if (latlng1.distanceTo(latlng2)>granica) {
      var n = Math.floor(latlng1.distanceTo(latlng2)/granica);
      for (k = 0;k < n;k++) {
        novoPolje.push([ poljeKoordinata[i][0]+(((k+1)/(n+1))*delta(poljeKoordinata[i+1][0],poljeKoordinata[i][0])), poljeKoordinata[i][1]+(((k+1)/(n+1))*delta(poljeKoordinata[i+1][1],poljeKoordinata[i][1]))]);
      }
    }
  }
  return novoPolje;

}

function delta (drugaTocka,prvaTocka) {
  return drugaTocka - prvaTocka;
}
