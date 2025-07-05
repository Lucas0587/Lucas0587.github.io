let csvData = [];

let currentSeason = null;
let currentPlace = null;

// 为季节的 radio 按钮添加事件监听器
document.querySelectorAll('input[name="season"]').forEach(radio => {
  radio.addEventListener('change', () => {
    currentSeason = document.querySelector('input[name="season"]:checked').value;
    if (currentPlace) {
      filterByBoth(currentSeason, currentPlace);
    }
  });
});

// 为地点的 radio 按钮添加事件监听器
document.querySelectorAll('input[name="place"]').forEach(radio => {
  radio.addEventListener('change', () => {
    currentPlace = document.querySelector('input[name="place"]:checked').value;
    if (currentSeason) {
      filterByBoth(currentSeason, currentPlace);
    }
  });
});

// 组合筛选函数
function filterByBoth(season, place) {
  console.log("组合筛选：季节 =", season, "地点 =", place);
	filterSeason(season, place)
}

async function fetchCSV() {
	try {
		const response = await fetch('fish.csv'); // 替换为你的 CSV 文件路径
		const csvContent = await response.text();
		csvData = parseCSV(csvContent);
		displayCSV(csvData);
	} catch (error) {
		console.error('Failed to fetch CSV file:', error);
		document.getElementById('csvcontent').innerText = 'Failed to load CSV file';
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
		 row.forEach((cell, index) => {
			const td = document.createElement('td');
			if (index === 0) { // 第一列是图片地址
				const img = document.createElement('img');
				img.src = cell;
				img.alt = 'Image';
				td.appendChild(img);
			} else {
				td.textContent = cell;
			}
			 if (index > 2 && index < 7){
				 td.style.width = '3%';
				 td.style.textAlign = 'center';
			 }
			 td.style.border = '1px solid #0ff';
			tr.appendChild(td);
		});
		table.appendChild(tr);
	});
	document.getElementById('csvcontent').innerHTML = '';
	document.getElementById('csvcontent').appendChild(table);
	table.style.border = '2px solid #000';
	table.style.borderCollapse = 'collapse';
	console.log(222)
}

function filterSeason(season,place) {
	const seasonIndex = 9;
	const placeIndex = 7;
	let  filterData = csvData;
	if (season != "any"){
		filterData = csvData.filter(row => row[seasonIndex].includes(season) || row[seasonIndex] === "任意季节");
	};
	let  filteredData = filterData;
	if (place != "any"){
		filteredData = filterData.filter(row => row[placeIndex].includes(place));
	};
	
	filteredData.sort((a, b) => {return b[6] - a[6];});
	console.log(filteredData)
	displayCSV(filteredData);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('file-input').addEventListener('change', handleFileUpload);
});

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        console.error('No file selected');
        return;
    }

    try {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const csvContent = e.target.result;
            csvData = parseCSV(csvContent);
            console.log(csvData);
            displayCSV(csvData);
        };
        reader.readAsText(file);
    } catch (error) {
        console.error('Failed to read CSV file:', error);
        document.getElementById('csvcontent').innerText = 'Failed to load CSV file';
    }
}

// 自动加载 CSV 文件
fetchCSV();