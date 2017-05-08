
/* 
    Maximum operations like instantiating and assigning values has been done using angular functions but here also
    pure Javascript and Jquery will do just fine. 
    Many of the places Pure javascript is using, for instance taking InputBox Values , DropDown Values and affecting
    the styles viceversa and so on.
    for eg :-  We can select using document.getElementById() we can just as well use angular.element().find() , and
    so forth.
    
*/

// nessApp Register.
var nessApp = angular.module('nessExerciseApp',[]);


// nessApp Controller    
nessApp.controller('nessExerciseController',function($scope){

    // Initialization of scope variables.
    $scope.name = 'Ness Variable';
    $scope.items = [];
    $scope.searchQuery = '';      
    $scope.showTextArea = false;
    $scope.tobeHighlighted = false;
    $scope.realIndex ;
    $scope.realIndexArray = [];
    $scope.myJsonStringDisplayArray = [];


    // Function to add elements to an Array (eventually forming array of objects);
    $scope.addItems = function(items){
        var typeName = document.getElementById("typeId");
        var selectedValue = typeName.options[typeName.selectedIndex].value;

        // Add data to Table.
        if (selectedValue == 'New' || selectedValue == 'Used' || selectedValue == 'Certified'){
            var makeName = document.getElementById('makeIdIBox').value;
            var modelName = document.getElementById('modelIdIBox').value;

            if(makeName.length > 0 && modelName.length > 0){
                var itemObject = {
                    'type':selectedValue,
                    'makeName':makeName,
                    'modelName':modelName
                }
                $scope.items.push(itemObject);
                
                // Here we are clearing the inputs once the values of inputs are pushed into the array.
                var elems = document.getElementsByTagName("input");
                var l = elems.length;
                for (var i = 0; i < l; ++i){
                    if(elems[i].value="selected"){
                        elems[i].value = "";
                    }
                }
            }else{
                alert('InputBox can not be left empty');
            }
        }else{
            // Selecting from dropdown is mandatory.
            alert("Please select a card type");
        }

        // Making dropdown to its initial value ('Select a type') i.e index = 0 .
        var typeName = document.getElementById("typeId");
        document.getElementById("typeId").value = typeName.options[0].value;
    }

    // Function to ensure that the Search is triggered only when the length of the queryString exceeds or equates 3.
    $scope.checkValidity = function(){
        if($scope.searchQuery.length  < 3 ){
        }else{
            var searchBoxIconIdVal = document.getElementById('searchBoxIconId');
            searchBoxIconIdVal.disabled = false;
        }
    }

    // This Function creates data in JSON format.
    $scope.toJsonConverter = function(){
        $scope.showTextArea = true;
        var myJsonString = [];
        for(var i = 0 ; i < $scope.items.length ; i++){
                myJsonString.push(JSON.stringify($scope.items[i] , null , 4));
        }
        $scope.myJsonStringDisplayArray = myJsonString;
    }

    /* 
        This Function accomplishes the task of search , this is pure javascript implementation of search , although
        this can be easily done using Angular.js Filters that makes things a little better by performing most of the 
        comparisons under the hood.
    */
    $scope.search = function(){
        $scope.realIndexArray = [];
        for(var i = 0 ; i < $scope.items.length ; i++){
            if($scope.items[i].type === $scope.searchQuery || $scope.items[i].makeName === $scope.searchQuery || $scope.items[i].modelName === $scope.searchQuery){
                $scope.tobeHighlighted = true;
                $scope.realIndexArray.push(i);
            }
        }
    }

    /*
        This Function is of no use now because it just served the highlighting of any one single row , but it could not
        handle if multiple rows are there (for eg :- if same keyword/value is present in two or more rows).
    */
    $scope.rowHighlightManager = function(index){
        $scope.realIndex = index;
    }

});
