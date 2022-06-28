const makeGETRequest = (url) => {
    return new Promise ((resolve) => {
        var xhr;
  
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
            resolve(xhr.responseText);
            }
        }
    
        xhr.open('GET', url, true);
        xhr.send();
    });
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(title, price, id) {
      this.product_name = title;
      this.price = price;
      this.id = id;
    }
    render() {
      return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
    this.goods = [];
    }

    fetchGoods() {
        const Render = () => {
            return new Promise ((resolve) => {
            makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                resolve(this.goods);
                });
            })
        }
        Render(this.goods).then( ()=> {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new GoodsItem(good.product_name, good.price);
                listHtml += goodItem.render();
                });
            return document.querySelector('.goods-list').innerHTML = listHtml;
        });
    }
}

const list = new GoodsList();
list.fetchGoods();

