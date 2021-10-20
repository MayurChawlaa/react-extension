function Table(){
    const AddColumn = () =>{
        //creating div
        let created_div = document.createElement("div");
        created_div.className = "column";
        //creating checkbox
        let created_checkbox = document.createElement("input")
        created_checkbox.setAttribute("type", "checkbox");
        //adding checkbox to div
        created_div.appendChild(created_checkbox);

        //adding created element to all the rows
        let created_element = created_div;
        let allrows = document.getElementsByClassName("row");
        for(var i=0;i<allrows.length;i++)
        {
            let clone = created_element.cloneNode(true);
            document.getElementsByClassName("row")[i].appendChild(clone);
        }
    }
    const addRow = () => {
        //count number of columns already there
        let childCount = document.getElementById("row").childElementCount;
        console.log("children count : " + childCount);
        //creating RowDiv
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";
        //creating heading column
        let headingDiv = document.createElement("div");
        headingDiv.className = "column col-heading";
        headingDiv.setAttribute("contentEditable","true");
        headingDiv.innerHTML = "Heading";
        
        //adding headingdiv to the row
        rowDiv.appendChild(headingDiv);
        
        //creating div containing checkbox
        let columnDiv = document.createElement("div");
        columnDiv.className="column";
        //creating checkbox
        let created_checkbox = document.createElement("input");
        created_checkbox.setAttribute("type", "checkbox");
        //adding checkbox to the column div
        columnDiv.appendChild(created_checkbox);
        let created_element = columnDiv;
        //adding created checkbox div to the row
        for(let i=0;i<(childCount-1);i++)
        {
            let clone = created_element.cloneNode(true);
            rowDiv.appendChild(clone);
        }
        
        document.getElementById("table").appendChild(rowDiv);
    }
    const deleteRow = () => {
        console.log("delete Row");
        let table = document.getElementById("table");
        table.removeChild(table.lastElementChild);
    }
    
    const trySave = () => {
        console.log("Saving");
        let table = document.getElementById("table");
        //console.log(table);
        //console.log("Child Count : ", table.childElementCount);
        let objectToSave = {};
        let masterObj=[];
        console.log("Child Elements : ");
        for(let i = 0;i<table.childElementCount;i++)
        {
            let oneRow = table.childNodes[i];
            //console.log("Row ",i," ", oneRow);
            //console.log("",oneRow.childNodes.length);
            let numberOfColumns = oneRow.childNodes.length;
            let arrayOfCheckboxes = [];
            for(let j=0;j<numberOfColumns;j++)
            {
                let elementals = oneRow.childNodes[j].childNodes[0];
                
                //console.log(elementals);
                if(elementals.textContent)
                {
                    var elementalString = elementals.textContent; 
                    //console.log(elementals.textContent);
                }
                else
                {
                    let temp = elementals;
                    if(temp.checked)
                    {
                        //console.log(1);
                        arrayOfCheckboxes.push(1);
                    }
                    else
                    {
                        //console.log(0);
                        arrayOfCheckboxes.push(0);
                    }
                }
            }
            //console.log(arrayOfCheckboxes);
            if(elementalString)
            {
                //console.log(elementalString);
                objectToSave={};
                objectToSave[elementalString] = arrayOfCheckboxes;
                
                masterObj.push(objectToSave);
                //console.log(JSON.stringify(masterObj));
                //console.log("Before JSON : ",objectToSave);
                // let jsonObjString = JSON.stringify(objectToSave);
                // JSON.parse(jsonObjString);
                // console.log(jsonObjString);
                //console.log("JSON : ",jsonObjString);
                
                // var fs = require('fs');
                // fs.writeFileSync("saveData.txt", JSON.parse(jsonObjString), function(err) {
                //     if (err) {
                //         console.log(err);
                //     }
                // });
                //let fs = require('fs');
                //fs.writeFile("saveData.json",jsonObjString,'utf-8',()=>{});
            }
        }
        // let jsonObjString = JSON.stringify(objectToSave);
        // JSON.parse(jsonObjString);
        // console.log(JSON.parse(jsonObjString));
        // //let fs = require('fs');
        // //fs.writeFile("saveData.json",jsonObj,'utf-8',()=>{});
        if(localStorage.getItem('masterObject'))
        {
            localStorage.removeItem('masterObject');
        }
        localStorage.setItem('masterObject', JSON.stringify(masterObj));
        console.log(JSON.stringify(masterObj));
    }
    const tryLoad = () => {
        console.log("Loading");
        let masterObj = [];
        masterObj = JSON.parse(localStorage.getItem('masterObject'));
        let numberofRows = masterObj.length;
        console.log(numberofRows);
        let table = document.getElementById('table');
        //emptying table
        while(table.firstChild)
        {
            table.removeChild(table.firstChild);
        }
        //console.log(table);
        //console.log(masterObj.length);
        //console.log(masterObj);
        //printing single single objects
        masterObj.map((elem)=>{
            for (let i in elem){
                //console.log(i);
                let heading_name = i;
                let array_values = elem[i];
                //adding the fetched values to the table
                let newRow = document.createElement("div");
                newRow.className="row";
                //creating heading column
                let headingColumn = document.createElement("div");
                headingColumn.className= "column col-heading";
                headingColumn.setAttribute("contentEditable","true");
                headingColumn.innerHTML = heading_name;
                //appending column to row
                newRow.appendChild(headingColumn);
                
                //creating checkbox columns
                //creating div
                let created_div = document.createElement("div");
                created_div.className = "column";
                //creating checkbox
                let created_checkbox = document.createElement("input")
                created_checkbox.setAttribute("type", "checkbox");
                //adding checkbox to div
                created_div.appendChild(created_checkbox);
                let created_element = created_div;
                //let temp_array = array_values;
                for(let m=0;m<array_values.length;m++)
                {
                    //console.log(array_values[m]);
                    //console.log(created_element);
                    let temp = created_element.cloneNode(true);
                    if(array_values[m])
                    {
                        temp.childNodes[0].checked = true;
                    }
                    //console.log(temp.childNodes[0].checked);
                    newRow.appendChild(temp);
                }
                table.appendChild(newRow);

                console.log(heading_name,array_values);
            }
            // elem.map((key,value)=>{
            //     console.log.apply(key,value);
            // })
            //console.log(elem);
        });
        table.firstChild.id = "row";
        console.log(table);
        //let valuess = Object.values(masterObj);
    }
    return(
        <div className="babu-container">
            <div id="table" className="table">
                <div id="row" className="row">
                    <div contentEditable="true" className="column col-heading">Wakeup Early</div>
                </div>
                <div className="row"><div contentEditable="true" className="column col-heading">250 JJ's - morning</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Logs</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Study 1 ch Tech</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Practice 100 sums</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Study 1 ch Non-Tech</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">250 JJ's - evening</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Eat Good Food</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Keep A Water Bottle</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Getting Good Thoughts</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Triggers Overcame</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Pressure Prevent (Do Better)</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Next Tech Subject</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Hobbies- Extra Project</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Early to Bed</div></div>
                <div className="row"><div contentEditable="true" className="column col-heading">Control</div></div>
            </div>
            <div className="option-buttons">
                <div className="button-div has-items">
                    <div className="which-button-text">Column -&nbsp;</div>
                    <button className="big-button add-button" onClick={AddColumn}>Add</button>
                </div>
                <div className="button-div has-items">
                    <button className="big-button delete-button" onClick={deleteRow}>Delete</button>
                    <div className="which-button-text">- Row -</div>
                    <button className="big-button add-button" onClick={addRow}>Add</button>
                </div>
                <div className="button-div has-items">
                <div className="which-button-text">Save -&nbsp;</div>
                    <button className="big-button add-button" onClick={trySave}>Save</button>
                </div>
                <div className="button-div has-items">
                    <div className="which-button-text">Load -&nbsp;</div>
                    <button className="big-button load-button" onClick={tryLoad}>Load</button>
                </div>
            </div>
        </div>        
    )
}

export default Table;