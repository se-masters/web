let shelters = []

async function fetchShelters() {
    try {
        const response = await axios.get(domain + shelter_api);
        shelters = response.data;
    } catch (error) {
        console.log(error);
    }

    return shelters;
}



markers = []

for (let shelter of shelterss) {
    markers.push(shelter);
    console.log(shelter);
}