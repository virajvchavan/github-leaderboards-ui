const endpoint = "https://ohwoj3u4oi.execute-api.us-east-1.amazonaws.com/dev/prs?owner=denoland&repo=deno";

const fetchData = async () => {
    let res = await fetch(endpoint);
    let data = await res.json();
    if (data.status == "done") {
        generateHTML(data.users);
    } else {
        let errorEle = document.getElementById("error-message");
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
}

fetchData();
