document.addEventListener('DOMContentLoaded', (e) => {
    let a = document.getElementsByClassName("add_mana");
    for (let i = 0; i < a.length; i++) {
        a[i].addEventListener("click", function(e) {
            a[i].parentNode.lastElementChild.innerHTML++;
            e.preventDefault();
        });
    }
    
    let r = document.getElementsByClassName("remove_mana");
    for (let i = 0; i < r.length; i++) {
        r[i].addEventListener("mousedown", function(e) {
            if (r[i].parentNode.lastElementChild.innerHTML > 0) {
                r[i].parentNode.lastElementChild.innerHTML--;
            }
            e.preventDefault();
        });
    }
});

function resetMana() {
    let count = document.getElementsByClassName("count");
    for (let i = 0; i < count.length; i++) {
        count[i].innerHTML = "0";
    }
}