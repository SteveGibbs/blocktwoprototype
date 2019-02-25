
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function() {
        this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        console.log(panel);
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    };
}


const demoInput = document.getElementById('demo');
const labelMaker = function (e) {
    const input = e.target || e;
    const label = input.parentElement.querySelectorAll('.label')[0] || document.createElement('div');
    const labelInner = label.firstChild || document.createElement('div');
    const parentWidth = input.parentElement.offsetWidth;
    const inputWidth = input.offsetWidth ;
    const labelOffset = (parentWidth - inputWidth) / 2;
    const labelPosX = inputWidth * (input.value/100) + ((100 - input.value) * 14)/100;

    label.classList.add('label');
    if (input.value == 0) {
        label.classList.add('zeroed');
    } else {
        label.classList.remove('zeroed');
    }
    labelInner.innerText = input.value;
    label.appendChild(labelInner);
    label.style.left = labelPosX + 'px';
    input.parentElement.appendChild(label);
}

demoInput.addEventListener('input', labelMaker);

window.onload = function() {
    labelMaker(demoInput)
};