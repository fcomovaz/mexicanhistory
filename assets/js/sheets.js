// Define the sheet ID, base URL and sheet name constants
const sheetID = '11nxnpl4AxheUhbiA3-3SULnVPm5r8ZIyNOse0To4s58';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'Sheet1';

// Define the output element
const output = document.querySelector('#timeline');

// Define the query string
const query = encodeURIComponent('SELECT *');

// Create the URL by concatenating the base, sheet name and query
const url = `${base}&sheet=${sheetName}&tq=${query}`;

// Define an empty array to store the data
const dataArr = [];

// Fetch the data from the Google Sheet
fetch(url)
    .then(res => res.text())
    .then(responseText => {
        // Parse the response text to JSON format
        const rawData = JSON.parse(responseText.substring(47).slice(0, -2));

        // Extract the column headings from the data
        const headings = rawData.table.cols.map(heading => heading.label.toLowerCase().replace(/\s/g, ''));

        // Extract the data from the rows and store in an object
        rawData.table.rows.forEach(row => {
            const data = {};
            headings.forEach((heading, index) => data[heading] = (row.c[index] != null) ? row.c[index].v : '');
            dataArr.push(data);
        });

        // Create a document fragment to hold the timeline elements
        const timelineFrag = document.createDocumentFragment();

        // Loop through each data object and create the timeline elements
        dataArr.forEach(data => {
            // Create the timeline content div
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('cd-timeline__content', 'text-component');

            // Create the title heading element
            const title = document.createElement('h2');
            title.textContent = data.name;

            // Create the period paragraph element
            const periodPara = document.createElement('p');
            periodPara.classList.add('color-contrast-medium');
            periodPara.textContent = data.period;

            // Create the info paragraph element
            const infoPara = document.createElement('p');
            infoPara.textContent = `${data.name} was alive in ${data.period} period.`;

            // Create the info container div
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('flex', 'justify-between', 'items-center');

            // Append the info paragraph to the info container div
            infoDiv.appendChild(infoPara);

            // Append the title, period paragraph, and info container div to the timeline content div
            contentDiv.appendChild(title);
            contentDiv.appendChild(periodPara);
            contentDiv.appendChild(infoDiv);

            // Create the timeline block div
            const blockDiv = document.createElement('div');
            blockDiv.classList.add('cd-timeline__block');

            // Create the timeline image div and img
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('cd-timeline__img', 'cd-timeline__img--picture');
            // const img = document.createElement('img');
            // img.src = 'assets/img/cd-icon-picture.svg';
            // img.alt = 'Picture';

            // // Append the img to the image div and the image div to the block div
            // imgDiv.appendChild(img);
            blockDiv.appendChild(imgDiv);

            // Append the timeline content div to the block div
            blockDiv.appendChild(contentDiv);

            // Append the timeline block div to the document fragment
            timelineFrag.appendChild(blockDiv);

        });

        // get the container element to append the generated elements
        const containerEl = document.querySelector('.cd-timeline__container');

        // append the fragment to the timeline container element
        containerEl.appendChild(timelineFrag);

    })