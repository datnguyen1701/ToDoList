export class BaseService {
  constructor() {}
  post = (url, data) => {
    const promise = axios({
      url: url,
      method: "POST",
      data: data,
    });
    return promise;
  };
  get = (url) => {
    const promise = axios({
      url: url,
      method: "GET",
    });
    return promise;
  };
  put = (url, data) => {
    const promise = axios({
      url: url,
      method: "PUT",
      data:data,
    });
    return promise;
  };
  delete = (url) => {
    const promise = axios({
      url: url,
      method: "DELETE",
    });
    return promise;
  };
}
<<<<<<< HEAD


console.log('minh la SI-USERB')
console.log('hihihihi');
console.log("hihihihi");
console.log("hihihihi");
=======
console.log("hkkggfdg");
>>>>>>> b99e9b4bb720106dfc31549f7a5a8c014103b6fa

console.log('dsuphong')