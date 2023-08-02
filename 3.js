function createNewCustomer() {
    const url = "https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create";
    const token = "dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=";

    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;

    // Check if first_name and last_name are provided
    if (!firstName || !lastName) {
        alert("First Name and Last Name are mandatory fields.");
        return;
    }

    const customerData = {
        cmd:"create",
        first_name: firstName,
        last_name: lastName,
        street: document.getElementById("street").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const responseMessage = document.getElementById("responseMessage");
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                responseMessage.textContent = responseData.message;
            } else {
                responseMessage.textContent = `Status: ${xhr.responseText}`;
            }
        }
    };

    xhr.send(JSON.stringify(customerData));
}
