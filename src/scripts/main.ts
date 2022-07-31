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
            } else {
                document.querySelector('.menu--options form span.warning')?.classList.add('active');
            }

        });

    },

    init: function(){
        this.start();
    }
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
            // ,{
            //     name: 'Brave Ares',
            //     image: 'assets/images/braveSpace-2.png',
            //     life: 100,
            //     attack: 25,
            //     shield: 20,
            //     combo: 50,
            //     speed: 3
            // },
            // {
            //     name: 'Brave Kratos',
            //     image: 'assets/images/braveSpace-3.png',
            //     life: 100,
            //     attack: 20,
            //     shield: 25,
            //     combo: 0,
            //     speed: 4
            // }
        ];

        containerNaves.map((element)=>{
            let container = `
                <div class="container-card">
                    <img class="container-card--image" src="./${element.image}" alt="nave image"/>
                    <div class="container-card--descripton">
                        <span class="nave-name">${element.name}</span>
                        <span class="nave-attk">ATTACK: ${element.attack}</span>
                        <span class="nave-speed">SPEED: ${element.speed}</span>
                        <span class="nave-shield">SHIELD: ${element.shield}</span>
                    </div>
                </div>
            `;

            document.querySelector('.select-nave')?.append(document.createRange().createContextualFragment(container));;
        })
    },

    init: function(){
        this.start();
    }
}

SelectNave.init();
UserSafe.init();

/* End - User */
