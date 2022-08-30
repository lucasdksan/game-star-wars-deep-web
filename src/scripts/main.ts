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

/* Start - Nave Select */

function SelectNaveUser(){
    $(".container-card").on("click", function(){
        const nameNave = $(this).attr("data-name-nave");
        
        localStorage.setItem('@STDeepWeb-nave', nameNave as string);

        $(".menu--area").hide();
    });
}

const SelectNave = {
    start: function(){
        const containerNaves:NaveProps [] = [
            {
                name: 'Brave Delta',
                image: 'assets/images/braveSpace-1.png',
                life: 100,
                attack: 15,
                shield: 50,
                combo: 0,
                speed: 5
            }
            ,{
                name: 'Brave Ares',
                image: 'assets/images/braveSpace-2.png',
                life: 100,
                attack: 25,
                shield: 20,
                combo: 50,
                speed: 3
            },
            {
                name: 'Brave Kratos',
                image: 'assets/images/braveSpace-3.png',
                life: 100,
                attack: 20,
                shield: 25,
                combo: 0,
                speed: 4
            }
        ];

        containerNaves.map((element)=>{
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

    init: function(){
        this.start();
        SelectNaveUser();
    }
}

/* End - Nave Select */

/* Start - LandingPage */

const LandingPage = {
    start: function(){
        const appendUser = document.querySelector(".menu--options");
        const existUser = document.querySelector(".menu--exist");

        appendUser?.classList.remove('close');
        existUser?.classList.add('close');
    },

    exist: function(user: UserProps){
        const appendUser = document.querySelector(".menu--options");
        const nameUser = document.querySelector(".exist--name");
        const yesClick = document.querySelector(".exist--yes");
        const noClick = document.querySelector(".exist--no");
        
        nameUser?.append(`
            ${user.name}
        `);

        appendUser?.classList.add('close');

        yesClick?.addEventListener("click", function(){
            const existUser = document.querySelector(".menu--exist");

            existUser?.classList.add('close');
            SelectNave.init();
        });

        noClick?.addEventListener("click", function(){
            const appendUser = document.querySelector(".menu--options");
            const existUser = document.querySelector(".menu--exist");

            appendUser?.classList.remove('close');
            existUser?.classList.add('close');
        });
    },

    init: function(){
        const user = localStorage.getItem('@STDeepWeb-user');
        const objectUser:UserProps = JSON.parse(user as string);

        console.log(user)
        console.log(objectUser.name)

        if(objectUser.name !== ''){
            this.exist(objectUser);
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

    start: function(){
        const nameElement = this.$input as HTMLInputElement;
        const buttonStartElement = this.$buttonStart as HTMLButtonElement;

        function saveUser(obj:UserProps) {
            localStorage.setItem('@STDeepWeb-user', JSON.stringify(obj));
            return;
        }

        buttonStartElement.addEventListener('click', function(e){
            e.preventDefault();
            const userSave:UserProps = {
                name: nameElement.value,
                score: 0,
                time: 0
            };

            if(userSave.name !== ''){
                saveUser(userSave);
                document.querySelector('.menu--options')?.classList.add('close');
                SelectNave.init();
            } else {
                document.querySelector('.menu--options form span.warning')?.classList.add('active');
            }

        });

    },

    init: function(){
        this.start();
    }
}

UserSafe.init();

/* End - User */

