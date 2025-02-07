const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contactList: [],
			currentContact: {},
			principalContact:
			{
				"name": "User 1",
				"phone": "12345678",
				"email": "user@gmail.com",
				"address": "Seville, Spain"
			}
		},
		actions: {
			getContact: async () => {
				const response = await fetch('https://playground.4geeks.com/contact/agendas/fran',
					{
						method: 'GET'
					}
				)

				if (!response.ok) {
					if (response.status == 404) {
						getActions().createAgenda()
					} else {
						console.log('No se encontro el contacto')
					}
				}

				const data = await response.json();
				if(data.contacts.length == 0) {
					setStore({currentContact: getStore().principalContact})
					console.log('get contact con 0', data)
					// getActions().createContact()
				} else {
					console.log('get contact sin nada',data)
					setStore({ contactList: data })
				}
			},
			setCurrentContact: (contact) => { setStore({ currentContact: contact }) },
			createAgenda: async () => {
				const response = await fetch('https://playground.4geeks.com/contact/agendas/fran',
					{
						method: 'POST'
					}
				)

				if (!response.ok) {

					console.log('Error: ', response.status, response.statusText)
					return;
				}

				setStore({currentContact: getStore().principalContact})
				getActions().createContact()
			},
			createContact: async () => {
				const response = await fetch('https://playground.4geeks.com/contact/agendas/fran', 
					{
						method: 'POST', 
						body: JSON.stringify(getStore().currentContact),
						headers: {'Content-type': 'application/json'}
					}
				)

				if (!response.ok) {
					console.log('Error creating contact')
				}

				getActions().getContact()
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
