const app = Vue.createApp({
    data() { 
        return {
            inns: [],
            inn : {},
            rooms: [],
            room: {},
            message: '',
        }
    },
    methods: {
        async getInns() {
            const response = await fetch('http://localhost:3000/api/v1/inns')
            this.inns = await response.json()
        },
        async getInn(id) {
            const response = await fetch(`http://localhost:3000/api/v1/inns/${id}`)
            const inn = await response.json()
            this.inn = inn
            this.inn.pets_allowed = inn.pets_allowed ? 'Sim' : 'Não'
            document.getElementById('inn-details').hidden = false
            this.showRooms(id)
        },
        async showRooms(id) {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/inns/${id}/rooms`);
                const rooms = await response.json();
                this.rooms = rooms;
                document.getElementById('rooms').hidden = false;
            } catch (error) {
                console.error(error);
            }
        },

        async checkRoom(inn_id, id, room) {
        }
    },
    async mounted() {
        await this.getInns()
    },
})

app.mount('#app')