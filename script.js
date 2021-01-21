init()

function init() {
  loadJSON((res) => {
    let data = JSON.parse(res)
    console.log(data)
    createHTMLElements(data)
  })
}
function loadJSON(callback) {
  let xobj = new XMLHttpRequest()
  xobj.overrideMimeType('application/json')
  xobj.open('GET', './data.json', true)
  xobj.onreadystatechange = () => {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText)
    }
  }
  xobj.send(null)
}
function createHTMLElements(data) {
  let job = document.querySelector('.job')
  data.forEach((obj) => {
    // console.log(obj)
    let listItem = document.createElement('li')

    // Job Logo
    let imgDiv = document.createElement('div')
    let img = document.createElement('img')
    img.setAttribute('src', obj.logo)
    imgDiv.append(img)
    listItem.append(imgDiv)

    // Job Details
    createList(listItem, [obj.postedAt, obj.contract, obj.location], 'job__Details')

    // Job Skills
    createList(listItem, [obj.role, obj.level, ...obj.tools, ...obj.languages], 'job__Skills')

    job.append(listItem)
  })
}
function createList(container, items, className) {
  let list = document.createElement('ul')
  list.classList.add(className)
  items.forEach(item => {
    let listItem = document.createElement('li')
    listItem.innerHTML = item
    list.append(listItem)
  })
  container.append(list)
}

