const total = document.querySelector('.total')
class Ham {
    constructor (size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.top=[];
        this.topName=[];
        this.cal = 20;
        this.price = 50;
        this.watchSize();
        this.getStuffing();
        this.getTopping();
        this.Sum();
        this.Show();

    }
    watchSize(){
        if (this.size=='big'){
            this.cal+=this.cal;
            this.price+=this.price;
        };
    }
    getStuffing(){
        let stuffPosition = document.querySelectorAll(".stuffPosition");
        stuffPosition.forEach(elem=>{
            if(elem.checked){
            this.stuffing = elem.dataset;
        }})
    }
    getTopping(){
        let topPosition = document.querySelectorAll(".toppingCard");
        topPosition.forEach(elem=>{
            if(elem.checked){
            this.top.push(elem.dataset);
            this.topName.push(elem.value);
        }})
    }
    Sum(){
        this.price+=parseInt(this.stuffing.price);
        this.cal+=parseInt(this.stuffing.cal);
        if (this.top.length>=1){
            for(let i=0; i<this.top.length; i++){
                this.price+=parseInt(this.top[i].price);
                this.cal+=parseInt(this.top[i].cal)
            }
        }
    }
    Show(){

        console.log(`Your ${this.size} hamburger with ${this.stuffing.name} and ${this.topName} cost: ${this.price} and have: ${this.cal} calories.`);
        total.innerHTML = `Your ${this.size} hamburger with ${this.stuffing.name} and ${this.topName} cost: ${this.price} and have: ${this.cal} calories.`;
    }

}

class Extra {
    constructor (name, price, cal) {
        this.name = name;
        this.price = price;
        this.cal = cal;
    }
}

class Stuff extends Extra {
    constructor (name, price, cal) {
        super (name,price,cal)
        this.renderStuff();
    }

    renderStuff(){
        document.querySelector(".stuff").insertAdjacentHTML("beforeend", 
        `<div class="stuffCard">
                    <p>${this.name}</p>
                    <input type="radio" name="stuff" class="stuffPosition" id="" data-name="${this.name}" data-price="${this.price}" data-cal="${this.cal}" >
        </div>`)
        
    }

}
class Topping extends Extra{
    constructor (name,price,cal){
        super (name,price,cal)
        this.renderTop();
    }
    renderTop(){
        document.querySelector(".topping").insertAdjacentHTML("beforeend", 
        `<p>${this.name}</p>
        <input type="checkbox" name="" class="toppingCard" id="" data-name="${this.name}" data-price="${this.price}" data-cal="${this.cal}" value="${this.name}">`)
    }
}

new Stuff ('Сheese', 10, 20);
new Stuff ('Hum', 30, 40);
new Stuff ('Potato', 15, 10);
new Topping ('Cream', 14, 26)
new Topping ('Onion', 15 , 5);


let btn = document.querySelector('button');
btn.addEventListener("click", event => {
    event.preventDefault();
    let size = document.querySelectorAll(".humSize");
    size.forEach(elem => {
        if(elem.checked){
            new Ham(elem.value);
        }
    })
})

        
    
  



























// let a = new Ham("small", "cheese");
// console.log(a);

// let be = document.querySelectorAll(".stuffPosition")
//         be.forEach(item => item.addEventListener("change", event => {
//             if(event.target.checked){
//                 a.stuffing.push(event.target.dataset);
//             }
//         }))
        

    