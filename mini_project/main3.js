const userId = new URL(location.href).searchParams.get('id');
let baseUrl = 'http://jsonplaceholder.typicode.com/posts/' + userId;

async function foo() {
    let posts = await fetch(baseUrl)
        .then(res => res.json())
        .then(postMessage => {
            let block = document.createElement('div');
            block.classList.add('post_details');
            document.body.appendChild(block);

            for (const postMessageKey in postMessage) {
                let p = document.createElement('p');
                p.innerText = `${postMessageKey}: ${postMessage[postMessageKey]}`;
                block.appendChild(p);
            }
        })

    let comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}/comments`)
        .then(res => res.json())
        .then(comments => {
            let commentsById = {};

            comments.forEach(comment => {
                if (!commentsById[comment.id]) {
                    commentsById[comment.id] = [];
                }
                commentsById[comment.id].push(comment);
            });

            let wrapper = document.createElement('div');
            wrapper.classList.add('wrapper_post_comment')
            document.body.appendChild(wrapper);

            for (const postId in commentsById) {
                let block = document.createElement('div');
                block.classList.add('post_comment');
                wrapper.appendChild(block);

                commentsById[postId].forEach(comment => {
                    for (const key in comment) {
                        let p = document.createElement('p');
                        p.innerText = `${key.toUpperCase()}: ${comment[key]}`;
                        block.appendChild(p);
                    }
                });
            }
        });
}

foo();