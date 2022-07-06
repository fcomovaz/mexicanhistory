const sheetID = '11nxnpl4AxheUhbiA3-3SULnVPm5r8ZIyNOse0To4s58';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'Sheet1';
const output = document.querySelector('#timeline');
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;


const jsObj = [];

    fetch(url)
    .then(res => res.text())
    .then(rep =>{
        const data = JSON.parse(rep.substring(47).slice(0,-2));
        const colz = [];
        data.table.cols.forEach((heading)=>{
            if(heading.label)colz.push(heading.label.toLowerCase().replace(/\s/g, ''));

            // create the headings of the table with bold
            // const head = document.createElement('th');
            // head.textContent = heading.label;
            // head.style.fontWeight = 'bold';
            // output.append(head);

        })

        
        // here the json is created
        data.table.rows.forEach((main)=>{
            const row = {};
            colz.forEach((ele,ind) => row[ele]= (main.c[ind] != null) ? main.c[ind].v : '')
            jsObj.push(row);
        })

        // ==========================
        // create and fill the data
        // ==========================

        // create a fragment
        const newElement = document.createDocumentFragment();
        

        // iterate in the JSON
        jsObj.forEach((data)=>{
            // create a new li element
            const newli = document.createElement('li');
            // create a new div
            const newdiv = document.createElement('div');
            // add class to new div
            newdiv.classList.add('timeline-content');
            // create a new h2
            const newh2 = document.createElement('h2');
            // create a new p
            const newp = document.createElement('p');

            // console.log(data.name);
            // add the name of the array to the h2
            newh2.textContent = data.name;

            // add the name of the array to the p
            newp.textContent = `${data.name} was alive in ${data.period} period.`;

            // append all childs in order
            newdiv.appendChild(newh2);
            newdiv.appendChild(newp);
            newli.appendChild(newdiv);
            newElement.appendChild(newli);
        })
        // append the fragment to the timeline
        timeline.appendChild(newElement);
    })