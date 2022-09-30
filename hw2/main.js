let idCnt = 0;
let users = [];
let userCnt = 0;
let pinnedUserId = -1;
let unpinned;
let unpinnedWrapper;
let pinned;
let loadingPage;
let emoji;
let userCntElem;
let time;
const names = ['Liam','Noah','Oliver','Elijah','James','William','Benjamin','Lucas','Henry','Theodore','Jack','Levi','Alexander','Jackson','Mateo','Daniel','Michael','Mason','Sebastian','Ethan','Logan','Owen','Samuel','Jacob','Asher','Aiden','John','Joseph','Wyatt','David','Leo','Luke','Julian','Hudson','Grayson','Matthew','Ezra','Gabriel','Carter','Isaac','Jayden','Luca','Anthony','Dylan','Lincoln','Thomas','Maverick','Elias','Josiah','Charles','Caleb','Christopher','Ezekiel','Miles','Jaxon','Isaiah','Andrew','Joshua','Nathan','Nolan','Adrian','Cameron','Santiago','Eli','Aaron','Ryan','Angel','Cooper','Waylon','Easton','Kai','Christian','Landon','Colton','Roman','Axel','Brooks','Jonathan','Robert','Jameson','Ian','Everett','Greyson','Wesley','Jeremiah','Hunter','Leonardo','Jordan','Jose','Bennett','Silas','Nicholas','Parker','Beau','Weston','Austin','Connor','Carson','Dominic','Xavier','Jaxson','Jace','Emmett','Adam','Declan','Rowan','Micah','Kayden','Gael','River','Ryder','Kingston','Damian','Sawyer','Luka','Evan','Vincent','Legend','Myles','Harrison','August','Bryson','Amir','Giovanni','Chase','Diego','Milo','Jasper','Walker','Jason','Brayden','Cole','Nathaniel','George','Lorenzo','Zion','Luis','Archer','Enzo','Jonah','Thiago','Theo','Ayden','Zachary','Calvin','Braxton','Ashton','Rhett','Atlas','Jude','Bentley','Carlos','Ryker','Adriel','Arthur','Ace','Tyler','Jayce','Max','Elliot','Graham','Kaiden','Maxwell','Juan','Dean','Matteo','Malachi','Ivan','Elliott','Jesus','Emiliano','Messiah','Gavin','Maddox','Camden','Hayden','Leon','Antonio','Justin','Tucker','Brandon','Kevin','Judah','Finn','King','Brody','Xander','Nicolas','Charlie','Arlo','Emmanuel','Barrett','Felix','Alex','Miguel','Abel','Alan','Beckett','Amari','Karter','Timothy','Abraham','Jesse','Zayden','Blake','Alejandro','Dawson','Tristan','Victor','Avery','Joel','Grant','Eric','Patrick','Peter','Richard','Edward','Andres','Emilio','Colt','Knox','Beckham','Adonis','Kyrie','Matias','Oscar','Lukas','Marcus','Hayes','Caden','Remington','Griffin','Nash','Israel','Steven','Holden','Rafael','Zane','Jeremy','Kash','Preston','Kyler','Jax','Jett','Kaleb','Riley','Simon','Phoenix','Javier','Bryce','Louis','Mark','Cash','Lennox','Paxton','Malakai','Paul','Kenneth','Nico','Kaden','Lane','Kairo','Maximus','Omar','Finley','Atticus','Crew','Brantley','Colin','Dallas','Walter','Brady','Callum','Ronan','Hendrix','Jorge','Tobias','Clayton','Emerson','Damien','Zayn','Malcolm','Kayson','Bodhi','Bryan','Aidan','Cohen','Brian','Cayden','Andre','Niko','Maximiliano','Zander','Khalil','Rory','Francisco','Cruz','Kobe','Reid','Daxton','Derek','Martin','Jensen','Karson','Tate','Muhammad','Jaden','Joaquin','Josue','Gideon','Dante','Cody','Bradley','Orion','Spencer','Angelo','Erick','Jaylen','Julius','Manuel','Ellis','Colson','Cairo','Gunner','Wade','Chance','Odin','Anderson','Kane','Raymond','Cristian','Aziel','Prince','Ezequiel','Jake','Otto','Eduardo','Rylan','Ali','Cade','Stephen','Ari','Kameron','Dakota','Warren','Ricardo','Killian','Mario','Romeo','Cyrus','Ismael','Russell','Tyson','Edwin','Desmond','Nasir','Remy','Tanner','Fernando','Hector','Titus','Lawson','Sean','Kyle','Elian','Corbin','Bowen','Wilder','Armani','Royal','Stetson','Briggs','Sullivan','Leonel','Callan','Finnegan','Jay','Zayne','Marshall','Kade','Travis','Sterling','Raiden','Sergio','Tatum','Cesar','Zyaire','Milan','Devin','Gianni','Kamari','Royce','Malik','Jared','Franklin','Clark','Noel','Marco','Archie','Apollo','Pablo','Garrett','Oakley','Memphis','Quinn','Onyx','Alijah','Baylor','Edgar','Nehemiah','Winston','Major','Rhys','Forrest','Jaiden','Reed','Santino','Troy','Caiden','Harvey','Collin','Solomon','Donovan','Damon','Jeffrey','Kason','Sage','Grady','Kendrick','Leland','Luciano','Pedro','Hank','Hugo','Esteban','Johnny','Kashton','Ronin','Ford','Mathias','Porter','Erik','Johnathan','Frank','Tripp','Casey','Fabian','Leonidas','Baker','Matthias','Philip','Jayceon','Kian','Saint','Ibrahim','Jaxton','Augustus','Callen','Trevor','Ruben','Adan','Conor','Dax','Braylen','Kaison','Francis','Kyson','Andy','Lucca','Mack','Peyton','Alexis','Deacon','Kasen','Kamden','Frederick','Princeton','Braylon','Wells','Nikolai','Iker','Bo','Dominick','Moshe','Cassius','Gregory','Lewis','Kieran','Isaias','Seth','Marcos','Omari','Shane','Keegan','Jase','Asa','Sonny','Uriel','Pierce','Jasiah','Eden','Rocco','Banks','Cannon','Denver','Zaiden','Roberto','Shawn','Drew','Emanuel','Kolton','Ayaan','Ares','Conner','Jalen','Alonzo','Enrique','Dalton','Moses','Koda','Bodie','Jamison','Phillip','Zaire','Jonas','Kylo','Moises','Shepherd','Allen','Kenzo','Mohamed','Keanu','Dexter','Conrad','Bruce','Sylas','Soren','Raphael','Rowen','Gunnar','Sutton','Quentin','Jaziel','Emmitt','Makai','Koa','Maximilian','Brixton','Dariel','Zachariah','Roy','Armando','Corey','Saul','Izaiah','Danny','Davis','Ridge','Yusuf','Ariel','Valentino','Jayson','Ronald','Albert','Gerardo','Ryland','Dorian','Drake','Gage','Rodrigo','Hezekiah','Kylan','Boone','Ledger','Santana','Jamari','Jamir','Lawrence','Reece','Kaysen','Shiloh','Arjun','Marcelo','Abram','Benson','Huxley','Nikolas','Zain','Kohen','Samson','Miller','Donald','Finnley','Kannon','Lucian','Watson','Keith','Westin','Tadeo','Sincere','Boston','Axton','Amos','Chandler','Leandro','Raul','Scott','Reign','Alessandro','Camilo','Derrick','Morgan','Julio','Clay','Edison','Jaime','Augustine','Julien','Zeke','Marvin','Bellamy','Landen','Dustin','Jamie','Krew','Kyree','Colter','Johan','Houston','Layton','Quincy','Case','Atreus','Cayson','Aarav','Darius','Harlan','Justice','Abdiel','Layne','Raylan','Arturo','Taylor','Anakin','Ander','Hamza','Otis','Azariah','Leonard','Colby','Duke','Flynn','Trey','Gustavo','Fletcher','Issac','Sam','Trenton','Callahan','Chris','Mohammad','Rayan','Lionel','Bruno','Jaxxon','Zaid','Brycen','Roland','Dillon','Lennon','Ambrose','Rio','Mac','Ahmed','Samir','Yosef','Tru','Creed','Tony','Alden','Aden','Alec','Carmelo','Dario','Marcel','Roger','Ty','Ahmad','Emir','Landyn','Skyler','Mohammed','Dennis','Kareem','Nixon','Rex','Uriah','Lee','Louie','Rayden','Reese','Alberto','Cason','Quinton','Kingsley','Chaim','Alfredo','Mauricio','Caspian','Legacy','Ocean','Ozzy','Briar','Wilson','Forest','Grey','Joziah','Salem','Neil','Remi','Bridger','Harry','Jefferson','Lachlan','Nelson','Casen','Salvador','Magnus','Tommy','Marcellus','Maximo','Jerry','Clyde','Aron','Keaton','Eliam','Lian','Trace','Douglas','Junior','Titan','Cullen','Cillian','Musa','Mylo','Hugh','Tomas','Vincenzo','Westley','Langston','Byron','Kiaan','Loyal','Orlando','Kyro','Amias','Amiri','Jimmy','Vicente','Khari','Brendan','Rey','Ben','Emery','Zyair','Bjorn','Evander','Ramon','Alvin','Ricky','Jagger','Brock','Dakari','Eddie','Blaze','Gatlin','Alonso','Curtis','Kylian','Nathanael','Devon','Wayne','Zakai','Mathew','Rome','Riggs','Aryan','Avi','Hassan','Lochlan','Stanley','Dash','Kaiser','Benicio','Bryant','Talon','Rohan','Wesson','Joe','Noe','Melvin','Vihaan','Zayd','Darren','Enoch','Mitchell','Jedidiah','Brodie','Castiel','Ira','Lance','Guillermo','Thatcher','Ermias','Misael','Jakari','Emory','Mccoy','Rudy','Thaddeus','Valentin','Yehuda','Bode','Madden','Kase','Bear','Boden','Jiraiya','Maurice','Alvaro','Ameer','Demetrius','Eliseo','Kabir','Kellan','Allan','Azrael','Calum','Niklaus','Ray','Damari','Elio','Jon','Leighton','Axl','Dane','Eithan','Eugene','Kenji','Jakob','Colten','Eliel','Nova','Santos','Zahir','Idris','Ishaan','Kole','Korbin','Seven','Alaric','Kellen','Bronson','Franco','Wes','Larry','Mekhi','Jamal','Dilan','Elisha','Brennan','Kace','Van','Felipe','Fisher','Cal','Dior','Judson','Alfonso','Deandre','Rocky','Henrik','Reuben','Anders','Arian','Damir','Jacoby','Khalid','Kye','Mustafa','Jadiel','Stefan','Yousef','Aydin','Jericho','Robin','Wallace','Alistair','Davion','Alfred','Ernesto','Kyng','Everest','Gary','Leroy','Yahir','Braden','Kelvin','Kristian','Adler','Avyaan','Brayan','Jones','Truett','Aries','Joey','Randy','Jaxx','Jesiah','Jovanni','Azriel','Brecken','Harley','Zechariah','Gordon','Jakai','Carl','Graysen','Kylen','Ayan','Branson','Crosby','Dominik','Jabari','Jaxtyn','Kristopher','Ulises','Zyon','Fox','Howard','Salvatore','Turner','Vance','Harlem','Jair','Jakobe','Jeremias','Osiris','Azael','Bowie','Canaan','Elon','Granger','Karsyn','Zavier','Cain','Dangelo','Heath','Yisroel','Gian','Shepard','Harold','Kamdyn','Rene','Rodney','Yaakov','Adrien','Kartier','Cassian','Coleson','Ahmir','Darian','Genesis','Kalel','Agustin','Wylder','Yadiel','Ephraim','Kody','Neo','Ignacio','Osman','Aldo','Abdullah','Cory','Blaine','Dimitri','Khai','Landry','Palmer','Benedict','Leif','Koen','Maxton','Mordechai','Zev','Atharv','Bishop','Blaise','Davian'];

const get = q => { return document.querySelector(q); }
const getAll = q => { return document.querySelectorAll(q); }

const makeUser = () => new User('', '');

const choose = choices => {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

const fetchCatImage = async () => {
    return fetch('https://api.thecatapi.com/v1/images/search')
        .then(res => res.json())
        .then(arr => arr[0])
        .then(data => data.url);
}

class User {
    constructor(name, imgUrl) {
        this.alive = true;
        this.id = idCnt++;
        this.pinned = false;
        if (name !== '') this.name = name;
        else this.name = '正在辨識貓貓...';
        if (imgUrl !== '') this.imgUrl = imgUrl;
        else {
            // this.imgUrl = 'https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw340';
            this.imgUrl = 'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif';
            fetchCatImage()
                // .then(url => console.log(url));
                .then(url => { this.imgUrl = url; this.name = choose(names); renderUsers(); });
            // this.imgUrl = `https://picsum.photos/200/300?random=${this.id}`;
        }
        this.html = () => `
        <div class="user" id="user-${this.id}">
            <div class="mic">
                <div class="hint-trigger">
                    <span class="hint">
                        踢掉這ㄓ卯咪 (#\`Д\´)ﾉ
                    </span>
                    <ion-icon name="close-outline" class="btn pointer kick" onclick="removeUser(${this.id});"></ion-icon>
                </div>
                <ion-icon name="mic-off-outline" class="btn"></ion-icon>
            </div>
            <div class="avatar" style='background-image: url("${this.imgUrl}")'>
                <div class="operations">
                    <div class="hint-trigger">
                        <span class="hint">
                            釘選
                        </span>
                        <ion-icon name="pin-outline" class="pointer" onclick="togglePinUser(${this.id}); console.log('pin')"></ion-icon>
                    </div>
                    <div class="hint-trigger">
                        <span class="hint">
                            沒有用的按鈕 ◝(　ﾟ∀ ﾟ )◟
                        </span>
                        <ion-icon name="apps-outline" class="pointer"></ion-icon>
                    </div>
                    <div class="hint-trigger">
                        <span class="hint">
                            沒有用的按鈕 ◝(　ﾟ∀ ﾟ )◟
                        </span>
                        <ion-icon name="resize-outline" class="pointer"></ion-icon>
                    </div>
                </div>
            </div>
            <div class="name">
                ${this.name}
            </div>  
        </div>
        `;
    }
};

const renderUsers = () => {
    userCntElem.innerHTML = `${userCnt}`;
    if (userCnt <= 10)
        userCntElem.style.color = '#32CD32';
    else if (userCnt <= 20)
        userCntElem.style.color = '#CAE00D';
    else 
        userCntElem.style.color = 'red';
    if (userCnt === 1 && !users[0].pinned)
        togglePinUser(0);
    if (pinnedUserId !== -1) {
        if (userCnt === 1) {
            pinned.style.width = '100%';
            unpinnedWrapper.style.display = 'none';
        }
        else {
            pinned.style.width = '135rem';
            unpinnedWrapper.style.display = 'flex';
        }
        pinned.style.display = 'flex';
        pinned.innerHTML = users[pinnedUserId].html();
    } else {
        pinned.style.display = 'none';
        unpinnedWrapper.style.display = 'flex';
        pinned.style.width = '100vw';
    }
    unpinned.innerHTML = '';
    for (const user of users)
        if (user.id != pinnedUserId && user.alive)
            unpinned.innerHTML += user.html();
};

const addUser = user => {
    if (userCnt >= 30) {
        alert('貓貓們覺得擠( ˘•ω•˘ )，不要再找新的貓貓來了！');
    } else {
        ++userCnt;
        users.push(user);
        renderUsers();
    }
};

const removeUser = userId => {
    --userCnt;
    if (users[userId]) {
        users[userId].alive = false;
        if (users[userId].pinned) {
            users[userId].pinned = false;
            pinnedUserId = -1;
        }
    }
    renderUsers();
};

const togglePinUser = userId => {
    users[userId].pinned = !users[userId].pinned;
    if (users[userId].pinned) {
        if (pinnedUserId !== -1)
            users[pinnedUserId].pinned = false;
        pinnedUserId = userId;
    }
    else pinnedUserId = -1;
    renderUsers();
};

let deg = 0;
const rotateEmoji = () => {
    deg = (deg + 1) % 360;
    emoji.style.transform = `rotate(${deg}deg)`;
}


let cnt = Date.now();
const timer = () => {
    cnt += 1000;
    now = new Date(cnt);
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const hh = hour >= 10 ? hour : '0' + hour;
    const mm = min >= 10 ? min : '0' + min;
    const ss = sec >= 10 ? sec : '0' + sec;

    time.innerHTML = `${hh}:${mm}:${ss}`;
}

const main = () => {
    unpinned = get('#unpinned');
    pinned = get('#pinned');
    loadingPage = get('#loading-page');
    emoji = get('#emoji');
    userCntElem = get('#user-cnt');
    time = get('#time');
    unpinnedWrapper = get('#wrapper');

    const you = new User('You', 'https://static.popdaily.com.tw/wp-content/uploads/2021/04/agxmiqsjcy044sw0ko88sokssqrsj9t.jpg');
    // const u1 = new User('Rick', 'https://cdn.vox-cdn.com/thumbor/1kKyzwmocR6pu9ijSIl_l1XP0PY=/0x0:1280x720/1200x675/filters:focal(470x259:674x463)/cdn.vox-cdn.com/uploads/chorus_image/image/58089103/r_m_sauce.0.jpg');
    // const u2 = new User('Morty', 'https://c.tenor.com/ZxmS8Wd0C-4AAAAC/rick-and-morty-morty.gif');
    // const u3 = new User('Summer', 'https://www.looper.com/img/gallery/summers-wolverine-claws-from-rick-and-morty-season-6-episode-1-actually-belong-to-another-marvel-antihero/l-intro-1662314109.jpg');
    // const u4 = new User('Dad', 'https://www.looper.com/img/gallery/the-wild-rick-and-morty-theory-that-explains-everything-about-jerry/l-intro-1638241022.jpg');
    // const u5 = new User('Mr. Poopybutthole', 'https://vignette.wikia.nocookie.net/rickandmorty/images/5/52/S2e4_mr_poopybutthole.png/revision/latest?cb=20160921090818');
    addUser(you);
    togglePinUser(0);
    const cnt = Math.floor(Math.random() * 15);
    for (let i = 0; i < cnt; ++i) addUser(new User('', ''));
    setTimeout(() => {
        loadingPage.style.display = 'none';
    }, 2000);
    setInterval(rotateEmoji, 10);
    setInterval(timer, 1000);
};

document.addEventListener('DOMContentLoaded', main);