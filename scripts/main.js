var hardware_list;
getJson();
console.log('js');

function getJson() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            hardware_list = JSON.parse(xhttp.response);
            console.log('response ', xhttp.response);
            renderMenuLeft(hardware_list);
            if (hardware_list.length > 0) {
                renderDetail(hardware_list[0]);
            }
        }
    };
    xhttp.open("GET", "http://localhost/API/hardware_list.json", true);
    xhttp.send();
}

function renderMenuLeft(items) {
    var ul = document.querySelector('#left-menu ul');
    for (var i = 0; i < items.length; i++) {
        var li = document.createElement('li');
        li.id = items[i].id;
        li.className = 'list-group-item';
        li.textContent = items[i].name;
        li.onclick = function () {
            var liPreviousActive = document.getElementsByClassName('active');
            if (liPreviousActive.length > 0) {
                liPreviousActive[0].className = 'list-group-item';
            }
            this.className = 'list-group-item active';
            var hardwareIndex = document.getElementById(this.id);
            var foundHardware = hardware_list.find(function (hardware) {
                return hardware.id == hardwareIndex.id;
            });
            renderDetail(foundHardware);
        };
        ul.appendChild(li);
    }
}

function renderMenuLeft(items) {
    var ul = document.querySelector('#left-menu ul');
    for (var i = 0; i < items.length; i++) {
        var li = document.createElement('li');
        li.id = items[i].id;
        li.className = 'list-group-item';
        li.textContent = items[i].name;
        li.onclick = function () {
            var liPreviousActive = document.getElementsByClassName('active');
            if (liPreviousActive.length > 0) {
                liPreviousActive[0].className = 'list-group-item';
            }
            this.className = 'list-group-item active';
            var hardwareIndex = document.getElementById(this.id);
            var foundHardware = hardware_list.find(function (hardware) {
                return hardware.id == hardwareIndex.id;
            });
            renderDetail(foundHardware);
        };
        ul.appendChild(li);
    }
}

function renderDetail(item) {
    document.querySelector('#article .card-header').textContent = item.name;
    document.getElementById('description').textContent = item.description;
    var ul = document.querySelector('#article ul');
    var ulTextContent = '';
    for (var key in item.parameters) {
        ulTextContent += '<li>' + key + ': ' + item.parameters[key] + '</li>';
    }
    ul.innerHTML = ulTextContent;
}

function renderMenuLeft(items) {
    var ul = document.querySelector('#left-menu ul');
    for (var i=0; i<items.length; i++)
    {
        var li = document.createElement('li');
        li.id = items[i].id;
        li.className = 'list-group-item';
        li.textContent = items[i].name;
        li.onclick = function() {
            var liPreviousActive = document.getElementsByClassName('active');
            if (liPreviousActive.length > 0)
            {
                liPreviousActive[0].className = 'list-group-item';
            }
            this.className = 'list-group-item active';
            var hardwareIndex = document.getElementById(this.id);
            var foundHardware = hardware_list.find(function(hardware){
                return hardware.id == hardwareIndex.id;
            });
            renderDetail(foundHardware);
        };
        ul.appendChild(li);
    }
}

function renderDetail(item) {
    document.querySelector('#accordion .card-header').textContent = item.name;
    document.getElementById('description').textContent = item.description;
    var ul = document.querySelector('#accordion ul');
    var ulTextContent = '';
    for(var key in item.parameters) {
        ulTextContent += '<li>' + key + ': ' + item.parameters[key] + '</li>';
    }
    ul.innerHTML = ulTextContent;
}

function showModal() {
    document.getElementById('myModal').style.display = '';
}

function closeModal() {
    $('#modal').modal('hide');
}

function addOffer()
{
    /*copy template*/
    var comment = document.getElementById('commentExample').cloneNode(true);
    comment.id = 'comment-' + document.querySelectorAll('.comment').length;
    /*add to HTML copied template*/
    var allComments = document.getElementById('comments');
    allComments.insertBefore(comment, allComments.firstChild);
    /*fullfill template*/
    comment.querySelector('.user').textContent = "USER";
    var now = new Date();
    comment.querySelector('.date').textContent = now.toISOString();
    var price = document.querySelector('input[name="priceUser"]').textContent;
    comment.querySelector('.price').textContent = price;
    /*close modal*/
    closeModal();
}


$(document).ready(function(){
    $('#menu a:first').tab('show');
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        console.log('show e.target');
        $(e.target).tab('show');
        $(e.targetPrevious).hide();
    });
    $('.dropdown-item').click( function (event) {
        if(event.target.id === 'desktop') {
            $('#resolution-group').hide();
        } else {
            $('#resolution-group').show();
        }
    })
    $('#checkbox-price').prop('checked', false);
    $('#checkbox-price').change(function(){
        $(this).popover('toggle');
        $('input[name="price"]').prop('disabled', $(this).is(':checked'));
        $(this).popover('dispose');
        $('.popover-dismiss').popover({
            trigger: 'focus'
        });
    });

    $('#saveButton').click(function(event){
        var name = $('input[name="name"]');
        if(name.val() == '' ) {
            $(name).parent().addClass('has-danger');
            $(name).addClass('form-control-danger');
            $(name).parent().children().last().text('Nazwa jest obowiązkowa!');
        }
    });

    $('#comments .btn').click(function(event){
        $('#modal').modal('show');
    });


    $('#modal .btn-primary').click(function(event){
        addOffer();
    });
});

