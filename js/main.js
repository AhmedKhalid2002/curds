var title =document.getElementById('title');
var price=document.getElementById('price');
var taxes=document.getElementById('taxes');
var ads=document.getElementById('ads');
var discount=document.getElementById('discount');
var total=document.getElementById('total');
var count=document.getElementById('count');
var category=document.getElementById('category');
var create=document.getElementById('create'); 
var mood='create';
var tmp;
// * get total
var paragBg=document.getElementById('parag-bg');
function calcTotal(){
    var result;
    if(price.value !=''){
        result =(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        paragBg.classList.replace('bg-warning-subtle','bg-success');
        paragBg.classList.add('text-white');
    }else{
        paragBg.classList.replace('bg-success','bg-warning-subtle');
        paragBg.classList.replace('text-white','text-black');
        total.innerHTML='';
    }

}
// * create 
var productsItem=[];
if(localStorage.products != null){
    productsItem=JSON.parse(localStorage.products);
}else{
    productsItem=[];
}
function createTable(){
    var newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value !='' && price.value !=''&&taxes.value!=''&&ads.value!=''&&category.value!=''&&count.value <=100){
        if(mood==='create'){
            if(count.value > 1){
                for(var i=0; i < count.value;i++){
                    productsItem.push(newProduct);
                }
            }else{
                productsItem.push(newProduct);
            }
        }else{
            productsItem[tmp]=newProduct;
            mood='create';
            count.style.display='block';
            create.innerHTML='Create'
            showData();
        }
        clearInput()

    }
    localStorage.setItem('products',JSON.stringify(productsItem));
    showData()
    showBtnDeleteAll()
}
// * clear data from input
function clearInput(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    calcTotal();
}

// * show data in Table
showData()
function showData(){
    var table=''
    for(var i=0;i<productsItem.length;i++){
        table+=`
        <tr>
                <td>${i+1}</td>
                <td>${productsItem[i].title}</td>
                <td>${productsItem[i].price}</td>
                <td>${productsItem[i].taxes}</td>
                <td>${productsItem[i].ads}</td>
                <td>${productsItem[i].discount}</td>
                <td>${productsItem[i].total}</td>
                <td>${productsItem[i].category}</td>
                <td><button class="btn btn-warning" id="update" onclick="updateData(${i})">update</button></td>
                <td><button class="btn btn-danger" id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('table').innerHTML=table;
    showBtnDeleteAll()
}
// * Delete data in table
function deleteData(e){
    productsItem.splice(e,1);
    localStorage.products=JSON.stringify(productsItem);
    showData();
}
// * Delete All data in table
function deleteAll(){
    productsItem.splice(0);
    localStorage.products=JSON.stringify(productsItem);
    showData()
}
// *show Button Delete All
showBtnDeleteAll()
function showBtnDeleteAll(){
    var btn=document.getElementById('deleteAll');
    if(productsItem.length > 0){
        btn.innerHTML=`<button class="btn btn-success w-100" id="deleteAll" onclick=" deleteAll()">Delete All (${productsItem.length})</button>`
    }else{
        btn.innerHTML='';
    }
}
// * Update data in table
function updateData(e){
    title.value=productsItem[e].title;
    price.value=productsItem[e].price;
    taxes.value=productsItem[e].taxes;
    ads.value=productsItem[e].ads;
    discount.value=productsItem[e].discount;
    category.value=productsItem[e].category;
    total.innerHTML=productsItem[e].total;
    calcTotal();
    count.style.display='none';
    create.innerHTML='update'
    mood='update'
    tmp=e;
    scroll({
        top:0,
        behavior:"smooth",
    });
}

// * search item
let searchMood='title';
function getSearchMood(id){
    var search=document.getElementById('search');
    if(id=="search-title"){
        searchMood='title';
    }else{
        searchMood='category';
    }
    search.placeholder='Search By '+searchMood;
    search.focus()
    search.value=''
    showData()
}
function searchData(e){
    var table='';
    for(var i=0; i < productsItem.length; i++){

    if(searchMood=='title'){
            if(productsItem[i].title.includes(e.toLowerCase())){
                table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${productsItem[i].title}</td>
                    <td>${productsItem[i].price}</td>
                    <td>${productsItem[i].taxes}</td>
                    <td>${productsItem[i].ads}</td>
                    <td>${productsItem[i].discount}</td>
                    <td>${productsItem[i].total}</td>
                    <td>${productsItem[i].category}</td>
                    <td><button class="btn btn-warning" id="update" onclick="updateData(${i})">update</button></td>
                    <td><button class="btn btn-danger" id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>
                `
            document.getElementById('table').innerHTML=table;
            }
        
    }else{
        
            if(productsItem[i].category.includes(e.toLowerCase())){
                table +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${productsItem[i].title}</td>
                    <td>${productsItem[i].price}</td>
                    <td>${productsItem[i].taxes}</td>
                    <td>${productsItem[i].ads}</td>
                    <td>${productsItem[i].discount}</td>
                    <td>${productsItem[i].total}</td>
                    <td>${productsItem[i].category}</td>
                    <td><button class="btn btn-warning" id="update" onclick="updateData(${i})">update</button></td>
                    <td><button class="btn btn-danger" id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>
                `
            document.getElementById('table').innerHTML=table;
            }
        
    }
}
    document.getElementById('table').innerHTML=table;
}