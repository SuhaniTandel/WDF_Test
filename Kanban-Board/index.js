let boardData = { todo: [], inProgress: [], done: [] };
let currentColumn = null;

const renderBoard = () => {
  Object.keys(boardData).forEach((column) => {
    const columnCards = document.getElementById(`${column}-cards`);
    columnCards.innerHTML = boardData[column]
      .map(
        (card, index) => `
        <div class="card" draggable="true" ondragstart="drag(event, '${column}', ${index})">
          <span>${card.title}</span>
          <span class="card-label ${card.priority}">${card.priority}</span>
        </div>
      `
      )
      .join("");
  });
};

const openCardForm = (column) => {
  currentColumn = column;
  document.getElementById("cardModal").style.display = "flex";
  document.getElementById("cardTitle").value = "";
  document.getElementById("cardLabel").value = "low";
};

const closeModal = () => {
  document.getElementById("cardModal").style.display = "none";
};

const saveCard = () => {
  const title = document.getElementById("cardTitle").value;
  const priority = document.getElementById("cardLabel").value;

  if (title.trim() === "") return alert("Card title is required!");

  boardData[currentColumn].push({ title, priority });
  closeModal();
  renderBoard();
};

const drag = (event, column, index) => {
  event.dataTransfer.setData("column", column);
  event.dataTransfer.setData("index", index);
};

const allowDrop = (event) => event.preventDefault();

const drop = (event, targetColumn) => {
  const sourceColumn = event.dataTransfer.getData("column");
  const cardIndex = event.dataTransfer.getData("index");

  const card = boardData[sourceColumn].splice(cardIndex, 1)[0];
  boardData[targetColumn].push(card);

  renderBoard();
};

renderBoard();
