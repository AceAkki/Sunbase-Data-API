const baseUrl = "https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";
const token = "dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=";


// Function to fetch customer data and populate the table
function fetchCustomers() {
    const endpoint = "?cmd=get_customer_list";
    const fullUrl = baseUrl + endpoint;

    fetch(fullUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const customerTable = document.getElementById("customerTable");
        // Clear the table content first
        customerTable.innerHTML = `
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Street</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        `;

        data.forEach(customer => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${customer.first_name}</td>
                <td>${customer.last_name}</td>
                <td>${customer.street}</td>
                <td>${customer.address}</td>
                <td>${customer.city}</td>
                <td>${customer.state}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <button onclick="editCustomer('${customer.uuid}')">Edit</button>
                    <button onclick="deleteCustomer('${customer.uuid}', this)">Delete</button>
                </td>
            `;

            // Add a data attribute to store the UUID
            row.setAttribute("data-uuid", customer.uuid);
            customerTable.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error while fetching customer list:", error);
        alert("Error occurred while fetching customer list. Please try again.");
    });
}

// Function to delete a customer by UUID


function deleteCustomer(uuid) {
    if (confirm("Are you sure you want to delete this customer?")) {
        const deleteData = {
            cmd: "delete",
            uuid: uuid
        };

        const deleteEndpoint = `?cmd=delete&uuid=${uuid}`;
        const deleteUrl = baseUrl + deleteEndpoint;

        fetch(deleteUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(deleteData)
        })
        .then(response => {
            if (response.status === 200) {
                alert("Successfully deleted the customer.");
                // Remove the row from the table after successful deletion
                const row = document.querySelector(`tr[data-uuid="${uuid}"]`);
                row.remove();
            } else if (response.status === 400) {
                alert("UUID not found.");
            } else {
                alert("Error: Not deleted.");
            }
        })
        .catch(error => {
            console.error("Error while deleting customer:", error);
            alert("Error occurred while deleting customer. Please try again.");
        });
    }
}


// Function to update a customer by UUID
function updateCustomer(uuid) {
    // Replace the following data with the updated values for the customer
    const updatedCustomerData = {
        cmd: "update",
        uuid: uuid,
        first_name: "Updated First Name",
        last_name: "Updated Last Name",
        street: "Updated Street",
        address: "Updated Address",
        city: "Updated City",
        state: "Updated State",
        email: "updated@example.com",
        phone: "9876543210"
    };


const updateEndpoint = '?cmd=update&uuid=${uuid}';
    const updateUrl = baseUrl + updateEndpoint;

    fetch(updateUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedCustomerData)
    })
    .then(response => {
        if (response.status === 200) {
            alert("Successfully updated the customer.");
            // Refresh the table after successful update
            fetchCustomers();
        } else if (response.status === 400) {
            alert("UUID not found.");
        } else {

alert("Error: Not updated.");
        }
    })
    .catch(error => {
        console.error("Error while updating customer:", error);
        alert("Error occurred while updating customer. Please try again.");
    });
}




// Function to edit a customer by UUID
function editCustomer(uuid) {
    const editForm = document.getElementById("editForm");
    const customer = getCustomerByUUID(uuid);

cmd: "update",
        uuid: uuid,

    if (customer) {
        // Populate the edit form with the customer's data
        document.getElementById("editUUID").value = customer.uuid;
        document.getElementById("editFirstName").value = customer.first_name;
        document.getElementById("editLastName").value = customer.last_name;
        document.getElementById("editStreet").value = customer.street;
        document.getElementById("editAddress").value = customer.address;
        document.getElementById("editCity").value = customer.city;
        document.getElementById("editState").value = customer.state;
        document.getElementById("editEmail").value = customer.email;
        document.getElementById("editPhone").value = customer.phone;

        // Show the edit form
        editForm.style.display = "block";
    } else {
        alert("UUID not found.");
    }
}

// Function to cancel the edit operation
function cancelEdit() {
    const editForm = document.getElementById("editForm");
    editForm.style.display = "none";
}

// Function to save the updated customer
function saveCustomer() {
    const uuid = document.getElementById("editUUID").value;
    const updatedCustomerData = {
        cmd: "update",
        uuid: uuid,
        first_name: document.getElementById("editFirstName").value,
        last_name: document.getElementById("editLastName").value,
        street: document.getElementById("editStreet").value,
        address: document.getElementById("editAddress").value,
        city: document.getElementById("editCity").value,
        state: document.getElementById("editState").value,
        email: document.getElementById("editEmail").value,
        phone: document.getElementById("editPhone").value
    };

    const updateEndpoint = 'cmd=update&uuid=${uuid}';
    const updateUrl = baseUrl + updateEndpoint;

    fetch(updateUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedCustomerData)
    })
    .then(response => {
        if (response.status === 200) {
            alert("Successfully updated the customer.");
            // Refresh the table after successful update
            fetchCustomers();
            cancelEdit();
        } else if (response.status === 400) {
            alert("UUID not found.");
        } else {
            alert("Error: Not updated.");
        }
    })
    .catch(error => {
        console.error("Error while updating customer:", error);
        alert("Error occurred while updating customer. Please try again.");
    });
}

// Function to retrieve customer by UUID
function getCustomerByUUID(uuid) {
    // Implement logic to retrieve the customer from the table data
    // You can use the customer data stored in the table or fetch it from the server
    // Example implementation:
    const customerTable = document.getElementById("customerTable");
    const rows = customerTable.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.getAttribute("data-uuid") === uuid) {
            return {
                uuid: row.getAttribute("data-uuid"),
                first_name: row.cells[0].textContent,
                last_name: row.cells[1].textContent,
                street: row.cells[2].textContent,
                address: row.cells[3].textContent,
                city: row.cells[4].textContent,
                state: row.cells[5].textContent,
                email: row.cells[6].textContent,
                phone: row.cells[7].textContent
            };
        }
    }
    return null;
}

// Function to populate the table with customer data
function populateTable(data) {
    const customerTable = document.getElementById("customerTable");
    customerTable.innerHTML = `
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Street</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
        </tr>
    `;

    data.forEach(customer => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.first_name}</td>
            <td>${customer.last_name}</td>
            <td>${customer.street}</td>
            <td>${customer.address}</td>
            <td>${customer.city}</td>
            <td>${customer.state}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button onclick="editCustomer('${customer.uuid}')">Edit</button>
                <button onclick="deleteCustomer('${customer.uuid}')">Delete</button>
            </td>
        `;

        // Add a data attribute to store the UUID
        row.setAttribute("data-uuid", customer.uuid);
        customerTable.appendChild(row);
    });
}

// Fetch the customer list on page load
fetchCustomers();

