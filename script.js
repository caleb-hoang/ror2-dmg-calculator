let items = new Array(0)

fetch('items.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(obj => {items.push(obj)})
      console.log(items)
    })
    .catch(error => console.error('Error fetching item data: ', error))



// After fetching all items from items.json, populates the list of items.
async function populateItemList() {
  const response = await fetch('items.json')
  console.log("Populating list!")
  dropdown = document.getElementById("myDropdown")
  for (var i = 0; i < items.length; i ++) {
    var item = items[i]
    newItem = document.createElement('a')
    newItem.textContent = item.name
    newItem.addEventListener('click', () => addItem(item))
    console.log(item.name)
    dropdown.appendChild(newItem)
  }
  filterFunction()
}

// Filters the list of items based on user input.
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput")
  filter = input.value.toUpperCase()
  div = document.getElementById("myDropdown")
  a = div.getElementsByTagName("a")
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1 && filter != "") {
      a[i].style.display = ""
    } else {
      a[i].style.display = "none"
    }
  }
}

// Adds an item to the board, or increments item stack by one if already existing.
function addItem(item) {
  console.log("Looking for item!")
  console.log(items.find(obj => obj.name == item.name))
}

populateItemList()