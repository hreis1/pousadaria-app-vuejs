const app = Vue.createApp({
    data() { 
        return {
            searchTerm: '',
            
            inns: [],
            rooms: [],
            
            selectedInn: null,
            selectedRoom: {},

            checkin: '',
            checkout: '',
            number_of_guests: '',
            
            errorMessages: '',
            showInns: true,
        }
    },
    methods: {
        async getInns() {
            const response = await fetch('http://localhost:3000/api/v1/inns')
            this.inns = await response.json()
        },
        async search() {
            if (this.searchTerm) {
              try {
                const response = await fetch(`http://localhost:3000/api/v1/inns/?trade_name=${this.searchTerm}`);
                data = await response.json();
                this.inns = data;
                this.hideInnDetails();
              } catch (error) {
                console.error(error);
                }
            }
        },
        async showInnDetails(inn) {
            const response = await fetch(`http://localhost:3000/api/v1/inns/${inn.id}`)
            this.selectedInn = await response.json()
            this.showInns = false;
            await this.getRooms(inn)
        },
        async getRooms(inn) {
            const response = await fetch(`http://localhost:3000/api/v1/inns/${inn.id}/rooms`)
            this.rooms = await response.json()
        },
        async checkAvailability(room) {
            const response = await fetch(`http://localhost:3000/api/v1/inns/${room.inn_id}/rooms/${room.id}/check?checkin=${this.checkin}&checkout=${this.checkout}&number_of_guests=${this.number_of_guests}`)
            const data = await response.json()
            console.log(data);
            this.errorMessages = ''
            if (response.ok && !data.mensagem) {
                this.selectedRoom = room
                this.selectedRoom.available = true
                this.selectedRoom.checkin = this.checkin
                this.selectedRoom.checkout = this.checkout
                this.selectedRoom.number_of_guests = this.number_of_guests
                this.selectedRoom.price = data.price
            } else {
                this.selectedRoom = room
                this.errorMessages = data.mensagem
            }
            this.checkin = '',
            this.checkout = '',
            this.number_of_guests = ''
        },
        showForm(room) {
            this.selectedRoom = room
        },
        hideInnDetails() {
            this.selectedInn = null;
            this.showInns = true;
        }
    },
    async mounted() {
        await this.getInns()
    },
})

app.mount('#app')