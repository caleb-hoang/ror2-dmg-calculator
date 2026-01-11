let items = []

async function fetchData() {
  try {
    const response = await fetch("http://127.0.0.1:3000/items.json");
    const data = await response.json();
    items = data
  } catch (error) {
    console.error('Error loading data:', error);
  }
  console.log(items)
}

// After fetching all items from items.json, populates the list of items.
async function populateItemList() {
  await fetchData()
  console.log("Populating list!")
  const dropdown = document.getElementById("myDropdown")
  for (let i = 0; i < items.length; i ++) {
    const newItem = document.createElement('a')
    newItem.textContent = items[i].name.repeat(1)
    item_name = items[i].name.repeat(1)
    newItem.addEventListener('click', () => {addItem(newItem.textContent)})
    console.log(item_name)
    dropdown.appendChild(newItem)
  }
  filterFunction()
  console.log(items)
}

function fail() {
  console.log("Error!")
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
function addItem(itemName) {
  console.log("Looking for item!")
  console.log(itemName)
  console.log(items.find((thing) => {return thing.name === itemName}))
}

populateItemList()