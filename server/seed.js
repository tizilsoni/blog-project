const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User.model");
const Post = require("./models/Post.model");
const bcrypt = require("bcrypt");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Error Connecting", err));

const NAME_LIST = [
  "Liam",
  "Noah",
  "Oliver",
  "Elijah",
  "James",
  "William",
  "Benjamin",
  "Lucas",
  "Henry",
  "Theodore",
];

const getRandomName = () =>
  NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)];

async function seedUser(n = 5) {
  for (let i = 0; i < n; i++) {
    const username = getRandomName();
    const email = `${username}@${getRandomName()}.com`;
    const password = "password";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      token: Math.random().toString(36),
    });

    await user.save();

    await seedPost(user, 2);
  }
}

async function seedPost(user, n = 10) {
  for (let i = 0; i < n; i++) {
    const title = "Lorem " + user.username;
    const description = `
# Classes duxere et simulacra sibi sinu miranti

## Num cum
    
Lorem markdownum gemina horriferum, sparsus, tuli! Suorum perfida flammas
tulisset obnoxius tutior nutritur homines, agit manus. Qui qua, verus madida,
Ide colligit, an arcuit fraternis, nec ergo ipsum furorem! Indignere ingenio et
ambage **Delphos pendere**; secundi meritisne cessant ibi ibat *haec Cereris*
stravit. Ira geminum credant tribus dextramque rigidum?
    
    var qwertyProm = ssh_text;
    tiffBaudLink(markup, market.losslessCdfs(jreEOspf, outputSkyscraper - 4,
            2));
    if (winsock + tableLeopardPop) {
        json.word_type_mouse = base + 525015 + busAddressCdma + -3;
        file = soap_address_firmware * characterTelecommunicationsAgp;
    } else {
        analyst -= 5 - camera_upnp_key(open_pipeline_minicomputer, cms);
        webMultimediaFloating.add_text_mainframe *= 2;
        word += memoryRipcording + vdu + torrent;
    }
    var captcha = -2;
    
Erat rima, te ingemuit illa: servantia ardent, clementia euntem. Pia et
**exsultat** Iovis. Ora ad nil flagrans inquit Capysque *reperta cuspidis* ut
est adplicat morsu, putares vatemque Phoebes, nova. Praebere vigil nate
[per](http://estquin.io/) est digitis naribus coniunx utque, vestes non domo
Samos baculum; Indis **aut**. Datura sectos.
    
## Lacusque medius rabiem poenas
    
Celerem resolvite villos volumina qua! Metum *mea*; cum me, proculcat novum,
maestis ad cavis *insula*! Polypemonis tremens [senecta](http://o.io/et-divus),
cavernas venias, mihi rerum parte; et modo facitote potero, Iliaden. De Nesse,
lanam et qui dixit nati pro fumante dixit.
    
Protinus aut exululat gesserit, iudicis vidit iacebat esse suo tempore deo
habet. Terrae evehor. Segetes viribus eripuisse altis? Et membris silvis admoto
[frugum prima quod](http://ait.net/sed-est.html) modum, ducibusque quod; arces.
Nec ore fuisti putetis aratri!
    
> Multa quo quae Heliadum; de verti tandem animo thyrso et. Comitantiaque
> moraque mansit Pindumve Lyrcea flammas, nec mox invidiosa Iovem. Fuerat id
> poenae inter: hac toto adamanteis reddit admissa, hoc. Norat regentis, est ego
> ambo, unum, cadas te Phoebeos. Ad rogari prope demens, forsitan dryades
> veloxque intervenit iste maioris, hoc sed dignabitur.
    
Iactato corpore certior, est Phoebes [ossa](http://superis.com/domus-cui), Nam
faciebant caput? [Prato his mulcebant](http://tuam.io/) effuge de quaeque
veterum violentaque donec contorto, nec ferrum tumuerunt eras tenebant enim
voluit, est. Puerilem **praestem** in quae peregrinaeque caelum *eiaculatus*,
quam *Lelex*. Fecit cum ore incipere sternebat emicuit, nec peperit carmina,
cum. Vix timido interdixit Macareida erat acumine transierant quoque quas
facinus exprimit tenebras.
    
Quoque sed vicinia ut tigride positis unum modo et nomenque. In visum Aeginae
vocatos et Phoebe a dolor sinit tauri, tibi furor iungit eripe.
`;
    const topic = "Lorem";

    const post = new Post({
      title,
      description,
      topic,
      user: user._id,
    });

    await post.save();
  }
}

seedUser(5)
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
