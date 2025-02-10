const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			contactList: [],
			currentContact: {},
			principalContact:
			{
				"name": "User 1",
				"phone": "12345678",
				"email": "user@gmail.com",
				"address": "Seville, Spain"
			},
			characterList: [],
			favorites: [],
		},
		actions: {
			getContact: async () => {
				const response = await fetch(`${process.env.BASE_URL}/fran`,
					{
						method: 'GET'
					}
				)

				if (!response.ok) {
					if (response.status == 404) {
						console.log('Creating agenda...')
						getActions().createAgenda()
					} else {
						console.log('No se encontro el contacto')
					}
				}

				const data = await response.json();
				if (data.contacts.length === 0) {
					console.log('There are no contacts')
				} else {
					console.log('Creating contact...', data)
					setStore({ contactList: data })
				}
			},
			setCurrentContact: (contact) => { setStore({ currentContact: contact }) },
			createAgenda: async () => {
				const response = await fetch(`${process.env.BASE_URL}/fran`,
					{
						method: 'POST'
					}
				)

				if (!response.ok) {

					console.log('Error: ', response.status, response.statusText)
					return;
				}

				setStore({ currentContact: getStore().principalContact })
				getActions().createContact()
			},
			createContact: async () => {
				const response = await fetch(`${process.env.BASE_URL}/fran/contacts`,
					{
						method: 'POST',
						body: JSON.stringify(getStore().currentContact),
						headers: { 'Content-type': 'application/json' },
					}
				)

				if (!response.ok) {
					console.log('Error creating contact')
				}

				getActions().getContact()
			},
			editContact: async (updateContact) => {
				const response = await fetch(`${process.env.BASE_URL}/fran/contacts/${updateContact.id}`,
					{
						method: 'PUT',
						headers: { 'Content-type': 'application/json' },
						body: JSON.stringify(updateContact),
					}
				)

				if (!response.ok) {
					console.log('Error edit contact', response.status, response.statusText);

				}

				console.log('Contact edit ', updateContact)
				getActions().getContact()

			},
			deleteContact: async (contact) => {
				const response = await fetch(`${process.env.BASE_URL}/fran/contacts/${contact.id}`,
					{
						method: 'DELETE'
					}
				)

				if(!response.ok) {
					console.log('Error to delete contact', response.status, response.statusText);
					
				}
				
				window.location.reload()

				console.log('Deleted contact with id: ', contact.id);
				getActions().getContact()
			},
			getCharacters: async () => {
				const response = await fetch(`${process.env.API_URL}/people`, 
					{
						method: 'GET'
					}
				)

				if(!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}

				const data = await response.json()
				console.log(data.results)
				setStore({ characterList: data.results })
			},
			addFavorites: (item) => {
				const store = getStore();

				if(!store.favorites.some(fav => fav.name === item.name))
					setStore({ favorites: [...store.favorites, item] });
				else
				console.log('This element is already in the list');
			},
			removeFavorites: (item) => {
				const store = getStore();
				console.log('Deleted');
				setStore({ favorites: store.favorites.filter(favorite => favorite.name !== item.name)})
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
