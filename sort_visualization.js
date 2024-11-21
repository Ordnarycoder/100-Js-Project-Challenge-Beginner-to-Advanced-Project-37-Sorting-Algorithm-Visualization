const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

context.fillStyle = "blue";
context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

function draw(arr) {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "white";

    // Base Line
    context.beginPath();
    context.moveTo(0, canvas.height - 100);
    context.lineTo(canvas.width, canvas.height - 100);
    context.stroke();
    context.restore();

    // Drawing bars
    context.fillStyle = "white";
    for (let i = 0; i < arr.length; i++) {
        context.fillRect(100 + 7 * i, canvas.height - 100, 5, -5 * arr[i]);
    }
}

// Generate a random array
function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

// Sorting functions with rendering
async function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                draw(arr);
                await new Promise((r) => setTimeout(r, 50)); // Animation delay
            }
        }
    }
}

async function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            draw(arr);
            await new Promise((r) => setTimeout(r, 50));
        }
    }
}

async function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        draw(arr);
        await new Promise((r) => setTimeout(r, 50));
    }
}

// Initial setup
let arr = generateRandomArray(50);
draw(arr);

// Event listeners for buttons
document.getElementById("bubbleSortBtn").addEventListener("click", () => bubbleSort([...arr]));
document.getElementById("selectionSortBtn").addEventListener("click", () => selectionSort([...arr]));
document.getElementById("insertionSortBtn").addEventListener("click", () => insertionSort([...arr]));
