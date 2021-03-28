let credits = 0
let click = 1
let clickUpgrade = {
    Blaster: {
        price: 50,
        quantity: 0,
        multiplier: 2,
        limit: 2
    },
    Xwing: {
        price: 500,
        quantity: 0,
        multiplier: 10,
        limit: 5,
        trophy: 0
    },
    Lightsaber: {
        price: 10000,
        quantity: 0,
        multiplier: 25,
        limit: 5,
        trophy: 0
    },
    MilleniumFalcon: {
        price: 50000,
        quantity: 0,
        multiplier: 100,
        limit: 10
    }
}

let autoUpgrade = {
    R2D2: {
        price: 500,
        quantity: 0,
        clicks: 50,
        limit: 2
    },
    C3P0: {
        price: 2000,
        quantity: 0,
        clicks: 200,
        limit: 5
    },
    Crew: {
        price: 50000,
        quantity: 0,
        clicks: 5000,
        limit: 10,
        trophy: 0

    }
}



function mine() {
    credits += click
    update()
    return credits
}

function update() {
    let counter = document.getElementById('money')
    counter.innerHTML = `<p class="text">Imperial Credits: ${credits}</p>`
}

function buy(btn) {
    let selection = clickUpgrade[btn]
    if (credits < selection.price) {
        return alert('You don\'t have enough credits!')
    }

    if (credits >= selection.price && selection == clickUpgrade['Blaster']) {
        if (selection.quantity >= selection.limit) { return alert('You already have 2 blasters!') }
        click *= selection.multiplier
        credits -= selection.price
        selection.price += 50
        selection.quantity++
    } else if (credits >= selection.price && btn == 'Xwing') {
        if (selection.quantity >= selection.limit) { return alert('You already have enough X Wings!') }
        click *= selection.multiplier
        credits -= selection.price
        selection.price += 100
        selection.quantity++
    } else if (credits >= selection.price && btn == 'Lightsaber') {
        if (selection.quantity >= selection.limit) { return alert('You already have enough Light Sabers!') }
        click *= selection.multiplier
        credits -= selection.price
        selection.price += 500
        selection.quantity++
    } else if (credits >= selection.price && btn == 'MilleniumFalcon') {
        if (selection.quantity >= selection.limit) { return alert('You already have enough Millenium Falcons!') }
        click *= selection.multiplier
        credits -= selection.price
        selection.price += 1000
        selection.quantity++
    }
    update()
    draw()
    trophy()
}

function buyAuto(btn) {
    let selection = autoUpgrade[btn]
    if (credits < selection.price) {
        return alert('You don\'t have enought credits!')
    }
    if (btn == 'R2D2' && credits >= selection.price) {
        if (autoUpgrade[btn].quantity >= selection.limit) { return alert('You already have 2 R2 Units!') }
        credits -= selection.price
        selection.price += 250
        autoUpgrade[btn].quantity++
        interval()
        update()
    } else if (btn == 'C3P0' && credits >= selection.price) {
        if (autoUpgrade[btn].quantity >= selection.limit) { return alert('You Have too many C3P0\'s!') }
        credits -= selection.price
        selection.price += 500
        autoUpgrade[btn].quantity++
        interval()
        update()
    } else if (btn == 'Crew' && credits >= selection.price) {
        if (autoUpgrade[btn].quantity >= selection.limit) { return alert('You have too many Crews!') }
        credits -= selection.price
        selection.price += 5000
        autoUpgrade[btn].quantity++
        interval()
        update()
    }
    draw()
    trophy()
}

function draw() {
    let template1 = `<h3 class="my-3">UPGRADES</h3>`
    let template2 = `<h3 class="my-3">AUTO UPGRADES</h3>`
    let upgrade = document.getElementById('upgrades')
    let auto = document.getElementById('auto')
    for (key in clickUpgrade) {
        let obj = clickUpgrade[key]
        template1 += `
        <button class="btn btn-white text" onclick="buy('${key}')">
            <p>${key}: Price- ${obj.price} Multiplier- ${obj.multiplier} Quantity- ${obj.quantity}</p>
        </button>
        `
        console.log(`${key}`)
    }

    for (key in autoUpgrade) {
        let obj = autoUpgrade[key]
        template2 += `
        <button class="btn btn-white text" onclick="buyAuto('${key}')">
            <p>${key}: Price- ${obj.price} Clicks- ${obj.clicks} Quantity- ${obj.quantity}</p>
        </button>
        `
    }

    upgrade.innerHTML = template1
    auto.innerHTML = template2
    console.log()
}

function trophy() {
    let element = document.getElementById('trophy')
    let template = ``
    if (clickUpgrade['Xwing'].quantity == 1 && clickUpgrade['Xwing'].trophy == 0) {
        clickUpgrade['Xwing'].trophy++
        template += `<p><i class="fas fa-trophy"></i> Bounty Hunter: Purchase a ship</p>`
        element.innerHTML += template
        element.classList.add('card')
        return alert('Trophy Unlocked!')
    } else if (clickUpgrade['Lightsaber'].quantity == 1 && clickUpgrade['Lightsaber'].trophy == 0) {
        clickUpgrade['Lightsaber'].trophy++
        template += `<p><i class="fas fa-trophy"></i> Padawan: Purchase a lightsaber</p>`
        element.innerHTML += template
        element.classList.add('card')
        return alert('Trophy Unlocked!')
    } else if (clickUpgrade['Lightsaber'].quantity > 0 && autoUpgrade['Crew'].quantity == 1 && autoUpgrade['Crew'].trophy == 0) {
        autoUpgrade['Crew'].trophy++
        template += `<p><i class="fas fa-trophy"></i> Jedi Master: Own both a lightsaber and a crew</p>`
        element.innerHTML += template
        element.classList.add('card')
        return alert('Trophy Unlocked!')
    }
}


function interval() {
    setInterval(everyInterval, 3000)
}

let test = 1

function everyInterval() {
    for (key in autoUpgrade) {
        let object = autoUpgrade[key]
        credits += object.quantity * object.clicks
    }
    update()
}

draw()
update()
interval()
