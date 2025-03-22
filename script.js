// light/Dark theme
const toggleElement=document.querySelector('.themes__toggle');

const toggleDarkTheme=()=>toggleElement.classList.toggle('themes__toggle--isActive');
const toggleDarkThemeaccessibility=(event)=>event.key==='Enter'&&toggleDarkTheme();

toggleElement.addEventListener('click' , toggleDarkTheme);
toggleElement.addEventListener('keydown', toggleDarkThemeaccessibility);

// logic for calculator 

// variables 
let storedNumber="";
let currentNumber="";
let operation="";

// select elmenet 
const resultElement=document.querySelector('.calc__result');
const keyElements=document.querySelectorAll(" [data-type]");

// update result 
const updateScreen=(value)=>{
    resultElement.innerText=!value ? '0':value;
    // resultElement.innerText=value || resultElement.innerText;
};

// dealing with numbers 
const numberButtonHandler=(value)=>{
    if(value==='.'&& currentNumber.includes('.')) return;
    if(value==='0' && !currentNumber) return;
    currentNumber+=value;
    updateScreen(currentNumber);
}

//dealing with Reset
const resetButtonHandler=()=>{
    storedNumber="";
    currentNumber="";
    operation="";
    updateScreen(currentNumber);
};

//dealing with delete 
const deleteButtonHandler=()=>{
    if(!currentNumber || currentNumber==="0") return;
    // currentNumber=currentNumber.length===1 ? "0" : currentNumber.substring(0,currentNumber.length-1);
    currentNumber=currentNumber.length===1 ? "0" : currentNumber.slice(0,-1);
    updateScreen(currentNumber);
};

//dealing with execute operation
const executeOperation=()=>{
    if(currentNumber && storedNumber && operation){
        switch(operation){
            case "+":
                storedNumber=parseFloat(storedNumber) + parseFloat(currentNumber);
                break;
            case "-":
                storedNumber=parseFloat(storedNumber) - parseFloat(currentNumber);
                break;
            case "*":
                storedNumber=parseFloat(storedNumber) * parseFloat(currentNumber);
                break;
            case "/":
                storedNumber=parseFloat(storedNumber) / parseFloat(currentNumber);
                break;
        }
        currentNumber="";
        updateScreen(storedNumber);
    };
};

//dealing with operation 
const operationButtonHandler=(operationValue)=>{
    if(!storedNumber && !currentNumber) return;

    if(currentNumber && !storedNumber){
        storedNumber=currentNumber;
        currentNumber="";
        operation=operationValue;
    }
    else if(storedNumber){
        operation=operationValue;
        if(currentNumber) executeOperation();
    }
};

// addEventListener for buttons 
const keyElementHandler=(element)=>{
    element.addEventListener('click' ,()=>{
        const type=element.dataset.type;
        if(type==='number'){
            numberButtonHandler(element.dataset.value);
        }
        else if(type==='operation'){
            switch(element.dataset.value){
                case "c":
                    resetButtonHandler();
                    break;
                case "Backspace" :
                    deleteButtonHandler();
                    break;
                case "Enter":
                    executeOperation();
                    break;
                default:
                    operationButtonHandler(element.dataset.value);
            };
        };
    });
};
keyElements.forEach(keyElementHandler);

// keyboard as input source
const availableNumbers=['0','1','2','3','4','5','6','7','8','9','.'];
const availableOperation=['+','-','*','/'];
const availableKeys=[...availableNumbers,...availableOperation,'Backspace','Enter','c'];
//add event for keyboard
window.addEventListener('keydown',(event)=>{
    // keyboardWithoutHover(event.key);
    keyboardWithHover(event.key);
});
//the first way
const keyboardWithoutHover=(key)=>{
    if(availableNumbers.includes(key)){
        numberButtonHandler(key);
    }
    else if(availableOperation.includes(key)){
        operationButtonHandler(key);
    }
    else if(key==='Backspace'){
        deleteButtonHandler(key);
    }
    else if(key==='Enter'){
        executeOperation(key);
    }
    else if(key==='c'){
        resetButtonHandler(key);
    }
};
//the second way
const keyboardWithHover=(key)=>{
    if(availableKeys.includes(key)){
        const element=document.querySelector(`[data-value="${key}"]`);

        element.classList.add('hover');
        element.click();
        

        setTimeout(()=> element.classList.remove('hover') , 100);
    };
};