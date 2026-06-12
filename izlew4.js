// Cleaned and fixed version of your script
// - consolidated duplicate bits
// - fixed mismatched property names (experience -> example)
// - removed stray extra braces/closures
// - wrapped in IIFE to avoid globals
(function () {
  "use strict";

  /* ======================
     DICTIONARY
     ====================== */
  const dict = [
    {
      word: "Argotexnika",
      meaning:
        "at. Awıl xojalıq eginlerin islewdiń sisteması, diyqanshılıq hám olardı rawajlandırıw sharaları, ilajları.",
      example:
        "Barlıq agrotexnika quralların keńnen qollanıw zárúr (O. Berdimuratov).",
    },
    { word: "Abay", meaning: "at. Qorǵanısh, saqlıq, es, abay-siyasat.", experience: "Sen bilmeysen meniń jayım, Onıń menen teń qudayım, Kerek emes bos abayıń, Tek tur, dedi Aydos baba (Berdaq)." },
    { word: "Abaylamay", meaning: "r. Sezbey, serlemey, bilmey.", experience: "Oksananıń qaysı esikke kirip ketkenin abaylamay da qaldım (M.Nızanov)." },
    { word: "Abzal", meaning: "r.Jaqsı, durıs, táwir.", experience: "Bul kúyikten frontqa ketkenim abzal ǵoy (K.Sultanov)."},
    { word: "Abısın", meaning: "at.Eki aǵayin jigittiń úlkeniniń kelinshegi kishkenesiniń kelinshegine abısın boladı.", experience: "Biziń abısın gáptiń posgellesin aytadı (K.Sultanov)." },
    { word: "Abadan", meaning: "kel. Jetkilikli, mol, kóp, qurǵın, barshılıq.", experience: "Xalıq shaǵlap mustaqıl Ózbekstanda, Dúnya tınısh, eller abadan bolsın (I. Yusupov). Ádira qalǵır tuwǵan jer, Bolmaǵan soń abadan (Jiyen jıraw)."},
    { word: "Abay-siyasat", meaning: "at. Kózabaǵa qır kórsetiwshilik.", experience: "Shopanlarǵa kelip, abay-siyasat qılıp, túsingenlerine násiyat aytıp, xannan kelgen jasawıl ne dep turıptı (Ó.Xojaniyazov)."},
    { word: "Abat", meaning: "kel. Barshılıq, molshılıq, toqshılıq, qurǵınlıq, qurǵınlılıq, juqnalılıq, jetkiliklilik, mol, bar, aǵıl-tegil, esap-sansız, tawsılmaytuǵın.", experience: "Jiyenge haq názer saldı, Mal dúnyası abat boldı (Berdaq). Eki dúnyası birdey abat bolsın jigittiń! (T. Qayıpbergenov)."},
    { word: "Abaysız", meaning: "Ańlamastan, bayqawsız, bayqamastan, dıqqatsız, sersiz, ańsız, bilmesten, ǵapılda.", experience: "Sonda abaysız kelip demde, birew kózin bastı áste (I.Yusupov)."},
    { word: "Abajur", meaning: "Kúshli jaqtılıq kózdi qamastırmawı hám tiyisli orınǵa ǵana toplanıp túsiwi ushın lampanıń ústine ornatılǵan (gezleme, qaǵaz t. b. nárselerden jasalǵan) qaplama, shıra.", experience: ""},
    { word: "Abaq", meaning: "Jılımnıń etegi, sheti, jiyegi.", experience: "Ara-tura salǵan jılım, abaǵım, maylaǵanda úyip keler qabaǵın (S.Nurımbetov)."},
    { word: "Abıray", meaning: "Ataq, dańq, mártebe.", experience: "Kolxozshılar arasında, rayon aldında iskerlik kútá abıray (Q.Dosanov)."},
    { word: "Abonent", meaning: "Abonementke iye bolǵan adam, abonementi bar kisi. Telefonnıń abonenti."},
    { word: "Abort", meaning: "Balanı waqtınan burın operaciya jolı menen alıp taslaw usılı, boydan túsiriw jolı."},
    { word: "Absolyut", meaning: "Idealistlik filosofiya túsiniginde álemniń máńgilik ózgermeytuǵın dáslepki negizi (ruwx, sana)."},
    { word: "Abır-sabır", meaning: "Ala topalań, apır-tapır, patırat, ersili-qarsılı, tártipsiz."},
    { word: "Abbazı", meaning: "at. Burınǵı Xiywa xanlıǵınıń tusındaǵı pul birligi.", experience: "Bárshesi eki abbazı. Bayǵa bolmas kóbi-azı, Bolsın biyshara razı, Haqısın bergil shermende (Ótesh shayır)."},
    { word: "Abbreviatura", meaning: "at. Sózlerdiń jazıwdaǵı shártli túrde qısqartılıwı, sonday-aq, eki yamasa bir neshe sózlerden qısqartılıp alınǵan sóz.", experience: "QMU, AQSh, BMSh, MPJ, TashMAU."},
    { word: "Abiturient", meaning: "at. Joqarı oqıw ornına kiriwshi, hújjetin endi ǵana tapsırǵan oqıwshı."},
    { word: "Abonement", meaning: "at. Bir nárseden paydalanıw ushın alınǵan hújjet, kelisim boyınsha bir nárseni shártli waqıt ishinde tiyisli bahası menen paydalanıw huqıqı.", experience: "Teatr abonementi. Avtobus abonementi."},
    { word: "Abstrakciya", meaning: "at. Zattıń belgisine, qásiyetine qaramastan oylap shıǵarıw."},
    { word: "Abızámzám", meaning: "at. Zámzám suwı musılmanlardıń teberik dep esaplaytuǵın Káábanıń janındaǵı qudıqtıń suwı.", experience: "Abızámzám yańlı shiyrin suwıń bar. Watan jerin abat etken dáryasań. (S.Nurımbetov). Abızámzámniń suwınday birewlerdiń taza muhabbatın urladıń sen náletiy urıs (Ó.Xojaniyazov)."},
    { word: "Abılaysań", meaning: "at. 1. Parsısha abináysan náysan (aprel) ayında jawǵan jawın, báhár jawını, nóser. 2. Mif. Qazaq, qaraqalpaq xalıqlarında gezlesetuǵın ańızlarda dúzde ólgen Abılaysań batırdıń denesin juwıw ushın jawǵan jawın. 3. Sel bolıp aqqan kóz jası.", experience: "Abılaysań jamǵırday. Kóziniń jası móltildep, Etegine quyadı (A.Dabılov)."},
    { word: "Abınıw", meaning: "f. Qaptırılıw, súriniw, kepleniw, taplanıw, et betinen túsiw.", experience: "Múshirip qaqań etip, erdiń ústinen sekirip, attıń jalına abınıp ketti (K.Sultanov), Qalǵanlarımız oshaqqa abınıp, mollamdógerek bolıp otırmız (K.Sultanov)."},
    { word: "Abırjı", meaning: "kel. Muzdıń hálsiregen waqtı, qolaysız, hálsiz, qáwipli.", experience: "Muz hálsirep, jol abırjı bolǵannan berli úyine kelgendi de qoydı (A.Begimov). Muz bir qatıp bekkemlespey turıp, jıllı bolıp ketse, abırjı bolıp ústinen adam júre almaydı (Q.Irmanov)."},
    { word: "Avangard", meaning: "at. Aldınǵı, bastaǵı, birinshi, jol kórsetkish, úlgi kórsetiwshi, atlanıs jasaǵanda áskerlerdiń eń aldıńǵı tobı.", experience: "Ózi issheń basqalarǵa avangard (Á.Shamuratov)."},
    { word: "Avantyura", meaning: "at. Hádiyse, hiylekerlik, hiylekerlik siyasat, hádiyselerge túsiw, hár qıylı jollarǵa túsiw.", experience: "Áskeriy avantyura, siyasiy avantyura."},
    { word: "Avariya", meaning: "at. 1. Mashina mexanizminiń bir jeriniń buzılıwı, buzılıw, qıyralıw, sátsizlik. 2. Baxıtsız hádiyse, apat, qáwip.", experience: "Avariyaǵa ushıraw. Mashinanı avariyasız aydaw."},
    { word: "Aviamodel", meaning: "at. Ushıwshı apparattıń modeli."},
    { word: "Aviapochta", meaning: "at. Pochtanı hawa jolı menen jetkeriw, amanattıń hawa jolı arqalı jiberiliwi."},
    { word: "Aviator", meaning: "at. Lyotchik, ushqısh, ushıwshı, ushıw menen shuǵıllanıwshı, hawa-jol qatnasında islewshi."},
    { word: "Aviaciya", meaning: "at. Hawada júriw quralı, hawadaǵı ushıwdıń háreket etiw usılı.", experience: "Úlken qısqı palatkaǵa da jańa aviaciya mektebin pitkergen jas lyotchikler hám shturmanlar jıynalǵan edi  (N.Dáwqaraev)."},
    { word: "Avtobaza", meaning: "at. Avtomobiller saqlanatuǵın, buyırtpa boyınsha jumsawǵa mashinalardı beretuǵın transport mákemesi."},
    { word: "Avtobiografiya", meaning: "at. Ómirbayan, óz ómirbayanı.", experience: "Uǵıljannıń jalǵız atınan basqa hesh bir avtobiografiyasına tiyisli maǵlıwmatınıń bolmaǵanı izlewdi biraz qıyınlastırıwı múmkin (A.Bekimbetov)."},
    { word: "Avtobus", meaning: "at. Adamlardı tasıytuǵın kóp orınlı avtomobil.", experience: "Uzaq joldı qısqartıp, avtobusqa jeńgizgen (T.Seytmamutov). Tramvayı, avtobusı dóngelep, dóngelek tur bir-birine minbelep (M.Dáribaev)."},
    { word: "Avtograf", meaning: "at. Avtordıń óz qolı menen jazılǵan qoltańbası, óziniń qoyǵan qolı.", experience: "Shirkew diywallarında ótken ásirlerde jazılǵan rus soldatlarınıń tolıp atırǵan avtograf jazıwları bar (Q.Ayımbetov)."},
    { word: "Avtozavod", meaning: "at. Avtomobil zavodı, avtomobiller soǵılatuǵın zavod, avtomobil islep shıǵaratuǵın jer, orın."},
    { word: "Avtokolonna", meaning: "at. Alıs jolǵa shıqqanda birge júretuǵın mashinalar toparı.", experience: "Úshinshi kúni túnde front liniyasına dushpannıń avtokolonnası jaqınlap kiyatır degen xabar aldıq (N.Dáwqaraev)."},
    { word: "Avtol", meaning: "at. Avtomashina, avtomobil traktorlardı háreketke keltiretuǵın, qurılısların maylaytuǵın maydın túri, mashina mayı."},
    { word: "Avtolavka", meaning: "at. Kóshpeli dúkán, avtomashinanıń ishine jayǵastırılǵan, qálegen jerge barıp sawda isley beretuǵın dúkán.", experience: "Inim usındayıń bar da, avtolavka bekitse men de isleymen (Q.Jumaniyazov)."},
    { word: "Avtomat", meaning: "at. Ishki mexanizmlerdiń kúshi menen ózinen-ózi jumıs apara alatuǵın qural, ózinshe isleytuǵın apparat, ásbap.", experience: "Telefon-avtomat."},
    { word: "Avtomashina", meaning: "at. Avtomobil, avtobus, júk tasıytuǵın yamasa jeńil mashina.", experience: "GAZ-69 markalı jeńil avtomashina alǵa qaray zuwlap ketti (A.Bekimbetov). Dushpannıń 15 samolyotı, 5 tank, 14 avtomashinası joq etildi (T.Qayıpbergenov)."},
    { word: "Avtonomiya", meaning: "at. Belgili bir xalıqtıń ózin ózi basqarıw huqıqı, milliy huqıqı."},
    { word: "Avtoportret", meaning: "at. Xudojniktiń ózi tárepinen islengen óziniń (portreti) súwreti."},
    { word: "Avtor", meaning: "at. Ilimiy hám ádebiy shıǵarmalardıń hám t. b. miynetlerdiń iyesi, dóretiwshisi.", experience: "Baspasóz basqarması bolmay tabı, Otırdı buyrıq jazıp avtorlarǵa (I. Yusupov)."},
    { word: "Avtoreferat", meaning: "at. Qanday da bir ilimiy izertlewdiń avtor tárepinen eń qısqa etip jazılǵan túri."},
    { word: "Abzac", meaning: "at. Tekst basındaǵı yáki onıń ayırım pikir bildirilgen bólegindegi birinshi sózdiń birinshi háribin jazıwda ońǵa qaray jasalǵan sál sheginis, taza joldan baslanǵan jazıw, bir taza joldan ekinshi taza jolǵa shekemgi aralıq, jazıwdaǵı eń dáslepki jol.", experience: "Abzactan jazıw."},
    { word: "Avtoruchka", meaning: "at. Sıyası peroǵa óz-ózinen quyılıp turatuǵın ruchka."},
    { word: "Agent", meaning: "at. Basqa bir eldiń jasırın tapsırması menen kelgen adam, wákil, elshi, jasırın tıńshı.", experience: "Anglichan imperialistleriniń agentleri bolǵan túrkmen feodalları Bozatawdı jawızlıq penen shaptı (B.Ismaylov)."},
    { word: "Agentura", meaning: "at. Jasırın maǵlıwmatlar jıynaw ushın shólkemlestirilgen elshilik xızmet."},
    { word: "Agitator", meaning: "at. Kópshilik arasında úgit-násiyat jumısın júrgiziwshi adam.", experience: "Usı brigadada basqalar menen jumıs islep agitatorlıqtı da alıp baratuǵın Atamurat. Áne, agitator kiyatır eken, dedi sonıń arasında bir kolxozshı (T.Qayıpbergenov)."},
    { word: "Agitpunkt", meaning: "at. Úgit-násiyat isi menen shuǵıllanatuǵın jer, adamlar arasında siyasiy massalıq jumısın júrgizetuǵın jergilikli mákeme."},
    { word: "Agrarlıq", meaning: "kel. Jerdi paydalanıwǵa hám iyelewge tiyisli.", experience: "Agrarlıq reforma. Agrarlıq másele."},
    { word: "Agregat", meaning: "at. Bir neshe túrdegi mashinalardıń birikpesi, quramalı mashinalarda hár túrli detallardıń birikpesi, hár túrli tiptegi bir yamasa bir neshe mashinalardıń birigip ulıwmalıq iske qosılıwı.",},
    { word: "Agressor", meaning: "at. Basıp alıwshı, basqınshı."},
    { word: "Agronom", meaning: "at. Agronomiya boyınsha qánige, maman, awıl xojalıq isleri boyınsha qánigelikti iyelegen kisi.", experience: "Áliy aǵa bir neshe jıllardan berli «Kegeyli» sovxozınıń bir uchastkasında agronom bolıp isleydi (Ó.Xojaniyazov)."},
    { word: "Agronomiya", meaning: "at. Jerdi islew hám awıl xojalıǵı haqqında ilim.", experience: "Agronomiyalıq laboratoriyalar dúzildi (O.Berdimuratov)."},
    { word: "Agrotexnika", meaning: "at. Awıl xojalıq eginlerin islewdiń sisteması, diyqanshılıq hám olardı rawajlandırıw sharaları, ilajları.", experience: "Barlıq agrotexnika jetiskenliklerin keńnen qollanıw zárúr (O.Berdimuratov)."},
    { word: "Agroximiya", meaning: "at. Ósimliklerdi azıqlandırıw, olardı (jaqsı jaǵdayda) rawajlandırıw tuwralı ilim, ósimliklerdi túrli zıyanlı nárselerden qorǵaw hám t. b. ilajlar kóriw usılı.",},
    { word: "Aǵa-jeńge", meaning: "at. Ózinen úlken aǵası hám onıń hayalı, jası úlken, jası kishi tuwısqanları.", experience: "Qosıbay tubalap, tolǵanıp, aqırı shapandı sandıqtıń tórine tasladı da, bas elshi ózi bolıp, aǵa-jeńgesiniń alıp keldi riyzalıǵın (K.Sultanov)." },
    { word: "Aǵa-ini", meaning: "Tuwısqanlıq qatnastaǵı ul perzentler.", experience: "Dos-yaran, jaqın qatnastaǵı adamlar. Onıń arqa súyeri, tuwısqan-tuwǵanları, pútkil kollektivi, (Ó.Ayjanov)."},
    { word: "Aǵalıq", meaning: "Jası úlkenlik, ǵamxorlıq, jol basshılıq, qáwenderlik.", experience: "Jigit boldım kem-kem keldi aǵalıq (T.Jumamuratov)."},
    { word: "Aǵarbulaq", meaning: "Molshılıq, asıp-tasıwshılıq, tawsılmaytuǵın", experience: "Fermamız aǵarbulaq may boladı (K.Sultanov)."},
    { word: "Aǵarǵan", meaning: "Qatıq, sút, ayran", experience: "Qara qoydıń terisi sabınlap juwsań aǵarmas (Q.Ayımbetov)."},
    { word: "Aǵa-apa", meaning: "at. Áke-sheshe, tuwǵan-tuwısqan, úlken-kishi.", experience: "Kúndizinde aǵa-apalarımız atızlarda isleydi (A.Bekimbetov)."},
    { word: "Aǵa-begler", meaning: "at. Jası úlken, jası kishiler, húrmetli otaǵasılar, xalayıqlar, el-jurtlar, jası úlken, jası kishi.", experience: "Áne aǵa-begler, endigi gáp sizlerden yar-doslar. (Q.Aralbaev)."},
    { word: "Aǵabek", meaning: "at. 1. Basqarıwshı, shólkemlestiriwshi, basshılıq etiwshi kisi. 2.Menshikli at, isim."},
    { word: "Aǵabiy", meaning: "at. Hámel, biylik", experience: "Xalıqtıń úrp-ádetinen qalıp ketken «aǵabiy» oyınları oynaldı (Q.Ayımbetov)."},
    { word: "Aǵay", meaning: "at. Ózinen jası úlken kisi, atın bilmegen jası úlkenge xabarlasıw ushın qollanılatuǵın qaratpa sóz, sıpayılıq mánisinde jası úlkenge múrájat.", experience: "Allambergen aǵay abıraylı xojalıqqa aylandı (J.Aymurzaev)."},
    { word: "Aǵayin", meaning: "at. Tuwǵan-tuwısqan, urıwlas, ata-babaları tuwısqan adamlar.", experience: "Aǵayiniń kóp bolsa adam tiymes, kósewin uzın bolsa qolın kúymes (qq.x.n.) Sebebi Esengeldi menen Qosıbay ar-namısı sherik aǵayin edi (K.Sultanov)."},
    { word: "Aǵarańlaw", meaning: "f. Bir nárseniń shala-sharpı kóriniwi, uzaqtan bozarańlap kózge túsiwi, bozarıp kóriniw, eleslew.", experience: "Kún nurına shaǵılısıp, qarday aǵarańlaydı (Aybek). Aǵarańlap tań atıp kiyatır (Ó.Xojaniyazov)."},
    { word: "Aǵarmay", meaning: "at. Aǵartılǵan may, aq may, paxta mayı."},
    { word: "Aǵartıw I.", meaning: "f. Aq etiw, háklew, tazalaw, juwıw.", experience: "Íssı quyash aǵartıp jibergen qalpaǵın shaqqan kiyip shıǵıp ketti (K.Smamutov)."},
    { word: "Aǵartıw II.", meaning: "f. Sawatlandırıw, túsindiriw, oqıtıw, sawatın ashıw, bilimlendiriw.", experience: "Xalıq bárhama ádiwleydi senińdey, Aǵartıwdıń tuńǵısh qarlıǵashların (I. Yusupov). Shayır sózi menen oqıtıwshınıń kewlin, kózqarasın aǵartadı (G.Esemuratov)."},
    { word: "Aǵartıwshı", meaning: "at. 1. Aq etiwshi, háklewshi, tazalawshı. 2. Aǵartıw jumısın júrgiziwshi, xalıq arasında úgit-násiyat aparıwshı, sawatlandırıw isi menen shuǵıllanıwshı."},
    { word: "Aǵawız", meaning: "kel. Pispegen, shala, waqtı jetpegen, shiyki, waqtı tolmaǵan.", experience: "Sen qaraqalpaq, qazaq bolǵanda, Ketpenlep egin ekkende, Ketpenlep ekken eginiń, Ortada aǵawız qalǵanda (Kunxoja)."},
    { word: "Aǵash", meaning: "at. Terek, ádette, terektiń úlkeygeni, quwraǵı, qurılıs hám xojalıq islerinde paydalanılatuǵın shiyki zattıń túrine aytıladı.", experience: "Qonıp ǵarǵaday aǵashqa, Dúnyanıń máwsimin kórdim (Ótesh shayır). Aǵash ergenektiń ekewi de tabaldırıqqa shekem naǵısqa sırǵıp tur (K.Sultanov). Oń qaptalda aǵash kát (N.Dáwqaraev)."},
    { word: "Aǵza", meaning: "at. 1. Múshe. 2. Qanday da bir topar, aymaq hám t. b. jasawshı, oǵan tiyisli adam. 3. Qanday da bir mákeme, shólkem, jıyın aǵzası.",experience: "1.Adam yamasa haywan aǵzası. 2.Shańaraq aǵzası."},
    { word: "Aǵla", meaning: "kel. Jaqsı, artıqmash, ayrıqsha, artıq, ziyada, zıyat.", experience: "Súysen miyriń qanıp ol intizarıń, Bul dúnya beyishten aǵla kórindi (Berdaq). Bul aqılıń bárinen de aǵla bolǵan eken (Q.Ayımbetov)."},
    { word: "Aǵızıw", meaning: "f. Suyıqlıqtı shıǵarıw, tógiw,", experience: "Ǵayrı birewlerdi etip qurdasıń, júrme aǵızıp dilbarıńnıń kóz jasın (Berdaq). Janǵa jaylı aǵızadı til mayın, Qızıq sózdi túsiniwge dım qayım (I. Yusupov)."},
    { word: "Aǵılıw. I", meaning: "f. 1. Izi úzilmew, tógiliw, molayıw. 2. Shubırıw, ıǵılıw.", experience: "Kelgen kúnniń ózinde-aq ol áynek aldında otırıp, kóshede úzliksiz aǵılıp baratırǵan adamlarǵa qızıǵıp qaraytuǵın edi (R.Tagor)."},
    { word: "Aǵılıw II", meaning: "f. Ótip turıw, júrip turıw.", experience: "Baǵdarı bar gúl japıraǵın jamılǵan, sımlar boylap aǵılǵan (I. Qurbanbaev)."},
    { word: "Aǵım", meaning: "at. Baǵıt, baǵdar, ıńǵay, tárep, taman."},
    { word: "Arıs", meaning: "at. Suyıqlıqtaǵı háreket, qıymıl, suw aǵısı.", experience: "Úshewi taǵı da qosılıp, tómen qaray aǵıs penen aqırın aǵıp baratır (J.Aymurzaev)."},
    { word: "Aǵıw", meaning: "f. 1. Tógiliw, quyılıw, ıǵılıw, ıǵıw. 2. Suwdıń belgili baǵdardaǵı, háreketi, qıymılı.", experience: "Aqdáryadan suw aǵadı salmaǵa, Yar kiyatır salmadan suw almaǵa (qq.x.q.)."},
    { word: "Aǵıw-qarası", meaning: "at. Dúnyaǵa shıǵıp kórgeni, barı, birgenesi, jalǵızı.", experience: "Jaman dep aytsań da baydıń balasın, birewdiń kóziniń aǵıw-qarası (Omar)."},
    { word: "Aǵzam", meaning: "Ullı mártebeli, ullı dárejeli", experience: "Quda qálese patsha aǵzam puqaralarına miyrimin salar (K.Sultanov)."},
    { word: "Aǵıl-tegil", meaning: "Molshılıq, mol-molaqay, kóp, dım kóp, jetkilikli.", experience: "Bunnan basqa da onıń sútli sıyırı bolıp, may menen sút aǵıl-tegil edi (S.Ayniy)."},
    { word: "Ada bolıw", meaning: "f. Tawsılıw, tamam bolıw, sap bolıw, joq bolıw.", experience: "Bar ómirim boldı ada, Óttiń be qurǵan ómirim (Berdaq). Ada bolmas ayta berseń, zarlı ómirdi etseń dástan (Á.Shamuratov)."},
    { word: "Adaq arba", meaning: "at. Ayaq arba (balalardı júriwge úyretetuǵın aǵashtan islengen buyım).", experience: "Seniń balańa adaq arba soǵaman (T.Qayıpbergenov)."},
    { word: "Adalaw", meaning: "f. Tamamlaw, tawısıw, túwesiw, joq etiw.", experience: "Táwekel etip allańa, Shubar atıńdı tapsırdıń. Aytar sózińdi adalap («Alpamıs»)."},
    { word: "Adam ata", meaning: "at. Adam álayhissalam. Diniy isenim boyınsha Alla tárepinen jaratılǵan jer júzindegi eń birinshi adam hám adamzattıń atası.", experience: "Adam ata menen Hawa eneni (Áweneni) topıraqtan bina etedi (K.Sultanov)."},
    { word: "Adamgershilik ", meaning: "at. Múnásibetlilik, siz-bizlik, óz-ara sıylasıq, dos-yaranlıq, sanalılıq, kórgenlilik, hújdanlılıq.", experience: "Sırtqı pishińnen naǵız adamgershilikli júrek soǵıp turǵanlıǵın biliw qıyınǵa túspedi (I. Yusupov)."},
    { word: "Adamzat", meaning: "at. Barlıq adam balası, pútkil adam, qanday adam bolmasın barlıǵı.", experience: "Tawdı, tastı jel buzar, adamzattı sóz buzar (qq.x.n.). Adamzat hám eki túrli. Biri batır, biri qorqaq. Batırman dep kóp maqtansa, Sol adamnıń ózi qorqaq (S.Májitov)."},
    { word: "Adamxor", meaning: "kel. Adam qumar, asaw, jabayı, adam óltiretuǵın, qáwipli, jırtqısh, qutırǵan.", experience: "Adamxorday kózlerine qan tolǵan. Shashları mısalı jabaǵı turǵan (Á.Shamuratov)."},
    { word: "Adasıw", meaning: "f. 1. Jańılısıw, qátelesiw, joldan shıǵıw. 2. Jol tappaw, joldan shıǵıw, bilmey qalıw.", experience: "Aqmaq gáwir adastıń. Kúnde júrer jolıńnan («Er Ziywar»). Adamzat ay bolmasa adasadı, kewildi sóylespesen kir basadı (qq.x.q.)."},
    { word: "Advokat", meaning: "at. Zań xızmetkeri, birewdiń qılmıslı isi boyınsha sud aldında qorǵawshı, aqlawshı, jaqlawshı."},
    { word: "Adres", meaning: "at. Turatuǵın jer, mákan, mánzil.", experience: "Konverttiń sırtındaǵı jiberiwshiniń adresin oqısam «Karimov Abıldan» depti (A.Bekimbetov). 2. Birewge qaratılǵan sóz, zat. Bunıń ózi de meniń adresime bolǵan kritika (T.Nájimov)."},
    { word: "Adresat", meaning: "at. 1. Xat yamasa bir zattıń tapsırılatuǵın adamı, iyesi. 2. Yubiley jasındaǵı adamǵa yamasa mekemelerge beriletuǵın qutlıqlaw xatı.", experience: "Kóp xatlardıń arasında ayırım adresat belgisiz bolıp shıqtı (A.Bekimbetov). Adresat tabılmaǵanlıqtan xat qaytarıldı (A.Bekimbetov)."},
    { word: "Adım", meaning: "at. 1. Qádem, adam júrgende alǵa qaray taslanǵan qádemindegi eki ayaqtıń arası (aralıq jer). 2. Jetiskenlik.", experience: "Dárriw alǵa qaray altı-jeti adım attı (Q.Ayımbetov). Biraq bul tek dáslepki adımlar ǵana edi (Á. Shamuratov)."},
    { word: "Adırayıw", meaning: "f. Eleriw, tańlanıw, kózin shennen tıs ózgeshe etip qaraw, úreyleniw, ashıwlanıp qaraw.", experience: "Qurban kókshi balasına adırayıp bir qaradı da, Palmannıń sózine qalay juwap qaytarıwdıń jolın izledi (M.Abdraymov)."},
    { word: "Adır", meaning: "kel.Tegis emes, jol túspegen, ısılmaǵan.", experience: "Adır-adır tawlardan, Ardaqlay berip qashadı, Gúdir-gúdir qumlardan, Gúdirleydi basadı («Máspatsha»)." },
    { word: "Adıraq", meaning: "kel. Adırıq kóz, ádettegiden úlkenirek, adırayǵan, kózi baqanshaqtay.", experience: "Kózi úrkken tananıń kózindey adıraq kóz bir qız keldi (A.Begimov). Joq, bunday emes, dep esik jaqta bir betkey otırǵan adıraq kózli, jalpaq bet, aq quba jigit juwap berdi (K.Sultanov)."},
    { word: "Adır-budır", meaning: "kel. Jónli-jónsiz, qalay bolsa solay, áytewir, tegis emes.", experience: "Qızdıń jolı názik, oǵan adır-budır sóz aytıwǵa bolmaydı (M.Abdraymov)."},
    { word: "Ajar", meaning: "at. Kelbet, shıray, túr, tús, sımbat.", experience: "Betinde ótkir ajarı, beyish suwın ishkendey (Q.Maqsetov)."},
    { word: "Ajırasıw", meaning: "f. 1. Ayra túsiw, tarap ketiw, ayırılısıw, ayırılıp qalıw, bólekleniw, qol úziw. 2. Erli-zayıplılardıń nekesin buzıp, ayırılısıwı.", experience: "Balalardan ajırasqannan soń Turım iytler shabalanǵan jerge jaqınlap keldi de, suwınlap jıynalǵan pishenniń tasasınan sıǵaladı (K.Sultanov). Hásiret-qayǵı zil basıp, aqılınan ajırasıp (A.Dabılov)."},
    { word: "Ajırıq", meaning: "at. Tamırı jayılıp ósetuǵın kóp jıllıq jabayı mayda shóp.", experience: "Izimdi taǵı bilmesin dep ajırıqtıń ishi menen úyge qayttım (J. Aymurzaev).... úyine shekemgi ajırıq basıp jatatuǵın aralıq ajırıqlıqqa aylanıptı (T. Qayıpbergenov)."},
    { word: "Az", meaning: "r. 1. Jetkiliksiz, kóp emes, barlı-joqlı, az ǵana, azǵantay.", experience: "Bir qatar joldaslar menen sóylesip qarasam kúsh az deydi (K.Sultanov). Ol az ǵana tunjırap otırdı (K.Sultanov)."},
    { word: "Aza", meaning: "at. Tuwısqan, jaqın-juwıq qaytıs bolıwına baylanıslı qayǵırıw, matam tutıw.", experience: "Urıs-ólige aza, tirige-tamasha degen eken (A.Bekimbetov). Tańdı doslarım jaranı, Hesh qashırmadı arasın, Kiyinip ústine qaranı, Kóp jılasıp tuttım aza (Berdaq)."},
    { word: "Aza ton", meaning: "at. Aza ushın kiygen qara, kók kiyim.", experience: "Aza tonın jamılıp, Ata-anamnan ayırılıp (Berdaq)."},
    { word: "Azada", meaning: "kel. Tazalıqlı, taq-tuynaqtay, duwpiyaz.", experience: "Narzan bulaqları qanday azada, Seniń kewliń yanlı, tınıq hám taza (I.Yusupov). Azada qızlardıń qoynı, Jánnettiń baǵına megzer (Ájiniyaz)."},
    { word: "Azamat", meaning: "at. 1. Kámalǵa kelgen er adam. 2. Adamgershiligi bar, sana-sezimli, xúrmetli adam. 3. Adam atı, isim.", experience: "Azamat erdiń belgisi, az ǵana sóylep kóp tıńlar, arǵımaq attıń belgisi, az ǵana otlap kóp juwsar (qq.x.q.). Tuwrı tutsan niyetińdi, Xalıqqa bursań betińdi, Sıylasań ǵárip jetimdi, Shın azamat boladursań (Berdaq)."},
    { word: "Azamatlıq", meaning: "kel. Erlik, batırlıq, is meńgere alatuǵın, óz wazıypasın atqara biletuǵın.", experience: "Jas balanıń erlik, azamatlıq isine kewli tolǵan kapitan Sultannıń mańlayınan súyip aldı (A.Bekimbetov). Iske tayar turıw-azamatlıq is, Márt bolsań el ushın jumsań jiger-kúsh (X.Seytov)."},
    { word: "Azan", meaning: "at. 1. Tań atar mezgil, erte waqıt. 2. din. Elattı namazǵa shaqırǵanda yamasa tuwılǵan nárestege at qoyǵanda aytılatuǵın namazdıń kirispe bólimi.", experience: "Allambergen aǵa azanǵı chaydı iship otırǵanda men de kirip barǵan edim (J.Aymurzaev). Azanǵı shıq penen aq pishendi sáskege shekem orıp qaytadı (K.Sultanov). Azan aytıp Alla dep, Erteli kesh baqırar («Er Ziywar»). Mázin namazsham namazınıń azanın jańa ǵana ayttı (L.N.Tolstoy)."},
    { word: "Azan-ǵazan", meaning: "r. Uw-shuw, baqırıs, ala topalań, tártipsiz, qalay bolsa solay, biytártip.", experience: "Mallar da... mónirep awıldıń arasın azan-ǵazan qıldı (M.Abdraymov). Muz ıqqannan beri awıl arası azan-ǵazan boldı (M.Abdraymov). Mónirep kiyatırǵan árwana sıyırlardıń dawısı biydiń basın azan-ǵazan etti... (K.Sultanov)."},
    { word: "Azanlı-keshli", meaning: "r. Mezgili menen, azanda da, keshte de, bárhama.", experience: "Qas qaǵıp, sharap ishpege, Taraqlap belden qıspaǵa, Azanlı-keshli túspege, Sárhawızıń tur Qulen bolıs (Berdaq)."},
    { word: "Azap-aqıret", meaning: "at. Qıyınshılıq, jamanlıq, zulımlıq, qayǵı-hásiret, ıza, qorlıq, zorlıq-zombılıq.", experience: "Húrlimannıń baqsı bolǵanın Qaraqumnıń iyshanı esitip, shaqırtıp alıp Berdaqqa kóp azap-aqıretler beredi (Q.Ayımbetov)."},
    { word: "Azaplaw", meaning: "f. Qıynaw, zorlıq kórsetiw, jábirlew, azap beriw, qorlaw, zorlıq etiw.", experience: "Joq... gúmansız, haq qızdı sawal-juwapqa tutıp azaplawıńızǵa jol qoymayman (R.Tagor). Biraq, batırdı azaplaw da, zindan da, dar da qorqıta almadı (Q.Maqsetov)."},
    { word: "Azar", meaning: "at. Azap-aqıret, qıyınshılıq. Azar shegiw-qıynalıw. azaplanıw, aqıretleniw. Azar beriw-qıynaw, azap beriw, aqıretlew.", experience: "Bunday azarǵa kóniwge bolmaydı (M.Gorkiy). Men bunnan azar shegip, zordan júrmen (Q.Jumaniyazov). Azar bermey oyatıp, Kelgendegi jumısın, Aydosqa bular aytadı (Berdaq). Kelgen razvedchiklerden eki adam jeńil jaralanǵan, biraq júriwge jaraları azar bererlik emes (Q.Dosanov)."},
    { word: "Azat", meaning: "at. Erkin, ǵárezsiz, bostan, óz erki ózinde, qolı bos.", experience: "Jaqsılıq xabar alıp kelgen Ótemurat edi, Ernazardıń azat bolǵanına ayaǵı sayǵa tiymeydi (K.Sultanov)....úyge ákelip baspaǵıma, az ǵanasın saldım, endi men úy jumısınan da azatpan (Á.Shamuratov)."},
    { word: "Azat etiw", meaning: "f. Erkin etiw, bostanlıqqa shıǵarıw, erkti ózine beriw, basın bosatıw.", experience: "Olardıń tiykarǵı wazıypası adamlardı baylardıń ómiri menen onıń ámeldarlarınıń zulımınan azat etiw (S.Ayniy)."},
    { word: "Azat etiwshi", meaning: "at. Óz erkine jiberiwshi, bostanlıqqa shıǵarıwshı, erk beriwshi, huqıqın alıp beriwshi.", experience: "Koreya menen Qıtaydıń azat etiwshi armiyası basqınshılardı Koreyadan quwa baslaǵan (J.Aymurzaev)."},
    { word: "Azatlıq", meaning: "at. Bostanlıq, darqanlıq, erkinlik.", experience: "Aqtı gúwlep azatlıqtıń dáryası, Háddiń joq baylawǵa shalqar saǵası (K.Sultanov)."},
    { word: "Azbaw", meaning: "f. Adaspaw, jańılıspaw, degbirden saspaw, ózgermew, albıraqlamaw, aynımaw.", experience: "Men oǵan joldan azba dep urısaman (Q.Sultanov). Adamnan azǵan jabayı jırtqısh, qanǵa qumar zalım (Q.Dosanov)."},
    { word: "Azǵan", meaning: "f. Aynıǵan, awǵan, ózgergen, buzılǵan.", experience: "Fashist adamnan azǵan jabayı jırtqısh, qanǵa qumar zalım (Q.Dosanov)."},
    { word: "Azǵırıw", meaning: "f. Aynıtıw, úgitlew, buzıw, sóz beriw.", experience: "Aldanıp turıpsań shınnan berilip, Azǵırıp sózine babanın erip («Máspatsha»). Kópshilik aǵayin azǵırıp, aqırı Sarıgúldiń de wádesin aldı (K.Sultanov)."},
    { word: "Azday", meaning: "r. Azıraq qusaǵan, jetkilikli emestey, jetpegendey.", experience: "Kósew qılıp qoyǵanı azday, xan elimizdi talatadı (T. Qayıpbergenov). Meniń burınǵı dártim azday, ákemniń egil-tegil bolıp jılawı dárt ústine dárt jamap júregimdi parra-parra etip jaraladı (Ó.Xojaniyazov)."},
    { word: "Azdan", meaning: "r. Az-azdan, kem-kemnen, birden emes, keyinirek, sońınan, birimlep.", experience: "Azdan soń umıtıp qalǵan qarmaqlarımdı alıwǵa kelsem, ákem úyde joq eken (K.Smamutov). Azdan soń Mısqal peri oyanıp qarasa, qasında bir jigit sulap jatır (Q.Ayımbetov)."},
    { word: "Azlap", meaning: "r. Azıraq, azı-kem, ebindey, kóp bolmasa da.", experience: "Ishimizde Samender degen bir jigit bar, ol sol waqıtta azdan qosıq shıǵaratuǵın hám qaraqalpaq namaların da jaqsı biletuǵın edi. Seni azlap tanıyman, azı-kem bilemen... (Ó.Xojaniyazov)."},
    { word: "Azlaw", meaning: "r. Azıraq, kemirek, shamalı, azı-kem, sál, bolar bolmas.", experience: "Bul maǵan azlaw balam, - dedi ǵarrı (gazetadan)."},
    { word: "Az-maz", meaning: "r. Qurttay, shamalı, azıraq.", experience: "Az-maz jılınıp alsaq qalay bolar eken, - dedi ol (A.Áliev). Qız maǵan az-maz qarap turǵansha jańaǵı kelinshek penen shıǵıp ketti (G.Izimbetov)."},
    { word: "Azna", meaning: "at. Adamlar otırıw ushın qayıqtıń ústindegi kese tartılǵan aǵashı.", experience: "Bir kisi, Egor ma deymen, ayaǵın aznaǵa tiredi («Sálem Oktyabr» T.). Otız kemeniń aznası Sóz xalıqtıń ǵaznası (qq.x.n.)."},
    { word: "Aznaw", meaning: "f. Kisnew, maldıń shuwlawı, qayǵılı dawıs shıǵarıw.", experience: "At qalǵanın ańlap, Nala tartıp aznadı («Alpamıs»)."},
    { word: "Azshılıq", meaning: "at. Az sanlı, az muǵdar.", experience: "El qurıldı shaqaplandı jurtshılıq, Xızmetkerler ádep qıldı azshılıq (Q.Irmanov)."},
    { word: "Azıq-túlik", meaning: "at. Azıq-awqat, kerek-jaraq.", experience: "Beldarshılar hám onıń bala-shaǵaları izli-izinen kelip, azıq-túliklerin arbaǵa salıp atır (K.Sultanov). Ekewiniń de ústinde ele tozıwı jete qoymaǵan áskeriy kiyimler, qollarında azıq-túligi (Q.Dosanov)."},
    { word: "Azıqshı", meaning: "at. Azıq beriwshi, azıq tarqatıwshı, azıqtı jetkeriwshi, azıq tasıwshı.", experience: "Azıqshını ishke kirgizbey, bendelerge qarawıllar úlestiretuǵın edi (T.Qayıpbergenov)."},
    { word: "Azımshıq", meaning: "kel. Ádewir, bir talay, oǵada, keskinsiz, az emes, biraz, táwir-aq, bir qıylı.", experience: "Biz bul jerge azımshıq miynet etkenimiz joq (Ó.Xojaniyazov). Bılshıyǵan dep betindi, Azımshıq emes sın taqtı («Qırq qız»)."},
    { word: "Azınawlaq", meaning: "r. Azǵana, kóp emes, jarım-jartı, shamalı, bolar-bolmas, kemirek.", experience: "...azınawlaq kún generaldıń jerinde erksiz jumıs isleydi (Q.Dosanov)."},
    { word: "Azıp-tozıw", meaning: "f. Boldırıw, júdep qalıw, moy beriw, albıraw.", experience: "Kúni-túni tınım tappay zır juwırıp júrgen záberdes kelinshek tórt-bes aydın ishinde-aq azıp-tozıp qaldı (A. Bekimbetov)."},
    { word: "Azıw.I", meaning: "at. Tańlay tis, úlken tis, ótkir, mıqlı, awızdıń eki qaptalında awqat jew ushın eń kereklisi.", experience: "Azıw tislerinen álle qashan ayırılıp qalǵan (J.Aymurzaev)."},
    { word: "Azıw.II", meaning: "f. Boldırıw, júdew, arıqlaw, buzılıw.", experience: "Zaman qısletinen sarǵaydım azdım. Bolar ma dep jaqtı kúnler xalıq ushın (Berdaq). Aq kewilliniń atı azbaydı, tonı tozbaydı (qq.x.n.)."},
    { word: "Azıwday", meaning: "kel. Azıwǵa usaǵan, azıw sıyaqlı mıqlı.", experience: "Jetimlerden hám biy, bay balalarınan qay-naqay azıwday eliw atlı (T.Qayıpbergenov)."},
    { word: "Azıwlasıw", meaning: "f. Ayqasıw, urısıw, qarsılasıw, ashshılasıw, dushpan menen sınasıw, tislesiw, shayqasıw.", experience: "Hesh waqta shoshqa shoshqanı, Azıwlasıp jarǵan emes (Berdaq)."},
    { word: "Azot", meaning: "Tógin, dáris ushın paydalanılatuǵın ximiyalıq element.", experience: "Azottıń, fosfordıń hár gektarǵa qansha ekenin aytıp otırmayman (Q. Dosanov)."},
    { word: "Azsınıw", meaning: "Kemissiniw, kewli pitpew.", experience: "Azsınıp tursız ba aǵa, jigitlerdiń de tabısın kóremiz (K. Sultanov)."},
    { word: "Azbıray", meaning: "Qural-ásbap, qural-sayman, kerek-jaraq."},
    { word: "Azıq", meaning: "Awqat bolatuǵın nárseler.", experience: "Altı qız minip arbaǵa, azıǵın salıp dorbaǵa, aytıw-mereke barmaǵa, qızlar talap etken eken (Berdaq)."},
    { word: "Azıraq", meaning: "Azǵana, shamalı, kishkene, kóp emes.", experience: "Tamaqtan awıstırıp tuqımǵa saqlaǵan azıraq arpa-jazlıq bar edi, - dedi Turımbet (N.Dákaraev)."},
    { word: "Azıw", meaning: "Tanlay tis, úlken tis, ótkir, mıqlı.", experience: "Azıw tislerinen álle qashan ayırılıp qalǵan (J.Aymurzaev)."},
    { word: "Azǵın", meaning: "Júdew, arıq, eti ketip súyegine taqalǵan, boldırǵan.", experience: "Betinde qan joq, azǵın (T. Qayıpbergenov)."},
    { word: "Aybana", meaning: "at. Qáwender, arqa súyer, tirenish, qorǵanısh, abay, súyenish, tirek."},
    { word: "Ayǵır", meaning: "at. Úyirde pishilmegen erkek jılqı.", experience: "Atıń ayǵır bolsa, jat ta qayǵır (kk.x.n.)."},
    { word: "Ayda", meaning: "f. Júrgiz, aldına sal, jolǵa sal, jolǵa túsir, tart jónine ket.", experience: "Ne de bolsa baxtıńnan kórerseń, ayda awılıńa (Ó.Xojaniyazov)."},
    { word: "Ayda-jılda", meaning: "r. Anda-sanda, ara-tura, hár waqta.", experience: "Awıl úydiń qonaǵı ayda-jılda bir keledi (kk. x.n.). Ayda-jılda bir kelippen, Aq júzińdi kórmege (Q.Ayımbetov)."},
    { word: "Ayday", meaning: "kel. Ay sıyaqlı, ay taqıletli, jaqsı, sulıw, júdá jaqsı, aytıwlı.", experience: "Jarqıraydı betiń ayday, Tuwǵan anań seniń qanday, Sóziń shiyrin, tiliń palday, Periyzattan artıq kelin (Berdaq)."},
    { word: "Ay júzli", meaning: "kel. Ayrıqsha sulıw, ay menen kúndey.", experience: "Ay júzli, pal sózli, dilbarım nege kelmedi (Ájiniyaz). Ay júzi kúndey nurlanıp, Júregi hallas urǵan qız (B.Qayıpnazarov)."},
    { word: "Ayqay", meaning: "at. Baqırıs, badabad, shawqım, kózaba.", experience: "Shıday almay jigitler qurı ayqay saladı («Qırk qız»)."},
    { word: "Ayqulaq", meaning: "at. astr. 1. Nur hám suw tamshılarınan payda bolatuǵın forması reńli yarım ay taqılettegi atmosferalıq qubılıs. 2. Adamlardıń, janlı-janıwarlardıń qulaǵınıń artqı súyek forması.", experience: "Tekeniń saqalınıń astında uyqılap jatqan bir ǵarrınıń kózine bir ayqulaq túsedi (qq.x.e.)."},
    { word: "Ayqulash", meaning: "at. Oyınnıń atı, eski oyınlardıń bir túri.", experience: "Ayqulash, ayqulash, Ayǵa qarap qulash ash, Aydan basqa kim kerek, Aydan artıq qız kerek (qq.x.e.)."},
    { word: "Ayqın", meaning: "kel. Ashıq, anıq, belgili, naqma-naq.", experience: "Máspatsha dástanında xalıqtıń ótkendegi Turmısınıń ayqın kartinaları súwretlengen (kiris sóz). Buǵan onıń mınaday shın danalıq sózleri ayqın dálil (I.Saǵitov)."},
    { word: "Ayqırıw", meaning: "f. Baqırıw, qıshqırıw.", experience: "Mine zavod birese berdi ayqırıp, Bir baqırdı poezd oǵan tay turıp (T.Seytjanov)."},
    { word: "Aylana", meaning: "at. Qır dógerek, átirap, ján-jaq, tórt tárep.", experience: "Biziń komandir bizdi kózi menen bir sholıp aylanaǵa qaradı (ád. jıyn.). Aylanasına úlken mazmun toplawı menen ulıwma ádebiyatımızdıń jolın baslap júrdi (G.Esemuratov). Aylana jiyek qaraydı (qq.x.q.)."},
    { word: "Aylanba", meaning: "at. Burılıs, joldıń aylanıp ótetuǵın jeri.", experience: "Tank joldıń aylanbasına kelgende, onıń shep búyiri Quwanıshtıń nıshanasına dál keldi (Q.Dosanov)."},
    { word: "Aylap", meaning: "r. Aylar boyı, kóp waqıtlar.", experience: "Sonlıqtan suw tasıw máwsiminde qayıqqa mútáj awıl bir-birine eki-úsh aylap qatnasa almadı (K.Sultanov)."},
    { word: "Aylı", meaning: "kel. Ayı bar, ay jarıǵı túsken tún, aylı tún.", experience: "Tumlı-tusın túrli gúl basqan, Sup-sulıw, aylı kóshede (B. Qayıpnazarov)."},
    { word: "Aylıq", meaning: "at. 1. Aqsha, pul, is haqı. 2. Waqıt, mezgil, muǵdar.", experience: "Vedomost boyınsha aylıq alıw. Jamanǵa tún de qaranǵı, kún de qarańǵı, oshaqtıń ush-pushı úsh aylıq jol (qq.x.e.)."},
    { word: "Ayma-ay", meaning: "r. Ay sayın, hár ayda.", experience: "Kún sayın kórkeyip, ósip ayma-ay, Óshpes baxıt nurın shasha basladı (S.Nurımbetov)."},
    { word: "Aymaq", meaning: "at. Bir betkey jer, átirap, dógerek, óz aldına bir bóleklengen kólemli jer, bir topar qonıslasqan xalıq.", experience: "Aynalayın, aymaǵım, shóllegende suwsınım (qq.x.q.). Qızdı oradı mamıqqa, Baǵıw ushın may, qaymaqqa, Bildirmey awıl-aymaqqa, Óz islerin etken eken (Berdaq)."},
    { word: "Aymalaw", meaning: "f. Álpeshlew, erkeletiw, jubatıw, aldastırıw, sıypalaw, qádirlew.", experience: "Sol uyadan túlegenmen, ushqanman, Talay dawıl aymalaǵan tósimdi (I. Yusupov)."},
    { word: "Aymanday", meaning: "kel. Tap-taza, pákize, kewildegidey, tep-tegis, bir tegis, tap-taqır, mıstay.", experience: "Úydiń dógeregi aymanday, tap-taza etip qoyıldı, ... (gazetadan)."},
    { word: "Ayna", meaning: "at. 1. Bir nárseniń kórinisin qayta sáwlelendiretuǵın zat, buyım. 2. Jayǵa jaqtılandırıw hám hawasın tazalaw ushın qollanılatuǵın qurılıs buyımı.", experience: "Ayna kerek bolsa júzin kóriwge, Suw da kerek jasap ómir súriwge (Ád. al.). Ayna aldında qońır tartsa da, xalıq aldında júzlerin jarqın (G.Esemuratov)."},
    { word: "Aynaday", meaning: "kel. 1. Taza, tap-taza, girbińsiz, gúmansız, 2. Aynaǵa usaǵan, ayna yańlı.", experience: "Uyalǵan tek turmas degendey etiginiń tumsıǵı menen sırlı edenniń aynaday júzin qırshıdı (A. Bekimbetov). Injenerdiń aynasınan, Túnlerde sónbes jaqtı (I.Yusupov)."},
    { word: "Aynalıp-úyiriliw", meaning: "f. Qayırqomlıq kórsetiw, ǵamxorlıq etiw, kútimin beriw.", experience: "Qaptalına kelgen aq tazını aynalıp-úyirilip, eki kózin sıypap tur (K.Sultanov)."},
    { word: "Aynanayın", meaning: "T.s. Adamnıń birewdi jaqsı kórip ózine tartıw sezimi.", experience: "Aynanayın, appaǵım, Qozı júnli qalpaǵım (Q.Ayımbetov). Perzentindey kúlip oǵan der eljirep: aynanayın (I.Yusupov)."},
    { word: "Ayna-taraq", meaning: "at. Hayal-qızlardıń kerek jaraǵı, aynası, taraǵı t. b. zatları.", experience: "Ayna menen taraq bar, Almasań da qarap qal (qq.x.n.)."},
    { word: "Ay nurı", meaning: "at. Ay sáwlesi, ay jarıǵı.", experience: "Ekewi de qumar eter tún gezip, Ay nurına júzi gúl-gúl janıptı (T.Seytjanov)."},
    { word: "Aynımaǵan", meaning: "kel. Dál ózi, usaǵan, tap ózindey, ózgermegen."},
    { word: "Aynıtıw", meaning: "f. Ózgertiw, buzıw, sóz beriw, basqa jaqqa dóndiriw.", experience: "Hayalın aynıtıp júrgeni de ıras, otinishimizdi pitirmeseń kórermizdaǵı, dep ketkeni de ıras (Q. Irmanov)."},
    { word: "Ay-pay: ay-payına qaramaw", meaning: "r. Áyle-páylesine qaramaw, olay-bulayına qaramaw, tezletiw.", experience: "Aytbaydıń ay-payına qaratpay: Aq patshanıń hámirine muwapıq márdikarǵa alındıń, jaqında keteseń, dedi (M.Dáribaev)."},
    { word: "Aypap-jaypaw", meaning: "r. Basqılaw, jaypap taslaw, búldiriw."},
    { word: "Ayraq-tayraq", meaning: "kel. Qalay bolsa solay, áytewir, parıqsız, retsiz, tártipsiz, jónli-jónsiz.", experience: "Sonlıqtan onı ayraq-tayraq etip jazılǵan qoljazbalar qorqıttı (Yu. Leontichev)."},
    { word: "Ayralıq", meaning: "at. Judalıq, intizarlıq.", experience: "Kútilmegen ayralıqtıń azabı, Qayıspastay jas kewilge dárt saldı (I. Yusupov). Eki ashıq bir qosılıp júre almay, Ayralıqtan biri-birin kóre almay (A.Dabılov)."},
    { word: "Ayran", meaning: "at. Aǵarǵannıń bir túri, qatıqtı pisip mayın alǵannan keyingisi.", experience: "Ayran tilep kelipseń, shelegińdi jasırma (qq.x.n.)."},
    { word: "Ayran-shalap", meaning: "at. Aǵarǵannıń túri, qatıq, sút, suw qosılǵan aǵarǵan.", experience: "Kúni menen jol qaqqan jolawshılar ayran-shalapqa qayıl (X.Seytov). Buyaqtaǵı kórgen qorlıq-azap shay ornına ishken ayran-shalaptı. Qushaqlasıp aytatuǵın kún qayda? (Kúnxoja)."},
    { word: "Ayrı", meaning: "at. Temir jaba, eki yamasa úsh-tórt tisli, ayrı tis, ushı eki ayrı.", experience: "Chaydı qoy, pátirdi qoy, qolıńa ayrı, arqan al (Ájiniyaz)."},
    { word: "Ayrıqsha", meaning: "r. Óz aldına, erekshe, bir bólek, ózgeshe, kewil awdararlıq, bólekshe.", experience: "Batır tuwǵan atadan, Ayrıqsha tuwǵan anadan, Aydos degen babamız, Xandı kózge ilmedi (Berdaq). Kópshiliktiń arasınan álle birewdiń dawısı ayrıqsha shıqtı (Ó.Ayjanov)."},
    { word: "Ayırılmas", meaning: "kel. Ayırılmaytuǵın, bekkem, ózgermeytuǵın, ajıralmas, bóleklenbeytuǵın, tıǵız.", experience: "Shamurat penen Grisha ayırılmas dos edi (Q.Dosanov), Surtayshadan bul qayǵımdı alıńlar, Ayırılmas basına qayǵı salıńlar («Qırq qız)."},
    { word: "Aysız", meaning: "kel. Ay batqanda, ay tuwmay turǵanda, qaranǵıda.", experience: "Aysız túnde jol júriw qanday qıyın (Ó.Ayjanov). Aysız qarańǵı túnlerdiń biri edi (ád. xrest.)."},
    { word: "Ayt I", meaning: "f. Sóyle.", experience: "Meyli, biraq tez ayt. (A.Áliev.)."},
    { word: "Ayt II", meaning: "at. Bayram, mereke, toy-tamasha.", experience: "Aytlar aytlap, toylar toylap júrgende, Biziń eldiń keliniseń degen sóz. Ata-anam qulaǵımnan ketpeydi («Alpamıs»)."},
    { word: "Ayta-ayta", meaning: "f. Qayta-Qayta ayta beriw, tákirarlap aytıw.", experience: "Basıńda bolmasa taǵıń, Ayta-ayta talar jaǵıń (Berdaq). Oqıp shıqtım qayta-qayta, Júrdim onı ayta-ayta, Kóp oyladım dep pe qáte. Tariyxın bilmegen edim (Berdaq)."},
    { word: "Ay", meaning: "Aspan denesi, jerdiń joldası, belgili bir muǵdar ishinde túnge jarıq berip turatuǵın aspan keńisligindegi dene.", experience: "«Esime túser meniń, Suw boyına kelgeniń, «Ay ne ushın jalǵız» dep, sırlı sawal bergeniń... (I.Yusupov)."},
    { word: "Aybalta", meaning: "Baltanıń qural ornına qollanılatuǵın ádette, patshalar qolına alıp otıratuǵın quralı, jaraq.", experience: "Sol waqıtları Surtaysha, Aybaltası qolında, Alarıp turdı ornınan («Qırq qız»)."},
    { word: "Aybaraq", meaning: "Bada-bad, aybat, abay-siyasat.", experience: "Qolǵa uslap jaw-jaraǵın, Salıp bular aybaraǵın, Siltedi barlıq jaraǵın, Qızdı baylap almaqshı eken (Berdaq)."},
    { word: "Aybat", meaning: "Túr-tús, qáhár, saltanat.", experience: "Buzaw iytlerge aybat etti, Perigúl jibermey, moynınan qatıp uslap tur (Ó.Ayjanov)."},
    { word: "Aybatlı", meaning: "Ǵayratlı, qáhárli.", experience: "Atam aybatlı kisi edi (S.Saliev)."},
    { word: "Aybınıw", meaning: "Tartınıw, batına almaw, qorqıw.", experience: "Gá bir qaytpalardan aydarlı ushan keme aydaǵan darǵashılar da aybınıp ótedi (K.Sultanov)."},
    { word: "Ayǵaq", meaning: "Belgi, gúwa, dálil, kórinis.", experience: "Asfalt jolın ıǵbalınıń ayǵaǵı... (I.Yusupov)."},
    { word: "Aydala", meaning: "Alanlıq, ashıqlıq, maydan, elsizlik, adamsız, elsiz, qula dúz.", experience: "Kewli tolıp óz isine Jumannıń, Aydalada kókti gezdi qıyalı (T.Seytjanov)."},
    { word: "Aydar", meaning: "Belgi, jas balalardıń tóbesine qoyılatuǵın bir tal shash, tulım.", experience: "Mamannıń qalpaǵın alıp aydarınan bir súydi (T.Qayıpbergenov)."},
    { word: "Aydın", meaning: "Ashıqlıq, kólat, jazıqlıq, tegislik, tuwra jol, ashıq, taza, keńislik.", experience: "Aydın kólden payda joq, Razı bolmasa kelinde («Er Ziy war»)."},
    { word: "Ayqas", meaning: "Urıs, jekpe-jek, jánjel, gúres.", experience: "Jańa turmıs ushın ayqas jolında, júr edim, ol maǵan jolıqtı sonda (I.Yusupov)."},
    { word: "Aylaw", meaning: "At jarısınıń belgili bir muǵdardaǵı shawıp keletuǵın yamasa shawıp ótetuǵın jer ólshemi."},
    { word: "Aytıs", meaning: "Folklorlıq keyingi janr.", experience: "Usınday házil aytıstan keyin Berdaq penen Ótesh shayır ekewi qattı dos boladı (I.Saǵitov)."},
    { word: "Ayıpker", meaning: "Gúnalı, ayıplı, qılmıslı, ayıpdar.", experience: "Joq men ayıpsız ayıpkermen (A.Bekimbetov)."},
    { word: "Aytaqır", meaning: "at. 1. Alańlıq, dalalıq, maydanlıq, keń jazıqlıq. 2. Joqshılıq, kemtarlıq.", experience: "Ushı aytaqır ushı qıyrı menen shet-shebirine kóz jetkisiz, Shelpekliniń dalası (Ó.Xojaniyazov.)"},
    { word: "Aytar", meaning: "f. Aytatuǵın, aytajaq.", experience: "Ǵarrı Sheripke aytar sózin aytıp boldı (K.Irmanov). Aytarımdı ayttım da, ózimdi áwelgiden bir qansha jeńil sezdim (Ó.Xojaniyazov)."},
    { word: "Aytsa", meaning: "f. Ayt feyiliniń shárt forması."},
    { word: "Aytım", meaning: "at. Toylarda, betasharlarda, qız-jigit otırıspalarında aytıstıń túrleri, óli ólgen jerde joqlaw (aytım) aytıp jılaw t.b. jaǵdaylarda qollanılatuǵın sóz.", experience: "Aytım aytqan qáynińdi, sıyla, sıylama ózin bil (kk.x.s.j.). Qáne, aytım aytatuǵınlarıńız bar ma? («Ámiwdárya» j.)."},
    { word: "Ayshıq", meaning: "at. Burınǵı waqlarda, hayal-qızlardıń bezeniw ushın ónirine taǵatuǵın zatlarınıń bir túri.", experience: "Qubıljıtıp naǵıs oyǵan alqımdaǵı ayshıq súyek, Súynementtey sawrı betke omırawdan tústi qulap (I. Yusupov)."},
    { word: "Ayı", meaning: "at. 1. Kúni, waqtı, mezgili.", experience: "Salqın tartqan gúz ayınıń tańı onıń sharshaǵan ıssı denesine jaǵımlı tiydi(A.Bekimbetov)."},
    { word: "Ayıǵıw", meaning: "f. Dúzeliw, táwir bolıw, jazılıw, kelege keliw, jaqsarıw, qáddine keliw.", experience: "Kóp keshikpey ol usı awırıwınan ayıqtı (Ó.Ayjanov)."},
    { word: "Ayı-kúni", meaning: "at. Waqtı, mezgili.", experience: "Kórinler bul hasıl zattı, Esitińler iltifattı, Qádir aqsham tolǵattı, Ayı-kúni tolǵan eken (Berdaq)."},
    { word: "Ayıl", meaning: "at. Teletińnen islengen, minis kóligin ertlegende onıń belinen shalatuǵın (oraytuǵın yamasa belinen baylaytuǵın), erdiń awmawı ushın onı bekkemlep kóliktiń arqasına tańıp qoyıw ushın arnalǵan qural-saymanlardıń biri.", experience: "Atlarǵa erdi salayıq, Ayıldı bekkem shalayıq («Qırq qız»)"},
    { word: "Ayıp", meaning: "at. Ersilik, gúnakarlıq, hádden tıs háreket, qátesi, gúnası, jaman  is.", experience: "Haw gúbelek, maqtanasań shalqayıp,  Bilmey turıp kemis  tapsań bul - ayıp (I.Yusupov)."},
    { word: "Ayırma", meaning: "at. Parıq, ózgeshelik, basqalıq, belgi."},
    { word: "Ayırım", meaning: "r. Bólek, óz aldına, bazıbir, geybir.", experience: "Qaraqalpaq jerine xızmetke kelgen, kelip islegen ayırım rus adamları da úlkeni úyreniw menen shuǵıllana basladı (B.Ismaylov). Hár kimniń xojalıǵı ayırım, ózlerine dárek bólmesi boladı (T. Qayıpbergenov)."},
    { word: "Ayıw", meaning: "at.  Jabayı haywan.", experience: "Jalǵızlıq penen azlıqtıń, dáwiri ketti kelmeske, Bólinseń bóri ayırılǵan, Adamdı ayıw jemes pe?! (I. Yusupov)."},
    { word: "Akademik", meaning: "at. Ilimiy ataq, eń joqarı ilimiy dáreje, Ilimler akademiyasınıń haqıyqıy aǵzası.", experience: "Akademik Aybek shayır, Ǵafurday, Hár bir sózi tobılǵınıń torınday (K.Sultanov)."},
    { word: "Akademiya", meaning: "at. Eń joqarǵı ilimiy mákeme. Ilimler akademiyasınıń sessiyası."},
    { word: "Akaciya", meaning: "at. Terektiń bir túri, gúlleydi, aq gúlli hám jaqsı iyis beredi.", experience: "Muhabbattıń urıǵınday, ósti bir túp akaciya (I. Yusupov)."},
    { word: "Akkordeon", meaning: "at. Muzıqalıq saz ásbabı. Akkordeon shertiw."},
    { word: "Akrobat", meaning: "at. Cirkte gimnastika kórsetiwshi sportshı, jeke adamnıń óz kúshi arqalı orınlaytuǵın usılı."},
    { word: "Aksioma", meaning: "at. Hesh bir dálillewdi talap etpeytuǵın ilimiy shınlıq."},
    { word: "Akt", meaning: "at. Hújjettiń bir túri. Gúwalıq ushın dúzilgen akt, ayıplaw yamasa qabıllaw ushın dúzilgen akt."},
    { word: "Aktyor", meaning: "at. Sahnada túrli sheberlik penen unamlı yamasa unamsız obrazlardı beriwshi adam, artist.", experience: "Á.Ótepov talantlı dramaturg, rejissyor hám aktyor (Á.Nasrullaev)."},
    { word: "Aktiv", meaning: "at. 1. Issheń, talapshań, shaqqan, qızǵın pát penen is júrgiziwshi kisi, belsendi.", experience: "Wazıypalı isti qarawǵa, keshte jıynalıstı qolxoz aktivi (T.Seytjanov). Kolxozlasıw dáwirinde Reypnazar júdá aktiv jumıs islegen jigit, ózi muǵallim (S.Xojaniyazov)."},
    { word: "Aktovıy", meaning: "at. Úlken, arnawlı, jıynalıslar, koncertler ótkeriwge qolaylastırıp salınǵan bólme, ójire.", experience: "Qız benen ekewimiz aktovıy zaldan shıqtıq ta, bos bir auditoriyaǵa bardıq (G.Izimbetov)."},
    { word: "Aktrisa", meaning: "at. Teatr sahnasında hár túrli pesalarda oynawshı, qosıq aytıwshı, túrli róllerdi atqarıwshı hayal.", experience: "«Aktrisanıń ıǵbalı» (I. Yusupov)."},
    { word: "Aktual", meaning: "kel. Áhmiyetli, qájetli, kerekli.", experience: "...házirgi waqıtta da aktuallıǵın joyıtpaǵan (K.Maksetov)."},
    { word: "Akusher/akusherka", meaning: "at. Náresteniń dúnyaǵa keliw procesinde medicinalıq járdem kórsetiwshi shıpaker."},
    { word: "Akcent", meaning: "at. Óz ana tiliniń seslik ózgesheliklerin basqa tilde sóylew waqtında da saqlap sóylew.", experience: "Jaqsı bolıp ketedi, qısınbań, dedi vrach qız jergilikli tilde akcent penen sóylep (A.Bekimbetov)."},
    { word: "Aq", meaning: "kel. Appaq, jaqsı, taza.", experience: "Yoshıp kewlin shadlıq artıp, Aq qaǵazǵa qálem tartıp (Á.Shamuratov)."},
    { word: "Aqaba", meaning: "at. Sırqındı, qaldıq, qalǵındı suw."},
    { word: "Aq biyday", meaning: "at. Biydaydıń sortı.", experience: "Aq biydayı turıp sulı sepkennen, Taza salı turıp shigin ekkennen. Jónsiz qırk kún qayǵı-uwayım shekkennen, Densawlıqta bir kún shadlıq jaqsıraq (Berdaq)."},
    { word: "Aqbaslıq", meaning: "kel. Aqbas shóplerdiń kóp ósken jeri.", experience: "Adam bilmes aqbaslıqta jatırman, Kerek bolsam óziń izlep tawıp al (qq.x.q.)."},
    { word: "Aq basqur", meaning: "at. Qara úydiń ózine tiyisli tiykarǵı baw-shuwlarınıń biri.", experience: "Al, endi bunıń baw-shuwı, sırtqı janbaw, ishki janbaw, aq basqur, qızıl baskur, bel jip, onı aqtan tabıw, qullası, úyge kerek-jaraqtı tabıw kerek boldı (K.Ayımbetov)."},
    { word: "Aq bilek", meaning: "kel. Tolıq, jumırı, aq, sulıw formalı bilek.", experience: "Aq bilegiń bolmasa, Altı jerden qas qoyıp, Bilezik salmaq ne payda (K.Ayımbetov)."},
    { word: "Aq boz", meaning: "kel. Túri, túsi, aq sur kóbinese attıń túrine aytadı.", experience: "Aq boz attan túsip atırǵan dostın kórdi (K.Dosanov)."},
    { word: "Aqbóken", meaning: "at. Kiyiktiń bir túri.", experience: "Maral, aqbóken qusaǵan ańlardı ǵana qaldırıp, saw-salamat eline qaytadı (qq.x.e.)."},
    { word: "Aqdur", meaning: "kel. Aq, haqıyqat, hadal, taza, pák, haq, jaqsı, eń jaqsısı.", experience: "Talap islep tap dúnyanı, Sútten aqdur bilseń anı (Berdaq)."},
    { word: "Aq egin", meaning: "at. Jazlıq, tez pisetuǵın eginniń túri.", experience: "Olardıń japlarınıń saǵasın baylap taslap, aq egin, kók egin degennen bos qaldıratuǵın edi (A.Begimov)."},
    { word: "Aq qapshıq", meaning: "kel. Oktyabr revolyuciyasınıń ornaw aldında Qaraqalpaqstanda belgili dárejede hár qıylı qıyınshılıqlar, ashlıq, áptadalıq turmıstı keshirgen xalıqtıń sol jılları belgilengen ataması.", experience: "Aq qapshıq jılı ashlıqqa shıday almay Moynaq betke kóship ketken edi (N.Dáwqaraev)."},
    { word: "Aqqas", meaning: "kel. Tawardıń bir túri, arnawlı, qádirli túri, burınları qaraqalpaq hayal-qızlardıń alıp qoyıp kiyetuǵın belgili kiyimleriniń biri esabında sanalatuǵın, arnap ózgesherek etip tigilgen kóylegi bolǵan.", experience: "Aqqas kóylek degenlerim de bar,... (A.Begimov)."},
    { word: "Aqquba", meaning: "kel. Júzi, kelbeti aq, aq reń.", experience: "Sayatxan aqqubadan kelgen, ... sımbatlı hayal (A.Begimov)."},
    { word: "Aqqula", meaning: "at. Qırmandaǵı aydalıp, tazalanǵan dánniń qır dógereklep qálbir menen hár jerinen az muǵdardaǵı alınǵan bólegi.", experience: "Aqqulasın bılay shetke shıǵarıp qoydı (N.Dáwqaraev)."},
    { word: "Aqlay", meaning: "r. Belgisiz waqta, aldınan, kún burın, aldın ala, áwel bastan.", experience: "Endigi qalǵan ómirimizde ekewimiz aqlay quda bolayıq, seniń qızıń bolsa, meniń ulım bolsa, ekewimiz shınnan quda bolayıq jora, dedi («Alpamıs»)."},
    { word: "Aqlamaw", meaning: "f. Etken miynet, ziynetlerin ótemew, kórsetken jaqsılıq, húrmetlerdi bosqa jiberiw, ótemew.", experience: "Bul isenimdi ol aqlamay qalǵan emes, planın orınlap, kóp kózine ayrıqsha túsip tur (Ó.Ayjanov)."},
    { word: "Aqlawshı", meaning: "at. Sud sistemasınıń arnawlı xızmetkeri, ayıpkerdi aqlawshı, jazasın qalay bolmasın jeńilletiwshi."},
    { word: "Aqlıq", meaning: "at. Balasınıń yamasa qızınıń balası.", experience: "Berdaq  Jiyen jırawdıń aqlıǵı Ótesh shayır menen zamanlas dos bolǵan (I.Saǵitov)."},
    { word: "Aqmaq", meaning: "at. Aqılsız, aqılı joq, biydáwlet, nadan.", experience: "Ákem jalt qarap, selk ete qaldı: - Maǵan jeńil tiyip tur deyseń be, aqmaq! — dep qattı baqırıp jiberdi (K.Smamutov)."},
    { word: "Aq mańlay", meaning: "kel. Mańlayı jazıq, mańlayı appaq, minsiz, sup-sulıw, hesh jeriniń mini joq.", experience: "Torsıq sheke aq mańlay, Kútá qızıq sózleri (X.Tájimuratov)."},
    { word: "Aqmarka", meaning: "at. Balıqtıń túri.", experience: "Aqmarqa, súyenniń hár biri qoyday, Teńizde ılaqa júzedi qoyday (A.Begimov)."},
    { word: "Aq maya", meaning: "at. Urǵashı túye.", experience: "Atqa shıqqan aq mayalı Ayjamal, Ol da sendey emes Biybigúl (Ájiniyaz)."},
    { word: "Aq orda", meaning: "at. Úskenesi jaǵınan hesh qanday kemshiligi joq, kisi tań qalarlıq etip úskenelengen, aq kiyiz benen jabılǵan 6-8 qanatlı qara úy, burınları biyler el basqarıp otıratuǵın arnawlı úy.", experience: "Jılama úkem jılama, Toy seniki yar-yar, Toqsan baslı aq orda, Úy seniki yar-yar (qq.x.s.j.)."},
    { word: "Aq otaw", meaning: "at. Aq ordaǵa qaraǵanda kishilew, aq kiyiz benen jabılǵan 4-6 qanatlı qara úy.", experience: "Patsha qaldı maqul kórip, Aq otawdıń artın túrip, Qırq qız benen dáwran súrip, Retme-ret qushqan eken (Berdaq)."},
    { word: "Aq paxta", meaning: "at. Paxta, ǵawashadan shıqqan aq paxta. ", experience: "Kóz aldında elesleydi aq paxta, Bir qanasın qoyıptı ol saqlap ta (G.Esemuratov)."},
    { word: "Aq pátiya", meaning: "at. Alǵıs, tilek, shın júrekten pátiya, raxmet.", experience: "Aq pátiya beriń dep, Biz turıppız intizar («Er Ziywar»)."},
    { word: "Aq peyil", meaning: "kel. Ak kókirek, kewli ashıq, jaman pikirsiz.", experience: "Ol sawdıraǵan aq kókirek, aq peyil hayal (Ó.Xojaniyazov)."},
    { word: "Aq porıq", meaning: "at. Kólde ósetuǵın aq tamır, qamıstıń, terektiń tamırı sıyaqlı.", experience: "Altın kún aydalanı ańlıǵanday, Aq porıq ayaq sozıp keń kólinen (G.Esemuratov)."},
    { word: "Aqpıshaq", meaning: "at. Urıwdıń atı.", experience: "Múyten, qońırat, qıtay, qıpshaq, keneges mańǵıt, aqpıshaq, Bári altı urıw qaraqalpaq sol jerden kóshkende ayırılǵan eken (Berdaq)."},
    { word: "Aqsazan", meaning: "at. Balıqtıń atı, túri.", experience: "Barıp kórsek qazaǵa, Aqshabaq penen aqsazan, Sıyǵanınsha tolıptı."},
    { word: "Aqsaq", meaning: "at. Ayaǵınıń kemisi bar, júrgende aqsańlap basatuǵın adam.", experience: "Aqsaqtıń aqırına baq. Soqırdıń sońına baq (qq.x.n.)."},
    { word: "Aqsaqal", meaning: "at. 1. Jası úlken, kópti kórgen, kóp jasaǵan, kátquda, tórelik etiwge jetisken kisi.  2. Hámeldiń túri, belgili bir aymaqqa basshılıq etiw ushın saylanıp qoyılǵan adam.", experience: "Shúrshit, qalmaq jetti páreń, Ákeń seniń Eset gereń, Bolıs bolsań adam jer eń. Abıray aqsaqal bolǵanıń (Berdaq)."},
    { word: "Aqsar", meaning: "at. Shóptiń túri, seksewilge uqsaǵan, tikensiz ósimlik, otqa jaǵıladı.", experience: "Dúysenbay Turımbetti qaptalına alıp, shetirektegi bir túp aqsardı ayaǵı menen pıshırlatıp ústine shókti (T.Qayıpbergenov)."},
    { word: "Aqsawlaq", meaning: "at. Qamırdan arnawlı túrde, júdá juqa etip pisirilgen nannıń túri. Aqsawlaq — qaraqalpaqtıń MILLIY awqatınıń biri, qawın aqsawlaq qawındı ábden qaynatıp, oǵan qatıq aralastırıp ishine aqsawlaqtı tuwrap, ústine sarı may kúydirip quyıp jelinedi, qawınsız tek qatıq penen de islenedi."},
    { word: "Aqsawıt", meaning: "at. Batırlardıń ústine (burınǵı waqıtlarda) oq ótpew ushın qorǵanıw ushın kiyip urısqa túsetuǵın kiyim, qabat-qabat temir setkadan toqılıp islengen urısta kiyetuǵın sırtqı úst kiyim.", experience: "Aqsawıt kiygen ústine, nayza alǵan dástine (Q.Maqsetov)."},
    { word: "Aq sálle", meaning: "at. Mollalardıń aq tawardan basına oraytuǵın bas kiyimi.", experience: "Aq sállesin tósektiń ústine shalqasına qoydı (K. Sultanov)."},
    { word: "Aq soqpaq", meaning: "at. Júre-júre joldıń shóp-sharınan tazarıp appaq (soqpaq) bolıwı, qayta-qayta tınbastan júrilip turatuǵın ayaq jol", experience: "Aq soqpaq penen bir-birine qaǵılısıp júrip kiyatırǵan malǵa deyin móńirep, olar da mazanı bermedi (A. Begimov)."},
    { word: "Aq suńqar", meaning: "at. Jabayı jırtqısh quslardıń tóresi.", experience: "Qatarınan artıq tuwǵan, Lashın aq suńqar yanlıdı (Ótesh)."},
    { word: "Aqsúyek", meaning: "at. Revolyuciyaǵa shekem xalıqlar ózlerin eki qatlamǵa bólip atap júrgen, solardıń joqarı qatlamın pristokratlar, aqsúyekler dep, al tómengi qatlamın (qarapayım xalıqlar) qara puqara delingen.", experience: "... kóteriliste geypara baylar, aqsúyekler qosılıp erkinlik alamız dep,... (S.Májitov)."},
    { word: "Aq súp", meaning: "at. Tawardıń túri, aq tawar, aq material."},
    { word: "Aq sút", meaning: "at. Ana súti, ulıwma sút.", experience: "Aq sút berip ósirdiń sen, Hesh te joq meniń ármanım (Á.Shamuratov)."},
    { word: "Aq tamaq", meaning: "kel. Juqa, páreni, júzinen kún kórinetuǵın kelinshek.", experience: "Shashı hasıl jupqa dodaq, Beli bir qısım aq tamaq, Uzın boylı hám keń qushaq, Peri kibi bolǵan eken (Berdaq)."},
    { word: "Aqtańlaq", meaning: "kel. Hár jerde aǵı bar.", experience: "Aqtańlaq kiyik tawda bar, Sáwirletip aydawda bar. Búgin tańda bir sawda bar, Jóndi soǵan burıp keldim (K.Irmanov)."},
    { word: "Aqtarıw", meaning: "f. Izlew, izlemegen jerdi qaldırmaw, qaraw, tintiw.", experience: "Policiya taw arasın, Aqtarıp júr onı quwıp(I.Yusupov)."},
    { word: "Aq terek", meaning: "at. Túri aq, dúp-dúziw, uzın, qurılıs materialları ushın paydalanılatuǵın aǵash.", experience: "Aq terek pe, kók terek, bizden sizge kim kerek (T.Mátmuratov)."},
    { word: "Aq úy", meaning: "at. Aq kiyiz, aq úzik penen jabılǵan qara úy.", experience: "...kiyatırǵan atlılar awıldan bólegirek tigilgen aq úyge qaray burıldı (qq.x. e.)."},
    { word: "Aqsha", meaning: "at. Pul, som.", experience: "Aydos onıń qorjınǵa salıp, atına bókterip qoyǵan aqshasın kórip, onı sheship almay, qanjar menen kesip aladı (qq.x. e.)."},
    { word: "Aqsham", meaning: "r. Tún, kesh, túngi waqıt, keshqurın.", experience: "Búgin aqshamı menen jawın jawdı. Tap usı máhálde «Alǵabasqa jawınnıń keregi az edi (Ó.Aytjanov)."},
    { word: "Aq shash", meaning: "at. Shashtıń aǵı, shashı aq, aǵarǵan shash.", experience: "Erman kiriw menen aq shash ananıń qolınan alıp stolǵa jaqın otırdı (S.Xojaniyazov)."},
    { word: "Aqshıl", meaning: "kel. Aqlaw, aqqa beyim, aq sur, aqlan.", experience: "Ájiniyazdıń aqshıl júziniń alması qızǵısh, gúreń tartıp, jawdıraǵan kóz janarı qubılıp ketti (K.Sultanov)."},
    { word: "Aqıbet", meaning: "at. Iz, soń, saldar, aqır, keyin.", experience: "Kewillerge qayǵı toldı, qayǵı tarqaǵay aqıbet (Berdaq)."},
    { word: "Aqıl", meaning: "at. Danalıq, bilim, bilgenlik, oy-sana.", experience: "Isenemen ilim menen aqılǵa, jer júzinde ájayıp is dóretken (Sh.Mámbetmuratov)."},
    { word: "Aqıl-sana", meaning: "at. Aqıl-oy, aqıl-dana.", experience: "Partiya ómirimiz, aqıl-sanamız... (X.Seytov)."},
    { word: "Aqılsız", meaning: "kel. Aqılı joq, bası islemeytuǵın, oysız, nadan.", experience: "Atasınan jaman bolsa, onı jaqsı dep kim aytar, aqılsız hám nadan bolsa, onı jaqsı dep kim aytar (Berdaq)."},
    { word: "Aqılsızlıq", meaning: "at. Aqmaqlıq, oysızlıq, kórgensizlik.", experience: "Bilgir sózin tıńlamaǵan, gáp mánisin ańlamaǵan. Úlkennen násiyat almaǵan, aqılsızlıq bolǵan eken (Berdaq)."},
    { word: "Aqım", meaning: "at. Okop., tereń shuqır, qorǵanıw ilaj, jasırınıw qorǵanıw, jasırın júriw jolı.", experience: "Ol zamannıń adamları jerden aqım qazıp, arbadan qamal etip, bir jerde jasırın júriw jolda úyilip otıratuǵın edi («Alpamıs»)."},
    { word: "Aqın", meaning: "at. Shayır, jazıwshı.", experience: "Zıyanı joq aytıssań men jeńermen, qazaqta Meńesh degen aqın qızban (Ájiniyaz)."},
    { word: "Aqıra", meaning: "at. Qazıwda shıǵarılǵan topıraq hám sol topıraqtıń túsken ornı.", experience: "Aqırası ılayǵa toldı (A.Bekimbetov)."},
    { word: "Aqıret", meaning: "at. 1. Azap, jábir, zulımlıq, qısıwmet. qorlıq, zorlıq, zombılıq. 2. din. Ol dúnya diniy kózqaras boyınsha adam ólgennen keyingi dúnya.", experience: "Arqalandıq arbanlap, Aqıret kórdik ólimnen (Jiyen jıraw). Aqırette keynine ereyin, Alla salsa ne islerdi kóreyin («Qırq qız»)."},
    { word: "Aqırzaman", meaning: "at. 1. din. Eski diniy ańızlarda aytılıwınsha, dúnyanıń sońı, izi, ayaǵı, tamam bolıwı, barlıq tirishiliktiń tawsılıwı. 2. Azap-aqıret, awırmanshılıq.", experience: "Aqır bir kún bolar aqırzamanı, Israpıl súrgini jıǵarlar tawdı (Ájiniyaz). Tústi basqa aqırzaman, inan, doslar, jalǵan emes (Berdaq). Hásen xan bes erdiń qanın almaqshı, Baslarına aqırzaman salmaqshı («Er Ziywar»)."},
    { word: "Aqırı", meaning: "r. Soń, keyin.", experience: "Azanda erte turıp jumısqa barıw kerek emes pe? Sol ushın kirpik ayqastırǵanday dem alıw zárúr, aqırı. (Ó.Xojaniyazov)."},
    { word: "Aq jaǵal", meaning: "Ala, ılaqtıń, qozınıń túrine qaray ataw, bas betinde meni bar.", experience: "Japıraq múyiz aq jaǵal, Ol da keldi suw betke (I.Yusupov)."},
    { word: "Aqıy", meaning: "Biy, sher, ózin joqarı sanaytuǵın adam.", experience: "Astında bar torı atı, Belinde gá har polatı, Bolıstıń quyrıq qanatı, Aqsaqalıń aqiy eken (Ájiniyaz)."},
    { word: "Aqkóz", meaning: "Gódek, ańqaw, hadal, hesh nárse kórmegen.", experience: "Munday awır aqkóz batırlardı sol zamandaǵı Xiywa xanı Ispandiyar xan óltirtken (Q.Irmanov)."},
    { word: "Aqsawlaq", meaning: "Qamırdan arnawlı túrde, júdá juqa etip pisirilgen nannıń túri."},
    { word: "Aq siyne", meaning: "Kóksi, kókirek awız, jalańash dene, tóstiń ústi.", experience: "Meniń ózim erke bolsam, Qız jamılǵan kórpe bolsam, Kórpedegi búrge bolsam, Aqsiyneńde jatpas pa edim (Berdaq)."},
    { word: "Aq tal", meaning: "Terektiń túri, túri aq, taza tikensiz, báhárde minár hámme tereklerden burın bórtedi.", experience: "Bálent hawalı aq tallar yanlı Kulen bolıs (Berdaq)."},
    { word: "Aq tiken", meaning: "Bozda ósetuǵın tikenekli shóp.", experience: "Qashqın lám-mim. Aq tikenliktiń arası sılt etpeydi. Tıp-tınısh. Bir shóp qıymıldamaydı (Ó.Xojaniyazov)."},
    { word: "Aqtuba", meaning: "Jerdiń, kóldiń atı, geografiyalıq atama.", experience: "Aqtubanıń aqqan suwı ılaydı, Eki diyqan ún salısıp jılaydı, Qazı iyshanǵa bizdi satqan qudaydı, Diyqan ashtan óler boldı Qazı iyshan («Qazı iyshan»)."},
    { word: "Aq shabaq", meaning: "Balıqtıń bir túri, maydaraq boladı.", experience: "Barıp kórse qazaǵa, aq shabaq penen aqsazan, sıyǵanınsha tolıptı (A.Dabılov)."},
    { word: "Ala awızlılıq", meaning: "at. Qarama-qarsılıq, awızbirshilik joqlıq, bir-birine isenbewshilik.", experience: "Bir awızlıq hár maqsetti boldırar, ala awızlıq orta jolda qaldırar. Ala bolǵan awızındaǵını aldırar, joldas bolsań bunnan xabarıń bolsın (K.Irmanov)."},
    { word: "Alabajaq", meaning: "kel. Shubar, hár túrli, túrli-túrli boyawı bar, ala shubar, ala bashaq, alabajıraq.", experience: "Bul kisi ústine alabajaq shapan kiygen (Aybek).... mına meniń dizemnen kelmeytuǵın alabajaq bir shapandı berdi (Q.Irmanov)."},
    { word: "Alabáhár", meaning: "r. Erte báhár, báhár máwsimi.", experience: "Eldiń ústine túsken awırmanlıq alabáhárden baslap jazı menen dawam etip atır (A.Begimov)."},
    { word: "Alaburkan", meaning: "kel. Alasapıran, qalay bolsa solay, tasıp tógiliw, shennen tıs burqasınlaw, kúyip-pisip tullanıw. shań, tas aralas uytqıǵan dawıl.", experience: "Alaburqan, ele teńiz tuwlaydı, tolqınlanıp kóbiklenip oynaydı (Á.Shamuratov)."},
    { word: "Alagewgim", meaning: "r. Erte, tań qarańǵısı, tań jańa aǵarıp kiyatırǵan waqıt.", experience: "Ótemurat alagewgimde ılashıǵınan maydanǵa shıqtı da dárya boyına qaray áste júrdi (K.Sultanov)."},
    { word: "Alagólek", meaning: "kel. Aq kewil, aq peyil, kishi peyil.", experience: "Ol bir alagólek jigit edi (Q.Ayımbetov)."},
    { word: "Alaǵada", meaning: "r. Tınıshsız, kewilsiz, bir nársege ǵalawıtlanǵan.", experience: "Jaslar oqıw ushın kelgen bul jerge, alaǵada salıp ǵalawıt berme! (I.Yusupov)."},
    { word: "Ala duman", meaning: "kel. Shańǵıt, dumanlıq, tútin. ", experience: "Ala duman átiraptan shań ushar, kúndiz túri jańa atqan tań usar ( T.Seytjanov)."},
    { word: "Ala kóz", meaning: "at. Kózi alalıq, úlken kóz.", experience: "Ala kózli Ernazardıń, sen dep ólgen balań edi (I.Yusupov)."},
    { word: "Alaqay", meaning: "t.s. Quwanısh, sezim.", experience: "Alaqay-alaqay, ya quday. Palman aǵam kiyatır (N.Dáwqaraev)."},
    { word: "Alaqan", meaning: "at. Qoldıń quwıslaytuǵın jeri, qoldıń ishki tárepi."},
    { word: "Alaman", meaning: "at. Xalıq, qalayıq, jurtshılıq, bir topar adamnıń úyiri, bir jerge kóp adamlardıń toplanıwı.", experience: "Ayımjamal alamannıń ishine súńgip ketti (Ó.Xojaniyazov)."},
    { word: "Ala moynaq", meaning: "kel. Qaraqalpaq saz ásbaplarınıń túri duwtarǵa aytıladı.", experience: "Keregeniń basında ildiriwli ala moynaq duwtardı aldı («Ámiwdárya» j.)."},
    { word: "Alap", meaning: "at. Keńislik, maydan, keń dala, dalalıq."},
    { word: "Ala sala", meaning: "r. Dárriw, birden.", experience: "Bir waqta Abıl jerde jatqan aybaltanı ala sala maǵan umtıldı (A.Bekimbetov)."},
    { word: "Alasar", meaning: "at. Qustıń atı.", experience: "Hawadan ushqan alasar, urıday kiriw qalaǵa, Surtayshaǵa miyasar («Qırq qız»)."},
    { word: "Alasat", meaning: "at. Ǵawǵa, shawqım, jánjel, alasapıran, waqıya, ózgeris.", experience: "At shaptırdı dalaǵa, jar urdırdı qalaǵa, qalaǵa jaw keldi dep, alasat urdı araǵa («Máspatsha»)."},
    { word: "Ala sáhár", meaning: "r. Erte, tań azan, tań qarańǵısı, tań atar-atpas waqıt.", experience: "Biybixatsha apay ala sáhárden turıp soǵan qarap jol tarttı (A.Begimov)."},
    { word: "Alaslaw", meaning: "f. gón.s. Eskishe emlewdiń bir túri.", experience: "Gúlimdi hám alasladı, kóp ırımdı etken eken (Berdaq)."},
    { word: "Alası", meaning: "at. Alatuǵın haqısı, alıw kerek zatı, haqı.", experience: "Onıń da kassirde alası haqı bar eken (A. Bekimbetov)."},
    { word: "Alasha", meaning: "at. Qoldan toqılǵan kishkene tósekshe, tósek ushın geyde kiyim shapan ushın da islenetuǵın material, júnnen de, paxta, jipekten de qádimgi tawarlardan qalıń etip toqıladı, kóbinese tósekke arnaladı, túrli boyawlarǵa jipti boyap toqıydı.", experience: "Astımızǵa tósediń, gilem emes alasha, qudashalar sóyleńiz, bir maydan bolsın tamasha (Q.Ayımbetov)."},
    { word: "Alba-dalba", meaning: "kel. Jaman, jırtıq, pájmúrde kiyingen, kiyim forması ájeptáwir.", experience: "Barsań, ústi bası alba-dalba bolıp, Gúlzar apasınıń qábiriniń basında eńirep otır (X.Seytov)."},
    { word: "Albıraqlaw", meaning: "f. Jol taba almaw, sasqalaqlaw, qısınıw.", experience: "Albıraqlap júrip esikti ashqanda mańlayıma ergenek tiyip, kóz aldım ottay jandı (J.Aymurzaev)."},
    { word: "Albıraw", meaning: "f. Qısınıw, qáweterleniw, kewilsizleniw, gúdikleniw, qolaysız jaǵdayǵa túsiw, jol tappaw.", experience: "Albıraǵan úyrek aldı menen de, artı menen de júzedi (qq.x.n.)."},
    { word: "Algebra", meaning: "at. Sanlardıń az-kópligine qaramay olardıń ulıwma nızamın úyretetuǵın matematikanıń tarawı.", experience: "Durıs, bir mártebe algebradan, bir mártebe rus tilinen úsh aldı (T.Qayıpbergenov)."},
    { word: "Alǵárez", meaning: "m.s. Sózdiń qısqası, toq eteri, juwmaǵı.", experience: "Alǵárez kórmedim bunıńday qızdı, xoshirey, xosh kewil, ashıq bir júzli (A.Begimov)."},
    { word: "Alǵır", meaning: "kel. Júyrik, ótkir, qıran, ziyrek, shaqqan.", experience: "Alǵır qustıń pánjesi, úsh qızınıń genjesi, Sarısha sulıw der edi (Q.Ayımbetov)."},
    { word: "Alǵıs", meaning: "at. Raxmet, táńir jarılqasın, ırzalıq.", experience: "Bul sózlerdi jazdı qolım, búlbúl yanlı sayrap tilim. Bul báyitti tıńlap elim, qanday alǵıs berer eken (Berdaq)."},
    { word: "Alǵısnama", meaning: "at. Úzliksiz miyneti ushın aytılǵan yamasa berilgen rásmiy húrmet belgisi.", experience: "Húkimet tárepinen berilgen rásmiy qutlıqlaw xatı."},
    { word: "Aldaǵı", meaning: "r. Aldınǵı qatardaǵı, ilgeridegi.", experience: "Maǵan bul birese quwanısh berse, qorqaman taǵı da aldaǵı joldan (M.Dáribaev)."},
    { word: "Aldanıw", meaning: "f. Birewlerden pánt jew, ótirikke isenip qalıw, ótirikke inanıw, qurı dalaǵa hálekleniw, isenimi joytılıw.", experience: "Sol waqıtta barıp Aytımbet aldanǵanın bilip jambasına bir urdı (Q.Ayımbetov)."},
    { word: "Aldaw", meaning: "f. 1. Ótirik aldap birewdi isendirip pánt beriw, ótirikke inandırıw, ótirik aytıw, ótirik sóylew.", experience: "Nadan tuwǵan Aydos biy, aldaw tilge inanıp, bir bále qılıp keler dep, jolın kútip júr edi (Berdaq)."},
    { word: "Aldın", meaning: "r. Birinshi, burın, áwel, dáslep, erterek bolıp ótken mánisinde.", experience: "Bárinen aldın, ocherk estetikalıq qural bolıw jaǵınan nasazlıq etti (G.Esemuratov)."},
    { word: "Aldına", meaning: "r. Ortaǵa, kópshilikke, hámmege.", experience: "Serimbet ornınan turıp, jıynalıstı ashtı hám kópshiliktiń aldına kún tártibin qoydı (Ó.Ayjanov)."},
    { word: "Aldınǵı", meaning: "kel. Ilgeri, áwelgi, dáslepki, aldaǵı, keyingi emes.", experience: "Aldınǵı arba qaydan júrse, sonǵı arba da sonnan júredi (qq.x.n.)."},
    { word: "Aljas", meaning: "f. Qátelesiw, jańılısıw."},
    { word: "Aljıǵan", meaning: "kel. Qátelesken, buzılǵan, aynıǵan, aljasqan, sózin buzǵan.... ", experience: "onıń hayalı: aljıǵan, kelindi qayda aparasań? dep baqırıp edi ... (Q.Ayımbetov)."},
    { word: "Aljıw", meaning: "f. Aqılınan, esinen ayırılıw, qartayıw, aljasıw, biymáni gáplerdi sóylew.", experience: "Hay, aljıǵan ǵarrı-aw, namazıńdı buzıp qoydıń ǵoy («Ámiwdárya» j.)."},
    { word: "Aliment", meaning: "(lat. alimentum qarawında, baǵıwında).", experience: "Nızamda belgilengen jaǵdayda shańaraqtıń bir aǵzası tárepinen basqa aǵzası yamasa aǵzaların qarjılay támiyinlew ushın májbúriy tólenetuǵın pul, napaqa."},
    { word: "Alif", meaning: "Arab álipbesiniń birinshi háribi hám ataması."},
    { word: "Alkash", meaning: "(rus. alkagolik sózinen) s.t. Ishkilikke berilgen, soǵan ósh bolǵan."},
    { word: "Alqım", meaning: "at. Moyın, gegirdek (iyek penen iyinniń aralıǵı)."},
    { word: "Alqımlaw", meaning: "f. Buwındırıw, alqımınan buwıw, alqımınan qısıw.", experience: "Eger urı baspashı jol tosıp jatsa, alqımdan buwǵanda bilmey qalasan (K.Sultanov)."},
    { word: "Alqıssa", meaning: "q.s. Sóz basında avtorlar tárepinen qollanılatuǵın kiris sóz, solay etip, qısqası, qullası.", experience: "Alqıssa burınǵı ótken zamanda Rus sháhárinde Arıslanbay degen bir bay bar edi («Góruǵlı»)."},
    { word: "Alla", meaning: "at. din. 18 mın álemdi, qıyamet-qayımdı jaratıwshı Quday, qúdiret iyesi, dúnyanıń payda bolıwında hám onıń ómir súriwinde qúdiretke iye."},
    { word: "Allahu akbar", meaning: "Arabsha alla ullı degen mánide."},
    { word: "Allegoriya", meaning: "(grek allegoria ózgeshe ańlatıw) kórkem ádebiyatta pikirdi tuwrı aytpay obrazlı túrde astarlap aytıw arqalı súwretlewdiń bir túri.", experience: "Erteklerdegi haywanlar, tımsallardaǵı qatnasıwshılar allegoriyalıq xarakterge iye."},
    { word: "Allergiya", meaning: "(grek allos-basqa+ergon-tásir) Organizmniń qorshaǵan átirapta ushıraytuǵın, allergenler dep atalıwshı geypara faktorlar (ximiyalıq zatlar, mikroblar hám olardıń turmıs sharayatında payda bolatuǵın ónimler, azıq-awqatlar) tásirinde (tiykar) júdá sezgir bolıwı."},
    { word: "Allo", meaning: "m. s. (ingl. hello) Telefon arqalı sóyleskende «esitip atırman» yamasa «esitip atırsız ba?» degen mánilerde qollanıladı."},
    { word: "Alma I", meaning: "at. Ráwshan gúlliler tuqımlasına kiretuǵın miyweli jemis aǵashı, terek, miyweniń túri.", experience: "Anaw turǵan almameken narmeken, sayasında jatqan biziń yarmeken (N.Dáwqaraev)."},
    { word: "Alma II", meaning: "f. Qoy, alıwǵa ruqsat joq, tiyme, qozǵama."},
    { word: "Almagezek", meaning: "r. Gezekpe-gezek, gezek penen, gezek boyınsha, reti menen, retpe-ret.", experience: "Qızlargúl menen birge almagezek bala kóterip esin biletuǵınlarǵa ertek aytıp otır edi (T.Qayıpbergenov)."},
    { word: "Almaz", meaning: "at. Taza kristall, uglerod. Oǵada kúshli qattılıǵı, bekkemligi menen ajıralıp turadı."},
    { word: "Almas", meaning: "at. Hasıl tas, gáwhar, bekkem."},
    { word: "Almurt", meaning: "at. Ráwshan gúlliler tuqımlasına kiretuǵın biyikligi 8-15 mm ge teń jemis aǵashı.", experience: "Fiolet qalqanları alma, almurt erikte jasaydı (A.Daljanov)."},
    { word: "Aloe", meaning: "(grek. aloe) Gernaylı yamasa qızǵaldaq tárizli tuqımlaslarına tiyisli, kóp suwlı hám japıraǵı qalıń tropikalıq hám subtropikalıq ósimlik."},
    { word: "Alp", meaning: "folk. Qaraqalpaq xalıq dástanlarında ǵayrı-tábiyǵıy kúsh-quwatı, mártligi, dáwjúrekligi t.b. menen ajıralıp turatuǵın qaharman.", experience: "Alp anadan tuwadı, at biyeden tuwadı (qq.x.n)."},
    { word: "Alpıs", meaning: "s. Alpıs birlikten turatuǵın san, 60 cifrı menen sanınıń ataması."},
    { word: "Alpıs tuwar", meaning: "at. Qızlardıń ata-anasına tólenetuǵın qalıń maldıń belgili muǵdarı, shaması, mólsheri.", experience: "Sóz alpıs tuwar beriwge shekem bardı (Q.Aralbaev)."},
    { word: "Altaqta", meaning: "at. Arbanıń aldı betinde arbakesh hám basqa da birli-yarım adamlar otırıw ushın arnalǵan orın. ", experience: "Onıń altaqtasına qızıl gilem, kókiregine quraq kórpesheler tóseliwde (T. Qayıpbergenov)."},
    { word: "Altaw", meaning: "s. Sanlıqtıń jıynaqlaw túri."},
    { word: "Altı", meaning: "s. Sanaq san, sanı altaw, esabı altaw."},
    { word: "Altın", meaning: "at. xim. Júdá qunlı, bahalı, jumsaq sarı túsli metall.", experience: "Arpa, biyday as eken, altın, gúmis tas eken. (qq.x.n.)"},
    { word: "Altın-valyuta", meaning: "at. ekon. Mámleketlik bank qarjı organlarında saqlanatuǵın altın hám shet ellik valyuta qorı."},
    { word: "Altınshı", meaning: "1. Kóbinese altınnan zergerlik buyımların jasaytuǵın usta, zerger. 2. Altın menen shuǵıllanatuǵın, satatuǵın satıwshı."},
    { word: "Alwan-alwan", meaning: "Túrli-túrli, hár qıylı."},
    { word: "Alsha", meaning: "at. Ráwshan gúlliler tuqımlasına kiretuǵın jemis aǵashı, terek."},
    { word: "Alıq", meaning: "Jawlasqan eki táreptiń jengen jeńilgeninen alınatuǵın mal-múlk, pul."},
    { word: "Alımsaq", meaning: "Tilenshi, alǵısh, esabın tawıp ala beretuǵın, alıwdı jaqsı kóretuǵın adam."},
    { word: "Alıpsatar", meaning: "at. ekon. Tayar ónimdi satıp alıp, ústine baha qoyıp, qımbat satatuǵın adam, sawdager."},
    { word: "Alıs I", meaning: "r. Uzaq, qashıq, shalǵay.", experience: "Awıl alıs jer shalǵay, jetalmadım jayawlap (Q.Ayımbetov)."},
    { word: "Alıs II", meaning: "f. Birge alıw, uslasıw, kóterisiw."},
    { word: "Alıs-beris", meaning: "at. Beris-alıs, qarım-qatnas."},
    { word: "Alıspaq", meaning: "at. Gúres, at ústinde gúresiw, bellesiw, oyın ataması.", experience: "Alıspaq kerek pe? shabıspaq kerek pe? tańla! shártim sol, dep tirenip turdı (gazetadan)."},
    { word: "Alıw I", meaning: "f. 1. Iyelew, mengeriw, iykemlew.  2. Boysındırıw, biylew.", experience: "Jańadan dokument alıp, baslawısh mektepke berdi balların (A.Dabılov)."},
    { word: "Alıw II", meaning: "at. mat. Arifmetikalıq ámel, sandı azaytıw ámeli.",},
    { word: "Alıwshı", meaning: "at. Zattı, nárseni alatuǵın adam, alajaq kisi."},
    { word: "Almanax", meaning: "(arab sózi, waqıt, shama) hár túrli mazmundaǵı túrli janrlardan turatuǵın kórkem shıǵarmalardıń jıynaǵı."},
    { word: "Alpinizm", meaning: "Biyik tawlarǵa, taw shoqqılarına, tik qıyalıqlarǵa, muz tawlarına shıǵıw menen baylanıslı sport túri."},
    { word: "Alpinist", meaning: "Alpinizm menen shuǵıllanıwshı, biyik tawlarǵa shıǵıwshı, kóteriliwshi adam."},
    { word: "Alfavit", meaning: "(grek. alfabetos-grek álipbesiniń dáslepki háribi (alfa+beta) atamasınan). lingv. Álipbe"},
    { word: "Alximiya", meaning: "at. xim. Tábiyatta joq, qıyalıy tas arqalı ápiwayı metalldı qunlı metallǵa aylandırıwdı kúsegen orta ásirdegi izertlew."},
    { word: "Alyuminiy", meaning: "Mendeleev periodlıq sistemasınıń ІІІ gruppasına tiyisli jeńil, gúmis reńi-aq ximiyalıq element."},
    { word: "Amanat", meaning: "at. Saqlaw ushın yamasa birewge sawǵa retinde beriletuǵın zat, nárse."},
    { word: "Amanlasıw", meaning: "f. Sálemlesiw, aman-túwel sorasıw."},
    { word: "Amyobalar", meaning: "at. biol. (grek. amoibe ózgeriw) Ápiwayı bir kletkalı turaqlı dene formasına iye bolmaǵan omırtqasız haywanlar otryadı."},
    { word: "Ameldar", meaning: "k. Hámeldar, lawazımlı adam."},
    { word: "Amirqanı", meaning: "kel. Paxtanıń sortı, amerikadan ákelingen túri.", experience: "Qol ǵawashanıń ornına, amirqanı paxta egildi (Q.Ayımbetov)."},
    { word: "Amin", meaning: "(arab) sóyl.t. Áwmiyin."},
    { word: "Amortizator", meaning: "(fr. amortir jumsartıw) urılıw, sekiriw, silkiniwdi jumsartatuǵın, kemeytetuǵın ásbap, qurılma."},
    { word: "Amper", meaning: "(Francuz fizik alımı A.Amper atı menen atalǵan) Elektr toǵı kúshiniń ólshew birligi."},
    { word: "Amfiteatr", meaning: "(grek. amphitheatron eki tárepleme tamasha) 1. Áyemgi Greciya hám Rimde ǵalabalıq tamashalar, teatr spektaklleri kórsetiletuǵın saltanatlı imarat. 2. Tamasha zalı (teatr, cirk)ındaǵı yaki auditoriyadaǵı yarım dóngelek tárizinde qıya kóterilip barıwshı orınlıqlar.", experience: "Aldımda keń kóshe jatır, ájayıp amfiteatr (I.Yusupov)."},
    { word: "Ana I", meaning: "at. Balanıń tuwǵan apası, sheshesi.", experience: "Ananıń kewli balada, balanıń kewli dalada (qq.x.n)."},
    { word: "Ana II", meaning: "alm. Siltew almasıǵı, siltep kórsetiw, anaw, sol."},
    { word: "Anada", meaning: "Ótkende, anaw kúni, sol waqıtta."},
    { word: "Analiz", meaning: "(grek. analysis - ajıratıw, ajıralıw) Tekseriw obektin aqılıy pikirlep, quramın elementlerge ajıratıp izertlew usılı."},
    { word: "Anakonda", meaning: "(isp. anaconda) buwma jılanlar tuqımlaslarına kiretuǵın eń úlken jılanlar turi."},
    { word: "Analizlew", meaning: "Talqılaw, bahalaw, baha beriw, dodalaw, pikir júritiw, tallaw júrgiziw.", experience: ".... pútini menen usı wazıypalar dógereginde analizlewge tırısamız (Q.Maqsetov)."},
    { word: "Ananas", meaning: "(isp. ananas) bot. Ananas tárizliler tuqımlasına tiyisli ósimlikler gruppası."},
    { word: "Analıq", meaning: "Tólleytuǵın, balalaytuǵın, janlı-janıwarlar.", experience: "Fermadaǵı mallardıń analıqların óz aldına «ayırdı»,... (gazetadan)."},
    { word: "Anar", meaning: "(lat runіca) at.bot. Puta sıyaqlı subtropikalıq ósimlik, jemistiń bir túri."},
    { word: "Anatomiya", meaning: "(grek. anatome kesemen, jarıp kóremen). Tiri organizmniń forması hám dúzilisi haqqındaǵı pán."},
    { word: "Anafaza", meaning: "(grek. apa qarsı, phasis payda bolıw, shıǵıw) at. bot. Mitozlıq bóliniwdiń úshinshi fazası."},
    { word: "Angina", meaning: "(lat. angina buwılıw) awız quwıslıǵında tańlay beziniń isiniwi menen ótkir juqpalı kesellik."},
    { word: "Anda-sanda", meaning: "r. Hár waqta, siyrek, ara tura, hár waqta bir.", experience: "Anda-sanda ákeme muńlı kózleri menen qarap qoyadı (K.Smamutov)."},
    { word: "Andız", meaning: "at. Tawlarda ósetuǵın, mal jeytuǵın, uzın sabaqlı kóp jıllıq geyde bir jıllıq, dári ushın paydalanatuǵın sarı shóptiń atı, awırıwǵa em boladı."},
    { word: "Anekdot", meaning: "at. (fr. anecdote) Ómirdegi kúlkili waqıya, hádiyseler tuwralı qısqa, mánisi tereń awızeki kúlkili ángime.", experience: "Túrk tilles xalıqlarda Xoja Nasraddinniń kúldirgi sózleri degen anekdotlar kóp taraǵan (Q.Ayımbetov)."},
    { word: "Anemiya", meaning: "(grek. ap biykarlaw qosımtası+һaіta - qan) Qanda eritrocitler hám gemoglobin muǵdarınıń kemeyiwi menen xarakterleniwshi kesellik."},
    { word: "Anketa", meaning: "fr. enquete sorastırıw, xabar, maǵlıwmat alıw) Tiyisli maǵlıwmat alıw, toplaw hám belgilengen soraw beti, sorawnama.", experience: "Anketa maǵlıwmatları."},
    { word: "Anonim", meaning: "(grekshe belgisiz) óziniń haqıyqıy atın járiya qılmay basılıp shıqqan kitap yamasa xat."},
    { word: "Anons", meaning: "(fr. annonce ǵalaba qural, daǵaza) Gastrol, spektakl, koncert h.t. basqalar haqqında aldınnan tarqatılǵan daǵaza."},
    { word: "Ant", meaning: "at. Bir nárse menen isendiriw arqalı beriletuǵın wáde, ıqrar, lebiz."},
    { word: "Antalaw", meaning: "f. Íntıǵıw, jutınıw, ústine dóniw, úmitleniw.", experience: "Ári-beri úndemey otırıp edim, hár kim hár jaǵımnan antalap «bir nárse aytsa eken?» degendey kózleri jep baratır (Ó.Xojaniyazov)."},
    { word: "Antagonizm", meaning: "(grek. antogonisma aytıs, gúres) Kelisimge kelip bolmaytuǵın qarama-qarsılıq, dushpanlıq."},
    { word: "Antarktida", meaning: "Qubla polyus aymaǵınıń oraylıq bólegin iyelegen materik."},
    { word: "Antenna", meaning: "(lat. antenna keme machtasındaǵı kóldeneń aǵash; qurt-qumırsqa murtı). Elektromagnit tolqınların keńislikke jetkerip beriwshi yáki qabıl etiwshi úskene.", experience: "Televizor antennası."},
    { word: "Anti", meaning: "(grek. anti qarsı, keri) Belgili bir sózlerdiń aldına qosılıp, sol sóz sıpatlaǵan nárse (belgi, háreket)niń qarama-qarsı, kerisin bildiriwshi qosımta."},
    { word: "Antivirus", meaning: "(grek. anti-qarsı, lat. virus-uw) at. 1. med. Mikrobqa qarsı denede payda bolatuǵın belok zat. 2. inf. Kompyuter programmalarına zıyan keltiretuǵın viruslardı tawıp, olardıń keri tásirin (zıyanın) joq etetuǵın, saplastıratuǵın programma."},
    { word: "Antigenler", meaning: "(anti+grek genos násil, kelip shıǵıw) Organizmge jiberilgende, qan hám basqa toqımalarda antideneler islenip shıǵıwı hám immunitet payda bolıwına sebep bolatuǵın zatlar, deneler."},
    { word: "Antik", meaning: "(lat. antiquus - áyemgi) Áyemgi Greciya yamasa Rim sociallıq dúzimine, mádeniyatına, kórkem ónerine tiyisli.", experience: "Antik dáwir."},
    { word: "Antitezis", meaning: "filos. Teziske qarsı qoyılǵan húkim, tartıs, pikir; qarama-qarsı tezis."},
    { word: "Antifriz", meaning: "(antiang freeze muzlatıy) Tómen temperaturada isleytuǵın ishte janıw dvigateli hám b. túrli qurılmalardı suwıtıw ushın qollanılatuǵın, júdá pás temperaturada (-75°ge deyin) muzlamaytuǵın suyıqlıq."},
    { word: "Anticiklon", meaning: "(anti ciklon) meteor hawa aǵımı háreketinen payda bolatuǵın júdá úlken atmosferalıq iyrim."},
    { word: "Antonim", meaning: "(grekshe, qarama-qarsı atamalar) mánisi jaǵınan bir-birine qarama-qarsı sózler, atamalar.", experience: "Antonimler ádebiyatta antitezalardıń jarıqqa shıǵıwın támiyinleydi, onıń bir kórinisi."},
    { word: "Antropo", meaning: "(grek. antropos- adam) adamlarǵa baylanıslı yáki tiyisli sóz jasawshı quramına kirgen bólegi."},
    { word: "Antropolog", meaning: "Antropologiya alımı, qánigesi."},
    { word: "Anuriya", meaning: "(grek. ap-biykarlaw qosımtası+uron-sidik) Sidik tutılıwı (búyrekte payda bolǵan sidik quwıqqa túspewi)."},
    { word: "Anıǵı", meaning: "at. Durısı, ırası, dál ózinen kelgende, negizi, shınında."},
    { word: "Anıq", meaning: "(arab názik, túsinikli, ráwshan) 1. Esitiw, kóriw, túsiniwi boyınsha jaqsı, tolıq túsinikli. 2. Haqıyqatqa sáykes, haqıyqıy, naǵız."},
    { word: "Anıqlama", meaning: "at. Belgili bir zat yaki nársege, uǵımǵa beriletuǵın qısqasha tusinik, sıpatlama."},
    { word: "Anıqlaw", meaning: "Sorap anıǵına jetiw, anıq maǵlıwmat alıw, bilip alıw."},
    { word: "Ań I", meaning: "at. Adam ruwxıy halatınıń joqarı forması, sanası, insannıń pikirlew qábileti; aqıl, esi, sana, sezim, aqıl-es."},
    { word: "Ań II", meaning: "Eti hám terisi ushın awlanatuǵın yaǵnıy jabayı quslar hám haywanlar."},
    { word: "Ańgódek", meaning: "kel. Aq kókirek, sumlıqsız, kewlinde girbin joq, ańqaw.", experience: "Ańgódek jas qızdı jalınǵa tunshıqtırıp taslawları qalay (A.Orazov)."},
    { word: "Anǵarıw", meaning: "f. 1. Seziw, abaylaw, bayqaw. 2. Kóriw."},
    { word: "Ańqa", meaning: "at. anat. Jutqınshaqtıń hawa ótetuǵın bólimi.", experience: ""},
    { word: "Ańqaw", meaning: "Es-huwshın dárriw jıynap ala almaytuǵın, gápke de dárriw túsinip jetpeytuǵın, awsar, eser, biyǵam, oysız."},
    { word: "Ańqırıw", meaning: "f. Ańıraw, bar dawısın jiberiw, dawıslaw."},
    { word: "Ańqıw", meaning: "f. Iyisleniw, iyisi kúsheyip ketiw, iyisli, iyisi shıǵıw, iyisi burqıraw, iyisi dógerekke jayılıw."},
    { word: "Ańla", meaning: "f. 1. Ańǵarıw, bayqaw, ján-jaǵın baqlap qaraw. 2. Abaylaw, aldı-artın oylaw, túsiniw, biliw, pámlew."},
    { word: "Ańlatıw", meaning: "1. Sıpatlaw, bildiriw, eskertiw. 2. Sezdiriw, belgi beriw."},
    { word: "Ańlaw", meaning: "1. Gáp, pikir, sáwbet taǵı basqa da mazmunın biliw, túsiniw. 2. Qabıllaw, túsiniw, pámlew."},
    { word: "Ańlamay", meaning: "Abaysızda, bayqamay, sezbey, bilmey.", experience: "Ańlamay sóylegen, awırmay óledi (qq.x.n.)."},
    { word: "Ańlatpa", meaning: "at. lingv. (lat. annatatio) 1. Kitapqa berilgen qısqasha túsinik. 2. matem. Qálegen sanlar, háripler hám belgileriniń birikpesi."},
    { word: "Ańlı", meaning: "kel. Sezimli, bayqaytuǵın, serli, sezimi bar. esli, esi dúziw, sezgir.", experience: "Biraz ańlı bolsan sen de, kewliń jaqsı sezer seniń (S.Májitov)."},
    { word: "Ańlıw", meaning: "f. 1. Baqlaw, kózde tutıw, kórip júriw, bayqap júriw, qadaǵalaw. 2. Izine túsiw.", experience: "Alıstaǵı dushpannan ańlıp júrgen dos jaman (qq.x.n.)."},
    { word: "Ańsar", meaning: "at. Qıyal, kewil, zeyin, dıqqat, ańsaǵan, kewli kúsegen."},
    { word: "Ańsat", meaning: "kel. Jeńil, qıyın emes, ońay, qolay."},
    { word: "Ańsaw", meaning: "f. Kúsew, saǵınıw, árman etiw, úmitleniw.", experience: "Ayıbı sol: ıǵbal ańsap, súygen doslıq, tınıshlıqtı. (I.Yusupov)."},
    { word: "Ańsız", meaning: "kel. 1. Abaysız, sersiz, oysız, ańlawsız, bayqawsız. 2. Biyǵam, alańsız, oylanbay.", experience: "Ushsa parlar qırǵawıldıń qanatı, Onnan úrker ańsız jolawshı atı (J.Aymurzaev). Bir máhálde ańsız turǵan Ayqızdıń qasında mıltıqtıń dawısı gúrp etti (A.Begimov)."},
    { word: "Ań-tań", meaning: "r. Hayran, ájeptáwir, bir túrli. Ań-tań bolıw hayran bolıw, túsine almaw, tań qalıw.", experience: "Ol sińlisi menen Atajandı kórip ań-tańı shıǵıp, esik awzında ne qıların bilmey sileyip qattı da qaldı (A.Bekimbetov)."},
    { word: "Ańshı", meaning: "at. 1. Mergen, qusshı, ańshılıq penen shuǵıllanıwshı, kásip etiwshi insan. 2. Bir nárseniń izine túsiwshı, ańlıwshı.", experience: "Ańshı peylin anda kórdim, Jan sebil shikarda kórdim, Payda quwǵan sawdagerdiń, Shiyrin ener túslerine (I.Yusupov). Sheshen sózshil keledi, ańshı izshil keledi (qq.x.n.)."},
    { word: "Ańshılıq", meaning: "at. Qus salıwshılıq, ań awlawshılıq, mergenshilik, ań awlawdı kásip etiwshilik.", experience: "Kerder turǵınları hár qıylı balıq túrlerin - súwen, shortan, ılaqa, sazan, sıla, shabaq balıqlardı awlaǵan, ańshılıq penen de shuǵıllanǵan, bul jerlerde jolbarıs, qulanlar kóp bolǵan. (tariyxıy dereklerden)."},
    { word: "Ańız", meaning: "at. (lat. legenda). Ómirde bolǵan adamlardıń, tariyxıy tulǵalardıń basınan keshirgenleri tuwralı xalıq awzındaǵı áńgime.", experience: "Baylıq emes, ańız bolıp isiń qalar, ol isleriń aydın joldı bekkem salar, onı kórip jańa áwlad úlgi alar, Mazmunlı hám sharapatlı jasap úyren (T. Qarlıbaev)."},
    { word: "Ańırayıw", meaning: "f. 1. Es-huwshın joytqanday, albıraǵan, biypárwa qaraǵan. 2. Hayran, tań qalıw, awzı ashılıw, lal bolıw, sersiz qalıw.", experience: "Qız álle bir sumlıqtı sezgendey lal bolıp ańıraydı (X.Seytov.)."},
    { word: "Aorta", meaning: "at. (grek. aorte... aeiro-kóteremen) anat. Júrektiń shep qaltasınan baslanatuǵın eń iri tamır. Onnan tarqalatuǵın arteriyalar pútkil aǵza hám toqımalardı kislorodqa bay támiyinleydi."},
    { word: "Apa", meaning: "at. Ána, balanıń tuwǵan anası, sheshesi.", experience: "Ákem nege ekeni belgisiz, apama bir, maǵan bir kóz taslap, qıp-qızıl bolıp ketti (K.Smamutov)."},
    { word: "Apay", meaning: "at. Jası úlken hayallarǵa, ózinen jası úlken qız-kelinsheklerge aytıladı, ulıwma húrmet retinde de qollanıladı.", experience: "Jigitler hám qızlar Aqnazar ata menen Biybigúl apayǵa kóz aydın ayttı (T.Nájimov)."},
    { word: "Apa-sińli", meaning: "at. 1. Bir-birine tuwısqan yamasa tuwısqanlıq baylanısı bar hayal adamlar.", experience: "Dúnyada ózi diydarınan, ásirese aǵayin-tuwısqan, dos-yaran, aǵa-ini, apa-sińli, ata-ana diydarınan áziz, quwanıshlı ne bar? (gazetadan)."},
    { word: "Apaq-shapaq", meaning: "r. Waqtı xoshlıq, kewilleri xosh bolıw, birgelesip quwanısıw.", experience: "Jadırasıp jaqsı kútip alıstı, Apaq-shapaq quwanısıp qalıstıq, gaz plita gúrlep janıp, shay qaynap, jıllı jerge qalıń tósek salıstı (I.Yusupov)."},
    { word: "Apalaqlaw", meaning: "f. Albıraw, asıǵıw, qaplıǵıw, ne islerin bilmew, ayrıqsha quwanǵanlıqtan yamasa albıraǵanlıqtan sasqalaqlaw, abırjıw.", experience: "Ekewimiz de ádep apalaqlap qaldıq, Sońınan Miyirxan basın sál kóterinkirep pitegene mıyıq tarttı da qoydı (Ó.Xojaniyazov)."},
    { word: "Ap-alıs", meaning: "r. Dım alıs, júdá alıs, oǵada alıs, ádewir jer, uzaq.", experience: "Suwı da júdá tam-tarıs, óris qaldı ap-alıs (T.Jumamuratov)."},
    { word: "Ap-ańsat", meaning: "kel. Ańsat, júdá ańsat, dım ańsat, op-ońay, jep-jeńil.", experience: "Maǵan da ap-ańsat dálil tabıladı (T.Qayıpbergenov)."},
    { word: "Ap-anıq", meaning: "kel. Júdá anıq, túsinikli, bep-belgili, jaqsı belgili, qaynaqay.", experience: "Jazdıń ayı, qara úy shiysheń, sırttan kelgen adam ap-anıq kórinedi (Q.Ayımbetov)."},
    { word: "Aparıw", meaning: "f. Bir narseni ekinshi bir jerge jetkeriw, alıp barıw, ózi menen bir nárseni alıp barıw.", experience: "Ala ǵarǵa nanımdı aldı, Aparıp salmaǵa saldı (Q.Ayımbetov)."},
    { word: "Aparteid", meaning: "(afrika. Apartheid bólek-bólek jasaw) Rasalıq kemsitiwlerdiń eń jawız kórinisi."},
    { word: "Apatit", meaning: "(lat apatetikos-aldawshı, adastırıwshı) Vulkannan atılıp shıqqan kóp jınıslardıń bárqulla quramında bar bolǵan mineral (ásirese fosfatlı tóginler islep shıǵarıw ushın qollanıladı)."},
    { word: "Apatiya", meaning: "(grek aphateia-nemquraydılıq, qızıǵıwdıń joǵalıwı, biypárwalıq) 1. Adamnıń átirapta, ortalıqtaǵı waqıya hám hádiyselerge biypárwa bolıp qalıw halatı. 2. Med. Sırtqı ortalıqqa qızıqpay, pútkilley biypárwa bolıp qalıwı menen sıpatlanatuǵın kesellik."},
    { word: "Apat", meaning: "at. Qáwip-qáter, qırǵın, baxıtsızlıq, kútilmegen jerden bolǵan awır waqıya, tosınnan kelgen qáwip.", experience: "Tosattan keliwshi apat, báleler. Tariyxqa aylanar qara sáneler (S.Qurbanov). Gúres bir abıray, urıs bir apat, kisini kemsitpek saǵan kásapat (Maqtımqulı)."},
    { word: "Apatshılıq", meaning: "at. Ash-aptadalıq, eldiń qorlanıwı.", experience: "Bir jaqlarda suwı sıymay dáryaǵa, Apatshılıq kórip atır tasqınnan (I. Yusupov)."},
    { word: "Ap-awır", meaning: "kel. Dım awır, táwiraq awır, júdá awır, awırlıǵı jeterli.", experience: "Azdan soń eńkeyip shıǵa bergenim ap-awır denem eńsesinen basa ketti (T. Qayıpbergenov)."},
    { word: "Ap-ashshı", meaning: "kel. Dım ashshı, júdá ashshı, uw záhár.", experience: "Naqıl ǵoy ol bilseń xalıqtıń múlki, bilmeseń bil, jurtqa bolasań kúlki, nege shorshıp tústiń tuwlap naǵashım, jep qoyǵanday ırshıp ap-ashshı túrpi! (Aqsholpan Amaniyaz)."},
    { word: "Ap-ashıq", meaning: "kel. Qalay bolsa solay ashıq, tolıq ashılıp turǵan, kere ashıq.", experience: "Túnniń az-maz ayazı bolmasa, aspan ap-ashıq (Sh.Seytov)."},
    { word: "Ap-ayan", meaning: "kel. Belgili, ap-anıq, málim, túsinikli, attan-anıq, bep-belgili.", experience: "Bul mástannıń minezi bizge ap-ayan («Ámiwdárya» j.)."},
    { word: "Apelsin", meaning: "(Goll. appelsien «qıtay alması») 1. Qubla táreplerde ósetuǵın bárqulla jasıl citrus terek yamasa puta. 2. Usı terektiń qabıǵı toq sarı, juqa perdeler menen tilimlerge bólingen domalaq hám sozılmalı suwlı miywe túri.", experience: "Apelsin teri dúzilisin tınıqlastıradı, onı qabıl etiw stressti kemeytetuǵınlıǵı dálillengen (gazetadan)."},
    { word: "Apellyaciya", meaning: "(lat. apellatio mámle etiw, arza)  Qanday da bir qarar, pikir, alınǵan nátiyje ushın joqarı shólkem yáki mákemege shaǵım arza menen jolıǵıw."},
    { word: "Apikal", meaning: "(lat arex-ústki, ushı, joqarǵı) tildiń aldınǵı bólimi til ushı menen birlikte azlap kóterilip joqarǵı tislerge tiyiwi arqalı apikal dawıssız seslerdi jasaydı.", experience: "Olar d, t, s, 1, p sesleri."},
    { word: "Apqal", meaning: "at. 1. Peyil, minez, qulıq, keyip, ádet. 2. Sóylew t. Alıp qal mánisinde.", experience: "Apqalına qarasesh, Tuwrayjaq bizdi úzbendey (A.Dabılov)."},
    { word: "Apqan", meaning: "at. Tilek, niyet, árman.", experience: "Anası ayttı kúymespen, Óli tirińdi bilmespen, Ájel jetpese ólmespen, Deyip apqan qılǵan eken (Berdaq)."},
    { word: "Apogey", meaning: "(grek, arogeios Jerden uzaqta (jaylasqan)) astr. Jer joldası orbitasınıń jer orayınan eń uzaq noqatı."},
    { word: "Apopleksiya", meaning: "(grek apoplesso-soqqı menen zálel jetkeremen) Bas miyine qan quyılıwı yáki miy tamırına qan qoqımının tıǵılıp qalıwı nátiyjesinde esinen ketiw yáki bolmasa láń bolıw menen ótetuǵın kesellik halatı."},
    { word: "Aport (lar).", meaning: "(lat. apporto keltiremen, alıp kelemen) 1. Satılǵan akciyalarǵa tólew sıpatında akcionerlik jámiyetine kelip túsetuǵın múlk. 2. Alma miywesi, tawlı aymaqlarda ósetuǵın suwıqqa shıdamlı sortı."},
    { word: "Aposteriori", meaning: "(lat. a posteriori keyingisinen, keyin turǵanınan) filos. Tájiriybege tiykarlanǵan, tájiriybeden kelip shıǵatuǵın."},
    { word: "Apostrof", meaning: "(grek. apostrophos  shetke, arqa tárepke qaraǵan, qaratılǵan) Jazıwda (geypara tillerde) háriplik belgi menen kórsetilmeytuǵın únli ornına qatar ústine qoyılatuǵın yaǵniy útir belgisine uqsaytuǵın (,) vergul kórinisindegi belgi."},
    { word: "Apostol", meaning: "at. (grek apostolos) diniy. Xristianlardıń ertedegi bir qáwimnen ekinshi qáwimge jayaw júrip jetip, dindi tarqatqan áwliyeler."},
    { word: "Aposiopeza", meaning: "(Grek aposiopesis-jasırıw) Oqıwshı yamasa tıńlawshınıń aytılajaq oyǵa, pikirge dıqqatın awdarıw ushın gáptiń ortasında yáki keyninde úziliske túsip tamamlanbay qalıwı.", experience: "Yaq.... qıstawsız... Jaqında saylaw bar. Kútip otır ol jaqta, dedi (I.Yusupov)."},
    { word: "Appaq", meaning: "kel. Qarday, aq túsli, dım aq, júdá aq.", experience: "Reńine tárip berip óteyin, sarı túsin jarıq kúnge teńeyin, appaq reńin nurı deyin úyińnin, al qarasın kózlerińe meńzeyin. (U.Bijanova)."},
    { word: "Apparat", meaning: "(lat apparatus-tayarlıq, buyım, úskene) Qanday da bir jumıstı orınlaw ushın xızmet etetuǵın ásbap, úskene, mexanizm hám usı sıyaqlılardıń ulıwma atı.", experience: "Telefon apparatı, foto apparat. «Zamin» xalıqaralıq jámiyetlik fondı tárepinen 200 dana esitiw apparatı menen támiyinlenedi (gazetadan)."},
    { word: "Apparatura", meaning: "Belgili bir isti orınlawshı apparatlar jıyıntıǵı; laboratoriya, cex, úlken qurılma h.t.b da ásbap-úskeneler.", experience: "Ximiyalıq apparatura."},
    { word: "Appendiks", meaning: "(lat. appendix artıqsha, ósimte) anat. Soqır ishektiń qurt sıyaqlı ósimtesi."},
    { word: "Apendicit", meaning: "at. Appindikstiń isiniwi keselligi.", experience: "Appendicit keseli waqtınan keshiktirmey operaciya islewdi talap etedi, bolmasa ómirge qáwip tuwadı (gazetadan)."},
    { word: "Applikaciya", meaning: "(lat. applicatio meyillik, birlesiw, qosılıw) Qanday da bir gezleme, qaǵazǵa ráńbáreń gezleme hám qaǵaz bóleklerin jabıstırıp yáki tigip naǵıs salıw usılı."},
    { word: "Aprel", meaning: "(lat. aprilis... apricos Jańasha jıl esabında tórtinshi ay, on eki aydıń biri, báhár ayı.", experience: "Aprel ayınıń birinshi yarımınan baslap, sáwirdiń samalı esip, jer darayı kóylegin kiyip, kók shópler menen bezeldi (Ó.Ayjanov)."},
    { word: "Apriori", meaning: "(lat. a priori áwelden, áwel basınan) filos. Tájiriybege tiykarlanbaǵan, tájiriybeden alınbaǵan, tájiriybeden aldınǵı."},
    { word: "Aprobaciya", meaning: "(lat. approbatio maqullaw, tastıyıqlaw) Tekseriw, sınaw hám dodalaw tiykarında rásmiy túrde maqullaw."},
    { word: "Ap-sap", meaning: "r. Tamam, keyin, tıp-tınıshlıq.", experience: "Toy ap-sap bolǵannan keyin Omardıń sheshesi balası menen kelinine qara úydiń oń qaptalına tósek salıptı. (M.Abdireymov)."},
    { word: "Aptap", meaning: "at. 1. Áptap, kún, quyash, ashıq, tınıq, taza, kúnniń kózi, sáwlesi. 2. Kúnniń, quyashtıń qızıwı, ısıwı.", experience: "Mıń sanlı sadaǵa basqan izinen, misli aptap kibi yúzleri bardur (Ájiniyaz)."},
    { word: "Apteka", meaning: "(grek. apotheke sklad) 1. Vrachlardıń jazıp bergen receptlerine qarap dári tayarlaytuǵın, sonday-aq, dári-dárman hám basqa medicina tovarların saqlaytuǵın hám satatuǵın mákeme, dárixana.", experience: "Tústen keyin aptekadan hayalım dári ákeldi (A.Bekimbetov)."},
    { word: "Aptechka", meaning: "Birinshi medicinalıq járdem kórsetiwde, tiykarınan óz-ózine yáki óz ara járdem beriwde qollanılatuǵın dári-darmaqlar hám solar saqlanatuǵın qutısha.", experience: "Hár túrli dárileri bar aptechkanıń bar bolıwı shárt (A.Djalmenov)."},
    { word: "Aptekashı", meaning: "1. Aptekada dáriler tayarlaytuǵın qánige; farmacevt. 2. Apteka iyesi, satıwshı."},
    { word: "Apıl-tapıl", meaning: "r. Júrer-júrmes, jıǵılıp-súrinip, shala-sharpı adım atlaw, zordan-zorǵa, júriwge endi ǵana úyrenip kiyatırǵan.", experience: "Bir jasına shıqtı apıl-tapıl júrdi, balanıń qızıǵın kórdi («Máspatsha»)."},
    { word: "Apır-tapır", meaning: "r. Basa-bas, qalay bolsa solay, asıǵıs, áy-páyine qaramastan, tez-tez.", experience: "Hámme hawlıǵısıp sırtqa qaray apır-tapır atlıǵıp shıqtı (A.Baymuratova)."},
    { word: "Ar I", meaning: "Adamgershilik qásiyet, namıs, uyat, hújdan.", experience: "Asıraymız, aybatım dep, arım dep, yalǵanshıda, ómirligim, barım dep. (S.Kunnazarov)."},
    { word: "Ar II", meaning: "(fr. age... lat agea maydan, beti, júzi) Metr ólshemi sistemasında júz kvadrat metrge teń jer ólshew birligi, bir gektardıń  júzden bir bólegi."},
    { word: "Ar-namıs", meaning: "Adamgershilik, qásiyet, ar, uyat, namıs."},
    { word: "Ara", meaning: "at. 1. Orta, ashıqlıq, waqıt, aralıq. 2. Adamlardıń óz ara qarım-qatnası."},
    { word: "Arada", meaning: "eki ortada, belgili payıtta. Jaqın arada, tez kúnlerde, jaqında."},
    { word: "Ara-arası", meaning: "r. Hár dayım, geyde, gey waqları, retinde.", experience: "... ara-arasında jámiyetlik jerge de qatnasa basladı, lekciyalar da oqıp júrdi (Q.Ayımbetov)."},
    { word: "Arab", meaning: "c. arap. 1. Aziyanıń Parsı qoltıǵı menen Jer Orta teńizi arası bóliminde Afrikada jasawshı, somiy tilleriniń birinde sóylesiwshi xalıq, millet atı, arab ellerindegi xalıqlardıń jalpı atalıwı, sol xalıqlardıń wákili. 2. Usı xalıqqa (millet) tiyisli (shaxs, mámleket hám t.b)."},
    { word: "Arabizm", meaning: "arab tilinen ózlestirilgen sóz (ibara)."},
    { word: "Ara beriw", meaning: "f. Pardozlaw, ózine qaraw, sulıwlaw, sıypanıp taranıw.", experience: "Ara berip aq júzine, murtına, atlanıp bar balam dayı jurtıńa (A.Dabılov)."},
    { word: "Arabsha", meaning: "1. Arablarǵa, arab álipbesi, tili, ádebiyatı hám mádeniyatına tiyisli. Arabsha jazıw. 2. Arab tili."},
    { word: "Araq", meaning: "(arab tilinen ter, puwlanıw) Suw hám etil spirti aralaspasınan tayarlanatuǵın ishimlik, sharap.", experience: "Araq iship más bolǵan, óz-ózine qas bolǵan (A. Begimov)."},
    { word: "Araqxor", meaning: "Ishiwshilikke berilgen, araqtı kóp ishetuǵın, máskúnem.", experience: "Aqmaq jónsiz qanǵıydı, araqxor dúkán ańlıydı (qq.x.n.)."},
    { word: "Araq-sharap", meaning: "at. Ishimliktiń jalpı atalıwı."},
    { word: "Aral", meaning: "at. geogr. Jan-jaǵı suw menen qorshalǵan qurǵaqlıq, ataw."},
    { word: "Aralas", meaning: "kel. Birdey emes, hár túrli. Aralas sanlar.", experience: "Dáryanıń eki boyı tal aralas toranǵıl toǵay bolǵan (K.Sultanov)."},
    { word: "Aralaw", meaning: "Ishinde júriw, qıdırıw.", experience: "Kóp jılqını aralap, ákesiniń malınday, qırq attı tańlap aladı (Berdaq)."},
    { word: "Aralıq", meaning: "at. 1. Qashıqlıq, eki ortası, arası. 2. Waqıt, mezgil."},
    { word: "Arallı", meaning: "at. Aral boyınıń adamı, xalqı.", experience: "Arallılar menen qaraqalpaqlar jiyi-jiyi otırǵan awıllardıń ornı, góne jollardıń qaldıqları, bir jerlerdiń abat bolǵan, ústinde sıǵasqan el otırǵanın dálilleydi (N.Dáwqaraev)."},
    { word: "Aran", meaning: "at. bot. Kóknar tuqımlasına jatatuǵın bir jıllıq ósimlik, shóptiń túri, aran jawın menen qırda ósedi.", experience: "Aran menen selewdi, attıń otı der edi («Alpamıs»)."},
    { word: "Arasat", meaning: "din. Islam dininde aytılıwı boyınsha qıyamet qayım bolǵanda, barlıq adamzat tirilip toplanatuǵın qorqınıshlı dalańlıq, qıyamet maydanı."},
    { word: "Ara-tura", meaning: "r. Anda-sanda, siyrek, geyde, ara-arasında..."},
    { word: "Arasha", meaning: "at. Tórelik, kátqudalıq."},
    { word: "Arba", meaning: " (arab tilinen aroba) Tiykarınan eki yamasa tórt dóngelekli, at, eshek yáki ógizge jegiletuǵın, adamlar, júk tasıytuǵın, arbakesh basqaratuǵın transport quralı, aǵashtan soǵılǵan arnawlı kólik."},
    { word: "Arba jol", meaning: "at. 1. Úlken jol, arba, mashina júretuǵın arnawlı keń jol. 2. Mektep oqıwshıları paydalanatuǵın dápter túri.", experience: "Arba joldıń boyında qalıp edi paqırlar, qızıl qumnıń oyında (S.Májitov)."},
    { word: "Arbakesh", meaning: "Arba menen júk tasıwshı, arba miniwshi, basqarıwshı adam.", experience: "Altaqtaǵa janbaslaǵan arbakesh, artta otırǵan adamǵa sóz salmas hesh (I.Yusupov)."},
    { word: "Arbalı", meaning: "Arba jekken, arbası bar.", experience: "Asıqpaǵan arbalı qoyanǵa jetedi (qq.x.n.)."},
    { word: "Arbaw", meaning: "f. Kótermelew, jaqsı sóz benen jubatıw, aldastırıw, kewlin baǵıw.", experience: "Solardı aldap, arbap sońına ertti («Qız. muǵ». J.)."},
    { word: "Arbasha", meaning: "Arbanıń kishkenesi, arba sıyaqlı kólik.", experience: "Chaydakovtı kishkentay arbashaǵa jatqarıp operaciya jayına kirgizdi (A.Bekimbetov)."},
    { word: "Arbashı", meaning: "at. Arbakesh, arba aydawshı adam, kisi."},
    { word: "Arbitr", meaning: "(lat. arbiter- gúwa, tamashagóy; sudya) 1. Táreplerdiń razılıǵı menen saylanatuǵın sudya. 2. Sport oyınları, jarıslardıń qaǵıydalarına ámel qılıwdı gúzetip, baqlap barıwshı, bahalawshı sudya."},
    { word: "Argon", meaning: "(grek. argos háreketsiz) Ximiyalıq element, hawa quramında bolatuǵın reńsiz hám iyissiz gaz.", experience: "Elektr lampaları hám jarıq túsiriwshi reklama ásbapları ishin toltırıw ushın qollanıladı."},
    { word: "Argotizm", meaning: "(fr. argotisme... argot jargon) til bilimi. Belgili bir sociallıq topardaǵı adamlar arasında qollanılatuǵın shártli sóz yáki sóz dizbekleri."},
    { word: "Argument", meaning: "(lat. argumentum anıq dálil) 1. Pikir, dawa h.t.b dálillewshi tiykar, dálil. 2. mat. Erkin ózgeriwshi muǵdar. Dálil, sebep, tiykar, isenerli wáj."},
    { word: "Arǵalı", meaning: "at. Qoy násili."},
    { word: "Arǵı", meaning: "kel. Ana sheti, arjaǵı."},
    { word: "Arǵımaq", meaning: "at. Hasıl, shapqır, júyrik, atlarǵa berilgen ulıwma at."},
    { word: "Arǵıt", meaning: "at.Úlken aǵash, juwan aǵash."},
    { word: "Ardaq", meaning: "1. Izzet-húrmet, ádiwlew sezimi, usınday sezimli múnásibet. 2. Ayawlısı, ádiwlisi. 3. Qımbatlı, qásterli, hasıl (jer, mákan)."},
    { word: "Ardaqlatıw", meaning: "ardaqlaw feyiliniń ózgelik dárejesi."},
    { word: "Ardaqlı", meaning: "Izzet-húrmetke, qádir-qımbatqa ılayıq.", experience: "Aq kókireklik etip, aldawǵa inanıp, ardaqlı Begislerdi taslap ta ketken (J.Aymurzaev)."},
    { word: "Ardana", meaning: "f. 1. Miyras bolıw, tiyisli bolıw. 2. Ózinen awıspaw, ózine buyırıw.", experience: "Ol ardana bolsın Abdiramanǵa (I.Yusupov)."},
    { word: "Ardap", meaning: "at. Jarma, shubat, kúshsiz awqat, negizinen arıqlaǵan ılaq, buzawlarǵa beriw ushın arnawlı qaynatıp islengen awqat.", experience: "Hámiyshe ardabıń qaynap qoyılmay, suyıq bolıp jarmań ketti qostarım (A.Dabılov)."},
    { word: "Areal", meaning: "(lat. agea mákan, maydan) 1. Ósimlik yáki haywanlardıń qanday da bir túri, otryadı yáki tuqımlası tarqalǵan aymaq."},
    { word: "Arena", meaning: "(lat agepa-kum) 1. Áyemgi Rim tamasha kórsetiw orınlarınıń amfiteatr ortasındaǵı qum sebilgen aylana maydanı."},
    { word: "Arena", meaning: "1. Áyemgi Rim tamasha kórsetiw orınlarınıń amfiteatr ortasındaǵı qum sebilgen aylana maydanı. 2. Házirgi zaman cirkinde tamasha ornı, oyın maydanı, maydansha, keńislik.", experience: "Ol házir manej dep ataladı."},
    { word: "Arenda", meaning: "Waqıtsha paydalanıw ushın alınatuǵın jer.", experience: "...qaraqalpaqlarǵa jerlerdi arendaǵa alıp islewge tuwrı keldi (N.Dáwqaraev)."},
    { word: "Arjaq", meaning: "r. Qarama-qarsı jaq, arǵı bet, arǵı tárepı."},
    { word: "Arza", meaning: "(arab tilinen-arznama, iltimasnama) Belgili bir mákeme yamasa lawazımlı shaxs atına jazılǵan ótinish, usınıs, shaǵım mazmunındaǵı rásmiy hújjet."},
    { word: "Arzagóy", meaning: "Arza menen kelgen yáki xabarlasqan shaxs."},
    { word: "Arzan", meaning: "(pars bahası tómen, qádiri kem) Bahası, nırqı joqarı bolmaǵan, qımbat emes.", experience: "Suw mol bolǵay! gázi joqlar gáz jaqqay, arzan turǵay bárha un menen aq may. (J.Aneteev)."},
    { word: "Arzan-girew", meaning: "Tiykarǵı bahasınan biraz pás, arzımaǵan pulǵa, tómen baha menen arzan-girewge satıp alıw."},
    { word: "Arzıw-árman", meaning: "at. Murat-maqset, árman, tilek, keleshek, úmit."},
    { word: "Arzıwlı", meaning: "Ármanlı, kerekli, intizarlı, úmitli. qádirli, qımbatlı."},
    { word: "Ar-iyman", meaning: "at. Ar-uyat, namıs hám iygilikli, adamgershilik."},
    { word: "Arifmetika", meaning: "Matematikalıq sanlardıń ápiwayı qásiyetlerin hám olar ústinde orınlanatuǵın ámellerdi (qosıw, alıw, kóbeytiw, bóliw) úyrenetuǵın bólimi, esap."},
    { word: "Ariya", meaning: "(ital agіa-qosıq) Orkestr yamasa basqa muzıka ásbapları menen qosılıp shertiliwi arqalı bir adam atqaratuǵın vokal dóretpe, qosıq (kóbinese opera, oratoriya hám t.b. sol sıyaqlı quramındaǵı bólegin ańlatadı)."},
    { word: "Arktika", meaning: "(grek arktikos-arqa) (A-úlken) Jer sharınıń arqa polyus bólegi."},
    { word: "Arqa", meaning: "at. 1. Adamnıń arqası, jotası. 2. anatom. Moyınnan segizkózge deyingi adamnıń dene tárepi."},
    { word: "Arqayın", meaning: "kel. Uwayımsız, qayǵısız, jay-paraxat, emin-erkin.", experience: "Meni sizler qayǵırmań, bola beriń arqayın (Sh.Mámbetmuratov)."},
    { word: "Arqalaw", meaning: "f. Kóteriw, bir zattı iynine, arqaǵa salıp alıp júriw yamasa bir jerden ekinshi jerge alıp barıw.", experience: "Baǵdagúl qabaǵın arqalaw menen úyge sóyley kirdi (T.Qayıpbergenov)."},
    { word: "Arqalıq", meaning: "at. Arbanıń úskeneleriniń bir bólegi, arbanıń tiykarǵı awırlıǵın attıń (eshektiń) beline túsirip turatuǵın qam sherimnen, arqan t. b. islenetuǵın zat.", experience: "Arbanıń arqalıǵın ákelip qoydı (Q.Ayımbetov)."},
    { word: "Arqan", meaning: "at. Zıǵır, kenep, kendir, paxta jip, júnnen, qıldan, házirgi waqıtları sintetik talshıqlardan, sımnan da tayarlanatuǵın, baylaw ushın qollanılatuǵın buyım"},
    { word: "Arqanlaw", meaning: "f. Otlaw ushın úy haywanların uzın arqan menen qazıq yamasa basqa nársege baylap qoyıw.", experience: "Úlken balalarǵa eliklep, men de baspaǵımdı uzın jipke arqanlap qoyaman (Ó.Ayjanov)."},
    { word: "Arqar", meaning: "at. Orta Aziyada tawlarda jasaytuǵın qoshqarday múyizi iri, qoy sıyaqlı jabayı haywan."},
    { word: "Arqa taspa", meaning: "at. Haywanlardıń terisi.", experience: "Solay etip bala jolbarıstıń arqa taspasın kesip alıp ishinen beline qıstırdı da,... (Q.Ayımbetov)."},
    { word: "Arqash", meaning: "at. Dúmpeshik, bálentlew jer, tóbeshik.", experience: "Sen tezek teriwge shıǵıp arqashqa, geyde qanday jaqsı qosıqlar ayttıń (I.Yusupov)."},
    { word: "Arlanıw", meaning: "f. Arı keliw, namıslanıw, namısı keliw, ızalanıw."},
    { word: "Arlaw", meaning: "f. Arın áperiw, sózin sóylew, haqlaw, tárepin alıw, jırlaw. Arın arlap, jırın jırlaw, bolısıw, kómeklesiw, sózin sóylew, namısın qorǵaw."},
    { word: "Arlı", meaning: "kel. Namıslı, arı keletuǵın, sóz kótermeytuǵın."},
    { word: "Arlı-berli", meaning: "r. Arman-berman, artqa-alǵa, oyaqqa-buyaqqa, anda-mında.", experience: "Azıq, awqat komissarı taǵı da ójirede arlı-berli júrip, tosattan Antonnıń aldına kelip toqtadı (A.Makarenko)."},
    { word: "Armanıraq", meaning: "r. Keyinirek, arıraq, bılayıraq, uzaǵıraq, basqa jerge.", experience: "Sebebi ol hámmeden de alısqa joldas bolıp armanıraq uzatıw kerek (T.Qayıpbergenov)."},
    { word: "Armatura", meaning: "(lat armatura qural-jaraq, qural túri) tex. 1. Apparat, mashina, imarat hám usı tárizlilerdiń tiykarǵı bólegine kirmeytuǵın járdemshi bólekleri jıyıntıǵı.", experience: "Puw qazanı armaturası."},
    { word: "Armiya", meaning: "at. (lat agtage-qurallandırıw) 1. Mámlekettiń barlıq qurallı kúshleri jıyındısı. Respublikamız armiyası. Hárekettegi armiya-Armiyanıń urıs waqtındaǵı frontta bolǵan bólimleri."},
    { word: "Armyan", meaning: "at. 1. Armeniya Respublikasınıń jergilikli xalqı, millet atı. 2. Usı milletke tiyisli shaxs. Armyan tili usı xalıqqa, milletke tiyisli til."},
    { word: "Arna", meaning: "at. 1. Geypara jerlerde mısalı Xorezmde úlken, bas kanal. 2. Geypara Ózbekstannıń bir jerlerde dialektlerinde kishkene jarlıq mánisinde.", experience: "	Awıldıń shetine shıǵıp, góne arnanıń ultanına tústi (K.Sultanov)."},
    { word: "Arnalıw", meaning: "f. Baǵıshlanıw, tigiw.", experience: "Júrekten shıqqan arnalıp, muhabbat jırın jırlaydı (B. Qayıpnazarov). «Aq altınlı atızdıń azamatları» povesti kolxoz awılı turmısına arnalǵan (G.Esemuratov)."},
    { word: "Ar-namıs", meaning: "at. Hújdan, adamgershilik, saqlıq.", experience: "Adam balasında bolsın ar-namıs, Eń kemi júz bolsın kóz kórgen tanıs (Berdaq)."},
    { word: "Arnayı", meaning: "1. Arnap, adayı. 2. Birew ushın. 3. Óz aldına, jeke, dara."},
    { word: "Arpa", meaning: "at. Ǵálle, dánli ósimlikler qatarına kiretuǵın, dáni awqat hám jem sıpatında paydalanılatuǵın bir yáki kóp jıllıq ǵálle ósimligi hám onıń dáni, ǵállesi.", experience: "Arpa ekken arpa, biyday ekken biyday alar (qq.x.n.)."},
    { word: "Arpa-biyday", meaning: "at. Dánli daqıl, azıqlıq eginler jıyıntıǵı.", experience: "Arpa-biyday as eken, altın-gúmis tas eken (qq.x.n.)."},
    { word: "Arpalıs", meaning: "at. 1. Talas-tartıs, uzaq dawam etken gúres, qım-qıyqash, túsiniksiz waqıya. 2. Jan talas.", experience: "Baslandı qaldı arpalıs, ashıwlı Aral gúrsindi (K.Sultanov)."},
    { word: "Arpıldaw", meaning: "f. 1. Jónsiz birewge baqırıw, qattı sózler menen urısıw, awızın tartıp urıw, arsıldaw. 2. Iyttiń ızalanıp aybat kórsetiwi, dawıslawı, qattı úriwi.", experience: "Turım sabırın uslap tura almadı, Qudiyar mına arpıldaǵan tóbetlerindi baylaysań ba, ya joq pa? (K. Sultanov)."},
    { word: "Arsarı: arsarı shıǵıw", meaning: "r. Hayran bolıw, ájeptáwir, bir túrli, úreyleniw."},
    { word: "Arsenal", meaning: "at. (fr. arsenal-ustaxana) 1. Qural-jaraq, oq-dári isleytuǵın, ońlaytuǵın, saqlaytuǵın orın; qural-jaraq skladı. 2. awıs. Kóp sandaǵı qanday da bir nárse, úlken zapastaǵı (qor) turǵan kóp zat, nárseler."},
    { word: "Arsız", meaning: "kel. Arı joq, hújdansız, adamgershilik qásiyeti joq.", experience: "Ol hesh waqıtta bunshama arsız bolıwǵa barmaydı (R.Tagor)."},
    { word: "Arsıldaw", meaning: "f. 1. Ashıwlanıw, baqırıw, jónsiz dawıstı kóteriw. 2. Shabalanıp úriw."},
    { word: "Arsınıw", meaning: "f. Arı keliw, arlanıw, namısı keliw, namıslanıw.", experience: "Ashıwlanıp arsınıp, Elden shıǵıp ketersiz («Qırq qız»)."},
    { word: "Art", meaning: "at. 1. Belgili bir zattıń aldınǵı betine qarama-qarsı jaǵı, beti.", experience: "Adasqannıń artına baq, Namıssızban júzim, kewlim qap-qara (I. Yusupov)."},
    { word: "Artıw", meaning: "f. 1. Júkti tiyew, júk salıw. 2. awıs. Júklew, tapsırıw. 3. Molayıw, abırayı asıw. 4. Isenimi artıw, Úmiti artıw. Arta túsiw-ulǵaya túsiw, kúsheye túsiw."},
    { word: "Artezian", meaning: "(fr. artezian-Franciyadaǵı Artua (lat Artesium) oblastı atınan) artezian suwları Basım tárizinde bolǵan jer astı suwları, olar suw ótkermeytuǵın qatlamlar aralıǵında payda boladı."},
    { word: "Arterioskleroz", meaning: "(arteriya grek. sclerosis-qatıp qalıw) med. Arteriyalar diywallarınıń qalınlasıwı hám tıǵızlasıwı nátiyjesinde júz beretuǵın sozılmalı kesellik."},
    { word: "Arteriya", meaning: "(grek. arteria dem alıw jolı; aertereo saqlaw) med. Kislorodqa toyınǵan qandı júrekten aǵzalar hám toqımalarǵa jetkerip beriwshi tamırlar. Ókpe arteriyası. Arteriya basımı. Uyqı arteriyası moyın boylap taralǵan úlken arteriya."},
    { word: "Artel", meaning: "at. (fr. artel... ital arteire ónerment) Puqaralardıń, kásip-óner iyeleriniń birlesip, jámáát bolıp islew ushın dúzilgen shólkemlerdin biri.", experience: "Artel bolıp gúllán isti óndirip, qıyın isti miynetine kóndirip (J.Aymurzaev)."},
    { word: "Artellesiw", meaning: "f. Shólkemlesiw, birigip islesiw, jábdilesiw, qosılısıp islesiw, artelge birigiw, artel bolıw.", experience: "Jańa tuqım usılayınsha sebildi, Artellesiw, mine usılay kewilli (I.Yusupov)."},
    { word: "Artikl", meaning: "(lat. articulus sóylew bólegi, bólim) til bilimi. Geypara tillerde atlıq, atlıqlasqan (substantivlesken) sózlerdiń hám sóz birikpeleriniń aldında qollanılatuǵın ayrıqsha anıqlawshı sóz. Ang(a, an, the) nem(der, die, ein, eine), fp (la, le, les; un, une, des)."},
    { word: "Artikul", meaning: "(lat. articulus bólim, bólegi) 1. Geypara nızam hám rásmiy hújjetlerde arnawlı statya (punkt). 2. Ónim. tovar túri, sonday-aq, onıń sanlı hám háriplik belgisi (formulirovka)."},
    { word: "Artikulyaciya", meaning: "(lat articulatio... articulare anıq aytıw) 1. til bilimi. Sóylew aǵzalarınıń (erin, til t.b.) sestiń aytılıwında sóylew aǵzalarınıń háreketi hám olardıń ornalasıw halatı. Awızlıq artikulyaciya. 2. muz. Dóretpeni sazda yamasa dawıs penen atqarıw usılı."},
    { word: "Artilleriya", meaning: "at. (lat artillere-tayarlaw) 1. Top, minomyot hám t.b. usı tárizli oq atıw quralları jıyıntıǵı. Zenit artilleriyası.", experience: "Palatkada otırǵanımızda artilleriya atıspalarınıń hám snaryadlardıń jarılǵan dawısları anıq esitilip turdı (N.Dáwqaraev)."},
    { word: "Artilleriyashı", meaning: "Artilleriyada xızmet etetuǵın ásker, oficer."},
    { word: "Artist", meaning: "at. (lat. ars artis-kásip, óner, kórkem óner)  Kórkem shıǵarmanı tamashagóyler ushın atqarıwshı, oyınshı. Estrada artisti. Opera artisti.", experience: "Mine xalıq artistleri Ayımxan, Japaq baqsı qaraqalpaq mámleketlik teatrınıń eki mashinası menen kelip jetti (N.Dáwqaraev)."},
    { word: "Artistka", meaning: "at. artist hayal."},
    { word: "Artrit", meaning: "(grek. artron-buwın+it(is)-jaraqatlanıwdı ańlatıwshı qosımta) Buwınlar jaraqatlanıwı, keselligi."},
    { word: "Artrologiya", meaning: "(grek. artron-buwın+logos-táliymat, ilim) buwın hám onıń keselliklerin úyrenetuǵın ilim."},
    { word: "Arttırıwshı", meaning: "at. Bir nárseniń kólemin yáki sapasın burınǵısınan ósiriwshi, ózgertiwshi, jaqsılawshı adam."},
    { word: "Artıq", meaning: "kel. Zıyat, kóp, awısıq, jetkilikli, mólsherden tıs, joqarı, shamadan artıq, mol.", experience: "Tomas Edison mıńnan artıq áwmetsiz tájiriybelerden keyin ǵana lampochkanı oylap taptı (R.Kiosaki)."},
    { word: "Artıqmashılıq", meaning: "at. Ózgeshelik, ayrıqshalıq, ózinshelik.", experience: "Sonnan keyin diyqanlar birotala artıqmashılıq aladı (T. Qayıpbergenov)."},
    { word: "Artılıw", meaning: "f. Mingesiw, birine-biri jabısıw, biriniń ústine ekinshisiniń miniwi, qaptırılıw.", experience: "Qashar artılıp ǵarrı ógizge, Qońırat zorlıq qılǵan eken (Berdaq)."},
    { word: "Artınıw", meaning: "f. 1. Iynine, arqasına bir nárselerdi júklep kóteriw, arqalaw. 2. Denedegi yáki onıń qanday da bir bólegindegi ızǵar, hóldi súlgi menen ısqılap ketiriw."},
    { word: "Artıwlı", meaning: "kel. Tiyewli, júklewli.", experience: "Ortamızda bir eshek, kórpe-tósek artıwlı, Bári ǵana olardıń, Jaqsısı joq jartıwlı (Jiyen jıraw)."},
    { word: "Aruz", meaning: "(arabsha-qosıq ólshemi) 1. ádeb. Arab poeziyasında qosıq dúzilisi boyınsha ilimiy qaǵıyda. Aruz uzınlı-qısqalı buwınlardıń óz ara tákirarlanıp keliwine negizlengen kútá qıyın qosıq ólshemi."},
    { word: "Arfa", meaning: "(nem Harfe-ital. Agra) Úshmúyeshli ertedegi kóp tarlı muzıka áspabı."},
    { word: "Arwaq", meaning: "q. árwaq. (arab tilinen) at. diniy. Jan deneden bólek degen isenim boyınsha ólgen insannıń tirishiliktegi adamlardı qorǵap júretuǵın ruwxı."},
    { word: "Arwana", meaning: "q. árwana. Bir órkeshli, túyeniń urǵashısı."},
    { word: "Arxaizm", meaning: "(grek. archaios eń birinshi, ertedegi) ling. Belgili dáwir ushın gónergen, qollanılıwdan shıǵıp baslaǵan til birligi, óziniń mazmunına qaray salt-dástúrdi, diniy túsiniklerdi, xojalıq zatları menen hár túrli atamalardı ańlatatuǵın sózler.", experience: "Onseri bel menen siyseri ketpen, jantaq dásteletip, tomar gewletken (I.Yusupov)."},
    { word: "Arxaik", meaning: "Gónergen, qollanılıwdan qalǵan."},
    { word: "Arxeolog", meaning: "Arxeologiya alımı, qánigesi."},
    { word: "Arxeologiya", meaning: "(grek. archaios áyemgi, ertedegi+logos-táliymat) Áyemgi mádeniy miyraslar tiykarında xalıqlardıń tariyxıy ótmishin, turmısı hám mádeniyatın úyreniwshi ilim.", experience: "Arxeologiya muzeyi."},
    { word: "Arxivshi", meaning: "arxiv xızmetkeri, arxivte islewshi."},
    { word: "Arxiepiskop", meaning: "(grek. archi sóz jasawshı sózlerdiń birinshi bólegi bolıp, «joqarı», «joqarı dáreje» «úlken» mánilerin bildiredi; archiepiskopos-úlken episkop) Episkoptan joqarı ataq hám usı ataqqa iye bolǵan ruwxanıy."},
    { word: "Arxierey", meaning: "(grek. archiereus birinshi, úlken ruwxanıy) Xristianlar shirkewlerinde; joqarı dárejeli ruwxanıylar (episkop, arxiepiskop hám mitropolit)dıń ulıwma atalıwı."},
    { word: "Arximandrit", meaning: "(grek. archimandrites) Erkekler monastırı baslıǵınıń hám monaxlardıń joqarǵı ataǵı hám sol ataqqa iye bolǵan shaxs."},
    { word: "Arxipelag", meaning: "(grek. arche-baslı; +pelagos-teńiz) Bir-birine jaqın jaylasqan teńiz atawları gruppası, atawlar."},
    { word: "Arxitektonika", meaning: "(grek. architektonike (techne) qurılıs (sanaatı) 1. arxit. Sanaatta, ásirese arxitekturada bir pútinniń ayırım bólekleri ortasındaǵı sáykeslik, sayma-saylıǵı; kórkem elementlerdiń óz ara muwapıqlıǵı, sáykesligi."},
    { word: "Arxitektor", meaning: "(grek architekton-arxitektura qánigesi) Arxitektura qánigesi, imaratlardı jobalastırıwshı yáki qurıwshı qánige."},
    { word: "Arxitektura", meaning: "(lat architectura grek architektonike) Imarat hám qurılıslardı jobalastırıw, qurıw hám bezew óneri. Zamanagóy arxitektura."},
    { word: "Arxitektorlıq", meaning: "Arxitektor kásibi, arxitekturaǵa tiyisli."},
    { word: "Arergard", meaning: "(fr arrire-arttaǵı+garde-saqshı) Áskeriy júris, hújim hám sheginiw waqtında tiykarǵı kúshlerdiń izinen barıwshı hám olardı dushpannıń arttan kelip hújim etiwinen saqlawshı áskeriy bólim."},
    { word: "Arsha", meaning: "at. Kiyim-kenshek, dáskeler yamasa ıdıs-tabaqlar t.b. salıp qoyıw ushın, aǵashtan islengen qutı.", experience: "Qáne, endi balamnıń xatın maǵan ber, arshanıń túbinde estelikke saqlap qoyaman (Ó.Xojaniyazov)."},
    { word: "Arshıl", meaning: "kel. Sóz kótermeytuǵın, qamshı súymeytuǵın, namıslı, kekshil.", experience: "Ol oǵada kekshil, arshıl xayuan boldı deydi («Ámiwdárya» j.). Erjan artta qalıwdı súymeytuǵın arshıl... (T.Esemuratov)."},
    { word: "Arshın", meaning: "at. Metr ólshem sistemasına kirmesten aldınǵı qollanılǵan uzınlıq ólshem birligi (0,71 metrge teń).", experience: "Ol tórt-bes arshın biyiklikte dárwazanıń ústine shıqtı (S.Saliev)."},
    { word: "Arshınlaw", meaning: "f. 1. Metrlew, ólshew, mólsherlew. 2. awıs. Ayaǵın keń basıw, adımlap basıw."},
    { word: "Arshıw", meaning: "f. Qabıǵınan tazalaw, qırshıw, alıw."},
    { word: "Arı-beri", meaning: "r. Alay-bulay, arman-berman, olay-bulay, oyaqqa-buyaqqa, aldına-artına.", experience: "Ekewi mashinanıń janında az ǵana turdı da, arı-beri júre basladı (Ó.Xojaniyazov)."},
    { word: "Arız", meaning: "k. arza, at. (arab tilinen) 1. Mútáj, muń, tilek. 2. Arız sóz, ókpe sóz. 3. Ótinish. Arız aytıw jasaw, jaǵdayın aytıw, kómek soraw. Arızı jetiw, aytqanı bolıw, sózi ótiw, tilegi orınlanıw."},
    { word: "Arızdar", meaning: "at. Arza beriwshi, arza qılıwshı adam.", experience: "Namaz ruwza qarızdar, Bolsın bir adamǵa atam. Qalaysha boldıń arızdar, Sebep nedur maǵan atam (Berdaq)."},
    { word: "Arıq", meaning: "kel. Eti joq, júdew, azǵın, tozǵan.", experience: "Arıqlardı baǵıwǵa, Semizlerdi baylawǵa, Xalqına bekkem tapsırdı («Qırq qız»)."},
    { word: "Arıqlaw", meaning: "1. kel. júdá arıq emes, arıǵıraq, páslew, ortasha. 2. f. Júdew, azıw.", experience: "Ol arıqlaw uzın boylı, qara shashı qap-qalıń kelinshek eken (K.Smamutov)."},
    { word: "Arıqlıq", meaning: "at. Pájmúrdelik, júdewlik, boldırǵanlıq, halı joqlıq, hálsizlik.", experience: "Mahiytaban emes májnún kórindi, Shapqan atım arıqlıqtan súrindi, Kem-kemnen ańlanar sózlerim endi, Bárshesi dúnyanıń yalǵan kórindi (Berdaq)."},
    { word: "Arıq-turaq", meaning: "kel. Arıqlawdan kelgen, arıqlaw, arıqtorıdan kelgen, ebindey, ortasha.", experience: "Meńlibay Eshniyazov sılınǵırdan kelgen arıq-turaq bala edi (J.Aymurzaev)."},
    { word: "Arıq-turıq", meaning: "kel. Jaman-juman, jaman-jáwdik, pájmúrde, azǵın.", experience: "Baspaq, tana arıq-turıqqa qoldan jılıtıp suw bermek kerek (S.Májitov)."},
    { word: "Arıldaw", meaning: "Haywanlardıń, ańlardıń aybat shegiwi, ırıldawı."},
    { word: "Arılmas", meaning: "kel. Tawsılmas, izi joq, ada bolmas.", experience: "Bul is bolar arılmas dárt. Beldi buwıp bolayın márt (Ótesh)."},
    { word: "Arılmaw", meaning: "f. Jazılmaw, sawalıp ketpew, táwir bolmaw, qutılmaw.", experience: "Qullası usı bala tuwǵalı awırıwdan arılmaydı. (qq.x.e.)."},
    { word: "Arıs", meaning: "at. Arbanıń eki qaptalınıń uzın aǵashı, arbanı atqa, ógizge t. b. jegiwde eń kerekli jaqlaw aǵashı.", experience: "Arbanıń qasında qalǵan baspashılar adamlardı tegis baylap bolǵan soń, atlardı arıstan sheship aldı. (K.Sultanov)."},
    { word: "Arıslan", meaning: "at. Pıshıq tárizliler tuqımlasına kiretuǵın tırnaqları ótkir, kúshli, iri jırtqısh sút emiziwshi haywan.", experience: "Jigit sózinen, arıslan izine qaytpas (qq.x.n.)"},
    { word: "Arıw", meaning: "kel. Sulıw, sımbatlı, ayrıqsha, kórkem, oǵada jaqsı, aq bilek, aq dene.", experience: "Suw ishiwge bir arıw aral, Saǵan megzep qaldı, Ámiwdiń qızı (I. Yusupov)."},
    { word: "Arıwlaw", meaning: "f. Diniy. Meyitti aq juwıp, aq bóz benen oraw; qásterlew."},
    { word: "As", meaning: "at. Adamzattıń kerekli zatı, taǵamı, iship-jemi, awqat.", experience: "Otawǵa Múshirip kelip, as tayar bolǵanın xabarladı (K.Sultanov)."},
    { word: "Asa", meaning: "kel. Artıq, kóp, aslam.", experience: "Asa bilim shayırlıq joq ózimde, Kóp kemisler qaldı aytqan sózimde (Berdaq)."},
    { word: "Asabat", meaning: "at. din. Ólige tiyisli sadaqa, ólgennen keyingi beriletuǵın qarası, jetisi, qırqı, júzi, jılı.", experience: "Malın soydı et boldı. Asabatı kóp boldı, úsh-tórt kúnniń ishinde tarqatıp bárin jep boldı (A.Dabılov)."},
    { word: "Asalıw", meaning: "f. Ulǵayıw, asqınıw, jaman bolıw, úlkeyiw, jaranıń, kúyiktin, keseldiń qozıp, aynıp, ketiwi."},
    { word: "Asam", meaning: "kel. Awızdıń bir tolısı.", experience: "«Tawdan tastan qaytpaǵan júregim bir asam maydan qaytama» dep oyladı Sapar ishinen (M.Abdireymov)."},
    { word: "Asaw", meaning: "kel. Boysınbaǵan, adamǵa úyretilmegen, juwas emes, kúsh bermey erksiz ketetuǵın.", experience: "Ári dayımdikine baraman, ári asaw tayımdı úyretemen (qq.x.e.)."},
    { word: "As-awqat", meaning: "at. Tamaq, as, nan, ishim-jem, azıq-awqat.", experience: "Kún ótti, shabısqan attay. Tek júrdim júrekke as-awqat batpay ( M.Dáribaev)."},
    { word: "Asawlanıw", meaning: "f. Kúsh bermew, tuwlaw, jónsiz ketiw, turpayılanıw.", experience: "Asawlanıp jigitine taslanar... Eki jasta toymas sıbır-sıbırdan (T.Seytjanov)."},
    { word: "Asawlıq", meaning: "at. Úyrenilmegenlik, kónlikpewshilik, jatırqawshılıq, moyınsınbaǵanlıq, ısılmaǵanlıq."},
    { word: "Asbest", meaning: "(lat asbestos-óshpeytuǵın, jemirilmeytuǵın) Otqa shıdamlı, kislota hám silti tásir etpeytuǵın, ıssılıq hám elektr ótkermeytuǵın talshıqlı mineral."},
    { word: "Aseptika", meaning: "(grek. a-biykarlawshı qosımta+septikos irińli) Irińli jaraqatlarǵa infekciya túsirmewge qaratılǵan shara-ilajlar sisteması."},
    { word: "Asimmetrikalıq", meaning: "Simmetrikalıq bolmaǵan, simmetrikalıq emes."},
    { word: "Asimmetriya", meaning: "(grek asymmetria-ólshemi bir emes) simmetriyanıń joqlıǵı yáki buzılǵanlıǵı; simmetriya-sızlıq. ant. Simmetriya."},
    { word: "Asker", meaning: "k. ásker."},
    { word: "Asket", meaning: "(grek asketes shınıǵıw islewshi, dárwish). Asketizm tárepdarı, japadan-jalǵızlıqtı tańlawshı, qálender, dárwish."},
    { word: "Asketizm", meaning: "1. Hámme dúnya nárselerinen waz keship, tárki dúnya qılıw, dárwishlikti úgitlewshi diniy-násiyatlıq teoriyası. 2. Ómir lázzetlerinen, hámme dúnya islerinen, baxıt-saadattan waz keshiw, tárki dúnya qılıw, dárwishlik, qálenderlik."},
    { word: "Askiya", meaning: "(arabsha ziyreklik, tapqır) Ózbek xalıq dóretpeleriniń bir janrı bolıp, onda sóz oyınına, astarlı sózlerge tiykarlanǵan eki yamasa onnan artıq adam ya bolmasa tárepler jarısadı."},
    { word: "Asqabaq", meaning: "at. Tamaq retinde paydalanılatuǵın iri jemisli baqsha eginleriniń túri.", experience: "Gúldey jaynaǵan júzin suwıq urǵan asqabaqtıń pálegindey soldırdı (A.Begimov)."},
    { word: "Asqabaqtay", meaning: "Kólemli, úlkenligi asqabaq sıyaqlı."},
    { word: "Asqazan", meaning: "at. Ishken-jegen awqattıń saqlanatuǵın hám sińiriletuǵın ishki qurılıstaǵı adam organizmi, as sińiriw múshesi.", experience: "Bul úydegiler Romeshtiń ókpesine suwıq tiyer dep, sonshelli qorıqsa da asqazan buzılar-aw dep oylamaytuǵın edi (R.Tagor)."},
    { word: "Asqan", meaning: "1. f. Ozǵan, ayrıqsha, artıqmash, ózinshe. 2. kel. Asa, dım, júdá, zor.", experience: "Kópke gúres tutpaq itibar emes, jurttan asqan artıq kúshi bolmasa. (Ájiniyaz)."},
    { word: "Asqar", meaning: "1. kel. Biyik, záwlim, bálent. 2. at. Taw, shıń. 3. awıs. Qıyınshılıq, awırmanshılıq, salmaq, awır júk, qayǵı-nápes.", experience: "Qaramınday asqar tawdıń, árman zili belge tústi (I. Yusupov)."},
    { word: "Asqarday", meaning: "kel. 1. Asqar sıyaqlı, tárizli, biyik. 2. Súyenetuǵın, isenetuǵın."},
    { word: "Asqarlaw", meaning: "1.Biyiklew, biyikke kóteriliw, sharıqlaw. 2. poet. Tolqınlanıw."},
    { word: "Asqatıq", meaning: "at. Azıq, awqat. Jarmaǵa qatatuǵın ayran, qatıq. sút, aǵarǵan.", experience: "Sıyırın sawıp, gúbisin pisip, asqatıqlıq ayran alıp kiyatırman (A.Begimov)."},
    { word: "Asqızıw", meaning: "f. qazan kóterip, tamaq, as tayarlatıw."},
    { word: "Asqındırıw", meaning: "1. f. Awırıwın gújitip alıw. 2. Isti shaptırıw, shiyelenistiriw. 3. Kúsheytiw, údetiw."},
    { word: "Asqınlaw", meaning: "1. f. Tolıp-tasıw, kewildi hádden tıs kóteriw, anaw-mınawdı pisent etpew. 2. awıs. Ulǵayıw, awırıwı kúsheyiw, aynıw.  3. Shekten shıǵıw. sheńgeldey", experience: "Sen asqınladıń, qátelestiń, bir kúnleri ókinerseń... Awırıwı asqınladı em kórmey, janım qattı shanshıp atır (G.Jumamuratov)."},
    { word: "Asqınıw", meaning: "1. f. Ulǵayıw, awırıwı kúsheyiw. 2. Kúsh beriw, aynıw.", experience: "Xalıq aǵıldı tezden eski qorǵanǵa, ázep otı kókirekte asqındı (I.Yusupov)."},
    { word: "Asqınıwshılıq", meaning: "at. Asqınıp ketiwshilik, shekten shıǵıwshılıq."},
    { word: "Asqısh: qulaq asqısh", meaning: "Til alǵısh, tıńlaǵısh."},
    { word: "Aslam", meaning: "1. kel. Artıq, kóp, zıyat, artıǵıraq, ústem. 2. r. Belgili bir mólsherden, shamadan artıq, kóp.", experience: "Bári jabılıp júzden aslam sawın sıyır sawadı (K.Sultanov)."},
    { word: "Aslamıraq", meaning: "kel. Artıǵıraq, kóbirek, molıraq, biraz, táwiraq.", experience: "Házir meniń sennen xat almaǵanıma on aydan aslamıraq waqıt boldı (G.Izimbetov)."},
    { word: "Aslaw", meaning: "k. haslı.", experience: "Aslawıńa dán saldım, kel tezirek kóre ǵoy (X.Tájimuratov)."},
    { word: "Aslı-paslı", meaning: "at. Negizgi, túp deregi, tuqımı, shıqqan jeri, shıǵısı, ata tegi.", experience: "Esengeldiniń aslı-paslın bilip sóylesiwge qumar etedi (Q.Irmanov)."},
    { word: "Aspaniy-zámiyin", meaning: "at. Jerdiń astı-ústi, dunya júzi.", experience: "Aspaniy-zámiyinniń astı qapılıp, Máten jırtıq shayır bolǵan emes pe (A.Muwsaev)."},
    { word: "Aspa", meaning: "at. Asıp qoyılǵan, ilinip turǵan, asılıp turǵan zat.", experience: "Aspa shıra, aspa kalendar, aspa kópir, aspa saat."},
    { word: "Aspaz", meaning: "at. Awqat pisiriwshi, aspazlıq kásibi menen shuǵıllanıwshı adam.", experience: "Aspaz puwǵa (qq.x.e.)."},
    { word: "Aspay-saspay", meaning: "f. Asıqpay, albıramay, áste-aqırın.", experience: "Dárya keń peyil, márt dárya ǵana aspay-saspay sozılıp aǵıp tur (K.Sultanov.)."},
    { word: "Aspaq", meaning: "at. góner. Dar aǵashı, jazalaw quralı."},
    { word: "Aspalı", meaning: "kel. Asıwlı turǵan, asıp qoyatuǵın, iliwli.", experience: "Aspalı saat."},
    { word: "Aspan", meaning: "at. Jerdiń yamasa basqa da astronomiyalıq obekttiń joqarǵı qatlamı, tóbemizdegi keńislik."},
    { word: "Aspekt", meaning: "at. (lat. Aspectus kózqaras, kórinis). Belgili bir másele, qubılıs, túsinik hám t.b. solarǵa uqsaǵan faktlerdi úyreniwge tiykar bolatuǵın kózqaras."},
    { word: "Aspid", meaning: "at. 1) uwlı jılan; 2) sóyl. Jawız, zalım, hiyleker."},
    { word: "Aspirant", meaning: "at. (lat. aspirans, aspirantis talpınıw. Aspiranturada oqıp atırǵan ilimpaz.", experience: "Joqarı oqıw ornında yamasa ilim izertlew institutında ilimiy, ilimiy-pedagogikalıq xızmetke hám kandidatlıq dissertaciyasın qorǵawǵa tayarlanıwshı qánige."},
    { word: "Aspirantura", meaning: "at. Joqarı oqıw orınlarında yáki ilim izertlew institutlarında professor-oqıtıwshılar hám ilimiy kadrlardı tayarlaw sisteması, nátiyjede dissertaciya qorǵalıwı hám ilim kandidatı ilimiy dárejesi beriliwi esaplanadı.", experience: "Aspiranturaǵa qabıl etiliw. Aspiranturanı tamamlaw."},
    { word: "Aspirator", meaning: "at. 1. Óndirislik orınlardan shańlanǵan hawanı sorıp alıwǵa arnalǵan apparat; 2. med. Aspiraciyanı iske asırıwshı ásbap."},
    { word: "Aspirin", meaning: "1. Áyemgi Rim monetası (tengesi); Áyemgi Rim awırlıq ólshem birligi. 2. Ass- Assos Áyemgi Miziyadaǵı (Misiya) port hám qalanıń ataması."},
    { word: "As-sadaqa", meaning: "at. din. Ólgen adamlarǵa arnalıp beriletuǵın as-suw, óliniń jolına beriletuǵın quday jolı, sadaqa.", experience: "Shanash túbinde mardan quwısında qalǵan azı-kem napaqa menen kempir as-sadaqa bergisi kelmedi (Q.Aralbaev)."},
    { word: "Assalam", meaning: "1. Tuwrı forması: assalawma áleykum. 2. Sálem jollaw."},
    { word: "Assalawma áleykum", meaning: "q. s. Sálem beriw, sálemlesiwdiń túri.", experience: "Assalawma-áleykum, - dep dawıslap sálem berdim (Á.Shamuratov)."},
    { word: "Assam tili", meaning: "ling. Hindstannıń Assam shtatınıń rásmiy tili. Sonday-aq Butan hám Bangladeshte de keń tarqalǵan.", experience: "15 millionnan aslam adam bul tilde sóyleydi."},
    { word: "Assambleya", meaning: "fr. (assemblee-májilis, jıynalıs) 1. Xalıqaralıq shólkemlerde geypara basqarıw organları atı. 2. Jıynalıs.", experience: "Birlesken Milletler Shólkemi Bas Assambleyası."},
    { word: "Assignatlar", meaning: "fr. (assignats lat.assigno) Ullı francuz revolyuciyası dáwirindegi qaǵaz pullar."},
    { word: "Assignaciya", meaning: "tar. Rossiya imperiyasında 1769-jıldan 1849-jıllar aralıǵında kredit bilet engizilgenge shekem ómir súrgen qaǵaz pul belgisi."},
    { word: "Assimilyaciya", meaning: "(lat-assimilatio-uqsatıw, salıstırıw, teńlestiriliw). 1. biol. Ósimlik yáki jániwar organizmi iskerligi procesinde sırttan qabıl etilgen zatlardıń ózlesiwi, siniwi, ózlestiriliwi, sindiriliwi. 2. Bir xalıq (yáki onıń bir bóleginiń) basqa bir xalıq úrp-ádetlerin, mádeniyatı hám tilin ózlestirip, óz tiliniń, mádeniyatınıń hám milliy sana-seziminiń joq etiliwi nátiyjesinde usı xalıqqa qosılıp ketiwi. 3. ling. Bir sestiń ekinshi bir ses tásirinde uqsas (bir túr) formaǵa ótiwi."},
    { word: "Assiriologiya", meaning: "Assiriya, Vaviloniya hám Mesopatamiya tariyxın, mádeniyatın, tillerin hám jazıwların úyrenetuǵın kompleksli gumanitar pán."},
    { word: "Assistent", meaning: "(lat assistens, assistentis qatnasıp atırǵan, járdemlesip atırǵan) 1. Qánigeniń járdemshisi. Professor assistenti. 2. Joqarı oqıw orınlarında kishi oqıtıwshı lawazımı hám usı lawazım iyesi."},
    { word: "Assistentlik", meaning: "Assistent jumısı, lawazımı.", experience: "Assistentlik etiw."},
    { word: "Acconans", meaning: "fr. (assonans latınsha assono uyqas esitilemen, úylesim) poetikalıq yamasa prozalıq tekstte dawıslı seslerdiń únlesip qaytalanıwı."},
    { word: "Assorti", meaning: "(fr. assorti-jaqsı saralanǵan) Bir tekli zatlardıń arnawlı jıynaǵı."},
    { word: "Assortiment", meaning: "(fr. assortiment -terme, toplam, saralanǵan, toplanǵan) Tovarlardıń hár qıylı túrleri, atları hám sortlarına qaray toplamı."},
    { word: "Associanizm", meaning: "", experience: "psixikalıq processlerdiń dinamikasın associaciya principi menen túsindiretuǵın dúnya júzilik psixologiyalıq baǵdarlardıń tiykarǵı túrleriniń biri."},
    { word: "Astar", meaning: "at. (arab tilinen perde, jawlıq, parsı tilinen-ishinen tigilgen gezleme) 1. Kiyim yáki kórpe, kórpeshe sıyaqlı nárselerdiń ishki qabatı, ishki tárepine tigilgen gezleme (material). 2. awıs. Sózdiń basqasha ekinshi mánisi.", experience: "Eki qolı menen shapanınıń ishki astarınan uslap, qawsırınıp aldı (J.Aymurzaev)."},
    { word: "Astaqta", meaning: "at. Qamır jayıw ushın aǵashtan arnap soǵılǵan taxta, taxtay.", experience: "Ol túyinshikti anasınıń kópshiginiń astına tıqtı da, pechtiń quwısında jatqan papka ishinen bir dápter alıp, astaqtanıń ústine jaydı, biraq ne jazarın bilmey, qálemin barmaqlarınıń arasına qısqan halında iyegin eki alaqanına basıp otırıp qaldı, uzaq otırıp qaldı (T.Qayıpbergenov)."},
    { word: "Asteniya", meaning: "med. (grek. kúshsizlik), xronikalıq (sozılmalı) sharshaw sindromı kewil-keypiyatınıń asa turaqsızlıǵı, ózin tutıwdıń hálsirewi, shıdamsızlıq, bir jerde otıra almaw, uyqınıń buzılıwı, uzaq aqılıy hám fizikalıq kúsh salıw uqıplılıǵınıń joǵalıwı, shawqımdı, joqarı jaqtılıqtı, ótkir iyisti kótere almaw belgilerinde kórinetuǵın joqarı sharshaw menen nawqaslanıw jaǵdayı."},
    { word: "Asteroidlar", meaning: "astr. (grek. aster juldız + eidos kórinis; uqsas) Quyash sistemasınıń Mars hám Yupiter ortalıǵında aylanatuǵın kishi planetalar, kishi aspan deneleri."},
    { word: "Astma", meaning: "med. (grek asthma hallaslaw, buwılıp qalıw) Bronxlar tesiginiń tosattan tarayıp qalıwı yáki júrek kesellikleri nátiyjesinde tutılatuǵın buwlıǵıp dem jetpewi."},
    { word: "Astra", meaning: "at. (grek. astron juldız) bot. Quramalı gúller tuqımlaslarınan túrli reńdegi iri gúlli baǵ ósimligi."},
    { word: "Astro", meaning: "(grek astron - juldız) Qospa sózler quramındaǵı sózlerdiń aldında kelip, juldız hám planetalarǵa baylanıslılıǵın ańlatadı."},
    { word: "Astrobiologiya", meaning: "(astro... + biologiya) Álemdegi tirishiliktiń barlıq túrdegi kórinislerin úyrenetuǵın ilim."},
    { word: "Astrobotanika", meaning: "(astro... + botanika) Astronomiyanıń planetalardaǵı (birinshi gezekte Marstaǵı) ósimliklerdi úyrenetuǵın bólimi."},
    { word: "Astrograf", meaning: "(astro... + jazaman) aspan obektlerin súwretke alıwshı teleskop."},
    { word: "Astrolog", meaning: "Astrologiya menen shuǵıllanıwshı shaxs, qánige, boljawshı."},
    { word: "Astrologiya", meaning: "(astro... + grek logos tálim, túsinik) Ertede aspandaǵı jaqtılandırıwshı denelerdiń halatına qarap pal ashıwdan ibarat bolǵan jasalma ilim."},
    { word: "Astrolyabiya", meaning: "Astronomiyada uzınlıq hám keńisliklerdi anıqlaw ushın XVIII ásirge deyin qollanılıp kelgen múyeshlerdi ólshew ásbabı."},
    { word: "Astrometriya", meaning: "Astronomiyanıń tiykarǵı wazıypası aspan deneleriniń geometriyalıq hám kinematikalıq qásiyetlerin izertlewden ibarat bolǵan bólimi."},
    { word: "Astronimika", meaning: "Aspan deneleriniń menshikli atamaların hám olardıń jıyıntıǵın úyrenetuǵın onomastikanıń bólimi."},
    { word: "Astronom", meaning: "Astronomiya alımı, qánigesi."},
    { word: "Astronomiya", meaning: "Aspan deneleri, ulıwma álem, galaktika dúzilisi hám rawajlanıwı haqqındaǵı ilim."},
    { word: "Astronomiyalıq", meaning: "Astronomiyaǵa tiyisli. Astronomiyalıq ásbap. Astronomiyalıq sanlar júdá úlken sanlar menen sıpatlanatuǵın muǵdarlar, kólem (shama)."},
    { word: "Astrofizik", meaning: "Astrofizika menen shuǵıllanıwshı alım, qánige."},
    { word: "Astrofizika", meaning: "Astronomiyanıń aspan deneleriniń fizikalıq halatın hám ximiyalıq quramın úyrenetuǵın bólimi."},
    { word: "Astroximiya", meaning: "(molekulyarlıq astrofizika) - astrofizika hám ximiya ilimleriniń birigiwindegi juldızlar ortalıǵındaǵı atomlar, molekulalar hám shan dánesheleri arasındaǵı ximiyalıq reakciyalardı, juldızlar hám planetalardıń payda bolıw fazaların, sonday-aq, atomlar hám molekulalardıń kosmik nurlanıwı menen óz ara tásirin úyrenetuǵın ilim tarawı."},
    { word: "Astınǵı", meaning: "kel. Astındaǵı, tómendegi, pástegi, tómengi."},
    { word: "Astın-ústin", meaning: "r. Astın-ústine shıǵıw, ala-topalan."},
    { word: "Astırtın", meaning: "r. Bildirmesten, jasırın, sırttan, qupıya.", experience: "Ábden keshikken soń, astırtın Turımdı jiberip edi (K.Sultanov)."},
    { word: "Asxana", meaning: "at. 1. Úydiń ishindegi awqat pisiretuǵın orın, taǵam tayarlawǵa arnalǵan ójire. 2. Jámiyetlik awqatlanıw ornı."},
    { word: "Asıǵıs", meaning: "r. 1. Tez orınlanıwı lazım bolǵan, keshiktirip bolmaytuǵın, qıstawlı asıǵıs buyırtpa, asıǵıs májilis. 2. Qıstaw, jıldam, shaqqan, ǵapır-ǵupır, tez-tez, dárriw.", experience: "Keldik dedi Húrziya asıǵıs túrde (J.Dáribaev)."},
    { word: "Asıǵıslıq", meaning: "at. Shıdamsızlıq, tezlik, jıldamlıq, shaqqanlıq."},
    { word: "Asıǵısta", meaning: "r. Asıqqan waqıtta.", experience: "Xattı alıp Gúlayım asıǵısta oqıdı («Qırq qız»)."},
    { word: "Asıǵıw", meaning: "f. Gózlengen istiń, maqsettiń tez ámelge asıwı ushın umtılıw, sabırsızlıq penen háreket etiw; tez islew, jıldamlatıw, tezletiw, shaqqanlatıw.", experience: "Jumabay padanıń izinen asıǵıp ketti. (T.Qayıpbergenov)."},
    { word: "Asıq I", meaning: "at. Qoydıń, eshkiniń hám de usı sıyaqlı mayda janlı-janıwarlardıń artqı eki ayaǵında bolatuǵın dizedegi súyek, bunıń menen balalar oynaydı."},
    { word: "Asıq II", meaning: "Asıǵıw feyiliniń buyrıq forması."},
    { word: "Asıqqısh", meaning: "kel. Asıǵatuǵın, asıǵa beretuǵın, mudamı asıǵıp júretuǵın.", experience: "Asıqqıshpan-aw men oǵada, pitse deymen bári birden (I. Yusupov)."},
    { word: "Asıqpaw", meaning: "f. Jay paraxat qıymıldaw, bir jumıstı áste islew.", experience: "Soń asıqpay barıp aldındaǵı japtıń rashına mindi (T.Qayıpbergenov)."},
    { word: "Asılıw", meaning: "f. 1. Iliniw, salbıraw, asılıp turıw, jarmasıw, uslap qalıw, eki qolı menen uslap turıw, uslaw, súyeniw. 2. Darǵa asılıw óliw. 3. Awıs. Qazan kóteriw, pisiriw.", experience: "Svetlana anasınıń betin zorlıq penen ashıw niyetinde izine erip júrip kórpesine asıldı (T.Qayıpbergenov)."},
    { word: "Asım", meaning: "at. Azıraq, qazanǵa bir salım, bir tamaqlıq.", experience: "...ne boladı! soyıń, alısqanda jigitlerge bir asımnan jeteme dep onı da azsındı (K.Irmanov)."},
    { word: "Asımday", meaning: "Bir asım shamasında."},
    { word: "Asımlıq", meaning: "at. Qazanǵa bir salarlıq, bir tamaqlıq, bir pisirgendey, shamalı, bolarlıq.", experience: "Kólge Pirman aw salayıq, asımlıq balıq alayıq (Ótesh)."},
    { word: "Asıp-tasıw", meaning: "1. Dárya suwınıń jiyeginen asıwı. 2. awıs. Dáwleti artıwı, sheksiz bayıw."},
    { word: "Asırandı", meaning: "kel. 1. Asırap alınǵan, asırap saqlaǵan, kelege keltirgen, ekinshi birewdiń saqlaǵanı. 2. Qolda ósken, qolǵa úyretilgen."},
    { word: "Asıraw", meaning: "f. Saqlaw, tárbiyalaw, kútiw, baǵıw, támiyinlew.", experience: "Men soń bildim, olar biyperzent ata-analar eken, jetimlerden bala qılıw ushın asırawǵa aladı eken. (T.Qayıpbergenov)."},
    { word: "Asırawsız", meaning: "kel. Qarawsız, qarawı joq, kewil bólinbegen, ádep kórmegen, tártip kórmegen.", experience: "Bir degende ne jaman, asırawsız ósken ul jaman (qq.x.q.)."},
    { word: "Asırawshı", meaning: "at. Baǵatuǵın, tamaq tawıp beretuǵın adam."},
    { word: "Asırım: jeti asırım", meaning: "at. 1. Qaraqalpaq xalıq namalarınan biriniń atı. 2. Belgili bir ólshemli jol, mólsher.", experience: "Sazla baqsı duwtarıńdı, jeti asırım namasına (I.Yusupov)."},
    { word: "Asıw I", meaning: "f. Ildiriw, baylap qoyıw, salbıratıw, darǵa asıw."},
    { word: "Asıw II", meaning: "f. Pisirip qaynatıw, qazanǵa salıw.", experience: "Jumagúl qazan asıwǵa kiristi. (T.Qayıpbergenov)."},
    { word: "Asıw III", meaning: "f. 1. Artıw, artıq, mólsheri kóp, asıp-tasıw. 2. Uzaqlaw, ekinshi tárepke ótip ketiw, kóp jerge júriw."},
    { word: "Asıwlı", meaning: "kel. Iliwli, ildiriwli.", experience: "Onıń kózi asıwlı sebetke tústi (S.Ayniy)."},
    { word: "At I", meaning: "at. Jılqı.", experience: "Torı at iyesine usap kútá juwas edi. (T.Qayıpbergenov)."},
    { word: "At II", meaning: "Adamnıń jeke ismi.", experience: "Jaqında tuwılǵan úkeme Aygúl dep at qoydı («Jetkinshek» g.)."},
    { word: "At qoyıw", meaning: "Bala tuwılǵanda ism beriw."},
    { word: "At dorba", meaning: "at. Atqa jem beriw ushın materialdan islengen qalta."},
    { word: "At jaqlı", meaning: "kel. Uzın jaqlı, beti jumalaq emes uzınsha, beti sopaq jaqlı."},
    { word: "At jem", meaning: "at. Atqa beriletuǵın jem, ot-shóp, dán t. b."},
    { word: "At jollaw", meaning: "f. Xabarlaw, xabar jiberiw, at jiberiw.", experience: "Dárbent joldıń awzına, sarhabın bálent oydırıp, uzaǵına xat jollap, jaqınına at jollap, eli jurtın jıydırıp (N.Dáwqaraev)."},
    { word: "At otı", meaning: "at. At jemi, ot-shóp, bede, jońıshqa."},
    { word: "At sayman", meaning: "at. At hám oǵan kerekli jabıwlar; er-turman, qamıt-sayman."},
    { word: "At seyis", meaning: "k. seyis."},
    { word: "At-ton", meaning: "Miner at, kiyer kiyim-kenshek."},
    { word: "At-turman", meaning: "at-sayman, er-turman."},
    { word: "At-túye", meaning: "at-túyedey. Qádirli, qımbat."},
    { word: "Atshı", meaning: "1. At baǵıwshı adam. 2. Arbanıń atın júrgiziwshi adam, arbashı."},
    { word: "Ata", meaning: "at. Áke, ákesiniń ákesi.", experience: "Adam qartaysa balaǵa aylanadı deydi. Atamnıń zeynine tiyip almańlar!... (T.Qayıpbergenov)."},
    { word: "Ata-ana", meaning: "at. Áke-sheshe, ata-ene.", experience: "Ata-anam yadqa tústi náyleyin (Omar)."},
    { word: "Ata-baba", meaning: "at. Burında jasap ketken, ata tek.", experience: "Ata-babam maldı jıynap, shıbın janın bárha qıynap (Berdaq)."},
    { word: "Atavizm", meaning: "(lat atavi-ata-babalar) biol. Áyemgi ata-babalarda bolǵan belgilerdin bir neshshe aǵzalarında joq bolıp ketip, sońınan basqa áwladlarda jáne payda bolıwı."},
    { word: "Ata-ene", meaning: "Kúyewiniń ata anası; qáyin ata, qáyin ene."},
    { word: "Atajan", meaning: "k. s. Ata janım, janım atam.", experience: "Máhshárimde yoldash bolsın iymanım, ǵamxorım, atajan qolıń ber indi (Ájiniyaz)."},
    { word: "Atayı", meaning: "kel. Naǵız, haqıyqat, burınnan sońǵı, ázelgi.", experience: "Atayı (ázelgi) dushpan el bolmas (qq.x.n.)."},
    { word: "Ataka", meaning: "at. Atıs, hújim, oq jawdırıw."},
    { word: "Atakalaw", meaning: "hújim jasaw."},
    { word: "Ataq", meaning: "at. Dańq, dáreje, abıray, húrmetli at.", experience: "Mine qanday! Aral teńizi ullı ataqqa iye! (Á. Shamuratov)."},
    { word: "Ataqlı", meaning: "kel. Atı shıqqan, ataq alǵan, ataqqa erisken, dańqı jayılǵan, tanımalı, dańqlı, dárejeli, abıraylı, belgili.", experience: "Ataqlı paxtakesh Ayım Kamalovanıń shaqırıǵına ol qosılǵan edi («Ámiwdárya» j.)."},
    { word: "Ataqlılıq", meaning: "at. Dańqlılıq, tanımalılıq, abıraylılıq."},
    { word: "Ataqsız", meaning: "kel. Dańqsız, dárejesiz, abıraysız, atı shıqpaǵan."},
    { word: "Atalas", meaning: "kel. Ákeleri tuwısqan, aǵayin, tuqımlas.", experience: "Awıllasıń kim bolsa, atalasıń sol boladı. (qq.x.m.)."},
    { word: "Atalmısh", meaning: "Joqarıda atalǵan, sóz bolǵan."},
    { word: "Atalı", meaning: "Ákesi bar, ákesi tiri."},
    { word: "Atalı-balalı", meaning: "Ákesi menen balası yáki balaları."},
    { word: "Atalıq I", meaning: "at. 1. Revolyuciyaǵa shekemgi puqara xalıqtıń ústinen qarawshı, el basqarıwshı, ámeldar kisi. 2. Awıs. Ǵamxorlıq, qayırqomlıq.", experience: "Diyqanshılıqqa qolaylı jerler atalıq baylardıń qolında boldı (N.Dáwqaraev)."},
    { word: "Atalıq II", meaning: "1. Atanıń óz perzentine bolǵan múnásibetleri hám sol múnásibetlerge baylanıslı halatlar.", experience: "Atalıq etiw - atalarsha ǵamxorlıq, mehribanlıq kórsetiw, járdem beriw."},
    { word: "Atalıq III", meaning: "1. biol. Janıwarlar menen jánliklerdiń analıqqa qarama-qarsı jınıs wákili. 2. bot. Gúldiń kóbeyiw múshesi."},
    { word: "Atalıw", meaning: "f. Atın atap beriw, inam etiliw."},
    { word: "Atama", meaning: "Bir nárseniń yamasa qubılıstıń atı, termin."},
    { word: "Ataman", meaning: "1. tar. Patsha Rossiyası zamanında áskeriy, hákimshilik, policiyalıq xızmet atqaratuǵın baslıq. 2. Puqaralıq urıs waqtındaǵı aq gvardiyashılardıń basshısı. 3. sóyl. t (awısp.)Topar basshısı."},
    { word: "Atanaq", meaning: "at. Tórt múyeshliktiń ortadaǵı ashıqlıǵın tórtke bólgendegi sızıqlardıń dál ortasındaǵı kesisken jeri, uzınına bir, kesesine bir tartılǵan sızıq."},
    { word: "Atanaqlaw", meaning: "f. uzınına, kesesine ayqastırıw."},
    { word: "Atanıw", meaning: "f. Atı shıǵıw, atı jayılıw, qánigeligi, óneri, iskerligi menen tanılıw.", experience: "Perzenti Tazagúl jetimliktiń kesapatınan qanday bolıp ósedi?... jesir ana tárbiyalaǵan «kórmedik qız» atanıp ketedi.(T. Qayıpbergenov)."},
    { word: "Atańa nálet", meaning: "k. Nálet."},
    { word: "Atastırıw", meaning: "f. Jaslayınan qızdı ya balanı áke-sheshesi tárepinen kúyewge yamasa kelin alıw ushın jáne birewdiń qızına ya balasına basın baylaw, wádelesip qoyıw.", experience: "Qız besikte jatqanda belgili birewge atastıradı (N.Dáwqaraev)."},
    { word: "Atatek", meaning: "at. Tuqım-teberik, shıǵısı, atı-jóni.", experience: "Men onı ata teginen beri bilemen (Q.Ayımbetov)."},
    { word: "Ataw I", meaning: "at. Kóldiń ortasındaǵı suw shıqpaǵan ashıqlıq jer."},
    { word: "Ataw II", meaning: "f. Atın aytıw, atap ótiw, belgilep ketiw, ayta ketiw, eslep ketiw.", experience: "Nege sizlerdiń bárińiz meni Sushila dep ataysız? - dep soradı qız birden (R.Tagor)."},
    { word: "Ateizm", meaning: "filos. Dindi, diniy táliymattı, qudaydı, ulıwma iláhiy kúshlerge isenimdi inkar etiw."},
    { word: "Ateist", meaning: "filos. Ateizm tárepdarı.", experience: "Berdaqtıń qosıqlarına qaraǵanda ol dinnen birotala bezgen ateist bolǵan adam emes (I.Saǵitov)."},
    { word: "Atele", meaning: "1. Súwretshi, músinshi, fotograftıń jumıs isleytuǵın xanası. 2. Kiyim-kenshek, etik hám t.b. sol siyaqlı zatlardı tigiw, radio, televizor hám sol qusaǵan zatlardı ońlaw menen xalıqqa xizmet kórsetiwshi ustaxana."},
    { word: "Atqaminer", meaning: "at. Iyge tartar, úlken, hámeldar, iri baslı."},
    { word: "Atqaraz", meaning: "at. At qosatuǵın qaraz, úlken qaraz, digirman."},
    { word: "Atqarılıw", meaning: "f. Isleniw, orınlanıw, bejeriliw.", experience: "Birinshiden dástannıń dóretiliw, ekinshiden, atqarılıw jaǵı... (Q.Maqsetov)."},
    { word: "Atqarısıw", meaning: "Birge atqarıw, birgelesip orınlaw."},
    { word: "Atqarıw", meaning: "f. Orınlaw, islew, jumıstı júrgiziw."},
    { word: "Atqarıwshı", meaning: "Qanday da bir jumıstı orınlawshı, bejeriwshi adam.", experience: "Nókis qalalıq atqarıw komiteti (gazetadan)."},
    { word: "At qosshı", meaning: "at. Járdemshi, kómekshi, júrgen jerde atın baylap ot salatuǵın, basqa da jumısların islep júretuǵın adamı, ne aytsa sonı orınlawshı.", experience: "Ayt qáne, jas biy, jasawıl atqosshıǵa qaysı biydiń balasın qáleysen? (T.Qayıpbergenov)."},
    { word: "Atqulaq", meaning: "at. Jabayı ósimlik, attıń qulaǵınday iri jasıl japıraqlı ósimlik."},
    { word: "Atqısh", meaning: "kel. Jaqsı ata alatuǵın, haqıyqıy mergen.", experience: "...biziń batalonnıń ornına atqıshlar diviziyası keldi (Ó.Xojaniyazov)."},
    { word: "Atlanıs", meaning: "at. Topılıs, jaylawǵa shıǵıw, urısqa atlanıw."},
    { word: "Atlas", meaning: "at. 1. Gezleme, materialdıń bir túri, júzi jıltıraq, júzleme jipek. 2. Geografiyalıq atama, karta.", experience: "Qazınıń aldına atlas dasturxan jayıldı (K.Sultanov)."},
    { word: "Atlaw I", meaning: "at. Ayran atlaytuǵın, aǵashtan arnap soǵılǵan zat, predmet.", experience: "Atlawdı ala juwırıp edi, ana hayal shaqalaqlap kúlip jiberdi (K.Sultanov)."},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", experience: ""},
    { word: "", meaning: "", example: "" },
    { word: "", meaning: "", example: "" },
    { word: "", meaning: "", example: "" },
    // Bu yerda boshqa 1000 ta so‘zni qo‘shishingiz mumkin...
  ];

  /* ======================
     STORAGE KEYS
     ====================== */
  const LS = {
    theme: "qsoz_theme",
    favorites: "qsoz_favorites",
    history: "qsoz_history",
    searchesTotal: "qsoz_searches_total",
    searchesWeekly: "qsoz_searches_weekly",
    weekKey: "qsoz_week_key",
  };

  /* ======================
     UTIL
     ====================== */
  const $ = (s) => document.querySelector(s);

  function escapeHtml(str = "") {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function toast(msg, icon = "✅") {
    const t = $("#toast");
    if (!t) return console.warn("Toast element not found");
    t.innerHTML = `<span style="margin-right:8px">${icon}</span><span style="line-height:1.35">${escapeHtml(
      msg
    )}</span>`;
    t.style.display = "inline-flex";
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => (t.style.display = "none"), 2200);
  }

  function getWeekKey(d = new Date()) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    const y = date.getUTCFullYear();
    return `${y}-W${String(weekNo).padStart(2, "0")}`;
  }

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
  function saveJSON(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  function safeFileName(s) {
    return (s || "soz").toString().trim().replace(/[\\\/:*?"<>|]/g, "_");
  }

  function downloadText(filename, content) {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function normalizeKey(s) {
    return (s || "").toString().trim().toLowerCase();
  }

  /* ======================
     STATE
     ====================== */
  const state = {
    favorites: new Set(loadJSON(LS.favorites, [])),
    history: loadJSON(LS.history, []),
    totalCounts: loadJSON(LS.searchesTotal, {}),
    weeklyAll: loadJSON(LS.searchesWeekly, {}),
    currentWeek: getWeekKey(),
    auto: true,
    contains: true,
    caseInsensitive: true,
  };

  if (!state.weeklyAll[state.currentWeek]) state.weeklyAll[state.currentWeek] = {};

  /* ======================
     RENDER HELPERS
     ====================== */
  function updateStats() {
    const elWords = $("#statWords");
    const elFav = $("#statFav");
    const elWeek = $("#statWeek");
    if (elWords) elWords.textContent = dict.length;
    if (elFav) elFav.textContent = state.favorites.size;
    const w = state.weeklyAll[state.currentWeek] || {};
    const totalThisWeek = Object.values(w).reduce((a, b) => a + b, 0);
    if (elWeek) elWeek.textContent = totalThisWeek;
  }

  function renderHistory() {
    const box = $("#historyList");
    if (!box) return;
    if (!state.history.length) {
      box.innerHTML = `<div class="empty">Tarix bo‘sh. So‘z izlep kóriń 🙂</div>`;
      return;
    }
    box.innerHTML = state.history
      .slice(0, 12)
      .map(
        (w) => `
      <div class="row">
        <div class="left">
          <b>${escapeHtml(w)}</b>
          <span>Tarixdan izlew</span>
        </div>
        <button data-go="${escapeHtml(w)}">Izlew</button>
      </div>
    `
      )
      .join("");

    box.querySelectorAll("button[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const w = btn.getAttribute("data-go");
        const si = $("#searchInput");
        if (si) si.value = w;
        search();
      });
    });
  }

  function topListFromCounts(countsObj, limit = 6) {
    return Object.entries(countsObj || {})
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, limit);
  }

  function renderTrending() {
    const box = $("#trendingList");
    if (!box) return;
    const top = topListFromCounts(state.totalCounts, 6);
    if (!top.length) {
      box.innerHTML = `<div class="empty">Házirshe trending joq. Izlewler baslanǵannan keyin kórinedi 🔥</div>`;
      return;
    }
    box.innerHTML = top
      .map(
        ([w, c]) => `
      <div class="row">
        <div class="left">
          <b>${escapeHtml(w)}</b>
          <span>Umumiy qidiruv</span>
        </div>
        <div class="count">${c}</div>
        <button data-go="${escapeHtml(w)}">Izlew</button>
      </div>
    `
      )
      .join("");

    box.querySelectorAll("button[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const w = btn.getAttribute("data-go");
        const si = $("#searchInput");
        if (si) si.value = w;
        search();
      });
    });
  }

  function renderWeekly() {
    const box = $("#weeklyList");
    if (!box) return;
    const weekCounts = state.weeklyAll[state.currentWeek] || {};
    const top = topListFromCounts(weekCounts, 6);
    if (!top.length) {
      box.innerHTML = `<div class="empty">Bu haftada izlew joq. Birinchi sózdi izlep kóriń 🏆</div>`;
      return;
    }
    box.innerHTML = top
      .map(
        ([w, c], idx) => `
      <div class="row">
        <div class="left">
          <b>${idx + 1}. ${escapeHtml(w)}</b>
          <span>Haftalik reyting</span>
        </div>
        <div class="count">${c}</div>
        <button data-go="${escapeHtml(w)}">Izlew</button>
      </div>
    `
      )
      .join("");

    box.querySelectorAll("button[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const w = btn.getAttribute("data-go");
        const si = $("#searchInput");
        if (si) si.value = w;
        search();
      });
    });
  }

  function renderResults(items) {
    const r = $("#results");
    const rc = $("#resultCount");
    if (rc) rc.textContent = `${items.length} ta`;
    if (!r) return;

    if (!items.length) {
      r.innerHTML = `
        <div class="empty">
          Natije tabılmadı. ✅
          <div style="margin-top:10px">
            Maslahat: so‘zni qisqartirib ko‘riń yoki <b>Ichidan izlew</b>ni yoqıp qo‘yiń.
          </div>
        </div>`;
      return;
    }

    r.innerHTML = items
      .map((item) => {
        const term = item.word || item.term || "";
        const meaning = item.meaning || item.meanings || item.desc || "";
        const example = item.example || item.examples || "";
        const isFav = state.favorites.has(normalizeKey(term));

        return `
        <div class="card">
          <div class="word">
            <div class="term">${escapeHtml(term)}</div>
            <div class="meta">
              <span class="badge">Sóz</span>
              ${isFav ? `<span class="badge" style="border-color:rgba(46,229,157,.35); background:rgba(46,229,157,.12)">Saqlang'an</span>` : ``}
            </div>
          </div>
          <div class="details">
            <div class="box">
              <strong>Máni:</strong>
              <p>${escapeHtml(meaning)}</p>
            </div>
            <div class="box">
              <strong>Mısal:</strong>
              <p>${escapeHtml(example || "—")}</p>
            </div>

            <div class="card-actions">
              <div class="btn2 fav ${isFav ? "active" : ""}" data-fav="${escapeHtml(term)}" title="Saqlaw / Saqlawdan shıǵarıw">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s-7-4.5-9.5-8.5C.7 9.4 2.3 6 6.1 6c2 0 3.2 1 3.9 2 .7-1 1.9-2 3.9-2 3.8 0 5.4 3.4 3.6 6.5C19 16.5 12 21 12 21Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                Saqlaw
              </div>

              <div class="btn2" data-copy="${escapeHtml(term)}">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M9 9h10v10H9V9Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Kopiya
              </div>

              <div class="btn2" data-savefile="${escapeHtml(term)}">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v10m0 0 4-4m-4 4-4-4M4 17v3h16v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                TXT
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    // attach handlers
    r.querySelectorAll("[data-fav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const term = btn.getAttribute("data-fav");
        toggleFavorite(term);
        search(false);
      });
    });

    r.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const term = btn.getAttribute("data-copy");
        const item = dict.find((x) => normalizeKey(x.word) === normalizeKey(term));
        const text = item
          ? `${item.word}\nMánisi: ${item.meaning}\nMısal: ${item.example || "-"}`
          : term;
        try {
          await navigator.clipboard.writeText(text);
          toast("Kopiya qilindi!");
        } catch {
          toast("Kopiya qilishda xatolik", "⚠️");
        }
      });
    });

    r.querySelectorAll("[data-savefile]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const term = btn.getAttribute("data-savefile");
        const item = dict.find((x) => normalizeKey(x.word) === normalizeKey(term));
        if (!item) {
          toast("Topilmadi", "⚠️");
          return;
        }
        const content = `${item.word}\n\nMánisi:\n${item.meaning}\n\nMısal:\n${item.example || "-"}`;
        downloadText(`${safeFileName(item.word)}.txt`, content);
        toast("TXT yuklab olindi!");
      });
    });
  }

  /* ======================
     SEARCH + COUNTERS
     ====================== */
  function recordSearch(term) {
    const key = normalizeKey(term);
    if (!key) return;

    state.history = [term, ...state.history.filter((x) => normalizeKey(x) !== key)].slice(0, 12);
    saveJSON(LS.history, state.history);

    state.totalCounts[key] = (state.totalCounts[key] || 0) + 1;
    saveJSON(LS.searchesTotal, state.totalCounts);

    const current = getWeekKey();
    state.currentWeek = current;
    if (!state.weeklyAll[current]) state.weeklyAll[current] = {};
    state.weeklyAll[current][key] = (state.weeklyAll[current][key] || 0) + 1;
    saveJSON(LS.searchesWeekly, state.weeklyAll);
  }

  function matchItems(query) {
    const q = query || "";
    const contains = state.contains;
    const ci = state.caseInsensitive;

    const qN = ci ? q.toLowerCase().trim() : q.trim();
    if (!qN) return [];

    return dict.filter((item) => {
      const w = (item.word || item.term || "").toString();
      const wN = ci ? w.toLowerCase() : w;
      if (contains) return wN.includes(qN);
      return wN === qN;
    });
  }

  function search(shouldRecord = true) {
    const input = $("#searchInput");
    const q = input ? input.value.trim() : "";
    if (!q) {
      const hint = $("#hintText");
      if (hint) hint.textContent = "Sóz kiritiń 🙂";
      renderResults([]);
      return;
    }
    const items = matchItems(q);
    renderResults(items);

    const hint = $("#hintText");
    if (hint) hint.textContent = items.length ? `Tabıldı: ${items.length} ta ✅` : `Tabılmadı ❌`;

    if (shouldRecord) {
      recordSearch(q);
      renderHistory();
      renderTrending();
      renderWeekly();
      updateStats();
    }
  }

  /* ======================
     FAVORITES
     ====================== */
  function toggleFavorite(term) {
    const key = normalizeKey(term);
    if (!key) return;
    if (state.favorites.has(key)) {
      state.favorites.delete(key);
      toast("Saqlanganlardan óshirildi", "💾");
    } else {
      state.favorites.add(key);
      toast("Saqlandı", "💚");
    }
    saveJSON(LS.favorites, [...state.favorites]);
    updateStats();
  }

  function openSaved() {
    const favs = [...state.favorites];
    if (!favs.length) {
      toast("Saqlanganlar bo‘sh", "ℹ️");
      return;
    }
    const items = dict.filter((x) => state.favorites.has(normalizeKey(x.word)));
    const si = $("#searchInput");
    if (si) si.value = "";
    renderResults(items);
    const hint = $("#hintText");
    if (hint) hint.textContent = "Saqlanganlar kórsetildi 💾";
    toast("Saqlanganlar ochildi", "💾");
  }

  /* ======================
     THEME
     ====================== */
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(LS.theme, theme);
  }
  function initTheme() {
    const saved = localStorage.getItem(LS.theme);
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      setTheme("dark");
    }
  }

  /* ======================
     EXPORT / CLEAR
     ====================== */
  function exportFavorites() {
    const items = dict.filter((x) => state.favorites.has(normalizeKey(x.word)));
    if (!items.length) {
      toast("Export qilish uchun saqlanganlar yo‘q", "⚠️");
      return;
    }
    const json = JSON.stringify(items, null, 2);
    downloadText("qaraqalpaq_sozlik_favorites.json", json);
    toast("Export tayyor ✅");
  }

  function clearHistory() {
    state.history = [];
    saveJSON(LS.history, state.history);
    renderHistory();
    toast("Tarix tozalandi", "🧹");
  }

  function resetWeek() {
    state.weeklyAll[state.currentWeek] = {};
    saveJSON(LS.searchesWeekly, state.weeklyAll);
    renderWeekly();
    updateStats();
    toast("Haftalik reyting 0 qilindi", "🏆");
  }

  function clearAll() {
    if (!confirm("Rostan ham tarix, trending va haftalik reytingni tozalaysizmi?")) return;
    localStorage.removeItem(LS.history);
    localStorage.removeItem(LS.searchesTotal);
    localStorage.removeItem(LS.searchesWeekly);
    state.history = [];
    state.totalCounts = {};
    state.weeklyAll = {};
    state.weeklyAll[state.currentWeek] = {};
    renderHistory();
    renderTrending();
    renderWeekly();
    updateStats();
    toast("Tozalandi", "🧹");
  }

  /* ======================
     INIT
     ====================== */
  function init() {
    initTheme();

    // toggles
    const tAuto = $("#toggleAuto");
    const tContains = $("#toggleContains");
    const tCase = $("#toggleCase");
    if (tAuto) tAuto.addEventListener("change", (e) => (state.auto = e.target.checked));
    if (tContains) tContains.addEventListener("change", (e) => {
      state.contains = e.target.checked;
      search(false);
    });
    if (tCase) tCase.addEventListener("change", (e) => {
      state.caseInsensitive = e.target.checked;
      search(false);
    });

    // search buttons / input
    const btnSearch = $("#btnSearch");
    if (btnSearch) btnSearch.addEventListener("click", () => search(true));
    const input = $("#searchInput");
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") search(true);
      });
      input.addEventListener("input", () => {
        if (state.auto) search(true);
      });
    }

    // quick focus Ctrl/⌘+K
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const si = $("#searchInput");
        if (si) si.focus();
      }
    });

    // header buttons
    const btnTheme = $("#btnTheme");
    if (btnTheme) btnTheme.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
      toast("Tema o‘zgardi");
    });

    const btnExport = $("#btnExport");
    if (btnExport) btnExport.addEventListener("click", exportFavorites);

    const btnClearAll = $("#btnClearAll");
    if (btnClearAll) btnClearAll.addEventListener("click", clearAll);

    // sidebar buttons
    const btnRefreshTrending = $("#btnRefreshTrending");
    if (btnRefreshTrending) btnRefreshTrending.addEventListener("click", () => {
      renderTrending();
      toast("Yangilandi");
    });
    const btnResetWeek = $("#btnResetWeek");
    if (btnResetWeek) btnResetWeek.addEventListener("click", resetWeek);
    const btnClearHistory = $("#btnClearHistory");
    if (btnClearHistory) btnClearHistory.addEventListener("click", clearHistory);
    const btnOpenSaved = $("#btnOpenSaved");
    if (btnOpenSaved) btnOpenSaved.addEventListener("click", openSaved);

    // initial render
    updateStats();
    renderHistory();
    renderTrending();
    renderWeekly();
    renderResults([]);
    const hint = $("#hintText");
    if (hint) hint.textContent = "Tayyor ✅";
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
