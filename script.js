init()

let categoriesSelected = []
let test = ['Frontend', 'HTML']
function init() {
  loadJSON((res) => {
    let data = JSON.parse(res)

    createHTMLElements(data)
    variables()


    function variables() {
      let clearFilter = document.querySelector('.job__clearFilter')

      clearFilter.addEventListener('click', resetFilter)
    }
    function filterData(data) {
      let newData = data.filter(({ role, level, tools, languages }) => {
        let filterValues = [role, level, ...tools, ...languages]
        let match = 1
        for (let i = 0; i < categoriesSelected.length; i++) {
          match = (filterValues.includes(categoriesSelected[i])) ? match * 1 : match * 0
        }
        return match === 1
      })
      return newData
    }
    function filterCategories(category) {
      if (!categoriesSelected.includes(category)) {
        categoriesSelected = [...categoriesSelected, category]
        let newCategory = createElement('li', {}, category)
        jobFilter.append(newCategory)
      }
    }
    function resetFilter() {
      for (let i = jobFilter.childNodes.length - 1; i >= 0; i--) {
        jobFilter.childNodes[i].remove()
      }
      categoriesSelected = []
      removeHTMLElements()
      createHTMLElements(data)
    }
    function removeHTMLElements() {
      let jobCon = document.querySelector('.job')
      for (let i = jobCon.childNodes.length - 1; i > 1; i--) {
        jobCon.childNodes[i].remove()
      }
    }
    function createHTMLElements(data) {
      let job = document.querySelector('.job')
      data.forEach((obj) => {
        // console.log(obj)
        let listItem = document.createElement('li')
        listItem.classList.add('job__listItem')
        if (obj.featured) listItem.classList.add('job--featured')

        // Job Logo
        let imgDiv = createElement('div', { class: 'job__logo' })
        let img = createElement('img', { src: obj.logo })

        imgDiv.append(img)
        listItem.append(imgDiv)


        // Job Company Name

        let companyName = createElement('span', { class: 'job__company' }, obj.company)
        let newJob = (obj.new) ? createElement('span', { class: 'job__new' }, 'New!') : ''
        let featured = (obj.featured) ? createElement('span', { class: 'job__featured' }, 'Featured') : ''

        let companyList = createElement('ul', { class: 'job__special' })
        let companyListItem = [companyName, newJob, featured]

        companyListItem.forEach(item => {
          if (item != '') {
            let li = document.createElement('li')
            li.append(item)
            companyList.append(li)
          }
        })
        listItem.append(companyList)

        // Job Position

        let position = createElement('h2', { class: 'job__position' }, obj.position)
        listItem.append(position)

        // Job Details
        createList(listItem, [obj.postedAt, obj.contract, obj.location], 'job__details')

        // Job Skills
        createList(listItem, [obj.role, obj.level, ...obj.tools, ...obj.languages], 'job__categories')

        job.append(listItem)

        let categories = document.querySelectorAll('.job__categories li')
        categories.forEach(category => {
          category.addEventListener('click', () => {
            filterCategories(category.innerHTML)
          })
        })

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

    function createElement(tag, attributes, text) {
      let newElement = document.createElement(tag);
      if (text)
        newElement.innerHTML = text
      if (attributes) {
        for (let key in attributes) {
          newElement.setAttribute(key, attributes[key])
        }
      }
      return newElement
    }
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



