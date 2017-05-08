
var nessApp = angular.module('nessExerciseApp',[]);
    
    nessApp.controller('nessExerciseController',function($scope){
        $scope.name = 'Ness Variable';
        $scope.items = [];
        $scope.searchQuery = '';      
        $scope.showTextArea = false;
        $scope.tobeHighlighted = false;
        $scope.realIndex ;

        $scope.addItems = function(items){
            var typeName = document.getElementById("typeId");
            var selectedValue = typeName.options[typeName.selectedIndex].value;
            if (selectedValue == 'new' || selectedValue == 'used' || selectedValue == 'certified'){
                var makeName = document.getElementById('makeIdIBox').value;
                var modelName = document.getElementById('modelIdIBox').value;
                //console.log('typename',typeName);
                var itemObject = {
                    'type':selectedValue,
                    'makeName':makeName,
                    'modelName':modelName
                }
                //console.log(modelName,makeName);
                //console.log('itemObject',itemObject);
                $scope.items.push(itemObject);
                //console.log('itemsarray',$scope.items.length);
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
            //console.log('reaching');
            if($scope.searchQuery.length  < 3 ){
            }else{
                var searchBoxIconIdVal = document.getElementById('searchBoxIconId');
                searchBoxIconIdVal.disabled = false;
            }
        }

        $scope.toJsonConverter = function(){
            $scope.showTextArea = true;
            var myJsonString = JSON.stringify($scope.items);
            document.getElementById('toJsonTextAreaId').value = myJsonString;
        }
        $scope.search = function(){
            for(var i = 0 ; i < $scope.items.length ; i++){
                if($scope.items[i].type === $scope.searchQuery || $scope.items[i].makeName === $scope.searchQuery || $scope.items[i].modelName === $scope.searchQuery){
                    $scope.tobeHighlighted = true;
                    $scope.rowHighlightManager(i);
                }
            }
        }
        $scope.rowHighlightManager = function(index){
            $scope.realIndex = index;
        }

    });
