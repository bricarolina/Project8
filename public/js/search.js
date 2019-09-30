/*Used on the book listing page, to add a search bar which will take in user input and display
 only books atching the user search. Will also handle pagination of results*/

 /*CONST  DECLARATIONS*/

 const bookRows = document.querySelectorAll("tbody tr");
 const searchBarParent = document.querySelector("#search-parent");
 const bodyElement = document.querySelector("body");
 
 /*FUNCTIONS SECTION*/
 
 /*Hides all elements in a given array*/
 function hideAllElements(array) {
         for(element of array) {
                 element.hidden = true;
         };
 };
 
 /*Show first 10 books*/
 function showFirstBooks(array) {
         hideAllElements(array);
         for (let index = 0; index < 10; index += 1) {
                 if (array[index] !== undefined) {
                         array[index].hidden = false;
                 };
         };
 };
 
 /*check if all items in an array are hidden,
 then unhides an element, such as a message
 if all items are hidden*/
 function isAllHidden(array, elementToUnhide) {
         let countHidden = 0;
         for (let index = 0; index < array.length; index++) {
                 if (array[index].hidden === true) {
                         countHidden++;
                 };
         };
         if (countHidden === array.length) {
                 elementToUnhide.hidden = false;
         };
 };
 
 /*Paginate books into pages of 10. 
 Create links to represent the number of books divided by 10
 */
 function paginateBooks(array) {
         
         /*Creates the pagintion links used to page through books */
         function createPaginationLinks() {
                 const pagLinkDivInitial = document.getElementById('pagination-link-div');
                 if(pagLinkDivInitial) {
                         bodyElement.removeChild(bodyElement.lastElementChild);
                 };
 
                 const numLinksRequired = Math.ceil((array.length / 10));
 
                 const linkDiv = document.createElement('div');
                 linkDiv.id = 'pagination-link-div';
                 bodyElement.appendChild(linkDiv);
 
                 const pagLinkUl = document.createElement('ul');
 
                 for (let index = 0; index < numLinksRequired; index++) {
                         const pagLinkLi = document.createElement('li');
                         const anchorTag = document.createElement('a');
                         anchorTag.className = 'pagination-anchor';
                         anchorTag.innerText = index + 1;
                         anchorTag.href = "#";
                         
                         if(index === 0 ){
                                 anchorTag.className += ' active-anchor';
                         };
 
                         pagLinkLi.appendChild(anchorTag);
                         pagLinkUl.appendChild(pagLinkLi);
                 };
                 const pagLinkDiv = document.getElementById('pagination-link-div');
 
                 pagLinkDiv.appendChild(pagLinkUl);
         };
 
         /*Handles the pagination of books as per clicked pagination links
         */
         function paginationHandlers() {
                 const paginationAnchors = document.querySelectorAll('.pagination-anchor');
                 for(anchor of paginationAnchors) {
                         anchor.addEventListener('click', (event) => {
                                 hideAllElements(array);
                                 const clickedAnchorTagNumber = parseInt(event.target.innerText);
 
                                 for (anchor of paginationAnchors) {
                                         anchor.className = 'pagination-anchor';
                                         if (anchor.innerText === event.target.innerText) {
                                                 anchor.className = 'pagination-anchor active-anchor'
                                         }
                                 };
 
                                 //These two "Determinates" are the numbers that define the bounds between which students in {array} should be visible.
                                 const lowStudentDeterminate = ((clickedAnchorTagNumber - 1) * 10);
                                 const highStudentDeterminate = (clickedAnchorTagNumber * 10);
 
                                 //sets the hidden property of the students defined by the low and high student determinates, to false.
                                 for (let index = 0; index < array.length; index += 1) {
                                         if (index >= lowStudentDeterminate && index < highStudentDeterminate) {
                                         array[index].hidden = false;
                                         };
                                 };
                         });
                 };
         };
 
         createPaginationLinks();
         paginationHandlers()
 };
 
 
 /*Append search input and button to parent element
 @param - (parent) - Element to append search features to
 */
 function appendSearch(parent) {
         const searchInput = document.createElement('input');
         const searchButton = document.createElement('input');
         const searchFailMessage = document.createElement('span');
 
         searchInput.id = 'search-input';
         searchButton.id = 'search-button';
         searchFailMessage.id = 'fail-message';
 
         searchInput.type = "text";
         searchInput.placeholder = "Search for a book...";
         searchInput.value = '';
 
         searchFailMessage.textContent = "No results found";
         searchFailMessage.hidden = 'true';
         
         searchButton.type = "submit";
         searchButton.value = "Search";
 
         parent.appendChild(searchButton);
         parent.appendChild(searchInput);
         parent.appendChild(searchFailMessage);
 };
 
 /*Iterate over all books rows, and display those who match user input 
 @params - (userField) - input field for user search
 @params - (searchButton) - button to commence search
 */
 function initiateSearch() {
         /*Adds event listeners to of a type to an element
         @param - (eventType) - the type of event to listen for
         @param - (listenTo) - the element to attach the listener to
         */
         function eventListener(eventType, listenTo) {
                 listenTo.addEventListener(eventType, () => {
                         const userQuery = searchInput.value.toLowerCase();
 
                         /*Checks if userQuery is present in any cell of each row
                         then displays only rows with matches.
                         @param = (cells) - the cells array from each row.
                         */
                         function ifCellsInclude(cells) {
                                 if (cells[0].innerText.toLowerCase().includes(userQuery) ||
                                     cells[1].innerText.toLowerCase().includes(userQuery) ||
                                     cells[2].innerText.toLowerCase().includes(userQuery) ||
                                     cells[3].innerText.toLowerCase().includes(userQuery)) {
                                         cells[0].parentNode.hidden = false;
                                         failMessage.hidden = true;
                                     } else {
                                         cells[0].parentNode.hidden = true;
                                         isAllHidden(bookRows, failMessage);
                                         };
                                     };
 
                         for (let row of bookRows) {
                                 let currentCells = row.cells;
                                 ifCellsInclude(currentCells);
                                 };
 
                         // convert nodelist to array
                         let bookArray = new Array();
                         for (let element of bookRows) {
                                 bookArray.push(element);
                         };
                         const searchResultsArray = bookArray.filter(row => row.hidden === false);
                         showFirstBooks(searchResultsArray);
                         paginateBooks(searchResultsArray);
                 });// END eventListener()
         }; 
         eventListener('click', searchButton);
         eventListener('keyup', searchInput);
 }; 
 
 
 /*START SCRIPT*/
 
 //Step 1: show first ten books
 showFirstBooks(bookRows);
 
 // Step 2: dynamically add search feature
 appendSearch(searchBarParent);
 
 //Step 3: Select search releated elements
 const searchInput = document.getElementById('search-input');
 const searchButton = document.getElementById('search-button');
 const failMessage = document.getElementById('fail-message');
 
 //Step 4: Paginate the results of the search
 paginateBooks(bookRows);
 
 //Step 5: Add Search Handlers
 initiateSearch();