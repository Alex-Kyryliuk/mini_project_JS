let divWrapper = document.createElement('div');
divWrapper.classList.add('divWrapper');
document.body.appendChild(divWrapper);

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        for (const user of users) {
            let div = document.createElement('div');
            div.classList.add('divUser');
            divWrapper.appendChild(div);

            let p = document.createElement('p');
            p.innerText = `${user.id}. ${user.name}`;
            div.appendChild(p);

            let button = document.createElement('button');
            button.innerText = 'USER DETAILS';
            button.addEventListener('click', () => {
                location.href = `user-details.html?id=${user.id}`;
            });
            div.appendChild(button);
        }
    });
