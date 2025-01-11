const barsContainer = document.getElementById("bars-container");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const speedSlider = document.getElementById("speed-slider");
const algorithmTitle = document.getElementById("algorithm-title");
const timeComplexity = document.getElementById("time-complexity");
const spaceComplexity = document.getElementById("space-complexity");
const pseudocodeText = document.getElementById("pseudocode-text");

// Parse Query Parameters
const urlParams = new URLSearchParams(window.location.search);
const algorithm = urlParams.get("algorithm");

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  const algorithmData = {
    BubbleSort: {
      title: "Bubble Sort",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      pseudocode: `for i from 0 to N-1
    for j from 0 to N-i-1
      if a[j] > a[j+1]
        swap(a[j], a[j+1])
Color Explanations:
Red: Elements being compared.
Green: Final sorted elements.
Blue: Reset elements.`,
      visualize: bubbleSort,
    },
    SelectionSort: {
      title: "Selection Sort",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      pseudocode: `for i from 0 to N-1
    find the smallest element in the unsorted part
    swap it with the first unsorted element

Color Explanations:
Red: Elements being compared.
Green: Final sorted elements.
Blue: Reset elements.
      `,
      visualize: selectionSort,
    },
    BinarySearch: {
      title: "Binary Search",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      pseudocode: `function binarySearch(array, target):
    left = 0
    right = array.length - 1
    while left <= right:
      mid = (left + right) // 2
      if array[mid] == target:
        return mid
      else if array[mid] < target:
        left = mid + 1
      else:
        right = mid - 1
    return -1

Color Explanations:
Yellow: Current midpoint being evaluated.
Green: Target value found.
Blue: Reset bars after evaluation.`,
      visualize: binarySearch,
    },
    QuickSort: {
      title: "Quick Sort",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(log n)",
      pseudocode: `function quickSort(array, low, high):
    if low < high:
      pivot = partition(array, low, high)
      quickSort(array, low, pivot-1)
      quickSort(array, pivot+1, high)
  function partition(array, low, high):
    pivot = array[high]
    i = low - 1
    for j from low to high-1:
      if array[j] < pivot:
        i++
        swap(array[i], array[j])
    swap(array[i+1], array[high])
    return i+1;

Color Explanations:
Yellow: Pivot element.
Red: Current element being compared.
Green: Sorted part of the array.`,
      visualize: quickSort,
    },
    LinearSearch: {
      title: "Linear Search",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      pseudocode: `function linearSearch(array, target):
    for i from 0 to N-1:
      if array[i] == target:
        return i
    return -1

Color Explanations:
Yellow: Current element being checked.
Green: Target value found.
Blue: Reset bars after evaluation.
     `,
      visualize: linearSearch,
    },
    InsertionSort: {
      title: "Insertion Sort",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      pseudocode: `for i from 1 to N
    key = array[i]
    j = i - 1
    while j >= 0 and array[j] > key
      array[j+1] = array[j]
      j = j - 1
    array[j+1] = key

Color Explanations:
Yellow: Current key element being inserted.
Blue: Reset elements.
      `,
      visualize: insertionSort,
    },
  };
  
  
function initializePage() {
  if (algorithm && algorithmData[algorithm]) {
    const data = algorithmData[algorithm];
    algorithmTitle.textContent = data.title;
    timeComplexity.textContent = data.timeComplexity;
    spaceComplexity.textContent = data.spaceComplexity;
    pseudocodeText.textContent = data.pseudocode;
    generateBars();
  } else {
    algorithmTitle.textContent = "Algorithm Not Found";
  }
}

function generateBars() {
  const array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
  const maxArrayValue = Math.max(...array);

  barsContainer.innerHTML = "";
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${(value / maxArrayValue) * 100}%`;
    bar.style.width = `${100 / array.length}%`;
    barsContainer.appendChild(bar);
  });
  return array;
}

async function bubbleSort(array) {
  const bars = document.querySelectorAll(".bar");
  const delay = 1000 - speedSlider.value;

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${(array[j] / Math.max(...array)) * 100}%`;
        bars[j + 1].style.height = `${(array[j + 1] / Math.max(...array)) * 100}%`;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      bars[j].style.backgroundColor = "#4f46e5";
      bars[j + 1].style.backgroundColor = "#4f46e5";
    }
  }
}
async function insertionSort(array) {
    const bars = document.querySelectorAll(".bar");
    const speed = parseInt(document.getElementById("speed-slider").value);
  
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
  
      bars[i].style.backgroundColor = "yellow"; // Highlight the current element
  
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = `${array[j + 1]}%`;
        bars[j].style.backgroundColor = "red"; // Highlight the compared element
  
        await sleep(speed);
        bars[j].style.backgroundColor = "#4f46e5"; // Reset color
        j--;
      }
      array[j + 1] = key;
      bars[j + 1].style.height = `${key}%`;
  
      bars[i].style.backgroundColor = "#4f46e5"; // Reset color
    }
  }
  
async function selectionSort(array) {
    const bars = document.querySelectorAll(".bar");
    const delay = 1000 - document.getElementById("speed-slider").value;
  
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < array.length; j++) {
        bars[j].style.backgroundColor = "red";
  
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
  
        await new Promise((resolve) => setTimeout(resolve, delay));
        bars[j].style.backgroundColor = "#4f46e5";
      }
  
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        bars[i].style.height = `${(array[i] / Math.max(...array)) * 100}%`;
        bars[minIndex].style.height = `${(array[minIndex] / Math.max(...array)) * 100}%`;
      }
  
      bars[i].style.backgroundColor = "green";
    }
  }


  async function quickSort(array, low = 0, high = array.length - 1) {
    if (low < high) {
      const pivotIndex = await partition(array, low, high);
      await quickSort(array, low, pivotIndex - 1);
      await quickSort(array, pivotIndex + 1, high);
    }
  }
  
  async function partition(array, low, high) {
    const bars = document.querySelectorAll(".bar");
    const speed = parseInt(document.getElementById("speed-slider").value);
  
    let pivot = array[high];
    let i = low - 1;
  
    bars[high].style.backgroundColor = "yellow"; // Highlight pivot
  
    for (let j = low; j < high; j++) {
      bars[j].style.backgroundColor = "red"; // Highlight current element
  
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        bars[i].style.height = `${array[i]}%`;
        bars[j].style.height = `${array[j]}%`;
      }
  
      await sleep(speed);
      bars[j].style.backgroundColor = "#4f46e5"; // Reset current bar
    }
  
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}%`;
    bars[high].style.height = `${array[high]}%`;
    bars[high].style.backgroundColor = "#4f46e5"; // Reset pivot bar
  
    return i + 1;
  }
  


//searching
  async function binarySearch(array, target) {
    const bars = document.getElementsByClassName("bar");
    let left = 0;
    let right = array.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
  
      // Highlight mid
      bars[mid].style.backgroundColor = "yellow";
  
      await sleep(500);
  
      if (array[mid] === target) {
        bars[mid].style.backgroundColor = "green"; // Highlight success
        return mid;
      }
  
      if (array[mid] < target) {
        bars[mid].style.backgroundColor = "#4f46e5"; // Reset color
        left = mid + 1;
      } else {
        bars[mid].style.backgroundColor = "#4f46e5"; // Reset color
        right = mid - 1;
      }
    }
  
    return -1; // Not found
  }


  async function linearSearch(array, target) {
    const bars = document.querySelectorAll(".bar");
    const speed = parseInt(document.getElementById("speed-slider").value);
  
    for (let i = 0; i < array.length; i++) {
      bars[i].style.backgroundColor = "yellow"; // Highlight current bar
  
      if (array[i] === target) {
        bars[i].style.backgroundColor = "green"; // Target found
        return i;
      }
  
      await sleep(speed);
      bars[i].style.backgroundColor = "#4f46e5"; // Reset bar
    }
  
    return -1; // Target not found
  }



  startBtn.addEventListener("click", async () => {
    const array = Array.from(barsContainer.children, (bar) => parseInt(bar.style.height) / 3);
    if (algorithm && algorithmData[algorithm]) {
      await algorithmData[algorithm].visualize(array);
    }
  });

resetBtn.addEventListener("click", generateBars);
initializePage();
