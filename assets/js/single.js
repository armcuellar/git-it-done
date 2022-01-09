
var issuesContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // padd response data to dom function
                displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    })
};

var displayIssues = function (issues) {
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (i = 0; i < issues.length; i++) {
        // create a link element to tak users to the issue on github
        var issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank");

        // create sapn to hold issues title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issuesEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an acutal issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = ("(Pull request)");
        }
        else {
            typeEl.textContent = "(Issue)"
        }

        // append to container
        issuesEl.appendChild(typeEl);
        issuesContainerEl.appendChild(issuesEl);
    }
};

getRepoIssues("facebook/react");