var data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Mike" },
      { id: 4, name: "Emily" }
    ];

    // Function to populate the combobox
    function populateCombobox() {
      var combobox = document.getElementById("myCombobox");

      seasons["seasons"].forEach(function(item) {
        var option = document.createElement("option");
        option.text = item.year;
        combobox.appendChild(option);
      });

      // Refresh the combobox to reflect the changes
      $('.selectpicker').selectpicker('refresh');
    }

    // Call the function to populate the combobox
    populateCombobox();