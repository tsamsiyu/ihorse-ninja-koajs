export default function (seeded) {
    const getCountryId = (name) => {
        const country = seeded.countries.find((country) => {
            return country.name === name;
        });
        return country ? country.id : country;
    };

    return [
        {name: 'BMW', country: 'Germany'},
        {name: 'Audi', country: 'Germany'},
        {name: 'Porsche', country: 'Germany'},
        {name: 'Mazda', country: 'Japan'},
        {name: 'Nissan', country: 'Japan'},
        {name: 'Chevrolet', country: 'USA'},
        {name: 'Hyndai', country: 'Korea'},
        {name: 'Kia', country: 'Korea'},
        {name: 'Daewoo', country: 'Korea'},
    ].map((hash) => {
        hash.countryId = getCountryId(hash.country);
        delete hash.country;
        return hash;
    });
}