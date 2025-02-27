// make the logic for check box
const checkbox = document.querySelector(".checkbox");
const applicantBox = document.querySelector(".balanceType");
const balancebox = document.querySelector("#balancebox");
const balancetypebox = document.querySelector("#balancetypebox");
let Room_Information;

// form infromations
const formInfo = document.querySelectorAll('input');
formInfo.forEach((element)=>{
    element.addEventListener('change',collectInfo);
})

function collectInfo(event){
    Room_Information = {
        ...Room_Information,
        [event.target.name] : event.target.value
    }
}


function makingBill(){
    // date function
    let presentDate = new Date();
    let month = presentDate.getMonth();
    let date = presentDate.getDate();
    let year = presentDate.getFullYear();
    const finalDate = `${date}/${month+1}/${year}`;
    let room_bill = parseInt(Room_Information.presentmonth - Room_Information.pastmonth)*9;
    let lobby_bill = parseInt(Math.round(((Room_Information.presentlobby-Room_Information.pastlobby)/4)*9));
    let room_rent = parseInt(Room_Information.rent);
    if(checkbox.checked && applicantBox.checked){
        const room_balance = parseInt(Room_Information.balance);
        totalAmount = (room_rent + room_bill + lobby_bill) - room_balance;
    }
    
    else if(checkbox.checked){
        const room_balance = parseInt(Room_Information.balance);
        totalAmount = (room_rent + room_bill + lobby_bill) + room_balance;
    }
    
    else{
        totalAmount = room_rent + room_bill + lobby_bill;
    }

    const billbox = document.createElement("div");
    billbox.innerHTML=`<div class="slip">
        <h1>Your Monthly Room Bill</h1>
        <span class="date">${finalDate}</span>
        <span class="username">${Room_Information.username} Your Room Bill :- </span>
        <p>Pichhle Mahine Ki Room Reading :- ${Room_Information.pastmonth}</p>
        <p>Iss Mahine Ki Room Reading :- ${Room_Information.presentmonth}</p>
        <p>Your Room Bills Is :- ${room_bill}</p>
        <p>Pichhle Mahine Ki Lobby Reeading :- ${Room_Information.pastlobby}</p>
        <p>Iss Mahine Ki Lobby Reading :- ${Room_Information.presentlobby}</p>
        <p>Your Lobby Bills Is :- ${lobby_bill}</p>
        <p>Your Room Rent Is :- ${room_rent}</p>
        ${checkbox.checked ? `<p>Apka Pendding Balance Is :- ${Room_Information.balance}<p/>`:''}
        <h2>Your Total Amount Is :- ${totalAmount}</h2>
        <button id="screenshotBtn">Take ScreenShot</button>
    </div>`;
    return billbox;
}

// function to submit
const calculate = document.querySelector(".Calculate");
calculate.addEventListener('click',(event)=>{
    const body = document.querySelector("body");
    event.preventDefault();
    const BillSlip = makingBill();
    body.appendChild(BillSlip);
    if(BillSlip){
        document.getElementById('screenshotBtn').addEventListener('click', function() { html2canvas(document.querySelector(".slip"), { onrendered: function(canvas) { var imgData = canvas.toDataURL(); var link = document.createElement('a'); link.href = imgData; link.download = 'screenshot.png'; link.click(); } }); });
    }
})


//check box here
checkbox.addEventListener('click',(event)=>{
    if(event.target.checked){
        balancebox.style.display = "block";
        balancetypebox.style.display = "block";
    }
    else{
        balancebox.style.display = "none";
        balancetypebox.style.display = "none";
    }
})
