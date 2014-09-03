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
        self.chosenFolderData = ko.observable();

        // Behaviours
        self.goToFolder = function(folder) {
            self.chosenFolderId(folder);
            var allMails =[];
            var allFolderMails;
//            $.getJSON("/mails.js", "" ,  allMails );

            console.log("Make AJAX call");
            $.ajax({
                dataType: "json",
                url: "/mails.js",
                data: allMails,
                success: function(){
                    console.log("Success!")
                }
            });

//            allMails.foreach(function(mail){
//               if(mail.folder === folder){
//                   allFolderMails.add(mail);
//               }
//            });

            self.chosenFolderData = allFolderMails;
        };

        // Show inbox by default
        self.goToFolder('Inbox');
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
    }


    return function () {
        var self = this;

        // Activates knockout.js
        ko.applyBindings(new AppViewModel());





    };
});