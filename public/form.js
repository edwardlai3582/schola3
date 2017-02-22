var student = {
    'role': 'student'
};

function createFormInputElement(item, parent) {
    var inputDiv = document.createElement('div');
    inputDiv.className = item.classname || 'input-container';
    item.type = item.type || 'text';
    var label = document.createElement('label');
    label.textContent = item.label || 'label';
    inputDiv.appendChild(label);

    switch (item.type) {
        case 'radio':
            var radioItem, radioButton, radioLabel;
            for (var i = 0; i < item.options.length; i++) {
                radioItem = item.options[i];

                radioButton = document.createElement('input');
                Object.assign(radioButton, {
                    type: item.type,
                    name: item.key,
                    value: radioItem.value
                });
                radioLabel = document.createElement('label');
                radioLabel.appendChild(radioButton);
                radioLabel.appendChild(document.createTextNode(radioItem.label));
                inputDiv.appendChild(radioLabel);
            }
            break;
        case 'select':
            var select = document.createElement('select');
            Object.assign(select, {
                name: item.key
            });

            for (var i = 0; i < item.options.length; i++) {
                var option = document.createElement('option');
                option.textContent = item.options[i];
                option.value = item.options[i];
                select.appendChild(option);
            }
            inputDiv.appendChild(select);
            break;
        default:
            var input = document.createElement('input');
            Object.assign(input, {
                id: 'form-' + item.key,
                type: item.type,
                name: item.key
            });
            inputDiv.appendChild(input);
    }
    if (item.isArray) {
        var addButton = document.createElement('button');
        addButton.textContent = '+';
        inputDiv.appendChild(addButton);
    }
    /*
        TODO: addEventListener to input for validation
    */
    parent.appendChild(inputDiv);
};

function createForm() {
    var form = document.getElementById('register-form')
    var formFields = document.getElementById('register-form-fields');
    for (let key in formInputItems) {
        formInputItems[key].key = key;
        createFormInputElement(formInputItems[key], formFields);
    }
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        submitForm(form);
    });
}

function submitForm(form) {
    var formData = new FormData(form);
    let property, value, dataType;
    for (var pair of formData.entries()) {
        // console.log(pair[0] + ': ' + pair[1]);
        if (formInputItems[pair[0]]) {
            dataType = formInputItems[pair[0]].type;
        }
        properties = pair[0].split('.');
        value = (pair[1] != '') ? pair[1] : null;
        if (value) {
            switch (dataType) {
                case 'text':
                    value = value.toString();
                    break;
                case 'number':
                    value = parseFloat(value);
                    // if (isNaN(value)) {
                    //     return console.error('not number');
                    // }
                    break;
                case 'date':
                    value = new Date(value);
                    // if (value == 'Invalid Date') {
                    //     return console.error('Invalid Date');
                    // }
                    break;
                default:

            }
        }
        student[properties[0]] = student[properties[0]] || {};
        if (properties.length > 1) {
            student[properties[0]][properties[1]] = value
        } else {
            student[properties[0]] = value;
        }
    }
    putStudent(student);
}

function putStudent(student){
    var result = document.getElementById('register-form-result');
    result.textContent = "";
    var XHR = new XMLHttpRequest();
    XHR.open('PUT', '/students');
    XHR.setRequestHeader("Content-Type", "application/json");
    XHR.onload = function(){
        var response = JSON.parse(XHR.responseText);
        result.textContent = JSON.stringify(response);
        getStudents();
    }
    XHR.onerror = function(){
        result.textContent = "request error";
    }
    XHR.send(JSON.stringify(student));    
}

function getStudents(){
    var result = document.getElementById('students-in-db');
    var XHR = new XMLHttpRequest();
    XHR.open('GET', '/students');
    XHR.onload = function(){
        var response = JSON.parse(XHR.responseText);
        result.textContent = JSON.stringify(response);
    }
    XHR.onerror = function(){
        result.textContent = "request error";   
    }
    XHR.send();
}

function showResult(student) {
    const showData = JSON.stringify(student, null, 4);
    console.log(student);
    console.log(showData);
    var result = document.getElementById('register-form-result');
    result.textContent = showData;
}

function init() {
    createForm();
    getStudents();
}

init();
