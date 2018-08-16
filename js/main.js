;(function($){
  function log(...args){
    const process = {env:{APP_DEBUG:true}};
    process.env.APP_DEBUG?console.log(...args):{};
  }

  $(document).ready(
    document.getElementById('searchUser').addEventListener('keyup',(event)=>{
      const username = event.target.value;
      $.ajax({
        url: 'https://api.github.com/users/' + username,
        data: {
          client_id: '3b2db842cfaf51da55f8',
          client_secret: '7530ded02f6685591322b96c74f1c3f12aa69d62'
        }
      }).done((user)=>{
        $.ajax({
          url: 'https://api.github.com/users/' + username + '/repos',
          data: {
            client_id: '3b2db842cfaf51da55f8',
            client_secret: '7530ded02f6685591322b96c74f1c3f12aa69d62',
            sort: 'created: asc',
            per_page: 5
          }
        }).done((repos)=>{
          $.each(repos, function(index, repo){
            $('#repos').append(`
            <div class="card">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                </div>
              </div>
            </div>
            `);
          })
        });
        document.getElementById('profile').innerHTML = `
        <div class="card mb-3">
          <div class="card-header"><h3>${user.name}</h3></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
        `
        }
      );
    })
  );
})(jQuery)
