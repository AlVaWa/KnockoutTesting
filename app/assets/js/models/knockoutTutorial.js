'use strict';

define(['jquery',
    'knockout'
], function ($, ko) {
    // This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
    function AppViewModel() {
        this.firstName = ko.observable("Bert");
        this.lastName = ko.observable("Bertington");

        this.fullName = ko.computed(function(){
            return this.firstName() + " " + this.lastName();
        }, this);

        this.capitalizeLastName = function(){
            var currentVal = this.lastName();
            this.lastName(currentVal.toUpperCase());
        };

        var self = this;

        // Non-editable catalog data - would come from the server
        self.availableMeals = [
            { mealName: "Standard (sandwich)", price: 0 },
            { mealName: "Premium (lobster)", price: 34.95 },
            { mealName: "Ultimate (whole zebra)", price: 290 }
        ];

        // Editable data
        self.seats = ko.observableArray([
            new SeatReservation("Steve", self.availableMeals[0]),
            new SeatReservation("Bert", self.availableMeals[0])
        ]);

        // Operations
        self.addSeat = function() {
            self.seats.push(new SeatReservation("", self.availableMeals[0]));
        };
        self.removeSeat = function(seat) { self.seats.remove(seat) };

        self.totalSurcharge = ko.computed(function() {
            var total = 0;
            for (var i = 0; i < self.seats().length; i++)
                total += self.seats()[i].meal().price;
            return total;
        });

        // Data
        var self = this;
        self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
        self.chosenFolderId = ko.observable();
        self.chosenFolderData = ko.observableArray();
        self.chosenMailData = ko.observableArray();

        // Behaviours
        self.goToFolder = function(folder) {
            self.chosenFolderId(folder);
            self.chosenMailData(null);
            self.allFolderMails = new Array();
            $.ajax(
                "/mails.json"
            ).done(function(mails) {
                $.each(mails.mails, function (index,mail) {
                    if(mail.folder === folder){
                        self.allFolderMails.push(mail);
                    }
                });
                self.chosenFolderData(self.allFolderMails);
            });
        };

        self.goToMail = function(chosenMail) {
            self.chosenFolderId(chosenMail.folder);
            self.chosenFolderData(null); // Stop showing a folder
            $.ajax(
                "/allMails.json"
            ).done(function(mails) {
                    $.each(mails.mails, function (index,mail) {
                        if(mail.id === chosenMail.id){
                            console.log("SHOW the correct mail!!");
                            self.chosenMailData(mail);
                        }
                    });
                }).fail(function( jqXHR, textStatus ) {
                    console.log( "Request failed: " + textStatus );
                }
            );
        };
        // Show inbox by default
        self.goToFolder('Inbox');


        // Fourth part
        this.question = "Which factors affect your technology choices?";
        this.pointsBudget = 10;
        var answereList = [
            "Functionality, compatibility, pricing - all that boring stuff",
            "How often it is mentioned on Hacker News",
            "Number of gradients/dropshadows on project homepage",
            "Totally believable testimonials on project homepage"
        ];
        this.answers = $.map(answereList, function(text) { return new Answer(text) });
        this.save = function() { alert('To do') };

        this.pointsUsed = ko.computed(function() {
            var total = 0;
            for (var i = 0; i < this.answers.length; i++)
                total += this.answers[i].points();
            return total;
        }, this);



    };

    // Class to represent a row in the seat reservations grid
    function SeatReservation(name, initialMeal) {
        var self = this;
        self.name = name;
        self.meal = ko.observable(initialMeal);

        self.formattedPrice = ko.computed(function(){
            var price = self.meal().price;
            return price ? "$" + price.toFixed(2) : "None";
        });
    };

    function Answer(text) {
        this.answerText = text; this.points = ko.observable(1);
    };

    return function () {
        var self = this;

        ko.bindingHandlers.fadeVisible = {
            init: function(element, valueAccessor) {
                // Start visible/invisible according to initial value
                var shouldDisplay = valueAccessor();
                $(element).toggle(shouldDisplay);
            },
            update: function(element, valueAccessor) {
                // On update, fade in/out
                var shouldDisplay = valueAccessor();
                shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
            }
        };

        ko.bindingHandlers.jqButton = {
            init: function(element) {
                $(element).button(); // Turns the element into a jQuery UI button
            },
            update: function(element, valueAccessor) {
                var currentValue = valueAccessor();
                // Here we just update the "disabled" state, but you could update other properties too
                $(element).button("option", "disabled", currentValue.enable === false);
            }
        };

        // Activates knockout.js
        ko.applyBindings(new AppViewModel());

        $(document).ready(function() {
            $("#firstLink").addClass("active");
            $("#secondLink").removeClass("active");
            $("#thirdLink").removeClass("active");
            $("#fourthLink").removeClass("active");
            $("#fifthLink").removeClass("active");

            $("#first").show();
            $("#second").hide();
            $("#third").hide();
            $("#fourth").hide();
            $("#fifth").hide();

            $("#firstLink").click(function () {
                $("#firstLink").addClass("active");
                $("#secondLink").removeClass("active");
                $("#thirdLink").removeClass("active");
                $("#fourthLink").removeClass("active");
                $("#fifthLink").removeClass("active");
                $("#first").show();
                $("#second").hide();
                $("#third").hide();
            });
            $("#secondLink").click(function () {
                $("#firstLink").removeClass("active");
                $("#secondLink").addClass("active");
                $("#thirdLink").removeClass("active");
                $("#fourthLink").removeClass("active");
                $("#fifthLink").removeClass("active");
                $("#first").hide();
                $("#second").show();
                $("#third").hide();


            });
            $("#thirdLink").click(function () {
                $("#firstLink").removeClass("active");
                $("#secondLink").removeClass("active");
                $("#thirdLink").addClass("active");
                $("#fourthLink").removeClass("active");
                $("#fifthLink").removeClass("active");
                $("#first").hide();
                $("#second").hide();
                $("#third").show();
            });
            $("#fourthLink").click(function () {
                $("#firstLink").removeClass("active");
                $("#secondLink").removeClass("active");
                $("#thirdLink").removeClass("active");
                $("#fourthLink").addClass("active");
                $("#fifthLink").removeClass("active");
                $("#first").hide();
                $("#second").hide();
                $("#third").show();
            });
            $("#fifthLink").click(function () {
                $("#firstLink").removeClass("active");
                $("#secondLink").removeClass("active");
                $("#thirdLink").removeClass("active");
                $("#fourthLink").removeClass("active");
                $("#fifthLink").addClass("active");
                $("#first").hide();
                $("#second").hide();
                $("#third").show();
            });
        });
    };
});