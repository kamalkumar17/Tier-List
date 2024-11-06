let currentDraggedItem;
const tierVal = document.getElementById("tier");
const image_form = document.getElementById("image-form");
const itemContainers = document.getElementsByClassName("item-container");
const tierList = document.querySelectorAll(".tier-list");
const SubmitBtn = document.getElementById("submit");
SubmitBtn.addEventListener("click", (event) => {
    // console.log("button is cliked");
    // console.log(event);
    event.preventDefault(); // stops the default execution behaviour of the event.
    // const target = event.target; // to get access of the element on which this event was fired.
    // console.log(target);
    if (tierVal.value === '') {
        alert("input field is empty");
        return;
    }
    createtierList(tierVal.value);
    tierVal.value = '';

});

for (const itemContainer of itemContainers) {
    setUpDragInTierListItem(itemContainer)
}

// tierListItem.forEach(setUpDropZoneInTierListItem);

image_form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("Form Submit Successfully");
    const imageitemInput = document.getElementById("tier-image");
    const imageUrl = imageitemInput.value;

    createTierListItem(imageUrl);
    imageitemInput.value = '';


})

function createtierList(tierlistname) {
    const newTier_list = document.createElement("div");
    newTier_list.classList.add("tier-list");

    const heading = document.createElement("div");
    heading.classList.add("heading");
    const textContainer=document.createElement("div");
    textContainer.textContent = tierlistname;
    heading.appendChild(textContainer);

    const newtierList_item = document.createElement("div");
    newtierList_item.classList.add("tier-list-item");

    newTier_list.appendChild(heading);
    newTier_list.appendChild(newtierList_item);

    setUpDropZoneInTierListItem(newTier_list);

    const tier_section = document.getElementById("tier-list-section");
    tier_section.appendChild(newTier_list);
}

function createTierListItem(imageUrl) {
    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("draggable", "true");
    imageDiv.classList.add("item-container");

    setUpDragInTierListItem(imageDiv);

    const img = document.createElement("img");
    img.src = imageUrl;

    imageDiv.appendChild(img);

    const non_tier_section = document.getElementById("non-tier-section");
    non_tier_section.appendChild(imageDiv);

}

function setUpDragInTierListItem(itemContainer) {
    itemContainer.addEventListener('dragstart', (event) => {
        currentDraggedItem = event.target.parentNode;

    });

    itemContainer.addEventListener('dblclick', (event) => {
        const parentNode = event.target.parentNode;
        const non_tier_section = document.getElementById("non-tier-section");
        non_tier_section.appendChild(parentNode);
    });
}

function setUpDropZoneInTierListItem(tierListitem) {
    tierListitem.addEventListener('drop', (event) => {
        event.preventDefault();
    });

    tierListitem.addEventListener('dragover', function (event) {
        console.log("dropped");
        if (this !== currentDraggedItem.parentNode) {
            this.appendChild(currentDraggedItem);
        }
    });
}