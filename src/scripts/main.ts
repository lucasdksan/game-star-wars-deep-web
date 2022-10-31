/* Start - Types */

interface UserProps {
    name: string;
    score: number;
    time: number;
}

interface NaveProps {
    name: string;
    image: string;
    life: number;
    attack: number;
    shield: number;
    combo: number;
    speed: number;
    plus?: {
        burst: number;
        extra_life: false;
        type_Attack: "doble" | "triple" | "ultimate";
        extra_speed: number;
    }
}

/* End - Types */

/* Start - Global Variables */

const containerNaves: NaveProps[] = [
    {
        name: 'Brave Delta',
        image: 'assets/images/braveSpace-1.png',
        life: 100,
        attack: 15,
        shield: 50,
        combo: 0,
        speed: 8
    }
    , {
        name: 'Brave Ares',
        image: 'assets/images/braveSpace-2.png',
        life: 100,
        attack: 25,
        shield: 20,
        combo: 50,
        speed: 5
    },
    {
        name: 'Brave Kratos',
        image: 'assets/images/braveSpace-3.png',
        life: 100,
        attack: 20,
        shield: 25,
        combo: 0,
        speed: 6
    }
];

/* End - Global Variables */

/* Start - Include Nave */

const IncludeNave = {
    naveUserSelect: "",

    start: function (nameNave: string) {
        this.naveUserSelect = nameNave;

        const naveSelect = containerNaves.find(e => e.name == nameNave) as NaveProps;
        const bodyNave = `
            <div class="nave--shield">
                <div class="nave--body">
                    <img src="${naveSelect.image}" />
                </div>
            </div>
        `;

        document.querySelector('.game-area')?.append(document.createRange().createContextualFragment(bodyNave));

    },

    controlls: function () {
        const nameNave = this.naveUserSelect;
        const naveSelect:NaveProps = containerNaves.find(e => e.name == nameNave) as NaveProps;
        const { speed } = naveSelect;

        let topRef = Number($(window).width())/3;
        let leftRef = Number($(window).height())/3;

        function resetNave(){
            $(".nave--shield").css({
                left: leftRef,
                top: topRef
            });
        }

        function activeShield(){
            $(".nave--shield").addClass("activeShield");

            setTimeout(()=>{
                $(".nave--shield").removeClass("activeShield");
            },3000);
        }

        function dashMoveL(){
            if(
                leftRef > 100 && leftRef < Number($("main.game-area").width()) - Number($(".nave--shield").width()) -100
            ){
                $(".nave--shield").css("left", leftRef + 100);
                leftRef = leftRef + 100;
            }
        }

        function dashMoveR(){
            if(
                leftRef > 100 && leftRef < Number($("main.game-area").width()) - Number($(".nave--shield").width()) -100
            ) {
                $(".nave--shield").css("left", leftRef - 100);
                leftRef = leftRef - 100;
            }
        }

        function positionNave(t: number, l:number){
            if(
                t > 0 && t < Number($("main.game-area").height()) - Number($(".nave--shield").height()) &&
                l > 0 && l < Number($("main.game-area").width()) - Number($(".nave--shield").width()) &&
                !$(".nave--shield").hasClass("activeShield")
            ){
                $(".nave--shield").css({
                    left: l,
                    top: t
                });
    
                topRef = t;
                leftRef = l;
            } else if(
                t > 0 && t < Number($("main.game-area").height()) - Number($(".nave--shield").height()) - 55 &&
                l > 0 && l < Number($("main.game-area").width()) - Number($(".nave--shield").width()) - 55 &&
                $(".nave--shield").hasClass("activeShield")
            ) {
                $(".nave--shield").css({
                    left: l,
                    top: t
                });
    
                topRef = t;
                leftRef = l;
            }
        }

        $(window).keydown((e) => {
            switch (e.key) {
                case "A":
                    positionNave(topRef, (leftRef - speed));
                    break;
                case "D":
                    positionNave(topRef, (leftRef + speed));
                    break;
                case "S":
                    positionNave((topRef + speed), leftRef);
                    break;
                case "W":
                    positionNave((topRef - speed), leftRef);
                    break;
                case "E":
                    dashMoveL();
                    break;
                case "Q":
                    dashMoveR();
                    break;
                case "a":
                    positionNave(topRef, (leftRef - speed));
                    break;
                case "s":
                    positionNave((topRef + speed), leftRef);
                    break;
                case "d":
                    positionNave(topRef, (leftRef + speed));
                    break;
                case "w":
                    positionNave((topRef - speed), leftRef);
                    break;
                case "e":
                    dashMoveL();
                    break;
                case "q":
                    dashMoveR();
                    break;
                case " ":
                    activeShield();
                    break;
            }

        });

        resetNave();
    },

    init: function () {
        const nave = localStorage.getItem('@STDeepWeb-nave');

        if (nave != null && nave != '') {
            this.start(nave as string);
            this.controlls();
        }
    }
};

/* End - Include Nave */

/* Start - Nave Select */

function SelectNaveUser() {
    $(".container-card").on("click", function () {
        const nameNave = $(this).attr("data-name-nave");

        localStorage.setItem('@STDeepWeb-nave', nameNave as string);

        $(".menu--area").hide();

        $(".battle-field").addClass("active");
        IncludeNave.init();
    });
}

const SelectNave = {
    start: function () {
        containerNaves.map((element) => {
            let container = `
                <div class="container-card" data-name-nave="${element.name}">
                    <img class="container-card--image" src="./${element.image}" alt="nave image"/>
                    <div class="container-card--descripton">
                        <span class="nave-name">${element.name}</span>
                        <span class="nave-attk">ATTACK: ${element.attack}</span>
                        <span class="nave-speed">SPEED: ${element.speed}</span>
                        <span class="nave-shield">SHIELD: ${element.shield}</span>
                    </div>
                </div>
            `;

            document.querySelector('.select-nave')?.append(document.createRange().createContextualFragment(container));
        })
    },

    init: function () {
        this.start();
        SelectNaveUser();
    }
}

/* End - Nave Select */

/* Start - LandingPage */

const LandingPage = {
    start: function () {
        const appendUser = document.querySelector(".menu--options");
        const existUser = document.querySelector(".menu--exist");

        appendUser?.classList.remove('close');
        existUser?.classList.add('close');
    },

    exist: function (user: UserProps) {
        const appendUser = document.querySelector(".menu--options");
        const nameUser = document.querySelector(".exist--name");
        const yesClick = document.querySelector(".exist--yes");
        const noClick = document.querySelector(".exist--no");

        nameUser?.append(`
            ${user.name}
        `);

        appendUser?.classList.add('close');

        yesClick?.addEventListener("click", function () {
            const existUser = document.querySelector(".menu--exist");

            existUser?.classList.add('close');
            SelectNave.init();
        });

        noClick?.addEventListener("click", function () {
            const appendUser = document.querySelector(".menu--options");
            const existUser = document.querySelector(".menu--exist");

            appendUser?.classList.remove('close');
            existUser?.classList.add('close');
        });
    },

    init: function () {
        const user = localStorage.getItem('@STDeepWeb-user');
        const objectUser: UserProps = JSON.parse(user as string);

        console.log(user)
        console.log(objectUser)

        if (user != null && objectUser != null) {
            if (objectUser.name !== '') {
                this.exist(objectUser);
            } else if (user != null) {
                this.start();
            }
        } else {
            this.start();
        }
    }
}

LandingPage.init();

/* End - LandingPage */

/* Start - User */

const UserSafe = {
    $input: document.querySelector('#name'),
    $buttonStart: document.querySelector('#start'),

    start: function () {
        const nameElement = this.$input as HTMLInputElement;
        const buttonStartElement = this.$buttonStart as HTMLButtonElement;

        function saveUser(obj: UserProps) {
            localStorage.setItem('@STDeepWeb-user', JSON.stringify(obj));
            return;
        }

        buttonStartElement.addEventListener('click', function (e) {
            e.preventDefault();
            const userSave: UserProps = {
                name: nameElement.value,
                score: 0,
                time: 0
            };

            if (userSave.name !== '') {
                saveUser(userSave);
                document.querySelector('.menu--options')?.classList.add('close');
                SelectNave.init();
            } else {
                document.querySelector('.menu--options form span.warning')?.classList.add('active');
            }

        });

    },

    init: function () {
        this.start();
    }
}

UserSafe.init();

/* End - User */

