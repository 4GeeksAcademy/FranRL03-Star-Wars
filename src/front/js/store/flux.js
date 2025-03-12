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
			currentCharacter: {},
			planetList: [],
			currentPlanet: {},
			starshipsList: [],
			currentStarship: {},
			user: {},
			isLogged: false,
			isAdmin: false,
			theme: "superhero",
			alert: {text: '', visible: false, background: 'primary'},
		},
		actions: {
			setTheme: (themeName) => { setStore({ theme: themeName }) },
			setAlert: (alert) => {setStore({alert: alert})},
			isUserLogged: () => {
				const data = JSON.parse(localStorage.getItem('user'));
				if (data) {
					setStore({ 
						isLogged: true, 
						isAdmin: data.is_admin, 
						user: data.first_name,
					})
				}
			},
			login: async (userLogin) => {
				const response = await fetch(`${process.env.BACKEND_URL}/api/login`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(userLogin),
					}
				)
				
				if (!response.ok) {
					console.log('Error for loggin', response.status, response.statusText)
				}
				
				const data = await response.json()
				console.log(data)

				setStore({ 
					isLogged: true, 
					isAdmin: data.result.is_admin, 
					user: data.result,
					alert: {text: data.message, visible: true, background: 'success'},
				})
				localStorage.setItem('token', data.access_token)
				localStorage.setItem('user', JSON.stringify(data.result))
			},
			logout: () => {
				localStorage.removeItem('token');
				localStorage.removeItem('user')
				getActions().setAlert({text: '', visible: false, background: 'primary'})
				setStore({
					user: '',
					isLogged: false,
					isAdmin: false
				})
			},
			register: async (newUser) => {
				const response = await fetch(`${process.env.BACKEND_URL}/api/register`, 
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(newUser)
					})

				if (!response.ok)
					console.log('Error for register', response.status, response.statusText)

				const data = await response.json()
				console.log(data)
				setStore({ 
					isLogged: true, 
					isAdmin: data.result.is_admin, 
					user: data.result.first_name,
					alert: {text: data.message, visible: true, background: 'success'},
				})
				localStorage.setItem('token', data.access_token)
				localStorage.setItem('user', JSON.stringify(data.result))
			},
			editProfile: async (dataToSend) => {
				const token = localStorage.getItem('token')
				const response = await fetch(`${process.env.BACKEND_URL}/api/edit-profile`,
					{
						method: 'PUT',
						headers: { 
							Authorization: `Bearer ${token}`,
							'Content-Type' : 'application/json' },
						body: JSON.stringify(dataToSend)
					}
				)

				if(!response.ok) {
					console.log('Error for edit', response.status, response.statusText)
				}

				const data = await response.json()
				setStore({
					user: data.results
				})
				console.log("datos del flux", data)
				localStorage.setItem('user', JSON.stringify(data.results))
			},
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

				if (!response.ok) {
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

				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}

				const data = await response.json()
				console.log(data.results)
				setStore({ characterList: data.results })
			},
			addFavorites: (item) => {
				const store = getStore();

				if (!store.favorites.some(fav => fav.name === item.name))
					setStore({ favorites: [...store.favorites, item] });
				else
					console.log('This element is already in the list');
			},
			removeFavorites: (item) => {
				const store = getStore();
				console.log('Deleted');
				setStore({ favorites: store.favorites.filter(favorite => favorite.name !== item.name) })
			},
			getDetailsCharacter: async (url, uid) => {
				const response = await fetch(url,
					{
						method: 'GET'
					}
				)

				if (!response.ok) {
					console.log('Dont found deails', response.status, response.statusText);
				}

				const data = await response.json()
				setStore({ currentCharacter: {...data.result.properties, uid} })

			},
			// Use getActions to call a function within a fuction
			getPlanets: async () => {
				const response = await fetch(`${process.env.API_URL}/planets`,
					{
						method: 'GET'
					}
				)

				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}

				const data = await response.json()
				console.log(data.results)
				setStore({ planetList: data.results })
			},
			getDetailsPlanet: async (url, uid) => {
				const response = await fetch(url,
					{
						method: 'GET'
					}
				)

				if (!response.ok) {
					console.log('Dont found deails', response.status, response.statusText);
				}

				const data = await response.json()
				setStore({ currentPlanet: {...data.result.properties, uid} })

			},
			getStarships: async () => {
				const response = await fetch(`${process.env.API_URL}/starships`,
					{
						method: 'GET'
					}
				)

				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return;
				}

				const data = await response.json()
				console.log(data.results)
				setStore({ starshipsList: data.results })
			},
			getDetailsStarship: async (url, uid) => {
				const response = await fetch(url,
					{
						method: 'GET'
					}
				)

				if (!response.ok) {
					console.log('Dont found deails', response.status, response.statusText);
				}

				const data = await response.json()
				setStore({ currentStarship: {...data.result.properties, uid} })

			},
			getOneProduct: async (productId) => {
				const token = localStorage.getItem('token')
				const response = await fetch(`${process.env.BACKEND_URL}/api/products/${productId}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				)
				
				if (!response.ok) {
					console.log('Error for get product', response.status, response.statusText)
				}

				const data = response.json()
				console.log(data)

			},
			updateProduct: async (productId, updateProduct) => {
				const token = localStorage.getItem('token')
				const response = await fetch(`${process.env.BACKEND_URL}/api/products/${productId}`,
					{
						method: 'PUT',
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type' : 'application/json'
						},
						body: JSON.stringify(updateProduct)
					}
				)
				
				if (!response.ok) {
					console.log('Error for get product', response.status, response.statusText)
				}

				const data = response.json()
				console.log(data)
			},
		},
	}
};

export default getState;
