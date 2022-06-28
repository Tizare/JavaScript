const text = "'Bla-бла-бла' и я знаю aren't юда don't you We're 'бла-бла-bla'. Он сказал: 'I know'. 'I'll be back!' - доносилось. No comments :)";
const regexp = /\B[']/g;
const regexp2 = /['][.]/g;
let result = text.replace(regexp, '"');
result = result.replace(regexp2, '".');
console.log("Задание 1-2. Было: "+text)
console.log('После замены Стало: '+result);

//Задание 3.

const Pattern = [
    /^[a-zA-Z\sа-яА-я]+$/, 
    /^\+7[(]\d{3}[)]\d{3}[-]\d{4}$/, 
    /^[a-zA-z]+([.]|[-])?[a-zA-z]+[@][a-zA-z]+[.][a-zA-z]+\s?$/,
    /^.+$/
]

function CHECK () {
    let totalResult = true;
    for (i=0; i<4; i++) {
        let checkValue = document.getElementById("form-"+i).value;
        let checkPattern = Pattern[i];
        let checkResult = checkPattern.test(checkValue);
        document.getElementById('form-'+i).classList.remove('error');
        if (checkResult===false) {
            totalResult = false;
            document.getElementById('form-'+i).classList.add('error');
        }
    } 
    if (totalResult === true){
        document.getElementById('errorMessage').innerHTML = " "
        console.log("форма отправлена на сервер") //и здесь запускается функции отправки проверенной инфы на сервер, но за неимением такового обойдёмся консолью
    } else {
        document.getElementById('errorMessage').innerHTML = "Внесите, пожалуйста, данные корректно." //а можно просто задать этот блок в HTML и дать ему класс, делающий его невидимым, и в этой строке этот класс просто удалять, а в 31 возвращать обратно.
        console.log("исправьте ошибки")
    }
}