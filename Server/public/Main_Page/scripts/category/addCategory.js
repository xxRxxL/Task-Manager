document.getElementById('add_button').addEventListener('click', addCategory);

async function addCategory(){
    const response = await fetch('/main/category', { method: 'POST' });

    const data = await response.json();
    if(response.ok){
        if(response.status == 500){
            console.log('ERROR: ' + data.message + '\n\n' + data.error);
            alert('Something went wrong, restart?');
            return;
        }
    }
    const property = data.category;

    // Parent
    const container = document.getElementById('cat_content');
    
    // New Div
    const newCategory = document.createElement('div');
    newCategory.className = 'cat_list';
    newCategory.setAttribute('data-category-id', property.id);
    newCategory.setAttribute('id', property.id);
    
    // New Menu (right click)
    const newMenu = document.createElement('div');
    newMenu.className = 'hidden-menu'
    newMenu.id = `menu_${property.id}`
    newMenu.innerHTML = 
        `<ul>
            <li onclick="editCategory('${property.id}')">Edit Title</li>
            <li onclick="chooseColor('${property.id}')">Change Color</li>
            <li onclick="deleteCategory(event, '${property.id}')">Delete Category</li>
        </ul>`
    ;

    // New Status Color
    const newStatus = document.createElement('span');
    newStatus.className = 'cat_status';
    newStatus.style.backgroundColor = property.color;

    // New Color Picker
    const newColorPicker = document.createElement('input');
    newColorPicker.className = 'color_picker';
    newColorPicker.setAttribute('type', 'color');
    
    // New Title
    const newTitle = document.createElement('h1');
    newTitle.className = 'cat_title';
    newTitle.textContent = property.title;
    
    newCategory.appendChild(newStatus);
    newCategory.appendChild(newColorPicker);
    newCategory.appendChild(newTitle);
    newCategory.appendChild(newMenu);
    container.appendChild(newCategory);

    // Functions
    newCategory.addEventListener('contextmenu', ()=>{showMenu_Category(event, property.id)})
    newCategory.addEventListener('click', ()=>{selectCategory(property.id, property.color)})
    newCategory.addEventListener('dblclick', ()=> {editCategory(property.id)});
    newColorPicker.addEventListener('click', ()=>{chooseColor(property.id)});
    

    // Immediately on edit mode
    selectCategory(property.id, property.color);
    editCategory(property.id);
}