const endpoint = "https://ohwoj3u4oi.execute-api.us-east-1.amazonaws.com/dev/prs?";

const fetchData = async (owner, repo) => {
    let errorEle = document.getElementById("status");
    errorEle.className = "";
    errorEle.innerHTML = "<div class='loading-text'>Loading...</div>";
    let res = await fetch(endpoint + `owner=${owner}&repo=${repo}`);
    let data = await res.json();
    if (data.status == "done") {
        generateHTML(data.users);
        errorEle.className = "hidden";
    } else if(data.status == "processing") {
        setTimeout(() => {
            fetchData(owner, repo);
        }, 4000);
    } else {
        let errorEle = document.getElementById("status");
        errorEle.className = "";
        errorEle.innerText = "Error getting the leaderboard.";
    }
}

const generateHTML = (users) => {
    let tableEle = document.getElementById("leaderboard-table");
    let htmlToAppend = `<tr class="heading-row">
        <th class="table-heading">Username</th>
        <th class="table-heading">Merged PRs</th>
        <th class="table-heading">Closed PRs</th>
        <th class="table-heading">Open PRs</th>
    </tr>`;
    users.forEach(user => {
        htmlToAppend += `<tr class="data-row">
            <td class="table-data username"><a class="username" href="https://github.com/${user.username}" target="_blank"> ${user.username}</a></td>
            <td class="table-data userdata">${user.merged_prs || 0}</td>
            <td class="table-data userdata">${user.closed_prs || 0}</td>
            <td class="table-data userdata">${user.open_prs || 0}</td>
        </tr>`;
    });
    tableEle.innerHTML = htmlToAppend;
    let errorEle = document.getElementById("status");
    errorEle.className = "hidden";
}

// fetchData();
document.getElementById("btn-submit").addEventListener("click", function(evt) {
    let value = document.getElementById("repoName").value;
    if (value.indexOf("github.com/")) {
        value = value.replace("https://github.com/", "").replace("http://github.com/", "").replace("github.com/", "");
    }
    if (value.split("/").length !== 2) {
        alert("Invalid repo url");
        return;
    }
    const [owner, repo] = value.split("/");
    fetchData(owner, repo);
});
