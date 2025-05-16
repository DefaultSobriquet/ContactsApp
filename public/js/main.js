(async function (){
    const response = await fetch(`http://${window.location.host}/staff`);
    const JSONResponse = await response.json()

    const listContainer = document.getElementById('contacts-container')

    const list = document.createElement('ol')

    JSONResponse.staff.forEach(member => {
        const name = member.name;
        const pronouns = member.pronouns;
        const listItem = document.createElement('li')
        listItem.textContent = name+` (${pronouns}) - `;
        list.appendChild(listItem);
    })

    listContainer.appendChild(list);

})()


