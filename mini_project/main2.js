const userId = new URL(location.href).searchParams.get('id');
let baseUrl = 'http://jsonplaceholder.typicode.com/users/' + userId;

fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
        let div = document.createElement('div');
        document.body.appendChild(div);
        div.classList.add('userInfo')

        for (const dataKey in data) {
            if (dataKey === 'address' || dataKey === 'company') {
                let block = document.createElement('div');
                block.classList.add('block');
                div.appendChild(block);

                let key = document.createElement('span');
                block.appendChild(key);
                key.innerText = dataKey + ': ';

                let ul = document.createElement('ul');
                ul.classList.add('wrapper-ul')
                div.appendChild(ul);

                for (const subKey in data[dataKey]) {
                    if (subKey !== 'geo') {
                        let li = document.createElement('li');
                        li.innerText = `${subKey}: ${data[dataKey][subKey]}`;
                        ul.appendChild(li);
                    } else {
                        let geoUl = document.createElement('ul');
                        geoUl.classList.add('wrap-ul')
                        ul.appendChild(geoUl);

                        let textList = document.createElement('p');
                        geoUl.appendChild(textList)
                        textList.innerText = 'geo:';

                        for (const geoKey in data[dataKey]['geo']) {
                            let geoLi = document.createElement('li');
                            geoLi.innerText = `${geoKey}: ${data[dataKey]['geo'][geoKey]}`;
                            geoUl.appendChild(geoLi);
                        }
                    }
                }
            } else {
                let block = document.createElement('div');
                block.classList.add('block');
                div.appendChild(block);

                let key = document.createElement('span');
                block.appendChild(key);
                key.innerText = dataKey + ': ';

                let p = document.createElement('p');
                block.appendChild(p);
                p.innerText = data[dataKey];
            }
        }


        let button = document.createElement('button');
        button.innerText = 'Post of current user';

        button.addEventListener('click', () => {
            let postsContainer = document.getElementById('postsContainer');
            if (postsContainer) {
                postsContainer.innerHTML = '';
            } else {
                postsContainer = document.createElement('div');
                postsContainer.id = 'postsContainer';
                document.body.appendChild(postsContainer);
            }

            button.style.display = 'none';

            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(res => res.json())
                .then(posts => {
                    posts.forEach(post => {
                        let postDiv = document.createElement('div');
                        postDiv.classList.add('post');
                        postDiv.innerHTML = `
                                                 <p> Title ${post.id}:</p>
                                                 <h3> ${post.title} </h3>`;
                        postsContainer.appendChild(postDiv);

                        let buttonPost = document.createElement('button');
                        buttonPost.innerText = 'Post info!'
                        buttonPost.addEventListener('click', () => {
                            location.href = `post-details.html?id=${post.id}`;
                        });
                        postDiv.appendChild(buttonPost);
                    });
                });
        });
        div.appendChild(button);
    });
