let form = document.querySelector("form");
let list = document.querySelector(".list");

form.addEventListener("submit",(e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const json = JSON.stringify(Object.fromEntries(formData.entries()));
  postData("http://localhost:3000/requests",json)
  .then(data => {
   console.log(data)
   let newEl = document.createElement("div")
   newEl.classList.add("style");
   for(let key in data){
     newEl.innerHTML += `
      <h3>${data[key]}</h3>
     `
   }
   list.append(newEl)
  }).finally(() => {
    form.reset();
  })

})

const postData = async (url, data) => {
  let res = await fetch(url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: data
  });

  return await res.json();
};

class Elements{
  constructor(img,altimg,title,descr,price,parentElement){
    this.img = img;
    this.altimg = altimg;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.parent = document.querySelector(parentElement);
  }
  render(){
    let newEl = document.createElement("div");
    newEl.classList.add("style");
    newEl.innerHTML = `
      <div>
      <img src = ${this.img} alt = ${this.altimg}></img>
      </div>
      <h1>${this.title}</h1>
      <p>${this.descr}</p>
      <span><m>${this.price}</m>
    `
    this.parent.append(newEl);  }
}


async function getInfoFromDB(url){
  const res = await fetch(url);

  return await res.json();
}
getInfoFromDB("http://localhost:3000/menu")
.then(data => {
  data.forEach(({img,altimg,title,descr,price}) => {
    new Elements(img,altimg,title,descr,price,".container").render();
  })
})