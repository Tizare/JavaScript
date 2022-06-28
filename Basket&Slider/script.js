var product = [
    {
        name: "молоко",
        quantity: 1,
        price: 67,
        type: "молочка"
    },
    {
        name: "бананы",
        quantity: 1,
        price: 48,
        type: "фрукты"
    },
    {
        name: "клубника",
        quantity: 1,
        price: 365,
        type: "ягоды"
    },
    {
        name: "масло",
        quantity: 1,
        price: 115,
        type: "молочка"
    },
    {
        name: "шоколад",
        quantity: 1,
        price: 236,
        type: "шоколад"
    },
    {
        name: "хлеб",
        quantity: 1,
        price: 25,
        type: "хлеб"
    },
    {
        name: "сметана",
        quantity: 1,
        price: 87,
        type: "молочка"
    },
];

var catalog = document.getElementById("catalog");

function catalogLoad (x){
    catalog.innerHTML=' ';
    if (x.length==0){
        catalog.innerHTML='Всё раскупили, извините!';
    } else {
        for (i=0; i<x.length; i++){ 
            var divLine = document.createElement('div');
            divLine.className = "productLine"
            divLine.id = "product"+i;
            catalog.appendChild(divLine);
            var arr = ['name', 'quantity', 'price']
            for (j=0; j<arr.length; j++){ 
                var block = document.createElement("div");
                var arg = arr[j]
                block.className = "product_"+arg;
                block.id = arg+i;
                block.innerHTML = x[i][arg]
                document.getElementById("product"+i).appendChild(block);
            }
            var button = document.createElement('button'); 
            button.className = 'button';
            button.id = i;
            button.innerHTML = '<p class="buttonText">Купить</p>';
            button.addEventListener ("click", buttonClick,);
            document.getElementById('product'+i).appendChild(button);
        }
    }               
}
catalogLoad(product);

function sortCatalog () {
    product;
    var miniCatalog = [];
    miniCatalog = product.filter((a) => a.price<100);
    catalogLoad(miniCatalog);
}

function sortPrice (){
    product;
    product.sort(function (a,b){
        return a.price - b.price
    });
    catalogLoad(product);
}
function sortType () {
    product;
    var miniCatalog = [];
    miniCatalog = product.filter((a) => a.type=='молочка');
    catalogLoad(miniCatalog);
}

var Basket = [];
var k=0;
var q=0;


function buttonClick (){
    var number = this.id;  
    var basketLine = [];
    var arr = ['name', 'quantity', 'price']
    for (j=0; j<arr.length; j++){
        var text = document.getElementById(arr[j]+number).innerText;
        basketLine.push(text);
        for (n=0; n<Basket.length; n++){ 
            if (text==Basket[n][0]){
                var quant = Number(document.getElementById('basketQuantity'+n).innerText);
                quant+=1;
                document.getElementById('basketQuantity'+n).innerText = quant;
                Basket[n][1]=quant;
                basket.init();
                return;
            } 
        }
    }
    var divLine = document.createElement('div');
    divLine.className = "productLine"
    divLine.id = "basketProduct"+k;
    document.getElementById("basketContent").appendChild(divLine);
    for (i=0; i<basketLine.length; i++){ 
        var block = document.createElement("div");
        block.className = "basketBox";
        if (i==1) { 
            block.id = "basketQuantity"+q;
            q++
        }
        block.innerHTML = basketLine[i]
        document.getElementById("basketProduct"+k).appendChild(block);
        }
    k++;
    Basket.push(basketLine);
    basket.init();
    
}

function cBasketPrice (arg){
    var count = 0;
    for (i=0; i<arg.length; i++){
        count += (arg[i][1])*(arg[i][2]);
    } return count;
}
basket.init = function basketPrice (){
    var answer = cBasketPrice(Basket);
    document.getElementById("basketTotal").innerHTML = "Всего: "+answer+" рублей.";
}

//Галерея

function init(){
	var images = document.getElementsByTagName("img");
	for (var i = 0; i < images.length; i++) {
		images[i].onclick = changeBigPicture;
	}
}
function changeBigPicture(eventObj){
	var appDiv = document.getElementById("big_picture");
	appDiv.innerHTML = "";	
	var eventElement = eventObj.target;
	var imageNameParts = eventElement.id.split("_");
	var src = "img/" + imageNameParts[1] + ".jpg";
	var imageDomElement = document.createElement("img");
	imageDomElement.src = src;
	appDiv.appendChild(imageDomElement);
}
window.onload = init;

function nextPicture (arg){
    var number = document.getElementById("big_picture").innerHTML;
    var needID = parseInt(number.match(/\d+/));
    var images2 = document.getElementsByTagName("img");
    if (arg==true){
        if (needID==(images2.length-1)) {
            needID = 1;
        } else {
            needID++;
        }
    } else {
        if (needID==1) {
            needID = images2.length-1;
        } else {
            needID--;
        }
    }
    document.getElementById("big_picture").innerHTML = "";
    var src = "img/" + needID + ".jpg";
	var imageDomElement = document.createElement("img");
	imageDomElement.src = src;
	document.getElementById('big_picture').appendChild(imageDomElement);
}

