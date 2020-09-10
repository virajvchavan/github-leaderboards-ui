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
    let htmlToAppend = `<tr>
        <th>Username</th>
        <th>Merged PRs</th>
        <th>Closed PRs</th>
        <th>Open PRs</th>
    </tr>`;
    users.forEach(user => {
        htmlToAppend += `<tr>
            <td><a href="https://github.com/${user.username}" target="_blank"> ${user.username}</a></td>
            <td>${user.merged_prs || 0}</td>
            <td>${user.closed_prs || 0}</td>
            <td>${user.open_prs || 0}</td>
        </tr>`;
    });
    tableEle.innerHTML = htmlToAppend;
}

fetchData();
