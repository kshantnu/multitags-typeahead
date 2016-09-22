angular.module('custom-typeahead',[]).directive('mailTypeAhead', MailtypeAhead);
MailtypeAhead.$inject = ['$compile'];

 function MailtypeAhead($compile) {
       
        return {
            restrict: 'AE',          
            replace: true,
            template : '<input style="outline:none;padding-left: 5px;" typeahead-editable="true" name="states" id="emailtags" type="text" placeholder="enter a email" ng-model="selected" typeahead="item as item.name + \' (\' + item.email + \')\' for item in titles | filter:{name:$viewValue} | limitTo:5" typeahead-on-select="onSelect($item, $model, $label)">',
           
            link: function (scope, elem, attr) {                
                scope.titles = [
                   {name: 'kumar shantnu', email: 'shantnu@abc.com'},
                   {name: 'Vinay Jadhav',  email: 'vinay@abc.com'}
                ];               
                scope.onSelect = function(a,b,c){  
                    
                   scope.selected = undefined;
                    $( '<span id="typespan" class="badge badge-bg">' + a.name + ' (' + a.email + ')' + '&nbsp; <span class="glyphicon glyphicon-remove text-danger span-text-color cross pointer"  ng-click="removespan($event)"></span></span><span class="blankspan">&nbsp;</span>' ).insertBefore( "#dynamic" );
                        $compile($('.badge').last())(scope);                         
                }
                
                elem.bind('keyup',function(e){
                    var key = e.which;
                    var x = $('#emailtags').val();
                     if(key == 13 && x != '')
                      {    
                           var emailPatternValidation = /\S+@\S+\.\S+/;
                          var isEmailValid = emailPatternValidation.test(x);
                
                           $( '<span id="typespan" class="badge badge-bg">' + x + '&nbsp; <span class="glyphicon glyphicon-remove text-danger cross span-text-color pointer"  ng-click="removespan($event)"></span></span><span class="blankspan">&nbsp;</span>' ).
                           insertBefore( "#dynamic" );
                          if (!isEmailValid) {
                    
                    $('.badge').last().addClass('span-text-color');
                }
                            $('#emailtags').val('');
                          
                            $compile($('.badge').last())(scope);
                          
                          
                          
                      }
                    else if(key == 8 && x == ''){
                        
                        if(!$('.badge').last().hasClass('spancolor')){
                        $('.badge').last().addClass('spancolor');
                            $('.blankspan').last().remove();
                        }
                        else $('.badge').last().remove();
                    }
                    
                })
                
                
                
                scope.removespan = function(event){
                    event.target.parentElement.nextElementSibling.remove(); 
                    event.target.parentElement.remove();
                }
              
                
            }
            
            
            
        }
        
        

        
    }