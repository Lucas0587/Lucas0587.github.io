let csvData = [];

async function fetchCSV() {
	try {
		const response = await fetch('fish.csv'); // 替换为你的 CSV 文件路径
		const csvContent = await response.text();
		csvData = parseCSV(csvContent);
		displayCSV(csvData);
	} catch (error) {
		console.error('Failed to fetch CSV file:', error);
		document.getElementById('csv-content').innerText = 'Failed to load CSV file';
	}
}

function parseCSV(csvContent) {
	const rows = csvContent.split('\n');
	return rows.map(row => row.split(',').map(cell => cell.trim()));
}

function displayCSV(data) {
	const table = document.createElement('table');
	data.forEach(row => {
		const tr = document.createElement('tr');
		row.forEach(cell => {
			const td = document.createElement('td');
			if (row[0] === 'Image') { // 第一列是图片地址
				const img = document.createElement('img');
				img.src = cell;
				img.alt = 'Image';
				td.appendChild(img);
			} else {
				td.textContent = cell;
			}
			tr.appendChild(td);
		});
		table.appendChild(tr);
	});
	document.getElementById('csv-content').innerHTML = '';
	document.getElementById('csv-content').appendChild(table);
}

function filterSeason(season) {
	const seasonIndex = 9; // 假设季节列是第十列
	const filteredData = csvData.filter(row => row[seasonIndex].toLowerCase() === season);
	displayCSV(filteredData);
}

// 自动加载 CSV 文件
fetchCSV();