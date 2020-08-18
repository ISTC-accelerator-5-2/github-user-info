const button = document.getElementsByTagName('button')[0];
const input = document.getElementsByTagName('input')[0];
const usernameField = document.getElementsByClassName('username')[0];
const userImage = document.getElementsByClassName('userimage')[0];
const loadingDiv = document.getElementsByClassName('loadingDiv')[0];

const getUrl = username => `https://api.github.com/users/${username}`;

const fetchHelper = async url => {
  try {
    loadingDiv.className = 'loadingDiv visible';
    const result = await fetch(url);
    const data = await result.json();
    loadingDiv.className = 'loadingDiv hidden';
    return data;
  }
  catch(e) {
    alert('An Error Occured');
  }
};

const clickHandler = async () => {
  const username = input.value;
  
  // username === ''
  if (!username) {
    input.className = 'error';
    return;
  }

  const url = getUrl(username);
  const data = await fetchHelper(url);

  if (data.message === 'Not Found') {
    alert('User Not Found');
    return;
  }

  usernameField.innerHTML = data.login;
  userImage.setAttribute('src', data.avatar_url);
};

button.addEventListener('click', clickHandler);