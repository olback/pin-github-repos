/**
 *  Pinned repos © 2017 olback
 */

window.onload = () => {

    const github_username = "olback";
    const client_id = "15eaa46ebf0158766b4e";
    const client_secret = "079b654791a12c30d22da3e6c3ff3d15f0052294";
    const show = [
        "gta-session",
        "rdg-linux",
        "new-tab-extension",
        "bar-vscode",
        "simple-whois-lookup",
        "devRant-computercraft"
    ];

    const url = "https://api.github.com/users/" + github_username + "/repos?client_id=" + client_id + "&client_secret=" + client_secret;
    const repoBoxes = document.getElementsByClassName('repo');
    const links = document.getElementsByClassName('repo-link');
    const descriptions = document.getElementsByClassName('repo-description');
    const languages = document.getElementsByClassName('repo-lang');
    const stars = document.getElementsByClassName('repo-stars');
    const forks = document.getElementsByClassName('repo-forks');

    function loadJSON(path, success, error) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    }

    loadJSON(url,
        (data) => {
            //console.log(data);
            loadRepos(data);
        }, (xhr) => {
            console.log(xhr);
        }
    );

    function loadRepos(repos) {
        for (let i = 0; i < repos.length; i++) {
            for (let j = 0; j < show.length; j++) {
                if (show[j] == repos[i].name) {
                    fillData(j, repos[i].name, repos[i].html_url, repos[i].description, repos[i].language, repos[i].stargazers_count, repos[i].forks_count);
                }
            }
        }
    }

    function fillData(i, name, link, description, language, star_count, fork_count) {

        if (name) {
            links[i].innerHTML = name;
            links[i].href = link;

            descriptions[i].innerHTML = description;
            languages[i].innerHTML = language;

            if (!star_count == 0) {
                stars[i].innerHTML = stars[i].innerHTML + star_count;
                stars[i].href = 'https://github.com/' + github_username + '/' + name + '/stargazers';
                stars[i].style.display = 'inline';
            }

            if (!fork_count == 0) {
                forks[i].innerHTML = forks[i].innerHTML + fork_count;
                forks[i].href = 'https://github.com/' + github_username + '/' + name + '/network';
                forks[i].style.display = 'inline';
            }

            repoBoxes[i].style.display = 'inline-block';
            //console.log(repoBoxes[i]);
        }

    }

}
