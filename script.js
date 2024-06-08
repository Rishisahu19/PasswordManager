// Mask password with asterisks
function maskPassword(pass) {
    return '*'.repeat(pass.length);
}

// Copy text to clipboard and show alert
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline";
            setTimeout(() => {
                document.getElementById("alert").style.display = "none";
            }, 2000);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

// Delete a password entry
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    if (data) {
        let arr = JSON.parse(data);
        let arrUpdated = arr.filter(e => e.website !== website);
        localStorage.setItem("passwords", JSON.stringify(arrUpdated));
        alert(`Successfully deleted ${website}'s password`);
        showPasswords();
    }
}

// Display the passwords in a table
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "No Data To Show";
    } else {
        tb.innerHTML = `
        <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
        let arr = JSON.parse(data);
        let str = "";
        arr.forEach(element => {
            str += `<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy Button" width="10" height="10"></td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        });
        tb.innerHTML += str;
    }
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

// Save a new password entry
const savePassword = () => {
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (!website || !username || !password) {
        alert("All fields are required!");
        return;
    }

    let passwords = localStorage.getItem("passwords");
    let json = passwords ? JSON.parse(passwords) : [];
    json.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(json));
    alert("Password Saved");
    showPasswords();
}

// Initialize and bind event listeners
document.addEventListener("DOMContentLoaded", () => {
    showPasswords();
    document.querySelector(".btn").addEventListener("click", (e) => {
        e.preventDefault();
        savePassword();
    });
});

console.log("Working");
