
const imageUrls = [
    "https://cdn.discordapp.com/attachments/923714309232660480/963485939584368740/unknown.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963485828854710302/unknown.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963485626483761152/unknown.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963484946926809148/unknown.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963485222962344017/unknown.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963486753942016010/unknown.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963485416865030175/unknown.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963486094157021224/unknown.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963488623355904000/unknown.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963482798050656266/2022-04-12_2.png",
    "https://cdn.discordapp.com/attachments/923714309232660480/963482207815618590/2022-04-12.png",
    "https://cdn.discordapp.com/attachments/968191708120633384/968195722400907344/unknown.png",
    "https://cdn.discordapp.com/attachments/968191708120633384/968196218637410324/unknown.png",
    "https://cdn.discordapp.com/attachments/968191708120633384/968198218007609385/unknown.png"

];

function addImages() {
    var imagescontainer = document.getElementById("galleryImagesContainer");
    var rows = imagescontainer.getElementsByClassName("row");
    var firstRow = rows[0];
    const numColumns = 4;
    const numImagePerColumn = imageUrls.length / numColumns;
    var columns = [];

    for (let i = 0; i<numColumns; i++) {
        let column = addColumnToRow(firstRow);
        columns.push(column);
    }
    for (let i = 0; i<imageUrls.length; i++){
        const imageUrl = imageUrls[i];
        const columnNumber = Math.floor(i / numImagePerColumn);
        addImageToColumn(columns[columnNumber], imageUrl);
    }    
}
function addColumnToRow(row) {
    let column = document.createElement("div");

    column.classList.add("column");
    row.appendChild(column);
    return column;
}

function addImageToColumn(column, imageUrl) {
    let image = document.createElement("img");
    image.src = imageUrl;
    column.appendChild(image);
}