export default function (countries) {
    const getCountry = (name) => {
        return countries.find((country) => {
            return country.name == name;
        });
    };
    return [
        {name: 'BMW', /*countryId: getCountry('Germany')*/},
        // {name: 'Audi', countryId: getCountry('Germany')},
        // {name: 'Porsche', countryId: getCountry('Germany')},
    ];
}