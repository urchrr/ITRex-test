const url = "https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json"

const handleOriginalResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
};

export const getData = () => fetch(url, {
    method: "GET",
    mode: "cors",
}).then(handleOriginalResponse);
