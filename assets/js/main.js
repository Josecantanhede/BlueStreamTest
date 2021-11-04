

$.when($.ready).then(() => {
    startScroller();
    startTeammatesPicker();
    startClientsCarousel();
    contactFormLoader();
});

let startScroller = () => {
    $('.navbar a').click(function (event) {
        event.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr('href')).offset().top - NAVBAR_HEIGHT,
            easing: 'linear'
        }, 300);
    });
    
    $(CONTACT_NOW_BUTTON_ID).click(function (event) {
        event.preventDefault();
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr('href')).offset().top - NAVBAR_HEIGHT,
            easing: 'linear'
        }, 300);
    });
};

let startTeammatesPicker = () => {
    teammatesListEl = $(TEAMMATES_LIST_ID);
    teammatesDisplayerEl = $(TEAMMATES_DISPLAYER_ID);
    teammatesItems = teammatesListEl.children();
    teammates = teammatesDisplayerEl.children();
    activeTeammate = teammatesDisplayerEl.find('.on-display').first();
    teammatesItems.each(index => {
        const teammateItemEl = $(teammatesItems[index]);
        teammateItemEl.on('click', function () {
            //Removing itens active class
            teammatesItems.removeClass('on-display');
            teammateItemEl.addClass('on-display');

            activeTeammate.fadeOut(500, function () {
                activeTeammate.removeClass('on-display');
                activeTeammate = $(teammateItemEl.data('for'));
                activeTeammate.addClass('on-display');
                activeTeammate.fadeIn(500);

            });
        });
    });
};

let startClientsCarousel = () => {
    $(".owl-carousel").owlCarousel({
        center: true,
        items: 6,
        margin: 35,
        autoplay: true,
        loop: true,
        autoplayTimeout: 6000,
        fluidSpeed: 6000,
        autoplayHoverPause: true
    });
};

let contactFormLoader = () => {
    contactFormValidation = $(CONTACT_FORM_ID).validate();

    $(CONTACT_SUBMIT_BUTTON_ID).click(function () {        
        $(CONTACT_FORM_ID).submit();
    });
    
    $(CONTACT_FORM_ID).submit(function (event) {
        event.preventDefault();
        if ($(CONTACT_FORM_ID).valid()) {
            const form = $(CONTACT_FORM_ID);            
            const data = form.serialize();
            $(CONTACT_SENDING_LOADER_ID).show();
            $.post('php/mail.php', data).done(function() {
                form.trigger("reset");
                alert('Message sent');
            }).always(function() {
                $(CONTACT_SENDING_LOADER_ID).hide();
            });;
        }
    });
    
};


/**
 * Constants and Variables
 */
// Navbar

const TOP_NAVBAR_ID = '#top-navbar';
const NAVBAR_HEIGHT = 120;
const CONTACT_NOW_BUTTON_ID = '#contactNowButton';

// Teammates Picker
const TEAMMATES_PICKER_ID = '#teammates-picker';
const TEAMMATES_LIST_ID = '#teammates-list';
const TEAMMATE_ITEM_CLASS = '.teammate-item';

// Teammates Displayer
const TEAMMATES_DISPLAYER_ID = '#teammates-displayer';

// Contact Form 

const CONTACT_FORM_ID = '#contact-form';
const CONTACT_SUBMIT_BUTTON_ID = '#contactSubmitButton';
const CONTACT_SENDING_LOADER_ID = '#contactSendingLoader';

let teammatesListEl = null;
let teammatesDisplayerEl = null;
let teammatesItems = [];
let teammates = [];
let activeTeammate = null;

let contactFormValidation = null;