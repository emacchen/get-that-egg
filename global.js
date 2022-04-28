function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);


// Module base class for element and event management
function Module() { }

Module.prototype.init = function (el) {
    this.$module = $(el);
    this.attachEvents();

    this.initModule();
}

Module.prototype.attachEvents = function () {
    this.$module.on('click.module', '[data-clickaction]', $.proxy(this.handleAction, this));
    this.$module.on('change.module', '[data-changeaction]', $.proxy(this.handleAction, this));
}


Module.prototype.handleAction = function (e) {

    var type = e.type,
        $el = $(e.currentTarget),
        tag = $el[0].tagName.toLowerCase(),
        action = $el.attr('data-' + type + 'action'),
        actionValue;

    if (/mouse(enter|leave)/.test(type)) {
        action = $el.attr('data-hoveraction')
    }

    // Cancel event for non-input elements (like a link's href)
    if (tag != 'input') {
        e.preventDefault();
    }

    if (/(select|input)/.test(tag)) {
        if ($el.attr("type") == "checkbox") {
            actionValue = $el.is(":checked") ? true : false;
        } else {
            actionValue = $el.val();
        }
    }
    else {
        actionValue = $el.data('actionvalue');
    }

    e.stopPropagation();

    if (this['action_' + action]) {
        this['action_' + action]($el, actionValue, e);
    }
    else if (typeof Debug != 'undefined') {
        console.info(this.moduleId, this.$module, 'Module:handleAction', action, 'action not found');
    }

}

Module.prototype.$elements = {}
Module.prototype.$el = function (name, retrieveFresh) {

    if (!this.$elements[name] || retrieveFresh) {
        this.$elements[name] = $(this.elementMap[name] || name, this.$module[0]);
    }

    return this.$elements[name];
}


Universe = function () {

}

Universe.prototype = new Module();

Universe.prototype.elementMap = {
    'background': 'div.background',
    'minimap': 'div.minimap',
    'minimapViewport': 'div.minimap div.viewport',
}

Universe.prototype.initModule = function () {

    this.zoomLevel = 1;

    this.setDimensions();

    this.$el('background').draggable({
        scroll: false,
        drag: $.proxy(this.mapPanning, this)
    });

    this.$el('minimapViewport').draggable({
        scroll: false,
        containment: this.$el('minimap'),
        drag: $.proxy(this.minimapPanning, this)
    });


    this.createSampleData();

}


Universe.prototype.setDimensions = function () {

    this.mapDimensions = {
        width: 600,
        height: 400
    };

    this.minimapDimensions = {
        width: 120,
        height: 80
    };

    this.backgroundDimensions = {
        width: 1200,
        height: 800
    }; // based on zoom
}


Universe.prototype.mapPanning = function (e, ui) {

    // constrain to bounding region
    var pos = ui.position;
    ui.position.top = Math.max(ui.position.top, this.mapDimensions.height - this.backgroundDimensions.height);
    ui.position.left = Math.max(ui.position.left, this.mapDimensions.width - this.backgroundDimensions.width);
    ui.position.top = Math.min(ui.position.top, 0);
    ui.position.left = Math.min(ui.position.left, 0);


    var widthRatio = this.minimapDimensions.width / this.backgroundDimensions.width;
    var heightRatio = this.minimapDimensions.height / this.backgroundDimensions.height;

    var minimapViewportPosition = {
        left: -(pos.left * widthRatio),
        top: -(pos.top * heightRatio)
    };

    this.$el('minimapViewport').css(minimapViewportPosition);

}

Universe.prototype.minimapPanning = function (e, ui) {
    var pos = ui.position;

    var widthRatio = this.backgroundDimensions.width / this.minimapDimensions.width;
    var heightRatio = this.backgroundDimensions.height / this.minimapDimensions.height;

    var backgroundPosition = {
        left: -(pos.left * widthRatio),
        top: -(pos.top * heightRatio)
    };

    this.$el('background').css(backgroundPosition);

}


Universe.prototype.action_showDataHover = function ($el, val) {
    alert('Clicked: ' + val);

}

Universe.prototype.createSampleData = function () {

    for (var i = 0; i < 30; i++) {

        var x = getRandomInt(0, this.backgroundDimensions.width);
        var y = getRandomInt(0, this.backgroundDimensions.width);
        var size = getRandomInt(20, 70);


        var $item = $('<div />', { 'class': 'dataItem', 'data-clickaction': 'showDataHover', 'data-actionvalue': 'item ' + i });
        $item.css({ top: y, left: x, height: size, width: size, 'border-radius': size / 2 });

        this.$el('background').append($item);

    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}


new Universe().init('div.map');


function scrollFunction() {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    };
    updateProgressBar();
}

function topFunction() {
    /*
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
*/
    window.scroll({
        top: 0,
        behavior: 'smooth'
      });    
}

function updateProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myProgress").style.width = scrolled + "%";
}
