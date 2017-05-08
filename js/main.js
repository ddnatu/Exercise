var nessApp = angular.module('nessExerciseApp',[]);
    
    nessApp.controller('nessExerciseController',function($scope){
        $scope.name = 'Ness Variable';
        $scope.items = [];
        $scope.searchQuery = '';      
        $scope.showTextArea = false;
        $scope.tobeHighlighted = false;
        $scope.realIndex ;
        $scope.realIndexArray = [];
        $scope.myJsonStringDisplayArray = [];


        $scope.addItems = function(items){
            var typeName = document.getElementById("typeId");
            var selectedValue = typeName.options[typeName.selectedIndex].value;
            if (selectedValue == 'New' || selectedValue == 'Used' || selectedValue == 'Certified'){
                var makeName = document.getElementById('makeIdIBox').value;
                var modelName = document.getElementById('modelIdIBox').value;
                var itemObject = {
                    'type':selectedValue,
                    'makeName':makeName,
                    'modelName':modelName
                }
                $scope.items.push(itemObject);
            }else{
                alert("Please select a card type");
            }

            var elems = document.getElementsByTagName("input");
            var l = elems.length;
            for (var i = 0; i < l; ++i){
                if(elems[i].value="selected"){
                    elems[i].value = "";
                }
            }
            var typeName = document.getElementById("typeId");
            document.getElementById("typeId").value = typeName.options[0].value;
        }

        $scope.checkValidity = function(){
            if($scope.searchQuery.length  < 3 ){
            }else{
                var searchBoxIconIdVal = document.getElementById('searchBoxIconId');
                searchBoxIconIdVal.disabled = false;
            }
        }

        $scope.toJsonConverter = function(){
            $scope.showTextArea = true;
            var myJsonString = [];
            for(var i = 0 ; i < $scope.items.length ; i++){
                 myJsonString.push(JSON.stringify($scope.items[i] , null , 4));
            }
            $scope.myJsonStringDisplayArray = myJsonString;
        }
        $scope.search = function(){
            $scope.realIndexArray = [];
            for(var i = 0 ; i < $scope.items.length ; i++){
                if($scope.items[i].type === $scope.searchQuery || $scope.items[i].makeName === $scope.searchQuery || $scope.items[i].modelName === $scope.searchQuery){
                    $scope.tobeHighlighted = true;
                    $scope.realIndexArray.push(i);
                }
            }
        }
        $scope.rowHighlightManager = function(index){
            $scope.realIndex = index;
        }

    });
