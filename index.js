/*JSON for tables*/
var table = {
  tables: [
    {
      id: 1,
      items: [
        {
          name: "",
          count: 0,
          cost: 0
        }
      ],
      cost: 0
    },
    {
      id: 2,
      items: [
        {
          name: "",
          count: 0,
          cost: 0
        }
      ],
      cost: 0
    },
    {
      id: 3,
      items: [
        {
          name: "",
          count: 0,
          cost: 0
        }
      ],
      cost: 0
    }
  ]
};
/*JSON for Items*/
var item = {
  items: [
    {
      id: 1,
      name: "Crusty Garlic Focaccia with melted chese",
      cost: 200.0
    },
    {
      id: 2,
      name: "French Fries",
      cost: 105.0
    },
    {
      id: 3,
      name: "Home Country Fries with Herbs & Chillie Flakes",
      cost: 100.0
    },
    {
      id: 4,
      name: "French Fries with Cheese & Jalapenos",
      cost: 135.0
    },
    {
      id: 5,
      name: "Chicken and Cheese Burger",
      cost: 150.0
    },
    {
      id: 6,
      name: "Veggie 9 Burger",
      cost: 125.0
    }
  ]
};
function displayModal(tableIndex) {
  var divIdForTable = "table_content[" + tableIndex + "]";
  document.getElementById(divIdForTable).style.backgroundColor = "#d88f06";
  var modal = document.getElementById("myModal");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    document.getElementById(divIdForTable).style.backgroundColor = "white";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById(divIdForTable).style.backgroundColor = "white";
    }
  };
  var modal_header = "Table-" + (tableIndex + 1) + " |Order Details";
  document.getElementById("modalHeader").innerHTML = modal_header;
  var modal_body = "<tr>";
  modal_body += "<th>S.No</th>";
  modal_body += "<th>Items</th>";
  modal_body += "<th>price</th>";
  modal_body += "</tr>";
  var i;
  for (i = 1; i < table.tables[tableIndex].items.length; i++) {
    modal_body +=
      '<tr><td width="7%">' +
      i +
      '</td><td width="50%">' +
      table.tables[tableIndex].items[i].name +
      '</td><td width="20%">' +
      table.tables[tableIndex].items[i].cost +
      '</td><td width="20%"><font size="2">Number of Servings</font></br><input id="itemCount[' +
      i +
      ']" onchange="changeItemsCount(' +
      tableIndex +
      "," +
      i +
      ')"type="number" style="border:none;" min="1" value="' +
      table.tables[tableIndex].items[i].count +
      '"</input></td><td width="7%"><img onclick="deleteItem(' +
      tableIndex +
      "," +
      i +
      ')" width="20px" height="20px"src="./images/deleteIcon.png"/></td></tr>';
  }
  modal_body += '<tr><td width="7%"></td><td width="20%"></td>';
  modal_body +=
    '<td width="20%">Total:</br>' +
    table.tables[tableIndex].cost +
    "</td></tr>";
  document.getElementById("tableRowContent").innerHTML = modal_body;
  if (table.tables[tableIndex].items.length > 1) {
    var modal_footer =
      '<font size="3px" onclick="closeSession(' +
      tableIndex +
      ')">CLOSE SESSION(GENERATE BILL)</font>';
    document.getElementById("modal-footer").innerHTML = modal_footer;
  } else {
    {
      document.getElementById("modal-footer").innerHTML = "";
    }
  }
}
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
function deleteItem(tableIndex, itemIndex) {
  var costOfItem = table.tables[tableIndex].items[itemIndex].cost;
  var itemCount = table.tables[tableIndex].items[itemIndex].count;
  var totalItemCost = costOfItem * itemCount;
  table.tables[tableIndex].cost -= totalItemCost;
  table.tables[tableIndex].items.splice(itemIndex, 1);
  display();
  displayModal(tableIndex);
}
function closeSession(tableIndex) {
  itemsLength = table.tables[tableIndex].items.length;
  table.tables[tableIndex].cost = 0;
  table.tables[tableIndex].items.splice(1, itemsLength);
  display();
  closeModal();
  alert("Generated Bill for Table-" + (tableIndex + 1));
}
function changeItemsCount(tableIndex, itemIndex) {
  var divId = "itemCount[" + itemIndex + "]";
  var enteredItemCount = document.getElementById(divId).value;
  var previousItemCount = table.tables[tableIndex].items[itemIndex].count;
  var itemCost = table.tables[tableIndex].items[itemIndex].cost;
  var totalItemCost = table.tables[tableIndex].cost;
  if (enteredItemCount > previousItemCount) {
    totalItemCost += itemCost * (enteredItemCount - previousItemCount);
  } else {
    totalItemCost -= itemCost * (previousItemCount - enteredItemCount);
  }
  table.tables[tableIndex].cost = totalItemCost;
  table.tables[tableIndex].items[itemIndex].count = enteredItemCount;
  display();
  displayModal(tableIndex);
}
function searchTables() {
  var input, filter, table, table_content;
  input = document.getElementById("tableSearch");
  filter = input.value.toUpperCase();
  table_content = document.getElementsByClassName("table_content");
  table = document.getElementsByClassName("tableNumber");
  for (i = 0; i < table.length; i++) {
    if (table[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      table_content[i + 1].style.display = "";
    } else {
      table_content[i + 1].style.display = "none";
    }
  }
}
function searchItems() {
  var input, filter, items, items_content;
  input = document.getElementById("itemSearch");
  filter = input.value.toUpperCase();
  items_content = document.getElementsByClassName("menu_content");
  items = document.getElementsByClassName("itemName");
  for (i = 0; i < items.length; i++) {
    if (items[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      items_content[i + 1].style.display = "";
    } else {
      items_content[i + 1].style.display = "none";
    }
  }
}
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var menuId = data.split("[");
  var tableId = ev.target.id.split("[");
  if (menuId.length > 1 && tableId.length > 1) {
    menuId = menuId[1][0];
    tableId = tableId[1][0];
    table.tables[tableId].cost += item.items[menuId].cost;
    var index = -1;
    var value = item.items[menuId].name;
    var filteredObject = table.tables[tableId].items.find(function(item, i) {
      if (item.name === value) {
        index = i;
        return i;
      }
    });
    if (index == -1) {
      table.tables[tableId].items.push({
        name: item.items[menuId].name,
        count: 1,
        cost: item.items[menuId].cost
      });
    } else {
      table.tables[tableId].items[index].count += 1;
    }
    display();
  }
}

display();
function displayTables() {
  var tables = "";
  tables = '<div class="table_content" style="box-shadow:none">';
  tables = tables + '<font size="5px"><center>Tables</center></font>';
  tables =
    tables +
    '<input class="search" id="tableSearch" onkeyup="searchTables()" placeholder="Search tables" type="text" />';
  tables = tables + "</div>";
  var i;
  for (i = 0; i < table.tables.length; i++) {
    tables +=
      '<div class="table_content" id="table_content[' +
      i +
      ']" onclick="displayModal(' +
      i +
      ')" ondrop="drop(event)"   ondragover="allowDrop(event)" style="padding-left:10px"><font size="5px"><div class="tableNumber">Table-' +
      table.tables[i].id +
      "</div></font></br></br>Rs:" +
      table.tables[i].cost +
      " | Total Items:" +
      (table.tables[i].items.length - 1) +
      "</div>";
  }
  document.getElementById("table").innerHTML = tables;
}
function displayItems() {
  var items = "";
  items = '<div class="menu_content" style="box-shadow:none">';
  items = items + '<font size="5px"><center>Menu</center></font>';
  items =
    items +
    '<input class="search"  id="itemSearch" onkeyup="searchItems()" placeholder="Search menu...by course,by food" type="text" />';
  items = items + "</div>";
  var i;
  for (i = 0; i < item.items.length; i++) {
    items +=
      '<div class="menu_content" id="menu_content[' +
      i +
      ']" style="padding-left:10px" draggable="true" ondragstart="drag(event)"><font size="5px"><div class="itemName">' +
      item.items[i].name +
      "</div></font></br></br>Rs:" +
      item.items[i].cost +
      "</div>";
  }
  document.getElementById("menu").innerHTML = items;
}
function display() {
  displayTables();
  displayItems();
}
