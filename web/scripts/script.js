const topDiv = document.querySelector("#top")

topDiv.addEventListener("click", (e) => {
  if (e.target.className.includes("aButton") || e.target.parentNode.className.includes("down") || e.target.parentNode.parentNode.className.includes("fa")) return
  const inp = document.createElement("input")
  inp.setAttribute("type", "text")
  inp.classList.add("spawnedInput")
  inp.style.top = e.clientY + "px"
  inp.style.left = e.clientX + "px"
  inp.style.width = window.innerWidth - e.clientX + "px"
  topDiv.appendChild(inp)
  inp.focus()
  setTimeout(() => {
    inp.classList.add("fadeOut")
    setTimeout(() => {
      inp.remove()
    }, 1000)
  }, .5 * 1000)
})

setInterval(() => {
  let arr = ['Welcome!', 'hallo', 'Përshëndetje', 'ሰላም', 'مرحبا', 'Բարեւ', 'Salam', 'Kaixo', 'добры дзень', 'হ্যালো', 'zdravo', 'Здравейте', 'Hola', 'Hello', 'Moni', '您好', '您好', 'Bonghjornu', 'zdravo', 'Ahoj', 'Hej', 'Hallo', 'Hello', 'Saluton', 'Tere', 'Kumusta', 'Hei', 'Bonjour', 'Hello', 'Ola', 'გამარჯობა', 'Hallo', 'Γεια σας', 'હેલો', 'Bonjou', 'Sannu', 'Alohaʻoe', 'שלום', 'नमस्ते', 'Nyob zoo', 'Helló', 'Halló', 'Ndewo', 'Halo', 'Dia duit', 'Ciao', 'こんにちは', 'Hello', 'ಹಲೋ', 'Сәлем', 'ជំរាបសួរ', '안녕하세요.', 'Hello', 'салам', 'ສະບາຍດີ', 'salve', 'Labdien!', 'Sveiki', 'Moien', 'Здраво', 'Hello', 'Hello', 'ഹലോ', 'Hello', 'Hiha', 'हॅलो', 'Сайн байна уу', 'မင်္ဂလာပါ', 'नमस्ते', 'Hallo', 'سلام', 'سلام', 'Cześć', 'Olá', 'ਹੈਲੋ', 'Alo', 'привет', 'Talofa', 'Hello', 'Здраво', 'Hello', 'Hello', 'هيلو', 'හෙලෝ', 'ahoj', 'Pozdravljeni', 'Hello', 'Hola', 'halo', 'Sawa', 'Hallå', 'Салом', 'ஹலோ', 'హలో', 'สวัสดี', 'Merhaba', 'Здрастуйте', 'ہیلو', 'Salom', 'Xin chào']
  let x = Math.random() * (window.innerWidth - 100)
  let y = (x > window.innerWidth / 2 + 150) ? Math.random() * (window.innerHeight - 100) : Math.floor(Math.random() * 2) ? Math.random() * 250 : Math.random() * 250 + 550
  const inp = document.createElement("input")
  inp.setAttribute("type", "text")
  inp.classList.add("fadeIn", "spawnedInput")
  inp.style.top = y + "px"
  inp.style.left = x + "px"
  inp.style.width = window.innerWidth - x + "px"
  topDiv.appendChild(inp)
  let text = arr[Math.floor(Math.random() * arr.length)]
  let ind = 0
  inp.value = text[ind]
  setInterval(() => {
    if (ind < text.length - 1) {
      ind++
      inp.value += text[ind]
    }
  }, .3 * 1000)
  setTimeout(() => {
    inp.classList.remove("fadeIn")
    inp.classList.add("fadeOut")
    setTimeout(() => {
      inp.remove()
    }, 1000)
  }, 3 * 1000)
}, 100)

const paraps = document.querySelectorAll("p")
paraps.forEach(el => {
  el.childNodes.forEach(child => {
    if (child.nodeName.toString() == "B") {
      el.style.marginTop = "1.3rem"
    }
  })
})

const menu = document.querySelector("#menu")

const gs = document.querySelector("#gs")
const env = document.querySelector("#env")
const usage = document.querySelector("#usage")
const listeningevents = document.querySelector("#listeningevents")
const emittingevents = document.querySelector("#emittingevents")

const gsli = document.querySelector("#gsli")
const envli = document.querySelector("#envli")
const usageli = document.querySelector("#usageli")
const listeningeventsli = document.querySelector("#leli")
const emittingeventsli = document.querySelector("#eeli")
window.onscroll = () => {
  document.querySelectorAll(".active").forEach(el => {
    el.classList.remove("active")
  })
  if (isVisible(gs)) {
    gsli.classList.add("active")
  } else if (isVisible(env)) {
    envli.classList.add("active")
  } else if (isVisible(usage)) {
    usageli.classList.add("active")
  } else if (isVisible(listeningevents)) {
    listeningeventsli.classList.add("active")
  } else if (isVisible(emittingevents)) {
    emittingeventsli.classList.add("active")
  } else {
    emittingeventsli.classList.remove("active")
  }

  if (window.scrollY > topDiv.offsetHeight - 100) {
    menu.style.opacity = "1"
  } else {
    menu.style.opacity = "0"
  }
}

function isVisible(elem) {
  if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
  const style = getComputedStyle(elem);
  if (style.display === 'none') return false;
  if (style.visibility !== 'visible') return false;
  if (style.opacity < 0.1) return false;
  if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
    elem.getBoundingClientRect().width === 0) {
    return false;
  }
  const elemCenter = {
    x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
    y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
  };
  if (elemCenter.x < 0) return false;
  if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
  if (elemCenter.y < 0) return false;
  if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
  let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
  do {
    if (pointContainer === elem) return true;
  } while (pointContainer = pointContainer.parentNode);
  return false;
}