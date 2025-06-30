export default function authHeader() {
    token = "Bearer "+ localStorage.getItem("token"); 
    return {
        headers: {
            authorization: token
        }
    };
}
