    //json for data
    const orderData={
        "orders": [
          {
            "id": 1,
            "customer": "kung fu panda",
            "customerImage": "images/Zinzu Chan Lee.jpg",
            "location": "Seoul",
            "order_date": "17 Dec, 2022",
            "status": "Delivered",
            "amount": 128.90
          },
          {
            "id": 2,
            "customer": "Iqbaal kaadri",
            "customerImage": "images/Jeet Saru.jpg",
            "location": "Kazakistan",
            "order_date": "27 Aug, 2023",
            "status": "Cancelled",
            "amount": 150.1
          },
          {
            "id": 3,
            "customer": "chitti 4.0",
            "customerImage": "images/Sonal Gharti.jpg",
            "location": "Kotyo",
            "order_date": "14 Mar, 2023",
            "status": "Shipped",
            "amount": 210.40
          },
          {
            "id": 4,
            "customer": "100Rabh",
            "customerImage": "images/Alson GC.jpg",
            "location": "New Delhi",
            "order_date": "25 May, 2023",
            "status": "Delivered",
            "amount": 149.70
          },
          {
            "id": 5,
            "customer": "Mr.chikna",
            "customerImage": "images/Sarita Limbu.jpg",
            "location": "NalaSopara",
            "order_date": "23 Apr, 2023",
            "status": "Pending",
            "amount": 399.99
          },
          {
            "id": 6,
            "customer": "kala Jadu",
            "customerImage": "images/Alex Gonley.jpg",
            "location": "Bihar",
            "order_date": "23 Apr, 2023",
            "status": "Cancelled",
            "amount": 399.99
          },
          {
            "id": 7,
            "customer": "Babu Rao",
            "customerImage": "images/Alson GC.jpg",
            "location": "Panvel",
            "order_date": "20 May, 2023",
            "status": "Delivered",
            "amount": 399.99
          },
          {
            "id": 8,
            "customer": "Mr. Jaiswal",
            "customerImage": "images/Alex Gonley.jpg",
            "location": "PadosKiGali",
            "order_date": "30 Feb, 2023",
            "status": "Pending",
            "amount": 149.70
          },
          {
            "id": 9,
            "customer": "Jitu",
            "customerImage": "images/Alex Gonley.jpg",
            "location": "DhakkaMatMaar",
            "order_date": "22 Dec, 2023",
            "status": "Cancelled",
            "amount": 249.99
          },
          {
            "id": 10,
            "customer": "Mr. NeendoMe",
            "customerImage": "images/Sarita Limbu.jpg",
            "location": "PicheWaliGali",
            "order_date": "22 Dec, 2023",
            "status": "Cancelled",
            "amount": 249.99
          },
          {
            "id": 11,
            "customer": "AajNhiPadhunga",
            "customerImage": "images/Alex Gonley.jpg",
            "location": "AalasPur",
            "order_date": "22 Dec, 2023",
            "status": "Cancelled",
            "amount": 249.99
          },
          {
            "id": 12,
            "customer": "KalKonsaPadha",
            "customerImage": "images/Alex Gonley.jpg",
            "location": "ChupReNeBhai",
            "order_date": "22 Dec, 2023",
            "status": "Cancelled",
            "amount": 249.99
          },
          {
            "id": 13,
            "customer": "TerkoKya",
            "customerImage": "images/Alex Gonley.jpg",
            "location": "MeNhiBataunga",
            "order_date": "22 Dec, 2023",
            "status": "Cancelled",
            "amount": 249.99
          }
        ]
      }
      
    function generateTableRows(data) {
        const tableBody = document.getElementById('tableBody');

        data.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td><img src="${order.customerImage}" alt="">${order.customer}</td>
                <td>${order.location}</td>
                <td>${order.order_date}</td>
                <td>
                    <p class="status ${order.status.toLowerCase()}">${order.status}</p>
                </td>
                <td><strong>${order.amount.toFixed(2)}</strong></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Initialize the table with the JSON data
    generateTableRows(orderData.orders);


    const search = document.querySelector('.input-group input'),
        table_rows = document.querySelectorAll('tbody tr'),
        table_headings = document.querySelectorAll('thead th');

    // 1. Searching for specific data of HTML table
    search.addEventListener('input', searchTable);

    function searchTable() {
        table_rows.forEach((row, i) => {
            let table_data = row.textContent.toLowerCase(),
                search_data = search.value.toLowerCase();

            row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
            row.style.setProperty('--delay', i / 25 + 's');
        })

        document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
            visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
        });
    }



    // 2. Sorting | Ordering data of HTML table

    table_headings.forEach((head, i) => {
        let sort_asc = true;
        head.onclick = () => {
            table_headings.forEach(head => head.classList.remove('active'));
            head.classList.add('active');

            document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
            table_rows.forEach(row => {
                row.querySelectorAll('td')[i].classList.add('active');
            })

            head.classList.toggle('asc', sort_asc);
            sort_asc = head.classList.contains('asc') ? false : true;

            sortTable(i, sort_asc);
        }
    })

    
 function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.trim(),
            second_row = b.querySelectorAll('td')[column].textContent.trim();

        // Check if the content is a number
        const isNumber = !isNaN(parseFloat(first_row)) && !isNaN(parseFloat(second_row));
        if (isNumber) {
            first_row = parseFloat(first_row);
            second_row = parseFloat(second_row);
        }

        // Compare the values
        if (sort_asc) {
            return isNumber ? first_row - second_row : first_row.localeCompare(second_row);
        } else {
            return isNumber ? second_row - first_row : second_row.localeCompare(first_row);
        }
    })
    .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

    

    // 3. Converting HTML table to PDF

    const pdf_btn = document.querySelector('#toPDF');
    const customers_table = document.querySelector('#customers_table');


    const toPDF = function (customers_table) {
        const html_code = `
        <!DOCTYPE html>
        <link rel="stylesheet" type="text/css" href="style.css">
        <main class="table" id="customers_table">${customers_table.innerHTML}</main>`;

        const new_window = window.open();
        new_window.document.write(html_code);

        setTimeout(() => {
            new_window.print();
            new_window.close();
        }, 400);
    }

    pdf_btn.onclick = () => {
        toPDF(customers_table);
    }

    // 4. Converting HTML table to JSON

    const json_btn = document.querySelector('#toJSON');

    const toJSON = function (table) {
        let table_data = [],
            t_head = [],

            t_headings = table.querySelectorAll('th'),
            t_rows = table.querySelectorAll('tbody tr');

        for (let t_heading of t_headings) {
            let actual_head = t_heading.textContent.trim().split(' ');

            t_head.push(actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase());
        }

        t_rows.forEach(row => {
            const row_object = {},
                t_cells = row.querySelectorAll('td');

            t_cells.forEach((t_cell, cell_index) => {
                const img = t_cell.querySelector('img');
                if (img) {
                    row_object['customer image'] = decodeURIComponent(img.src);
                }
                row_object[t_head[cell_index]] = t_cell.textContent.trim();
            })
            table_data.push(row_object);
        })

        return JSON.stringify(table_data, null, 4);
    }

    json_btn.onclick = () => {
        const json = toJSON(customers_table);
        downloadFile(json, 'json')
    }

    // 5. Converting HTML table to CSV File

    const csv_btn = document.querySelector('#toCSV');

    const toCSV = function (table) {
        // Code For SIMPLE TABLE
        // const t_rows = table.querySelectorAll('tr');
        // return [...t_rows].map(row => {
        //     const cells = row.querySelectorAll('th, td');
        //     return [...cells].map(cell => cell.textContent.trim()).join(',');
        // }).join('\n');

        const t_heads = table.querySelectorAll('th'),
            tbody_rows = table.querySelectorAll('tbody tr');

        const headings = [...t_heads].map(head => {
            let actual_head = head.textContent.trim().split(' ');
            return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
        }).join(',') + ',' + 'image name';

        const table_data = [...tbody_rows].map(row => {
            const cells = row.querySelectorAll('td'),
                img = decodeURIComponent(row.querySelector('img').src),
                data_without_img = [...cells].map(cell => cell.textContent.replace(/,/g, ".").trim()).join(',');

            return data_without_img + ',' + img;
        }).join('\n');

        return headings + '\n' + table_data;
    }

    csv_btn.onclick = () => {
        const csv = toCSV(customers_table);
        downloadFile(csv, 'csv', 'customer orders');
    }

    // 6. Converting HTML table to EXCEL File

    const excel_btn = document.querySelector('#toEXCEL');

    const toExcel = function (table) {
        // Code For SIMPLE TABLE
        // const t_rows = table.querySelectorAll('tr');
        // return [...t_rows].map(row => {
        //     const cells = row.querySelectorAll('th, td');
        //     return [...cells].map(cell => cell.textContent.trim()).join('\t');
        // }).join('\n');

        const t_heads = table.querySelectorAll('th'),
            tbody_rows = table.querySelectorAll('tbody tr');

        const headings = [...t_heads].map(head => {
            let actual_head = head.textContent.trim().split(' ');
            return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
        }).join('\t') + '\t' + 'image name';

        const table_data = [...tbody_rows].map(row => {
            const cells = row.querySelectorAll('td'),
                img = decodeURIComponent(row.querySelector('img').src),
                data_without_img = [...cells].map(cell => cell.textContent.trim()).join('\t');

            return data_without_img + '\t' + img;
        }).join('\n');

        return headings + '\n' + table_data;
    }

    excel_btn.onclick = () => {
        const excel = toExcel(customers_table);
        downloadFile(excel, 'excel');
    }

    const downloadFile = function (data, fileType, fileName = '') {
        const a = document.createElement('a');
        a.download = fileName;
        const mime_types = {
            'json': 'application/json',
            'csv': 'text/csv',
            'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }
        a.href = `
            data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
        `;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
